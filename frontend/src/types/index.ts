export interface Vocabulary {
  ID: string;
  Name: string;
  Words: VocabularyWord[];
}

export interface PracticeRecord {
  id: string;
  userId: string;
  vocabularyId: string;
  isCorrect: boolean;
  timestamp: string;
}

export interface LearningApp {
  id: string;
  name: string;
  description: string;
  icon: string;
  url: string;
  category: string;
}

export interface VocabularyWord {
  ID: string;
  Kanji: string;
  Romaji: string;
  English: string;
  parts: string[];
}