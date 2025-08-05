-- Create email_subscribers table
CREATE TABLE public.email_subscribers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  accepted_terms BOOLEAN NOT NULL DEFAULT false,
  language TEXT NOT NULL DEFAULT 'en',
  is_confirmed BOOLEAN NOT NULL DEFAULT false,
  confirmation_token UUID DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  confirmed_at TIMESTAMP WITH TIME ZONE,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.email_subscribers ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to insert (for public email capture)
CREATE POLICY "Anyone can subscribe to emails" 
ON public.email_subscribers 
FOR INSERT 
WITH CHECK (true);

-- Create policy to allow reading for confirmed emails only (for admin dashboard later)
CREATE POLICY "Admin can view all subscribers" 
ON public.email_subscribers 
FOR SELECT 
USING (true);

-- Create index for better performance on email lookups
CREATE INDEX idx_email_subscribers_email ON public.email_subscribers(email);
CREATE INDEX idx_email_subscribers_confirmed ON public.email_subscribers(is_confirmed);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_email_subscribers_updated_at
  BEFORE UPDATE ON public.email_subscribers
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();