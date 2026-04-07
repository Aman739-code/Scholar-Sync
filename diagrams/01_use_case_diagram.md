# Use Case Diagram — ScholarSync LMS

## Overview
This diagram captures all actor-system interactions identified from the UI analysis.

### Actors
- **Student** — Primary user who enrolls in courses, submits assignments, views grades, and uses the library
- **Instructor** — Creates courses, assignments, provides feedback and grades
- **Admin** — Manages platform, users, and system-wide settings
- **System** — Automated processes like deadline notifications, GPA calculation

---

## Main Use Case Diagram

```mermaid
graph TB
    subgraph Actors
        S[👤 Student]
        I[👨‍🏫 Instructor]
        A[🔧 Admin]
        SYS[⚙️ System]
    end

    subgraph "Authentication Module"
        UC1[Login with Email/Student ID]
        UC2[Signup with University Email]
        UC3[SSO Login - Google/Outlook]
        UC4[Forgot Password]
        UC5[Logout]
    end

    subgraph "Course Management Module"
        UC6[Browse Course Catalog]
        UC7[Search Courses]
        UC8[Filter Courses by Track]
        UC9[View Course Details]
        UC10[Enroll in Course]
        UC11[Track Course Progress]
        UC12[View Course Modules]
        UC13[View Course Announcements]
        UC14[Create Course]
        UC15[Update Course Content]
        UC16[Post Announcement]
    end

    subgraph "Assignment Module"
        UC17[View Assignments List]
        UC18[Filter Assignments by Status]
        UC19[View Assignment Details]
        UC20[Submit Assignment]
        UC21[Save Assignment Draft]
        UC22[Upload Submission Files]
        UC23[View Assignment Rubric]
        UC24[Create Assignment]
        UC25[Set Assignment Deadline]
        UC26[View Submissions]
    end

    subgraph "Grading Module"
        UC27[View Grades Overview]
        UC28[View GPA and Rank]
        UC29[View Grade Distribution]
        UC30[View Course Grade Breakdown]
        UC31[View Instructor Feedback]
        UC32[Grade Assignment]
        UC33[Provide Feedback]
        UC34[Calculate GPA]
    end

    subgraph "Library Module"
        UC35[Browse Library Resources]
        UC36[Search Resources]
        UC37[Filter Resources by Type]
        UC38[View Resource Details]
        UC39[Track Reading Progress]
        UC40[Save to Collection]
        UC41[Download Resource]
        UC42[Watch Video Lecture]
        UC43[Add Library Resource]
    end

    subgraph "Dashboard Module"
        UC44[View Dashboard Overview]
        UC45[View Enrolled Courses Summary]
        UC46[View Upcoming Assignments]
        UC47[View Recent Grades]
        UC48[View Weekly Schedule]
    end

    subgraph "Notification Module"
        UC49[Send Deadline Reminder]
        UC50[Send Grade Notification]
        UC51[Send Announcement Notification]
    end

    %% Student connections
    S --> UC1
    S --> UC2
    S --> UC3
    S --> UC4
    S --> UC5
    S --> UC6
    S --> UC7
    S --> UC8
    S --> UC9
    S --> UC10
    S --> UC11
    S --> UC12
    S --> UC13
    S --> UC17
    S --> UC18
    S --> UC19
    S --> UC20
    S --> UC21
    S --> UC22
    S --> UC23
    S --> UC27
    S --> UC28
    S --> UC29
    S --> UC30
    S --> UC31
    S --> UC35
    S --> UC36
    S --> UC37
    S --> UC38
    S --> UC39
    S --> UC40
    S --> UC41
    S --> UC42
    S --> UC44
    S --> UC45
    S --> UC46
    S --> UC47
    S --> UC48

    %% Instructor connections
    I --> UC1
    I --> UC5
    I --> UC14
    I --> UC15
    I --> UC16
    I --> UC24
    I --> UC25
    I --> UC26
    I --> UC32
    I --> UC33
    I --> UC43

    %% Admin connections
    A --> UC1
    A --> UC5
    A --> UC43

    %% System connections
    SYS --> UC34
    SYS --> UC49
    SYS --> UC50
    SYS --> UC51
```

---

## Detailed Use Case Descriptions

### UC1: Login with Email/Student ID
| Field | Description |
|-------|-------------|
| **Actor** | Student, Instructor, Admin |
| **Precondition** | User has a registered account |
| **Main Flow** | 1. User enters email/student ID and password 2. System validates credentials 3. System redirects to Dashboard |
| **Alternate Flow** | Invalid credentials → show error message |
| **Postcondition** | User is authenticated and has a valid session |

### UC10: Enroll in Course
| Field | Description |
|-------|-------------|
| **Actor** | Student |
| **Precondition** | Student is logged in, course exists and has capacity |
| **Main Flow** | 1. Student browses catalog 2. Selects a course 3. Clicks enroll 4. System adds enrollment record 5. Course appears in student's dashboard |
| **Alternate Flow** | Prerequisites not met → show error |
| **Postcondition** | Student is enrolled, progress initialized to 0% |

### UC20: Submit Assignment
| Field | Description |
|-------|-------------|
| **Actor** | Student |
| **Precondition** | Student is enrolled in the course, assignment is not past deadline |
| **Main Flow** | 1. Student opens assignment detail 2. Uploads file(s) 3. Optionally adds a note 4. Clicks submit 5. System records submission with timestamp |
| **Alternate Flow** | Past deadline → late penalty applied or rejected |
| **Postcondition** | Submission is recorded, status changes to "Submitted" |

### UC32: Grade Assignment
| Field | Description |
|-------|-------------|
| **Actor** | Instructor |
| **Precondition** | Student has submitted the assignment |
| **Main Flow** | 1. Instructor views submissions 2. Reviews student work 3. Assigns grade per rubric criteria 4. Writes feedback 5. Publishes grade |
| **Postcondition** | Grade and feedback visible to student, GPA recalculated |

