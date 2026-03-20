/*
  # Add Foreign Key Indexes for Performance

  1. Performance Optimization
    - Add indexes on foreign key columns to improve query performance
    - `journal_entries.user_id` - Foreign key to profiles table
    - `meditation_sessions.user_id` - Foreign key to profiles table
    
  2. Benefits
    - Improves JOIN performance when querying user data
    - Speeds up CASCADE DELETE operations
    - Optimizes queries filtering by user_id
    - Essential for RLS policy performance
    
  3. Security & Performance
    - Foreign key columns without indexes can cause performance issues
    - RLS policies that check user_id benefit significantly from these indexes
    - Prevents table scans on user-based queries
    
  Note: These indexes are critical for production performance as they support:
  - User authentication queries
  - RLS policy checks (auth.uid() = user_id)
  - Cascade delete operations
  - Join operations between user tables
*/

-- Add index on journal_entries foreign key
CREATE INDEX IF NOT EXISTS journal_entries_user_id_idx 
  ON journal_entries(user_id);

-- Add index on meditation_sessions foreign key
CREATE INDEX IF NOT EXISTS meditation_sessions_user_id_idx 
  ON meditation_sessions(user_id);