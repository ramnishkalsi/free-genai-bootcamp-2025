# Language Learning API

A RESTful API built with Go (Golang) for a language learning platform. This API provides endpoints for managing words, study groups, user progress, and learning activities.

## Features

- Word management with kanji, romaji, and English translations
- Word grouping system
- Study session tracking
- User progress monitoring
- Multiple study activities support
- SQLite database with GORM

## Prerequisites

- Go 1.x or higher
- SQLite3
- GORM
- Gin Web Framework

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd language-learning-api
```

2. Install dependencies:
```bash
go mod tidy
```

## Running the Application

1. Start the server:
```bash
go run main.go
```

The server will start on `http://localhost:8080`

## API Endpoints

### Words
- `GET /words` - Get all words
- `GET /groups` - Get all word groups
- `GET /groups/:id` - Get words in a specific group

### Study Sessions
- `POST /study_sessions` - Create a new study session
- `POST /study_sessions/:id/review` - Submit a word review

## Database Schema

### Word
- ID (uint)
- Kanji (string)
- Romaji (string)
- English (string)
- Parts (JSON string)

### Group
- ID (uint)
- Name (string)
- WordsCount (int)
- Words (many-to-many relationship)

### User
- ID (uint)
- Username (string)
- Email (string)

### Language
- ID (uint)
- Name (string)
- Code (string)
- Description (string)

### UserProgress
- ID (uint)
- UserID (uint)
- LanguageID (uint)
- Level (int)
- XP (int)

## Sample API Requests

### Get All Words
```bash
curl http://localhost:8080/words
```

### Get All Groups
```bash
curl http://localhost:8080/groups
```

### Get Words in a Group
```bash
curl http://localhost:8080/groups/1
```

### Create Study Session
```bash
curl -X POST http://localhost:8080/study_sessions \
  -H "Content-Type: application/json" \
  -d '{"group_id": 1, "study_activity_id": 1}'
```

### Submit Word Review
```bash
curl -X POST http://localhost:8080/study_sessions/1/review \
  -H "Content-Type: application/json" \
  -d '{"word_id": 1, "study_session_id": 1, "correct": true}'
```

## Development

The project uses:
- [Gin](https://github.com/gin-gonic/gin) for HTTP routing
- [GORM](https://gorm.io) for database operations
- SQLite for data storage

## Project Structure

```
language-learning-api/
├── main.go           # Application entry point and route definitions
├── models/
│   └── models.go     # Database models
├── database/
│   └── database.go   # Database configuration and initialization
└── README.md
```

## Sample Data

The application automatically populates the database with sample data on first run, including:
- Japanese words with kanji
- Study groups
- Study activities
- Sample users
- Language courses
- User progress records

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details 