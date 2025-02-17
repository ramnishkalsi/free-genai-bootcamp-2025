export interface Vocabulary {
  id: string;
  word: string;
  definition: string;
  examples: string[];
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
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