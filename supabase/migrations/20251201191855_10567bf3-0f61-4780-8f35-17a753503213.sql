-- Drop the existing SELECT policy for announcements
DROP POLICY IF EXISTS "Anyone can view active announcements" ON public.announcements;

-- Create new SELECT policy that allows admins to see all announcements
-- and regular users to see only active ones
CREATE POLICY "Admins can view all announcements, users see active only"
ON public.announcements
FOR SELECT
USING (
  has_role(auth.uid(), 'admin'::app_role) OR is_active = true
);