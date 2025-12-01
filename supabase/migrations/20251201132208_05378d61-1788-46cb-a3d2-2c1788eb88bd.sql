-- Add contact_message field to plans table
ALTER TABLE public.plans 
ADD COLUMN contact_message text;