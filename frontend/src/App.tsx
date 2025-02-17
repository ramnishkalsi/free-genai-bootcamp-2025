import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { VocabularyList } from "@/components/vocabulary/vocabulary-list";
import { AppGrid } from "@/components/apps/app-grid";
import { StatsCard } from "@/components/dashboard/stats-card";
import { Brain, Book, Trophy, Gamepad2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Vocabulary } from "@/types";

// Keep mockApps for now since we don't have an API endpoint for it yet
const mockApps = [
  {
    id: "1",
    name: "Vocabulary Trainer",
    description: "Practice vocabulary with flashcards and spaced repetition",
    icon: "🎯",
    url: "#",
    category: "Practice",
  },
  {
    id: "2",
    name: "Word Games",
    description: "Fun games to reinforce vocabulary learning",
    icon: "🎮",
    url: "#",
    category: "Games",
  },
];

function App() {
  const [vocabularies, setVocabularies] = useState<Vocabulary[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.clear(); // Clear previous logs
    console.log('Component mounted'); // Verify useEffect is running

    const fetchVocabularies = async () => {
      try {
        console.log('Fetching vocabularies...');
        const response = await fetch('http://localhost:8080/groups', {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Origin': 'http://localhost:5173',
          },
          mode: 'cors',
          credentials: 'include',
        });
        console.log('Response status:', response.status);
        console.log('Response headers:', response.headers);
        
        if (!response.ok) {
          throw new Error('Failed to fetch vocabularies');
        }
        
        const data = await response.json();
        console.log('Received data:', data);
        setVocabularies(data);
      } catch (err) {
        console.error('Fetch error:', err);
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchVocabularies();
  }, []);

  return (
    <div className="min-h-screen bg-background p-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Learning Portal</h1>
        <p className="text-muted-foreground">
          Your personalized language learning dashboard
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <StatsCard
          title="Total Words Learned"
          value="247"
          icon={<Brain className="h-4 w-4 text-muted-foreground" />}
        />
        <StatsCard
          title="Study Streak"
          value="12 days"
          icon={<Trophy className="h-4 w-4 text-muted-foreground" />}
        />
        <StatsCard
          title="Vocabulary Lists"
          value="8"
          icon={<Book className="h-4 w-4 text-muted-foreground" />}
        />
        <StatsCard
          title="Learning Apps"
          value="5"
          icon={<Gamepad2 className="h-4 w-4 text-muted-foreground" />}
        />
      </div>

      <Tabs defaultValue="vocabulary" className="space-y-4">
        <TabsList>
          <TabsTrigger value="vocabulary">Vocabulary</TabsTrigger>

        </TabsList>
        <TabsContent value="vocabulary">
          {isLoading ? (
            <div>Loading vocabularies...</div>
          ) : error ? (
            <div className="text-red-500">Error: {error}</div>
          ) : (
            <VocabularyList vocabularies={vocabularies} />
          )}
        </TabsContent>
        <TabsContent value="apps">
          <AppGrid apps={mockApps} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default App;