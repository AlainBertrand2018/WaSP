-- Drop the existing policy if it exists to avoid conflicts
DROP POLICY IF EXISTS "Enable update for users based on user_id" ON public.profiles;

-- Create a new, correct policy for updating profiles
CREATE POLICY "Enable update for users based on user_id"
ON public.profiles
FOR UPDATE
TO authenticated
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

-- Ensure the insert policy is also correct
DROP POLICY IF EXISTS "Enable insert for authenticated users" ON public.profiles;

CREATE POLICY "Enable insert for authenticated users"
ON public.profiles
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = id);
