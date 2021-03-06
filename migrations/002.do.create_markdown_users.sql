CREATE TABLE markdown_users (
  id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
  email TEXT NOT NULL UNIQUE,
  user_name TEXT NOT NULL UNIQUE,
  full_name TEXT NOT NULL,
  password TEXT NOT NULL,
  image TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ
);

ALTER TABLE markdown_notes
  ADD COLUMN
    user_id INTEGER REFERENCES markdown_users(id)
    ON DELETE SET NULL;
