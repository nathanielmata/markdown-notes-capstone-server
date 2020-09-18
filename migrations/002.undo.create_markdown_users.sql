ALTER TABLE markdown_notes
  DROP COLUMN IF EXISTS user_id;

DROP TABLE IF EXISTS markdown_users CASCADE;