import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface SubscribeRequest {
  email: string;
  language: string;
  acceptedTerms: boolean;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Function started - brevo-subscribe');
    
    // Get client IP for rate limiting
    const clientIP = req.headers.get('x-forwarded-for') || 
                     req.headers.get('x-real-ip') || 
                     'unknown';
    console.log(`Request from IP: ${clientIP}`);
    
    const { email, language, acceptedTerms }: SubscribeRequest = await req.json();
    console.log(`Processing subscription for email: ${email}, language: ${language}, acceptedTerms: ${acceptedTerms}`);

    if (!email || !acceptedTerms) {
      console.log('Validation failed - missing email or terms acceptance');
      return new Response(
        JSON.stringify({ error: 'Email and terms acceptance are required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    
    console.log(`Supabase config check - URL exists: ${!!supabaseUrl}, Key exists: ${!!supabaseKey}`);
    
    if (!supabaseUrl || !supabaseKey) {
      console.error('Missing Supabase configuration');
      return new Response(
        JSON.stringify({ error: 'Server configuration error' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    // Enhanced input validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.log('Validation failed - invalid email format');
      return new Response(
        JSON.stringify({ error: 'Invalid email format' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Rate limiting check
    const rateLimitKey = `newsletter_signup_${clientIP}`;
    const windowMinutes = 5;
    const maxRequests = 5;
    
    try {
      // Check current rate limit status
      const { data: rateLimit, error: rateLimitError } = await supabase
        .from('rate_limits')
        .select('request_count, window_start')
        .eq('identifier', rateLimitKey)
        .eq('endpoint', 'brevo-subscribe')
        .maybeSingle();

      if (rateLimitError && rateLimitError.code !== 'PGRST116') {
        console.error('Error checking rate limit:', rateLimitError);
        // Continue without rate limiting if there's a DB error
      } else if (rateLimit) {
        const windowStart = new Date(rateLimit.window_start);
        const now = new Date();
        const timeDiff = (now.getTime() - windowStart.getTime()) / (1000 * 60); // minutes

        if (timeDiff < windowMinutes) {
          if (rateLimit.request_count >= maxRequests) {
            console.log(`Rate limit exceeded for IP: ${clientIP}`);
            return new Response(
              JSON.stringify({ error: 'Too many requests. Please try again later.' }),
              { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
            );
          }
          
          // Increment counter
          await supabase
            .from('rate_limits')
            .update({ request_count: rateLimit.request_count + 1 })
            .eq('identifier', rateLimitKey)
            .eq('endpoint', 'brevo-subscribe');
        } else {
          // Reset window
          await supabase
            .from('rate_limits')
            .update({ 
              request_count: 1, 
              window_start: now.toISOString() 
            })
            .eq('identifier', rateLimitKey)
            .eq('endpoint', 'brevo-subscribe');
        }
      } else {
        // Create new rate limit entry
        await supabase
          .from('rate_limits')
          .insert({
            identifier: rateLimitKey,
            endpoint: 'brevo-subscribe',
            request_count: 1,
            window_start: new Date().toISOString()
          });
      }
    } catch (rateLimitErr) {
      console.error('Rate limiting error (continuing anyway):', rateLimitErr);
    }

    // Check if email already exists
    console.log(`Checking if email ${email} already exists`);
    const { data: existingUser, error: selectError } = await supabase
      .from('email_subscribers')
      .select('id, is_confirmed')
      .eq('email', email)
      .maybeSingle();

    if (selectError) {
      console.error('Error checking existing user:', selectError);
      return new Response(
        JSON.stringify({ error: 'Database error while checking user' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Existing user check result:`, existingUser);

    let shouldAddToBrevo = true;

    if (existingUser) {
      if (existingUser.is_confirmed) {
        console.log(`Email ${email} already confirmed, will still try Brevo sync for testing`);
        // Continue to process Brevo for testing purposes
      } else {
        console.log(`Email ${email} exists but not confirmed, updating...`);
        // Update existing unconfirmed subscription
        const { error: updateError } = await supabase
          .from('email_subscribers')
          .update({
            language,
            accepted_terms: acceptedTerms,
            updated_at: new Date().toISOString()
          })
          .eq('email', email);

        if (updateError) {
          console.error('Error updating subscriber:', updateError);
          return new Response(
            JSON.stringify({ error: 'Failed to update subscription' }),
            { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }
      }
    } else {
      console.log(`Email ${email} is new, creating subscription...`);
      // Create new subscription
      const { error: insertError } = await supabase
        .from('email_subscribers')
        .insert({
          email,
          language,
          accepted_terms: acceptedTerms,
          is_confirmed: false
        });

      if (insertError) {
        console.error('Error creating subscriber:', insertError);
        return new Response(
          JSON.stringify({ error: 'Failed to create subscription' }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
    }

    // Add to Brevo
    const brevoApiKey = Deno.env.get('BREVO_API_KEY');
    const brevoListId = Deno.env.get('BREVO_LIST_ID');

    console.log(`Brevo integration check - API Key exists: ${!!brevoApiKey}, List ID: ${brevoListId}`);

    if (brevoApiKey && brevoListId && shouldAddToBrevo) {
      try {
        console.log(`Adding ${email} to Brevo list ${brevoListId}`);
        const brevoPayload = {
          email,
          listIds: [parseInt(brevoListId)],
          attributes: {
            LANGUAGE: language.toUpperCase(),
            ACCEPTED_TERMS: acceptedTerms
          },
          updateEnabled: true
        };
        console.log('Brevo payload:', JSON.stringify(brevoPayload));

        const brevoResponse = await fetch('https://api.brevo.com/v3/contacts', {
          method: 'POST',
          headers: {
            'api-key': brevoApiKey,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(brevoPayload),
        });

        const responseText = await brevoResponse.text();
        console.log(`Brevo response status: ${brevoResponse.status}`);
        console.log(`Brevo response headers:`, Object.fromEntries(brevoResponse.headers.entries()));
        console.log(`Brevo response body: ${responseText}`);

        if (!brevoResponse.ok) {
          console.error('Brevo API error - Status:', brevoResponse.status, 'Body:', responseText);
          // Don't fail the request if Brevo fails, just log it
        } else {
          console.log('Successfully added to Brevo list - Response:', responseText);
          // Parse response to see contact ID
          try {
            const brevoData = JSON.parse(responseText);
            console.log('Brevo contact ID:', brevoData.id);
          } catch (e) {
            console.log('Could not parse Brevo response as JSON');
          }
        }
      } catch (brevoError) {
        console.error('Error calling Brevo API:', brevoError);
        // Don't fail the request if Brevo fails, just log it
      }
    } else {
      console.log('Brevo integration not configured or skipped - API key exists:', !!brevoApiKey, 'List ID:', brevoListId, 'Should add:', shouldAddToBrevo);
    }

    // Update confirmation status in our database (only for new/unconfirmed emails)
    if (!existingUser || !existingUser.is_confirmed) {
      console.log(`Confirming subscription for ${email}`);
      const { error: confirmError } = await supabase
        .from('email_subscribers')
        .update({
          is_confirmed: true,
          confirmed_at: new Date().toISOString()
        })
        .eq('email', email);

      if (confirmError) {
        console.error('Error confirming subscription:', confirmError);
        return new Response(
          JSON.stringify({ error: 'Failed to confirm subscription' }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      } else {
        console.log(`Successfully confirmed subscription for ${email}`);
      }
    }

    console.log('Function completed successfully');
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Successfully subscribed to newsletter' 
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    console.error('Error in brevo-subscribe function:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
};

serve(handler);