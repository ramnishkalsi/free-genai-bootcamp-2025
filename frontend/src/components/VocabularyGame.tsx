import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { vocabularyList } from '@/data/vocabulary';
import type { GameState } from '@/types/vocabulary';
import { Check, X, ArrowRight, RefreshCcw, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function VocabularyGame() {
  const navigate = useNavigate();
  const [gameState, setGameState] = useState<GameState>({
    currentIndex: 0,
    score: 0,
    isCorrect: null,
    userInput: '',
    showAnswer: false,
  });

  const currentWord = vocabularyList[gameState.currentIndex];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const isCorrect = gameState.userInput.toLowerCase() === currentWord.english.toLowerCase();
    
    setGameState(prev => ({
      ...prev,
      isCorrect,
      score: isCorrect ? prev.score + 1 : prev.score,
      showAnswer: true,
    }));
  };

  const nextWord = () => {
    const nextIndex = (gameState.currentIndex + 1) % vocabularyList.length;
    setGameState({
      currentIndex: nextIndex,
      score: gameState.score,
      isCorrect: null,
      userInput: '',
      showAnswer: false,
    });
  };

  const resetGame = () => {
    setGameState({
      currentIndex: 0,
      score: 0,
      isCorrect: null,
      userInput: '',
      showAnswer: false,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="max-w-4xl mx-auto">
        <Button
          variant="ghost"
          onClick={() => navigate('/')}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 w-4 h-4" />
          Back to Dashboard
        </Button>

        <Card className="w-full max-w-md mx-auto p-6 space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
              Japanese Vocabulary
            </h1>
            <p className="text-gray-500 dark:text-gray-400">
              Score: {gameState.score}/{vocabularyList.length}
            </p>
          </div>

          <div className="text-center space-y-4">
            <div className="text-6xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              {currentWord.japanese}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Romaji: {currentWord.romaji}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="text"
              placeholder="Type the English translation..."
              value={gameState.userInput}
              onChange={(e) => setGameState(prev => ({ ...prev, userInput: e.target.value }))}
              disabled={gameState.showAnswer}
              className="text-center"
            />

            {!gameState.showAnswer ? (
              <Button type="submit" className="w-full">
                Check Answer
              </Button>
            ) : (
              <div className="space-y-4">
                <div className={`flex items-center justify-center gap-2 text-lg font-semibold
                  ${gameState.isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                  {gameState.isCorrect ? (
                    <>
                      <Check className="w-6 h-6" />
                      <span>Correct!</span>
                    </>
                  ) : (
                    <>
                      <X className="w-6 h-6" />
                      <span>The correct answer is: {currentWord.english}</span>
                    </>
                  )}
                </div>
                
                <Button onClick={nextWord} className="w-full">
                  Next Word <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            )}
          </form>

          <div className="pt-4 border-t">
            <Button
              variant="outline"
              onClick={resetGame}
              className="w-full"
            >
              <RefreshCcw className="mr-2 w-4 h-4" />
              Reset Game
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default VocabularyGame;