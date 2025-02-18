import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import {
  BookOpen,
  MessageSquare,
  Pencil,
  Headphones,
  GraduationCap,
} from 'lucide-react';

interface GameCard {
  title: string;
  description: string;
  icon: React.ReactNode;
  path: string;
  available: boolean;
}

function Dashboard() {
  const navigate = useNavigate();

  const games: GameCard[] = [
    {
      title: 'Vocabulary',
      description: 'Learn Japanese words through interactive exercises',
      icon: <BookOpen className="w-6 h-6" />,
      path: '/vocabulary',
      available: true,
    },
    {
      title: 'Conversation',
      description: 'Practice common Japanese phrases and dialogues',
      icon: <MessageSquare className="w-6 h-6" />,
      path: '/conversation',
      available: false,
    },
    {
      title: 'Writing',
      description: 'Learn to write Japanese characters',
      icon: <Pencil className="w-6 h-6" />,
      path: '/writing',
      available: false,
    },
    {
      title: 'Listening',
      description: 'Improve your Japanese listening skills',
      icon: <Headphones className="w-6 h-6" />,
      path: '/listening',
      available: false,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center mb-8">
          <GraduationCap className="w-10 h-10 text-indigo-600 dark:text-indigo-400 mr-3" />
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
            Japanese Learning Hub
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {games.map((game) => (
            <Card
              key={game.title}
              className={`p-6 transition-all duration-300 hover:shadow-lg ${
                game.available
                  ? 'cursor-pointer hover:-translate-y-1'
                  : 'opacity-60 cursor-not-allowed'
              }`}
              onClick={() => game.available && navigate(game.path)}
            >
              <div className="flex items-start space-x-4">
                <div className="p-3 rounded-lg bg-indigo-100 dark:bg-indigo-900">
                  {game.icon}
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-semibold mb-2">{game.title}</h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {game.description}
                  </p>
                  <Button
                    variant={game.available ? 'default' : 'outline'}
                    disabled={!game.available}
                    className="w-full"
                  >
                    {game.available ? 'Start Learning' : 'Coming Soon'}
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;