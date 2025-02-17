package main

import (
    "github.com/gin-gonic/gin"
    "language-learning-api/database"
    "language-learning-api/models"
    "strconv"
)

var db = database.InitDB()

func main() {
    r := gin.Default()

    // Add CORS middleware
    r.Use(func(c *gin.Context) {
        c.Writer.Header().Set("Access-Control-Allow-Origin", "http://localhost:5173")
        c.Writer.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
        c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")
        c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
        
        if c.Request.Method == "OPTIONS" {
            c.AbortWithStatus(204)
            return
        }
        
        c.Next()
    })

    // Define routes
    r.GET("/words", GetWords)
    r.GET("/groups", GetGroups)
    r.GET("/groups/:id", GetGroupWords)

    r.GET("/study_sessions", GetStudySessions)
    r.GET("/study_sessions/:id", GetStudySession)
    r.POST("/study_sessions", CreateStudySession)
    r.POST("/study_sessions/:id/review", ReviewWord)
    r.DELETE("/study_sessions/reset", ResetStudySessions)

    r.Run(":8080")
}

// GetWords returns all words
func GetWords(c *gin.Context) {
    var words []models.Word
    db.Find(&words)
    c.JSON(200, words)
}

func GetStudySession(c *gin.Context) {
    var session models.StudySession
    id := c.Param("id")
    db.First(&session, id)
    c.JSON(200, session)
}

// GetStudySessions returns all study sessions
func GetStudySessions(c *gin.Context) {
    var sessions []models.StudySession
    db.Find(&sessions)
    c.JSON(200, sessions)
}
// GetGroups returns all groups with their associated words
func GetGroups(c *gin.Context) {
    var groups []models.Group
    // Preload the Words relationship for all groups
    db.Preload("Words").Find(&groups)
    c.JSON(200, groups)
}

// GetGroupWords returns all words in a specific group
func GetGroupWords(c *gin.Context) {
    var group models.Group
    id, err := strconv.Atoi(c.Param("id"))
    if err != nil {
        c.JSON(400, gin.H{"error": "Invalid group ID"})
        return
    }
    
    result := db.Preload("Words").First(&group, id)
    if result.Error != nil {
        c.JSON(404, gin.H{"error": "Group not found"})
        return
    }
    
    c.JSON(200, group.Words)
}

// CreateStudySession creates a new study session
func CreateStudySession(c *gin.Context) {
    var session models.StudySession
    if err := c.ShouldBindJSON(&session); err != nil {
        c.JSON(400, gin.H{"error": err.Error()})
        return
    }
    
    result := db.Create(&session)
    if result.Error != nil {
        c.JSON(400, gin.H{"error": result.Error.Error()})
        return
    }
    
    c.JSON(201, session)
}

// ReviewWord logs a word review attempt
func ReviewWord(c *gin.Context) {
    var review models.WordReviewItem
    if err := c.ShouldBindJSON(&review); err != nil {
        c.JSON(400, gin.H{"error": err.Error()})
        return
    }
    
    result := db.Create(&review)
    if result.Error != nil {
        c.JSON(400, gin.H{"error": result.Error.Error()})
        return
    }
    
    c.JSON(201, review)
}

// ResetStudySessions deletes all study sessions and their associated reviews
func ResetStudySessions(c *gin.Context) {
    // Begin transaction
    tx := db.Begin()

    // Delete all word reviews first (due to foreign key constraint)
    if err := tx.Exec("DELETE FROM word_review_items").Error; err != nil {
        tx.Rollback()
        c.JSON(500, gin.H{"error": "Failed to delete word reviews"})
        return
    }

    // Delete all study sessions
    if err := tx.Exec("DELETE FROM study_sessions").Error; err != nil {
        tx.Rollback()
        c.JSON(500, gin.H{"error": "Failed to delete study sessions"})
        return
    }

    // Reset auto-increment counters
    if err := tx.Exec("UPDATE sqlite_sequence SET seq = 0 WHERE name IN ('study_sessions', 'word_review_items')").Error; err != nil {
        tx.Rollback()
        c.JSON(500, gin.H{"error": "Failed to reset auto-increment"})
        return
    }

    // Commit transaction
    if err := tx.Commit().Error; err != nil {
        tx.Rollback()
        c.JSON(500, gin.H{"error": "Failed to commit transaction"})
        return
    }

    c.JSON(200, gin.H{
        "message": "Successfully reset all study sessions and reviews",
    })
}