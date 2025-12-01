-- Add audience field to resources table
ALTER TABLE public.resources 
ADD COLUMN audience text DEFAULT 'all' CHECK (audience IN ('all', 'students', 'parents', 'educators'));

-- Add index for better query performance
CREATE INDEX idx_resources_audience ON public.resources(audience);