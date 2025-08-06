-- Fix critical RLS security issue: Remove overly permissive policy
DROP POLICY IF EXISTS "Admin can view all subscribers" ON public.email_subscribers;

-- Create a security definer function to check admin privileges
-- For now, we'll create a basic admin check that can be enhanced later when user roles are implemented
CREATE OR REPLACE FUNCTION public.is_admin(user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  -- For now, return false since no admin system is implemented
  -- This prevents the overly permissive access while maintaining security
  -- When admin system is implemented, this function should check user roles
  SELECT false;
$$;

-- Create a proper admin-only policy for viewing subscribers
CREATE POLICY "Only admins can view subscribers" 
ON public.email_subscribers 
FOR SELECT 
TO authenticated
USING (public.is_admin(auth.uid()));

-- Add a policy to allow users to view only their own subscription status
CREATE POLICY "Users can view their own subscription" 
ON public.email_subscribers 
FOR SELECT 
TO authenticated
USING (auth.email() = email);

-- Add rate limiting table for the edge function
CREATE TABLE IF NOT EXISTS public.rate_limits (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  identifier text NOT NULL, -- IP address or user identifier
  endpoint text NOT NULL,
  request_count integer DEFAULT 1,
  window_start timestamp with time zone DEFAULT now(),
  created_at timestamp with time zone DEFAULT now(),
  UNIQUE(identifier, endpoint)
);

-- Enable RLS on rate_limits table
ALTER TABLE public.rate_limits ENABLE ROW LEVEL SECURITY;

-- Allow the service role to manage rate limits
CREATE POLICY "Service role can manage rate limits"
ON public.rate_limits
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);