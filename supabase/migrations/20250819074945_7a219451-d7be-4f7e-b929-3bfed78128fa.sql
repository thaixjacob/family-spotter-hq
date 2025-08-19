-- Security fixes for the project (fixed version)

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
-- Create a more secure policy for users viewing their own subscription
DROP POLICY IF EXISTS "Users can view their own subscription" ON public.email_subscribers;

CREATE POLICY "Users can view their own confirmed subscription" ON public.email_subscribers
FOR SELECT
TO authenticated
USING (auth.email() = email AND is_confirmed = true);

-- 3. Add a function to prevent multiple subscriptions with same email
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

-- 4. Keep the is_admin function as is (it's already secure by returning false)
-- No changes needed since it already prevents unauthorized admin access

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