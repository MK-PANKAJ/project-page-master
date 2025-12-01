-- Drop the flawed trigger
DROP TRIGGER IF EXISTS on_auth_user_admin_check ON auth.users;
DROP FUNCTION IF EXISTS public.handle_admin_user();

-- Create a table to store the admin email configuration
CREATE TABLE IF NOT EXISTS public.admin_config (
  id INTEGER PRIMARY KEY DEFAULT 1,
  admin_email TEXT NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CONSTRAINT single_row CHECK (id = 1)
);

-- Enable RLS on admin_config
ALTER TABLE public.admin_config ENABLE ROW LEVEL SECURITY;

-- Only admins can view and manage admin config
CREATE POLICY "Admins can manage admin config"
ON public.admin_config
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

-- Insert the admin email (you'll need to update this with your actual admin email)
-- For now, we'll use the existing admin's email from user_roles
INSERT INTO public.admin_config (admin_email)
SELECT u.email FROM auth.users u
INNER JOIN public.user_roles ur ON u.id = ur.user_id
WHERE ur.role = 'admin'::app_role
LIMIT 1
ON CONFLICT (id) DO NOTHING;