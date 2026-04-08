# Data Flow Diagrams — ScholarSync LMS

## Overview
Data Flow Diagrams (DFDs) show how data moves through the system at different levels of abstraction.

---

## Level 0 — Context Diagram

```mermaid
graph LR
    S([👤 Student]) -->|Login credentials, enrollment requests,\nassignment submissions, search queries| SYS{ScholarSync\nLMS}
    I([👨‍🏫 Instructor]) -->|Course content, assignments,\ngrades, feedback, announcements| SYS
    A([🔧 Admin]) -->|User management,\nresource uploads, config| SYS

    SYS -->|Dashboard data, grades, notifications,\ncourse content, library resources| S
    SYS -->|Submission list, analytics,\nclass roster| I
    SYS -->|System reports,\nuser analytics| A

    SYS <-->|User data, course data,\ngrades, resources| DB[(MongoDB\nDatabase)]
    SYS <-->|Files, images,\nvideo assets| FS[(File\nStorage)]
    SYS -->|Notification emails| EMAIL[📧 Email\nService]
    SYS <-->|Auth tokens| OAUTH[🔑 OAuth\nProvider]
```

---

## Level 1 — Major Processes

```mermaid
graph TB
    S([👤 Student])
    I([👨‍🏫 Instructor])

    subgraph "1.0 Authentication"
        P1[1.1 Validate\nCredentials]
        P2[1.2 Generate\nJWT Token]
        P3[1.3 SSO\nAuthentication]
    end

    subgraph "2.0 Course Management"
        P4[2.1 Browse &\nSearch Courses]
        P5[2.2 Enroll\nStudent]
        P6[2.3 Track\nProgress]
        P7[2.4 Manage\nModules]
    end

    subgraph "3.0 Assignment Management"
        P8[3.1 Create\nAssignment]
        P9[3.2 Submit\nAssignment]
        P10[3.3 Upload\nFiles]
    end

    subgraph "4.0 Grading System"
        P11[4.1 Grade\nSubmission]
        P12[4.2 Calculate\nGPA]
        P13[4.3 Generate\nFeedback]
    end

    subgraph "5.0 Library System"
        P14[5.1 Browse &\nSearch Resources]
        P15[5.2 Track\nReading Progress]
        P16[5.3 Manage\nCollections]
    end

    subgraph "6.0 Notification System"
        P17[6.1 Generate\nNotification]
        P18[6.2 Dispatch\nNotification]
    end

    DB[(User Store)]
    CDB[(Course Store)]
    ADB[(Assignment Store)]
    GDB[(Grade Store)]
    LDB[(Library Store)]
    NDB[(Notification Store)]
    FSTORE[(File Storage)]

    %% Auth
    S -->|email, password| P1
    S -->|OAuth code| P3
    P1 -->|user record| DB
    DB -->|user data| P1
    P1 -->|authenticated user| P2
    P3 -->|SSO token| P2
    P2 -->|JWT| S

    %% Course
    S -->|search query, filters| P4
    CDB -->|course list| P4
    P4 -->|filtered courses| S
    S -->|courseId| P5
    P5 -->|enrollment| CDB
    P5 -->|enrollment confirmed| S
    S -->|moduleId completed| P6
    P6 -->|progress update| CDB
    I -->|module data| P7
    P7 -->|module stored| CDB

    %% Assignment
    I -->|assignment data| P8
    P8 -->|assignment stored| ADB
    S -->|submission data| P9
    S -->|files| P10
    P10 -->|file URLs| FSTORE
    P10 -->|file metadata| P9
    P9 -->|submission stored| ADB

    %% Grading
    I -->|score, feedback| P11
    ADB -->|submission| P11
    P11 -->|grade stored| GDB
    GDB -->|all grades| P12
    P12 -->|GPA| DB
    P11 -->|feedback text| P13
    P13 -->|formatted feedback| GDB

    %% Library
    S -->|search, filters| P14
    LDB -->|resources| P14
    P14 -->|results| S
    S -->|page/time update| P15
    P15 -->|progress| LDB
    S -->|save resource| P16
    P16 -->|collection update| LDB

    %% Notifications
    P11 -->|grade event| P17
    P5 -->|enrollment event| P17
    P17 -->|notification| P18
    P18 -->|in-app| NDB
    P18 -->|email| S
```

