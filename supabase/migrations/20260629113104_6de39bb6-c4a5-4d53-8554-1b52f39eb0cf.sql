BEGIN;

-- Drop the overly permissive anonymous resume upload policy
DROP POLICY IF EXISTS "Anyone can upload resumes" ON storage.objects;

-- Restrict uploads: authenticated users can only upload to their own uid folder
CREATE POLICY "Authenticated users can upload to own resume folder"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'resumes'
  AND name LIKE auth.uid()::text || '/%'
);

COMMIT;