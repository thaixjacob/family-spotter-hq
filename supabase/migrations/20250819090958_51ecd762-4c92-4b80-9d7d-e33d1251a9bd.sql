-- Fix security warnings: Function Search Path Mutable

-- Fix search_path for check_unique_email_subscription function
CREATE OR REPLACE FUNCTION public.check_unique_email_subscription()
RETURNS TRIGGER 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
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
$$;

-- Fix search_path for log_security_event function
CREATE OR REPLACE FUNCTION public.log_security_event(
  event_type text,
  user_id uuid DEFAULT auth.uid(),
  details jsonb DEFAULT '{}'::jsonb
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  -- For now, this is a placeholder for security event logging
  -- In production, this could log to a security_events table
  -- or integrate with external monitoring systems
  NULL;
END;
$$;