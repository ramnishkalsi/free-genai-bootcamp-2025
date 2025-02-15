package models

import (
	"database/sql/driver"
	"encoding/json"
	"time"
	"gorm.io/gorm"
)

type StringArray []string

func (a *StringArray) Scan(value interface{}) error {
	return json.Unmarshal(value.([]byte), a)
}

func (a StringArray) Value() (driver.Value, error) {
	return json.Marshal(a)
}

type Word struct {
	ID      uint       `gorm:"primaryKey"`
	Kanji   string     `gorm:"not null"`
	Romaji  string     `gorm:"not null"`
	English string     `gorm:"not null"`
	Parts   StringArray `gorm:"type:text" json:"parts"`
}

type Group struct {
	ID         uint   `gorm:"primaryKey"`
	Name       string `gorm:"not null"`
	WordsCount int    `gorm:"default:0"`
	Words      []Word `gorm:"many2many:word_groups;"`
}

type WordGroup struct {
	WordID  uint `gorm:"primaryKey"`
	GroupID uint `gorm:"primaryKey"`
}

type StudyActivity struct {
	ID   uint   `gorm:"primaryKey"`
	Name string `gorm:"not null"`
	URL  string `gorm:"not null"`
}

type StudySession struct {
	ID              uint      `gorm:"primaryKey"`
	GroupID         uint      `gorm:"not null"`
	StudyActivityID uint      `gorm:"not null"`
	CreatedAt       time.Time `gorm:"autoCreateTime"`
}

type WordReviewItem struct {
	ID             uint      `gorm:"primaryKey"`
	WordID         uint      `gorm:"not null"`
	StudySessionID uint      `gorm:"not null"`
	Correct        bool      `gorm:"not null"`
	CreatedAt      time.Time `gorm:"autoCreateTime"`
}

// User represents a language learner
type User struct {
	gorm.Model
	Username string `json:"username" gorm:"unique"`
	Email    string `json:"email" gorm:"unique"`
}

// Language represents a language that can be learned
type Language struct {
	gorm.Model
	Name        string `json:"name" gorm:"unique"`
	Code        string `json:"code" gorm:"unique"` // e.g., "en" for English, "es" for Spanish
	Description string `json:"description"`
}

// UserProgress tracks a user's progress in a language
type UserProgress struct {
	gorm.Model
	UserID     uint     `json:"user_id"`
	User       User     `json:"user" gorm:"foreignKey:UserID"`
	LanguageID uint     `json:"language_id"`
	Language   Language `json:"language" gorm:"foreignKey:LanguageID"`
	Level      int      `json:"level" gorm:"default:1"`
	XP         int      `json:"xp" gorm:"default:0"`
} 