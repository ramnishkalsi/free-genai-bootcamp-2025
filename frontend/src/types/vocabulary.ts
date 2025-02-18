export interface VocabularyItem {
  japanese: string;
  english: string;
  romaji?: string;
}

export interface GameState {
  currentIndex: number;
  score: number;
  isCorrect: boolean | null;
  userInput: string;
  showAnswer: boolean;
}