import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { VocabularyList } from "@/components/vocabulary/vocabulary-list";
import { AppGrid } from "@/components/apps/app-grid";
import { StatsCard } from "@/components/dashboard/stats-card";
import { Brain, Book, Trophy, Gamepad2 } from "lucide-react";

// Mock data - replace with API calls
const mockVocabularies = [
  {
    id: "1",
    word: "Ephemeral",
    definition: "Lasting for a very short time",
    examples: ["The ephemeral nature of fashion trends"],
    category: "Advanced Vocabulary",
    difficulty: "advanced",
  },
  {
    id: "2",
    word: "Ubiquitous",
    definition: "Present, appearing, or found everywhere",
    examples: ["Mobile phones are now ubiquitous"],
    category: "Advanced Vocabulary",
    difficulty: "advanced",
  },
] as const;

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
] as const;

function App() {
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
          <TabsTrigger value="apps">Learning Apps</TabsTrigger>
        </TabsList>
        <TabsContent value="vocabulary">
          <VocabularyList vocabularies={mockVocabularies} />
        </TabsContent>
        <TabsContent value="apps">
          <AppGrid apps={mockApps} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default App;