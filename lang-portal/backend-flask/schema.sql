CREATE TABLE IF NOT EXISTS groups (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS study_activities (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS words (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  kanji TEXT NOT NULL,
  romaji TEXT NOT NULL,
  english TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS study_sessions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  group_id INTEGER NOT NULL,
  study_activity_id INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (group_id) REFERENCES groups(id),
  FOREIGN KEY (study_activity_id) REFERENCES study_activities(id)
);

CREATE TABLE IF NOT EXISTS word_review_items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  study_session_id INTEGER NOT NULL,
  word_id INTEGER NOT NULL,
  correct BOOLEAN NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (study_session_id) REFERENCES study_sessions(id),
  FOREIGN KEY (word_id) REFERENCES words(id)
);

CREATE TABLE IF NOT EXISTS word_reviews (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  word_id INTEGER NOT NULL,
  correct_count INTEGER DEFAULT 0,
  wrong_count INTEGER DEFAULT 0,
  last_reviewed TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (word_id) REFERENCES words(id)
);

-- Insert some sample data
INSERT INTO groups (name) VALUES 
  ('Beginner Japanese'),
  ('Intermediate Japanese'),
  ('Advanced Japanese');

INSERT INTO study_activities (name) VALUES
  ('Vocabulary Review'),
  ('Kanji Practice'),
  ('Reading Comprehension');

INSERT INTO words (kanji, romaji, english) VALUES
  ('犬', 'inu', 'dog'),
  ('猫', 'neko', 'cat'),
  ('鳥', 'tori', 'bird'); 