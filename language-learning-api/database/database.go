package database

import (
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
	"language-learning-api/models"
	"language-learning-api/utils"
	"log"
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
		groups, words, err := utils.LoadKanjiGroups("data/kanji_groups.json")
		if err != nil {
			log.Printf("Error loading kanji groups: %v", err)
			populateSampleData(db) // Fallback to hardcoded data if JSON fails
		} else {
			// Begin transaction
			tx := db.Begin()

			// Create all words first
			if result := tx.Create(&words); result.Error != nil {
				tx.Rollback()
				log.Printf("Error creating words: %v", result.Error)
				populateSampleData(db)
				return db
			}

			// Create all groups
			if result := tx.Create(&groups); result.Error != nil {
				tx.Rollback()
				log.Printf("Error creating groups: %v", result.Error)
				populateSampleData(db)
				return db
			}

			// Associate words with their groups
			for i, group := range groups {
				startIdx := i * 5 // Each group has 5 words
				endIdx := startIdx + 5
				groupWords := words[startIdx:endIdx]
				
				if err := tx.Model(&group).Association("Words").Append(&groupWords); err != nil {
					tx.Rollback()
					log.Printf("Error associating words with group: %v", err)
					populateSampleData(db)
					return db
				}
			}

			// Commit transaction
			if err := tx.Commit().Error; err != nil {
				tx.Rollback()
				log.Printf("Error committing transaction: %v", err)
				populateSampleData(db)
				return db
			}

			// Create other sample data
			createSampleData(db)
		}
	}
	
	return db
}

func populateSampleData(db *gorm.DB) {
	// Create sample words
	words := []models.Word{
		{Kanji: "水", Romaji: "mizu", English: "water", Parts: []string{"氵", "水"}},
		{Kanji: "火", Romaji: "hi", English: "fire", Parts: []string{"火"}},
		{Kanji: "木", Romaji: "ki", English: "tree", Parts: []string{"木"}},
		{Kanji: "山", Romaji: "yama", English: "mountain", Parts: []string{"山"}},
		{Kanji: "川", Romaji: "kawa", English: "river", Parts: []string{"川"}},
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

// New function to create additional sample data
func createSampleData(db *gorm.DB) {
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
} 