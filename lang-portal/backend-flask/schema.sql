CREATE TABLE IF NOT EXISTS groups (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  words_count INTEGER DEFAULT 0  -- Counter cache for the number of words in the group
);

CREATE TABLE IF NOT EXISTS study_activities (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,  -- Name of the activity (e.g., "Flashcards", "Quiz")
  url TEXT NOT NULL,  -- The full url of the study activity
  preview_url TEXT    -- The url to the preview image for the activity
);

CREATE TABLE IF NOT EXISTS word_groups (
  word_id INTEGER NOT NULL,
  group_id INTEGER NOT NULL,
  FOREIGN KEY (word_id) REFERENCES words(id),
  FOREIGN KEY (group_id) REFERENCES groups(id)
);

CREATE TABLE IF NOT EXISTS word_review_items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  word_id INTEGER NOT NULL,
  study_session_id INTEGER NOT NULL,  -- Link to study session
  correct BOOLEAN NOT NULL,  -- Whether the answer was correct (true) or wrong (false)
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,  -- Timestamp of the review
  FOREIGN KEY (word_id) REFERENCES words(id),
  FOREIGN KEY (study_session_id) REFERENCES study_sessions(id)
);

CREATE TABLE IF NOT EXISTS word_reviews (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  word_id INTEGER NOT NULL,
  correct_count INTEGER DEFAULT 0,
  wrong_count INTEGER DEFAULT 0,
  last_reviewed TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (word_id) REFERENCES words(id)
);

CREATE TABLE IF NOT EXISTS words (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  kanji TEXT NOT NULL,
  romaji TEXT NOT NULL,
  english TEXT NOT NULL,
  parts TEXT NOT NULL  -- Store parts as JSON string
);


INSERT INTO study_activities (name, url, preview_url) VALUES 
('Typing Tutor', 'http://localhost:8080', '/assets/study_activities/typing_tutor.png');