---

## Level 2 — Assignment Submission Process (Detailed)

```mermaid
graph TB
    S([👤 Student])

    P1[2.1 Fetch\nAssignment Details]
    P2[2.2 Validate\nDeadline]
    P3[2.3 Validate\nFile Type & Size]
    P4[2.4 Upload Files\nto Storage]
    P5[2.5 Create\nSubmission Record]
    P6[2.6 Update\nAssignment Status]
    P7[2.7 Send\nConfirmation]

    ADB[(Assignment\nStore)]
    SDB[(Submission\nStore)]
    FSTORE[(File\nStorage)]

    S -->|assignmentId| P1
    ADB -->|assignment details| P1
    P1 -->|details + rubric| S

    S -->|files, note| P2
    ADB -->|deadline| P2
    P2 -->|deadline OK| P3
    P2 -->|deadline passed| S

    P3 -->|valid files| P4
    P3 -->|invalid files| S

    P4 -->|file stored| FSTORE
    FSTORE -->|file URLs| P4
    P4 -->|file metadata| P5

    P5 -->|submission record| SDB
    P5 -->|submissionId| P6
    P6 -->|status: SUBMITTED| ADB

    P6 --> P7
    P7 -->|confirmation| S

    style P2 fill:#fff3cd,stroke:#856404
    style P3 fill:#fff3cd,stroke:#856404
```

---

## Level 2 — GPA Calculation Process (Detailed)

```mermaid
graph TB
    TRIGGER([Grade Published\nEvent])

    P1[4.2.1 Fetch All\nStudent Grades]
    P2[4.2.2 Group by\nCourse]
    P3[4.2.3 Select Grading\nStrategy]
    P4[4.2.4 Calculate\nCourse Grades]
    P5[4.2.5 Compute\nWeighted GPA]
    P6[4.2.6 Determine\nRank Percentile]
    P7[4.2.7 Update\nStudent Profile]

    GDB[(Grade\nStore)]
    CDB[(Course\nStore)]
    UDB[(User\nStore)]

    TRIGGER --> P1
    GDB -->|grade records| P1
    P1 -->|grades[]| P2
    CDB -->|course credits| P2
    P2 -->|grouped data| P3

    P3 -->|weighted| P4
    P3 -->|curved| P4
    P3 -->|pass/fail| P4

    P4 -->|course grades| P5
    P5 -->|GPA: 3.88| P6
    UDB -->|cohort GPAs| P6
    P6 -->|rank: Top 5%| P7
    P7 -->|updated profile| UDB

    style P3 fill:#d4edda,stroke:#155724
```

---

## Data Dictionary

| Data Flow | Source | Destination | Contents |
|---|---|---|---|
| Login Credentials | Student/Instructor | Auth Process | `{email, password}` or `{ssoProvider, authCode}` |
| JWT Token | Auth Process | Client | `{token, userId, role, expiresIn}` |
| Course Search Query | Client | Course Process | `{query?, track?, semester?}` |
| Course List | Course Store | Client | `[{id, title, code, instructor, progress, banner}]` |
| Enrollment Request | Student | Enrollment Process | `{studentId, courseId}` |
| Module Completion | Student | Progress Process | `{enrollmentId, moduleId}` |
| Assignment Data | Instructor | Assignment Store | `{title, description, type, deadline, points, rubric[], requirements[]}` |
| Submission | Student | Submission Store | `{assignmentId, studentId, files[], note, submittedAt}` |
| File Upload | Student | File Storage | `{file: binary, filename, mimetype, size}` |
| Grade | Instructor | Grade Store | `{studentId, assignmentId, score, letterGrade, feedback}` |
| GPA | Grade Calculator | User Store | `{studentId, gpa: float, rank: string}` |
| Search Query | Student | Library Process | `{query, type?, category?, department?}` |
| Reading Progress | Student | Library Store | `{userId, resourceId, currentPage}` |
| Watch Progress | Student | Library Store | `{userId, resourceId, currentTime}` |
| Notification | System | Notification Store | `{userId, type, message, referenceId, isRead}` |
| Email | Notification Process | Email Service | `{to, subject, body, template}` |

