/*
  # Create Newsletter Subscriptions Table

  1. New Table
    - `newsletter_subscriptions`
      - `id` (uuid, primary key) - Unique identifier for subscription
      - `email` (text, unique, not null) - Subscriber email address
      - `subscribed_at` (timestamptz, default now()) - Timestamp of subscription
      - `is_active` (boolean, default true) - Whether subscription is active
      - `unsubscribed_at` (timestamptz, nullable) - Timestamp when unsubscribed

  2. Indexes
    - Index on `email` for fast lookups
    - Index on `is_active` for filtering active subscribers

  3. Security
    - Enable RLS on `newsletter_subscriptions` table
    - Policy for authenticated users to read all subscriptions (for admin)
    - Policy for anyone to insert (public subscription)
    - Policy for authenticated users to update (for admin unsubscribe)

  4. Notes
    - Email is unique to prevent duplicate subscriptions
    - Uses lowercase email addresses for consistency
    - Soft delete approach with `is_active` flag
*/

-- Create newsletter subscriptions table
CREATE TABLE IF NOT EXISTS newsletter_subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  subscribed_at timestamptz DEFAULT now(),
  is_active boolean DEFAULT true,
  unsubscribed_at timestamptz,
  CONSTRAINT email_format CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$')
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS newsletter_subscriptions_email_idx 
  ON newsletter_subscriptions(email);

CREATE INDEX IF NOT EXISTS newsletter_subscriptions_is_active_idx 
  ON newsletter_subscriptions(is_active);

-- Enable RLS
ALTER TABLE newsletter_subscriptions ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can subscribe (insert)
CREATE POLICY "Anyone can subscribe to newsletter"
  ON newsletter_subscriptions
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Policy: Authenticated users can view all subscriptions (admin)
CREATE POLICY "Authenticated users can view all subscriptions"
  ON newsletter_subscriptions
  FOR SELECT
  TO authenticated
  USING (true);

-- Policy: Authenticated users can update subscriptions (admin unsubscribe)
CREATE POLICY "Authenticated users can update subscriptions"
  ON newsletter_subscriptions
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);