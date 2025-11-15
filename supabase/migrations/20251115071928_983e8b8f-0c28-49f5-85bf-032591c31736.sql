-- Create role enum for user access control
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- Create user_roles table for secure role management
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  UNIQUE(user_id, role)
);

-- Enable RLS on user_roles table
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check user roles (prevents RLS recursion)
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- Add admin-only SELECT policy for booking_requests
CREATE POLICY "Admins can view booking requests"
ON public.booking_requests
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Add admin-only SELECT policy for contact_submissions
CREATE POLICY "Admins can view contact submissions"
ON public.contact_submissions
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Add admin-only UPDATE policy for booking status management
CREATE POLICY "Admins can update booking status"
ON public.booking_requests
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Add database-level length constraints for input validation
ALTER TABLE public.contact_submissions
ADD CONSTRAINT check_name_length CHECK (length(name) <= 100),
ADD CONSTRAINT check_email_length CHECK (length(email) <= 255),
ADD CONSTRAINT check_message_length CHECK (length(message) <= 2000);

ALTER TABLE public.booking_requests
ADD CONSTRAINT check_name_length CHECK (length(name) <= 100),
ADD CONSTRAINT check_email_length CHECK (length(email) <= 255),
ADD CONSTRAINT check_message_length CHECK (length(message) <= 2000);