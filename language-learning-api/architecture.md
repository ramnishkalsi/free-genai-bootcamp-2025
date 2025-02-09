# Language Learning API - ArchiMate Diagram

## Application Layer

### Application Components
- [Application Component] Gin Web Server
- [Application Component] GORM Database Layer
- [Application Component] SQLite Database

### Application Services
- [Application Service] Word Management Service
- [Application Service] Group Management Service
- [Application Service] Study Session Service
- [Application Service] User Progress Service

### Application Interfaces
- [Application Interface] REST API Interface
  - GET /words
  - GET /groups
  - GET /groups/:id
  - POST /study_sessions
  - POST /study_sessions/:id/review

## Technology Layer

### Technology Services
- [Technology Service] SQLite Data Storage Service
- [Technology Service] HTTP Service

### System Software
- [System Software] Go Runtime
- [System Software] SQLite Engine

## Data Objects

### Business Objects
- [Business Object] Word
  - Kanji
  - Romaji
  - English
  - Parts

- [Business Object] Group
  - Name
  - WordsCount
  - Words (relation)

- [Business Object] User
  - Username
  - Email

- [Business Object] Language
  - Name
  - Code
  - Description

- [Business Object] UserProgress
  - Level
  - XP

## Relationships

### Serving Relationships
- REST API Interface serves Word Management Service
- REST API Interface serves Group Management Service
- REST API Interface serves Study Session Service
- REST API Interface serves User Progress Service

### Access Relationships
- GORM Database Layer accesses SQLite Database
- Application Services access GORM Database Layer

### Realization Relationships
- Gin Web Server realizes REST API Interface
- GORM Database Layer realizes Data Access Interface

### Composition Relationships
- Language Learning API composes:
  - Word Management Service
  - Group Management Service
  - Study Session Service
  - User Progress Service

### Flow Relationships
- HTTP Request → REST API Interface → Application Services → GORM → SQLite 

+----------------------------------------------------------------------------------------+
|                                   Application Layer                                      |
|  +----------------+        +-------------------+         +----------------------+        |
|  |   Gin Server   | -----> |    REST API      | ------> |  Application Services|        |
|  +----------------+        +-------------------+         +----------------------+        |
|          ↑                         ↑                              ↑                      |
|          |                         |                              |                      |
|          +-------------------------+------------------------------+                      |
|                                   |                                                     |
|                                   v                                                     |
|                            +-----------+                                               |
|                            |   GORM    |                                               |
|                            +-----------+                                               |
+----------------------------------------------------------------------------------------+
                                   |
                                   v
+----------------------------------------------------------------------------------------+
|                                Technology Layer                                          |
|                            +---------------+                                             |
|                            |    SQLite     |                                            |
|                            +---------------+                                             |
+----------------------------------------------------------------------------------------+ 