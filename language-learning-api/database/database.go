package database

import (
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
	"language-learning-api/models"
)

func InitDB() *gorm.DB {
	db, err := gorm.Open(sqlite.Open("learning.db"), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}
	
	// Auto Migrate the schemas
	db.AutoMigrate(
		&models.Word{},
		&models.Group{},
		&models.WordGroup{},
		&models.StudyActivity{},
		&models.StudySession{},
		&models.WordReviewItem{},
		&models.User{},
		&models.Language{},
		&models.UserProgress{},
	)

	// Populate with sample data if the database is empty
	var wordCount int64
	db.Model(&models.Word{}).Count(&wordCount)
	if wordCount == 0 {
		populateSampleData(db)
	}
	
	return db
}

func populateSampleData(db *gorm.DB) {
	// Create sample words
	words := []models.Word{
		{Kanji: "水", Romaji: "mizu", English: "water", Parts: `["氵", "水"]`},
		{Kanji: "火", Romaji: "hi", English: "fire", Parts: `["火"]`},
		{Kanji: "木", Romaji: "ki", English: "tree", Parts: `["木"]`},
		{Kanji: "山", Romaji: "yama", English: "mountain", Parts: `["山"]`},
		{Kanji: "川", Romaji: "kawa", English: "river", Parts: `["川"]`},
	}
	db.Create(&words)

	// Create sample groups
	groups := []models.Group{
		{Name: "Nature Elements", WordsCount: 3},
		{Name: "Landscape", WordsCount: 2},
	}
	db.Create(&groups)

	// Associate words with groups
	natureGroup := groups[0]
	landscapeGroup := groups[1]

	// Add words to nature elements group
	db.Model(&natureGroup).Association("Words").Append(&words[0], &words[1], &words[2])

	// Add words to landscape group
	db.Model(&landscapeGroup).Association("Words").Append(&words[3], &words[4])

	// Create sample study activities
	activities := []models.StudyActivity{
		{Name: "Flashcards", URL: "/study/flashcards"},
		{Name: "Writing Practice", URL: "/study/writing"},
		{Name: "Quiz", URL: "/study/quiz"},
	}
	db.Create(&activities)

	// Create sample users
	users := []models.User{
		{Username: "john_doe", Email: "john@example.com"},
		{Username: "jane_smith", Email: "jane@example.com"},
	}
	db.Create(&users)

	// Create sample languages
	languages := []models.Language{
		{Name: "Japanese", Code: "ja", Description: "Japanese language course"},
		{Name: "English", Code: "en", Description: "English language course"},
	}
	db.Create(&languages)

	// Create sample user progress
	progress := []models.UserProgress{
		{UserID: users[0].ID, LanguageID: languages[0].ID, Level: 2, XP: 150},
		{UserID: users[1].ID, LanguageID: languages[0].ID, Level: 1, XP: 75},
	}
	db.Create(&progress)

	// Create some sample study sessions
	sessions := []models.StudySession{
		{GroupID: groups[0].ID, StudyActivityID: activities[0].ID},
		{GroupID: groups[1].ID, StudyActivityID: activities[1].ID},
	}
	db.Create(&sessions)

	// Create some sample word reviews
	reviews := []models.WordReviewItem{
		{WordID: words[0].ID, StudySessionID: sessions[0].ID, Correct: true},
		{WordID: words[1].ID, StudySessionID: sessions[0].ID, Correct: false},
		{WordID: words[3].ID, StudySessionID: sessions[1].ID, Correct: true},
	}
	db.Create(&reviews)
} 