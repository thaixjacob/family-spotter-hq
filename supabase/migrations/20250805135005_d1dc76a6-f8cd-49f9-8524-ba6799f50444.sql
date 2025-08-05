-- Fix function search path security issue
ALTER FUNCTION public.update_updated_at_column() SET search_path = '';

-- Create secure function for checking existing emails
CREATE OR REPLACE FUNCTION public.check_email_exists(email_input TEXT)
RETURNS BOOLEAN
LANGUAGE SQL
SECURITY DEFINER
STABLE
SET search_path = ''
AS $$
  SELECT EXISTS (
    SELECT 1 
    FROM public.email_subscribers 
    WHERE email = email_input
  );
$$;