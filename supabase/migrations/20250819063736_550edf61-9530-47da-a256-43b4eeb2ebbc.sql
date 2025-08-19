-- Security fixes for the project

-- 1. Secure rate_limits table - Remove public access and ensure only service role can manage it
DROP POLICY IF EXISTS "Service role can manage rate limits" ON public.rate_limits;

-- Create restrictive policy for rate_limits table
CREATE POLICY "Service role only access" ON public.rate_limits
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- Ensure no other roles can access rate_limits
CREATE POLICY "Block all non-service access" ON public.rate_limits
FOR ALL
TO authenticated, anon
USING (false)
WITH CHECK (false);

-- 2. Review and improve email_subscribers policies
-- The current public INSERT policy is acceptable for newsletter signup functionality
-- but let's add better validation by ensuring only confirmed emails can be viewed by users

-- Create a more secure policy for users viewing their own subscription
DROP POLICY IF EXISTS "Users can view their own subscription" ON public.email_subscribers;

CREATE POLICY "Users can view their own confirmed subscription" ON public.email_subscribers
FOR SELECT
TO authenticated
USING (auth.email() = email AND is_confirmed = true);

-- 3. Add a policy to prevent multiple subscriptions with same email
-- This helps prevent spam and abuse
CREATE OR REPLACE FUNCTION public.check_unique_email_subscription()
RETURNS TRIGGER AS $$
BEGIN
  -- Check if email already exists
  IF EXISTS (
    SELECT 1 FROM public.email_subscribers 
    WHERE email = NEW.email
  ) THEN
    RAISE EXCEPTION 'Email already subscribed';
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to enforce unique email constraint
DROP TRIGGER IF EXISTS enforce_unique_email_trigger ON public.email_subscribers;
CREATE TRIGGER enforce_unique_email_trigger
  BEFORE INSERT ON public.email_subscribers
  FOR EACH ROW
  EXECUTE FUNCTION public.check_unique_email_subscription();

-- 4. Improve the is_admin function with better security
-- Update the function to be more explicit about admin access
DROP FUNCTION IF EXISTS public.is_admin(uuid);
CREATE OR REPLACE FUNCTION public.is_admin(user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $$
  -- For now, return false since no admin system is implemented
  -- This prevents any unauthorized admin access
  -- Future implementation should check against a proper roles table
  SELECT false;
$$;

-- 5. Add basic security logging function for monitoring
CREATE OR REPLACE FUNCTION public.log_security_event(
  event_type text,
  user_id uuid DEFAULT auth.uid(),
  details jsonb DEFAULT '{}'::jsonb
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- For now, this is a placeholder for security event logging
  -- In production, this could log to a security_events table
  -- or integrate with external monitoring systems
  NULL;
END;
$$;