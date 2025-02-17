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
  const filteredVocabularies = vocabularies;

  return (
    <div className="space-y-4">
      {/* <Input
        placeholder="Search vocabulary..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="max-w-sm"
      /> */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Group</TableHead>
            <TableHead>Kanji</TableHead>
            <TableHead>Romaji</TableHead>
            <TableHead>English</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredVocabularies.flatMap((vocab) =>
            vocab.Words?.map((word) => (
              <TableRow key={`${vocab.ID}-${word.ID}`}>
                <TableCell className="font-medium">{vocab.Name}</TableCell>
                <TableCell>{word.Kanji}</TableCell>
                <TableCell>{word.Romaji}</TableCell>
                <TableCell>{word.English}</TableCell>
              </TableRow>
            )) || []
          )}
        </TableBody>
      </Table>
    </div>
  );
}