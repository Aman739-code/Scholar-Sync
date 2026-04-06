# Entity-Relationship Diagram — ScholarSync LMS

## Database: MongoDB (Document-Oriented)

The ER diagram below represents the logical data model. While MongoDB is schema-less, Mongoose schemas will enforce this structure.

---

## Complete ER Diagram

```mermaid
erDiagram
    USER {
        ObjectId _id PK
        String name
        String email UK
        String passwordHash
        String profileImage
        String role "student | instructor | admin"
        Date createdAt
        Date updatedAt
    }

    STUDENT_PROFILE {
        ObjectId _id PK
        ObjectId userId FK
        String studentId UK
        String department
        Int year
        Float gpa
        String rank
    }

    INSTRUCTOR_PROFILE {
        ObjectId _id PK
        ObjectId userId FK
        String facultyId UK
        String department
        String specialization
        String bio
    }

    COURSE {
        ObjectId _id PK
        String title
        String code UK
        String description
        ObjectId instructorId FK
        String bannerImage
        Int units
        String semester
        String schedule
        String track
        Int maxCapacity
        Date createdAt
    }

    MODULE {
        ObjectId _id PK
        ObjectId courseId FK
        String title
        Int orderIndex
        String duration
        String status "completed | current | upcoming"
        String[] contentUrls
    }

    ENROLLMENT {
        ObjectId _id PK
        ObjectId studentId FK
        ObjectId courseId FK
        Date enrolledDate
        Float progress
        String status "active | completed | dropped"
        ObjectId[] completedModules
    }

    ANNOUNCEMENT {
        ObjectId _id PK
        ObjectId courseId FK
        ObjectId postedBy FK
        String text
        Date postedDate
    }

    ASSIGNMENT {
        ObjectId _id PK
        ObjectId courseId FK
        String title
        String description
        String type "lab | quiz | project | reflection"
        Date deadline
        Int points
        String status "available | due_soon | urgent"
        String[] requirements
        String instructorNote
    }

    RUBRIC_CRITERIA {
        ObjectId _id PK
        ObjectId assignmentId FK
        String criteria
        Float weight
        String description
    }

    ASSIGNMENT_RESOURCE {
        ObjectId _id PK
        ObjectId assignmentId FK
        String name
        String type
        String url
    }

    SUBMISSION {
        ObjectId _id PK
        ObjectId assignmentId FK
        ObjectId studentId FK
        String note
        Date submittedAt
        String status "draft | submitted | late | graded"
    }

    FILE_ATTACHMENT {
        ObjectId _id PK
        ObjectId submissionId FK
        String filename
        String mimetype
        Int sizeBytes
        String url
        Date uploadedAt
    }

    GRADE {
        ObjectId _id PK
        ObjectId studentId FK
        ObjectId courseId FK
        ObjectId assignmentId FK
        ObjectId submissionId FK
        Float score
        Float maxScore
        String letterGrade
        String feedback
        ObjectId gradedBy FK
        Date gradedAt
    }

    LIBRARY_RESOURCE {
        ObjectId _id PK
        String title
        String author
        String year
        String type "textbook | journal | video_lecture"
        String category
        String description
        String coverImage
        String isbn
        String issn
        String publisher
        String series
        Int pages
        String duration
        String resolution
        Boolean hasTranscript
        Date addedDate
    }

    RESOURCE_CHAPTER {
        ObjectId _id PK
        ObjectId resourceId FK
        String title
        String pages
        String timestamp
        Int orderIndex
    }

    READING_PROGRESS {
        ObjectId _id PK
        ObjectId userId FK
        ObjectId resourceId FK
        Int currentPage
        String currentTime
        Date lastAccessed
    }

    SAVED_COLLECTION {
        ObjectId _id PK
        ObjectId userId FK
        ObjectId[] resourceIds
        Date createdAt
    }

    NOTIFICATION {
        ObjectId _id PK
        ObjectId userId FK
        String type "deadline | grade | announcement | enrollment"
        String message
        Boolean isRead
        ObjectId referenceId
        String referenceType
        Date createdAt
    }

    WEEKLY_SCHEDULE {
        ObjectId _id PK
        ObjectId studentId FK
        ObjectId courseId FK
        String dayOfWeek
        String startTime
        String endTime
        String semester
    }

    %% ============ RELATIONSHIPS ============
    USER ||--o| STUDENT_PROFILE : "has"
    USER ||--o| INSTRUCTOR_PROFILE : "has"

    INSTRUCTOR_PROFILE ||--o{ COURSE : "teaches"
    COURSE ||--|{ MODULE : "contains"
    COURSE ||--o{ ANNOUNCEMENT : "has"
    COURSE ||--o{ ASSIGNMENT : "includes"

    USER ||--o{ ENROLLMENT : "enrolls"
    COURSE ||--o{ ENROLLMENT : "has"

    ASSIGNMENT ||--|{ RUBRIC_CRITERIA : "defines"
    ASSIGNMENT ||--o{ ASSIGNMENT_RESOURCE : "provides"
    ASSIGNMENT ||--o{ SUBMISSION : "receives"

    USER ||--o{ SUBMISSION : "submits"
    SUBMISSION ||--o{ FILE_ATTACHMENT : "contains"
    SUBMISSION ||--o| GRADE : "receives"

    USER ||--o{ GRADE : "earns"
    COURSE ||--o{ GRADE : "for"
    USER ||--o{ GRADE : "grades"

    LIBRARY_RESOURCE ||--o{ RESOURCE_CHAPTER : "has"
    USER ||--o{ READING_PROGRESS : "tracks"
    LIBRARY_RESOURCE ||--o{ READING_PROGRESS : "tracked_in"

    USER ||--o| SAVED_COLLECTION : "owns"
    SAVED_COLLECTION }o--o{ LIBRARY_RESOURCE : "contains"

    USER ||--o{ NOTIFICATION : "receives"
    USER ||--o{ WEEKLY_SCHEDULE : "has"
    COURSE ||--o{ WEEKLY_SCHEDULE : "scheduled_in"
```

