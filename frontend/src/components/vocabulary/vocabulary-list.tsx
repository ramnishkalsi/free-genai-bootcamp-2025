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
import { Badge } from "@/components/ui/badge";
import type { Vocabulary } from "@/types";

interface VocabularyListProps {
  vocabularies: Vocabulary[];
}

export function VocabularyList({ vocabularies }: VocabularyListProps) {
  const [search, setSearch] = useState("");

  const filteredVocabularies = vocabularies.filter((vocab) =>
    vocab.word.toLowerCase().includes(search.toLowerCase())
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
            <TableHead>Word</TableHead>
            <TableHead>Definition</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Difficulty</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredVocabularies.map((vocab) => (
            <TableRow key={vocab.id}>
              <TableCell className="font-medium">{vocab.word}</TableCell>
              <TableCell>{vocab.definition}</TableCell>
              <TableCell>{vocab.category}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    vocab.difficulty === "beginner"
                      ? "default"
                      : vocab.difficulty === "intermediate"
                      ? "secondary"
                      : "destructive"
                  }
                >
                  {vocab.difficulty}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}