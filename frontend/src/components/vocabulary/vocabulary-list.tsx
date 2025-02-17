import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
// import { Badge } from "@/components/ui/badge";
import type { Vocabulary } from "@/types";

interface VocabularyListProps {
  vocabularies: Vocabulary[];
}

export function VocabularyList({ vocabularies }: VocabularyListProps) {
  const [search, setSearch] = useState("");

  const filteredVocabularies = vocabularies.flatMap(vocab => 
    vocab.Words?.filter(word => 
      word.English.toLowerCase().includes(search.toLowerCase()) ||
      word.Kanji.toLowerCase().includes(search.toLowerCase()) ||
      word.Romaji.toLowerCase().includes(search.toLowerCase()) ||
      vocab.Name.toLowerCase().includes(search.toLowerCase())
    ).map(word => ({ ...word, groupName: vocab.Name })) || []
  );

  return (
    <div className="space-y-4">
      <Input
        placeholder="Search vocabulary..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="max-w-sm"
      />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Group</TableHead>
            <TableHead>English</TableHead>
            <TableHead>Kanji</TableHead>
            <TableHead>Romaji</TableHead>
            
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredVocabularies.map((word) => (
            <TableRow key={`${word.ID}`}>
              <TableCell className="font-medium">{word.groupName}</TableCell>
              <TableCell>{word.English}</TableCell>
              <TableCell>{word.Kanji}</TableCell>
              <TableCell>{word.Romaji}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}