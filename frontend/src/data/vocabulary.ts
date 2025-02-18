import { VocabularyItem } from '@/types/vocabulary';

interface ApiVocabularyItem {
  ID: number;
  Kanji: string;
  English: string;
  Romaji: string;
  Parts: string[];
}

async function fetchVocabularyList(): Promise<VocabularyItem[]> {
  try {
    const response = await fetch('http://localhost:8080/words'); // Adjust the API endpoint as needed
    const data: ApiVocabularyItem[] = await response.json();
    
    return data.map(item => ({
      id: item.ID,
      japanese: item.Kanji,
      english: item.English,
      romaji: item.Romaji,
      parts: item.Parts
    }));
  } catch (error) {
    console.error('Error fetching vocabulary:', error);
    return [];
  }
}

export { fetchVocabularyList };