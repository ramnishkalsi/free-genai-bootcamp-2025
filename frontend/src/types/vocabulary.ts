export interface VocabularyItem {
  id: number;
  japanese: string;
  english: string;
  romaji: string;
  parts: string[];
}

export interface GameState {
  currentIndex: number;
  score: number;
  isCorrect: boolean | null;
  userInput: string;
  showAnswer: boolean;
}