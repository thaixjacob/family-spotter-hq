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
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, language, acceptedTerms }: SubscribeRequest = await req.json();
    console.log(`Processing subscription for email: ${email}`);

    if (!email || !acceptedTerms) {
      return new Response(
        JSON.stringify({ error: 'Email and terms acceptance are required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Check if email already exists
    const { data: existingUser, error: selectError } = await supabase
      .from('email_subscribers')
      .select('id, is_confirmed')
      .eq('email', email)
      .maybeSingle();

    if (selectError) {
      console.error('Error checking existing user:', selectError);
    }

    console.log(`Existing user check result:`, existingUser);

    if (existingUser) {
      if (existingUser.is_confirmed) {
        console.log(`Email ${email} already confirmed, returning error`);
        return new Response(
          JSON.stringify({ error: 'Email already subscribed' }),
          { status: 409, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
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

    if (brevoApiKey && brevoListId) {
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
        console.log(`Brevo response status: ${brevoResponse.status}, body: ${responseText}`);

        if (!brevoResponse.ok) {
          console.error('Brevo API error:', responseText);
          // Don't fail the request if Brevo fails, just log it
        } else {
          console.log('Successfully added to Brevo list');
        }
      } catch (brevoError) {
        console.error('Error calling Brevo API:', brevoError);
        // Don't fail the request if Brevo fails, just log it
      }
    } else {
      console.log('Brevo integration not configured - missing API key or list ID');
    }

    // Update confirmation status in our database
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
    } else {
      console.log(`Successfully confirmed subscription for ${email}`);
    }

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