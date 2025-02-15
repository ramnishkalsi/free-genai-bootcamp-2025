package utils

import (
	"testing"
)

func TestLoadKanjiWords(t *testing.T) {
	words, err := LoadKanjiWords("../data/kanji_words.json")
	if err != nil {
		t.Errorf("Failed to load kanji words: %v", err)
	}

	if len(words) != 50 {
		t.Errorf("Expected 50 words, got %d", len(words))
	}

	// Test first word
	if words[0].Kanji != "水" {
		t.Errorf("Expected first kanji to be 水, got %s", words[0].Kanji)
	}
}