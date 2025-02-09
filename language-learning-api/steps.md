# Language Learning API in Golang

## Introduction
This document provides a step-by-step guide to implementing the backend API for a language learning portal using Golang and SQLite3.

## Prerequisites
- Install Golang: [https://golang.org/dl/](https://golang.org/dl/)
- Install SQLite3: [https://www.sqlite.org/download.html](https://www.sqlite.org/download.html)
- Install `gorm` package: `go get gorm.io/gorm gorm.io/driver/sqlite`
- Install `gin` framework: `go get github.com/gin-gonic/gin`

## Step 1: Setup Project
Create a new directory and initialize a Go module:
```sh
mkdir language-learning-api && cd language-learning-api
go mod init language-learning-api
```

## Step 2: Install Dependencies
```sh
go get gorm.io/gorm gorm.io/driver/sqlite github.com/gin-gonic/gin
```

## Step 3: Define Database Schema
Create a file `models.go` and define database models:
```go
package main

import (
    "gorm.io/driver/sqlite"
    "gorm.io/gorm"
    "time"
)

type Word struct {
    ID       uint   `gorm:"primaryKey"`
    Kanji    string `gorm:"not null"`
    Romaji   string `gorm:"not null"`
    English  string `gorm:"not null"`
    Parts    string `gorm:"type:json"`
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
    ID             uint      `gorm:"primaryKey"`
    GroupID        uint      `gorm:"not null"`
    StudyActivityID uint     `gorm:"not null"`
    CreatedAt      time.Time `gorm:"autoCreateTime"`
}

type WordReviewItem struct {
    ID            uint      `gorm:"primaryKey"`
    WordID        uint      `gorm:"not null"`
    StudySessionID uint     `gorm:"not null"`
    Correct       bool      `gorm:"not null"`
    CreatedAt     time.Time `gorm:"autoCreateTime"`
}

func InitDB() *gorm.DB {
    db, err := gorm.Open(sqlite.Open("learning.db"), &gorm.Config{})
    if err != nil {
        panic("failed to connect database")
    }
    db.AutoMigrate(&Word{}, &Group{}, &WordGroup{}, &StudyActivity{}, &StudySession{}, &WordReviewItem{})
    return db
}
```

## Step 4: Implement API Routes
Create `main.go` file:
```go
package main

import (
    "github.com/gin-gonic/gin"
    "gorm.io/gorm"
    "strconv"
)

var db *gorm.DB

func main() {
    db = InitDB()
    r := gin.Default()

    r.GET("/words", GetWords)
    r.GET("/groups", GetGroups)
    r.GET("/groups/:id", GetGroupWords)
    r.POST("/study_sessions", CreateStudySession)
    r.POST("/study_sessions/:id/review", ReviewWord)

    r.Run(":8080")
}
```

### Get Words
```go
func GetWords(c *gin.Context) {
    var words []Word
    db.Find(&words)
    c.JSON(200, words)
}
```

### Get Groups
```go
func GetGroups(c *gin.Context) {
    var groups []Group
    db.Find(&groups)
    c.JSON(200, groups)
}
```

### Get Words by Group
```go
func GetGroupWords(c *gin.Context) {
    var group Group
    id, _ := strconv.Atoi(c.Param("id"))
    db.Preload("Words").First(&group, id)
    c.JSON(200, group.Words)
}
```

### Create Study Session
```go
func CreateStudySession(c *gin.Context) {
    var session StudySession
    if err := c.ShouldBindJSON(&session); err != nil {
        c.JSON(400, gin.H{"error": err.Error()})
        return
    }
    db.Create(&session)
    c.JSON(201, session)
}
```

### Log Review Attempt
```go
func ReviewWord(c *gin.Context) {
    var review WordReviewItem
    if err := c.ShouldBindJSON(&review); err != nil {
        c.JSON(400, gin.H{"error": err.Error()})
        return
    }
    db.Create(&review)
    c.JSON(201, review)
}
```

## Step 5: Run the API
```sh
go run main.go
```
The API will be available at `http://localhost:8080`.

## Conclusion
This document provides a simple and extendable backend implementation for the language learning portal using Golang and SQLite3. Further improvements can include authentication, caching, and enhanced error handling.
