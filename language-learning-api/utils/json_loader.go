package utils

import (
    "encoding/json"
    "io/ioutil"
    "language-learning-api/models"
)

type WordList struct {
    Words []models.Word `json:"words"`
}

type GroupList struct {
    Groups []struct {
        ID         uint         `json:"ID"`
        Name       string       `json:"Name"`
        WordsCount int          `json:"WordsCount"`
        Words      []models.Word `json:"Words"`
    } `json:"groups"`
}

func LoadKanjiWords(filename string) ([]models.Word, error) {
    // Read the JSON file
    data, err := ioutil.ReadFile(filename)
    if err != nil {
        return nil, err
    }

    // Parse JSON into struct
    var wordList WordList
    err = json.Unmarshal(data, &wordList)
    if err != nil {
        return nil, err
    }

    return wordList.Words, nil
} 

func LoadKanjiGroups(filename string) ([]models.Group, []models.Word, error) {
    // Read the JSON file
    data, err := ioutil.ReadFile(filename)
    if err != nil {
        return nil, nil, err
    }

    // Parse JSON into struct
    var groupList GroupList
    err = json.Unmarshal(data, &groupList)
    if err != nil {
        return nil, nil, err
    }

    // Create separate slices for groups and words
    groups := make([]models.Group, len(groupList.Groups))
    var allWords []models.Word

    // Process each group
    for i, g := range groupList.Groups {
        groups[i] = models.Group{
            ID: g.ID,
            Name: g.Name,
            WordsCount: g.WordsCount,
        }
        allWords = append(allWords, g.Words...)
    }

    return groups, allWords, nil
}

