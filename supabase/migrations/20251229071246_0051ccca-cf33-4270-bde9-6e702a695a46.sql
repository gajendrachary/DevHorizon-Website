-- Add INSERT policy for profiles table as a safety net
-- This allows users to create their own profile if the trigger fails
CREATE POLICY "Users can create own profile"
  ON public.profiles
  FOR INSERT
  WITH CHECK (
    auth.uid() = user_id
    AND NOT EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE user_id = auth.uid()
    )
  );