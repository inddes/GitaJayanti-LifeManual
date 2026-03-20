/*
  # Create Meditation Sessions Table

  1. New Tables
    - `meditation_sessions`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references profiles)
      - `duration` (integer) - Duration in minutes
      - `type` (text) - Type of meditation (guided, timer, breathing)
      - `completed` (boolean)
      - `notes` (text)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `meditation_sessions` table
    - Add policy for users to view their own sessions
    - Add policy for users to insert their own sessions
    - Add policy for users to update their own sessions
*/

CREATE TABLE IF NOT EXISTS meditation_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  duration integer NOT NULL DEFAULT 10,
  type text NOT NULL DEFAULT 'timer',
  completed boolean DEFAULT false,
  notes text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS meditation_sessions_user_id_idx ON meditation_sessions(user_id);
CREATE INDEX IF NOT EXISTS meditation_sessions_created_at_idx ON meditation_sessions(created_at DESC);

ALTER TABLE meditation_sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own meditation sessions"
  ON meditation_sessions FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own meditation sessions"
  ON meditation_sessions FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own meditation sessions"
  ON meditation_sessions FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);
