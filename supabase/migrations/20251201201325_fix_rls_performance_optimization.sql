/*
  # Fix RLS Performance Issues

  1. Changes
    - Drop existing RLS policies on profiles, journal_entries, and meditation_sessions
    - Recreate policies with optimized auth.uid() calls using SELECT subquery
    - This prevents re-evaluation of auth.uid() for each row, improving performance at scale

  2. Security
    - Maintains same security model but with better performance
    - All tables remain protected with RLS
    - Only authenticated users can access their own data
*/

-- Drop and recreate profiles policies with optimized auth.uid()
DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;

CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING ((SELECT auth.uid()) = id);

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK ((SELECT auth.uid()) = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING ((SELECT auth.uid()) = id)
  WITH CHECK ((SELECT auth.uid()) = id);

-- Drop and recreate journal_entries policies with optimized auth.uid()
DROP POLICY IF EXISTS "Users can view own journal entries" ON journal_entries;
DROP POLICY IF EXISTS "Users can insert own journal entries" ON journal_entries;
DROP POLICY IF EXISTS "Users can update own journal entries" ON journal_entries;
DROP POLICY IF EXISTS "Users can delete own journal entries" ON journal_entries;

CREATE POLICY "Users can view own journal entries"
  ON journal_entries FOR SELECT
  TO authenticated
  USING ((SELECT auth.uid()) = user_id);

CREATE POLICY "Users can insert own journal entries"
  ON journal_entries FOR INSERT
  TO authenticated
  WITH CHECK ((SELECT auth.uid()) = user_id);

CREATE POLICY "Users can update own journal entries"
  ON journal_entries FOR UPDATE
  TO authenticated
  USING ((SELECT auth.uid()) = user_id)
  WITH CHECK ((SELECT auth.uid()) = user_id);

CREATE POLICY "Users can delete own journal entries"
  ON journal_entries FOR DELETE
  TO authenticated
  USING ((SELECT auth.uid()) = user_id);

-- Drop and recreate meditation_sessions policies with optimized auth.uid()
DROP POLICY IF EXISTS "Users can view own meditation sessions" ON meditation_sessions;
DROP POLICY IF EXISTS "Users can insert own meditation sessions" ON meditation_sessions;
DROP POLICY IF EXISTS "Users can update own meditation sessions" ON meditation_sessions;

CREATE POLICY "Users can view own meditation sessions"
  ON meditation_sessions FOR SELECT
  TO authenticated
  USING ((SELECT auth.uid()) = user_id);

CREATE POLICY "Users can insert own meditation sessions"
  ON meditation_sessions FOR INSERT
  TO authenticated
  WITH CHECK ((SELECT auth.uid()) = user_id);

CREATE POLICY "Users can update own meditation sessions"
  ON meditation_sessions FOR UPDATE
  TO authenticated
  USING ((SELECT auth.uid()) = user_id)
  WITH CHECK ((SELECT auth.uid()) = user_id);
