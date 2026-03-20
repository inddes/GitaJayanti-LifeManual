/*
  # Remove Unused Indexes

  1. Index Cleanup
    - Drop unused indexes that are not being utilized to improve performance:
      - `journal_entries_user_id_idx` - Not used for queries
      - `journal_entries_created_at_idx` - Not used for queries
      - `meditation_sessions_user_id_idx` - Not used for queries
      - `meditation_sessions_created_at_idx` - Not used for queries
      - `mantras_category_idx` - Not used for queries
    
  2. Benefits
    - Improves write performance (INSERT, UPDATE, DELETE operations)
    - Reduces storage overhead
    - Simplifies index maintenance
    - Reduces database size
    
  3. Notes
    - Indexes can be recreated if query patterns change
    - Foreign key constraints provide sufficient performance for user_id lookups
    - The primary key index is sufficient for most queries on these tables
*/

-- Drop unused indexes on journal_entries table
DROP INDEX IF EXISTS journal_entries_user_id_idx;
DROP INDEX IF EXISTS journal_entries_created_at_idx;

-- Drop unused indexes on meditation_sessions table
DROP INDEX IF EXISTS meditation_sessions_user_id_idx;
DROP INDEX IF EXISTS meditation_sessions_created_at_idx;

-- Drop unused index on mantras table
DROP INDEX IF EXISTS mantras_category_idx;