---

## Cardinality Summary

| Relationship | Cardinality | Description |
|---|---|---|
| User → Student Profile | 1:0..1 | A user may optionally be a student |
| User → Instructor Profile | 1:0..1 | A user may optionally be an instructor |
| Instructor → Courses | 1:N | One instructor teaches many courses |
| Course → Modules | 1:N | One course has many modules |
| Course → Assignments | 1:N | One course has many assignments |
| Student → Enrollments | 1:N | One student enrolls in many courses |
| Assignment → Submissions | 1:N | One assignment receives many submissions |
| Submission → Grade | 1:0..1 | One submission may receive one grade |
| Submission → Files | 1:N | One submission has many file attachments |
| Assignment → Rubric Criteria | 1:N | One assignment defines multiple rubric criteria |
| Library Resource → Chapters | 1:N | One resource has many chapters |
| User → Reading Progress | 1:N | One user tracks progress on many resources |
| User → Saved Collection | 1:1 | One user has one saved collection |
| Saved Collection → Resources | N:M | Many-to-many between collections and resources |

---

## Indexing Strategy

| Collection | Index Fields | Type | Purpose |
|---|---|---|---|
| `users` | `email` | Unique | Fast login lookup |
| `student_profiles` | `studentId` | Unique | Student ID lookup |
| `courses` | `code` | Unique | Course code lookup |
| `courses` | `track`, `semester` | Compound | Filter by track |
| `enrollments` | `studentId`, `courseId` | Compound Unique | Prevent duplicate enrollment |
| `assignments` | `courseId`, `deadline` | Compound | List assignments by deadline |
| `submissions` | `assignmentId`, `studentId` | Compound | Find student's submission |
| `grades` | `studentId`, `courseId` | Compound | Calculate course grade |
| `library_resources` | `title`, `author`, `category` | Text | Full-text search |
| `reading_progress` | `userId`, `resourceId` | Compound Unique | One progress per user-resource |
| `notifications` | `userId`, `isRead` | Compound | Unread notifications |
