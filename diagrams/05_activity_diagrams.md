# Activity Diagrams — ScholarSync LMS

## Overview
Activity diagrams model the flow of control and decision-making in key workflows.

---

## 1. Student Login Flow

```mermaid
flowchart TD
    A([Start]) --> B[Open Login Page]
    B --> C{Choose Login Method}
    C -->|Email/Password| D[Enter Credentials]
    C -->|Google SSO| E[Redirect to Google OAuth]
    C -->|Outlook SSO| F[Redirect to Microsoft OAuth]
    
    D --> G{Validate Input}
    G -->|Invalid format| H[Show Validation Error]
    H --> D
    G -->|Valid| I[Send POST /api/auth/login]
    
    E --> J[User Grants Permission]
    F --> J
    J --> K[Exchange Auth Code for Token]
    K --> L{User Exists?}
    L -->|No| M[Create New Account]
    M --> N[Generate JWT]
    L -->|Yes| N
    
    I --> O{Credentials Valid?}
    O -->|No| P[Show Error - Invalid Credentials]
    P --> D
    O -->|Yes| N
    
    N --> Q[Store Token in localStorage]
    Q --> R[Navigate to Dashboard]
    R --> S([End])
```

---

## 2. Course Enrollment Flow

```mermaid
flowchart TD
    A([Start]) --> B[Browse Course Catalog]
    B --> C{Apply Filters?}
    C -->|Yes| D[Select Track / Search]
    D --> E[Display Filtered Results]
    C -->|No| E[Display All Courses]
    
    E --> F[Select a Course]
    F --> G[View Course Details]
    G --> H{Already Enrolled?}
    H -->|Yes| I[Show Course Progress]
    I --> J([End - View Course])
    
    H -->|No| K{Check Prerequisites}
    K -->|Not Met| L[Show Prerequisites Warning]
    L --> G
    K -->|Met| M{Check Capacity}
    M -->|Full| N[Show Waitlist Option]
    N --> O([End - Waitlisted])
    M -->|Available| P[Click Enroll Button]
    
    P --> Q[Create Enrollment Record]
    Q --> R[Initialize Progress to 0%]
    R --> S[Send Confirmation Notification]
    S --> T[Add to Dashboard]
    T --> U([End - Enrolled])
```

---

## 3. Assignment Submission Flow

```mermaid
flowchart TD
    A([Start]) --> B[Navigate to Assignment Page]
    B --> C[View Assignments List]
    C --> D{Select Tab}
    D -->|Upcoming| E[Show Upcoming Assignments]
    D -->|Submitted| F[Show Submitted Assignments]
    D -->|Graded| G[Show Graded Assignments]
    
    E --> H[Click on Assignment]
    H --> I[View Assignment Details]
    I --> J[Review Requirements & Rubric]
    
    J --> K{Ready to Submit?}
    K -->|No - Need Draft| L[Click Save Draft]
    L --> M[Save Progress Locally]
    M --> N([End - Draft Saved])
    
    K -->|Yes| O[Click Start Submission]
    O --> P[Open Upload Modal]
    P --> Q[Drag & Drop Files or Browse]
    Q --> R{Validate Files}
    R -->|Invalid Size/Type| S[Show File Error]
    S --> Q
    R -->|Valid| T[Optionally Add Note]
    T --> U[Click Submit]
    
    U --> V{Before Deadline?}
    V -->|Yes| W[Submit - Status: SUBMITTED]
    V -->|No| X{Accept Late?}
    X -->|Yes with Penalty| Y[Submit - Status: LATE]
    X -->|No| Z[Reject Submission]
    Z --> AA([End - Rejected])
    
    W --> AB[Send Confirmation]
    Y --> AB
    AB --> AC[Update Assignment Status]
    AC --> AD([End - Submitted Successfully])
```

---

## 4. Grading Workflow

```mermaid
flowchart TD
    A([Start]) --> B[Instructor Opens Submissions]
    B --> C[View Submissions List]
    C --> D[Select Student Submission]
    D --> E[Download/View Attached Files]
    E --> F[Review Against Rubric]
    
    F --> G{Evaluate Each Criteria}
    G --> H[Architecture Design - 30%]
    G --> I[Technical Writing - 25%]
    G --> J[Memory Analysis - 25%]
    G --> K[Implementation Plan - 20%]
    
    H --> L[Enter Criteria Scores]
    I --> L
    J --> L
    K --> L
    
    L --> M[Calculate Weighted Total]
    M --> N[Determine Letter Grade]
    N --> O[Write Feedback Comment]
    O --> P[Click Publish Grade]
    
    P --> Q[Save Grade to Database]
    Q --> R[Update Submission Status to GRADED]
    R --> S[Recalculate Student GPA]
    S --> T[Determine Rank in Cohort]
    T --> U[Send Grade Notification to Student]
    U --> V([End - Grade Published])
```

---

## 5. Library Resource Access Flow

```mermaid
flowchart TD
    A([Start]) --> B[Navigate to Library]
    B --> C{Choose Entry Point}
    
    C -->|Recently Accessed| D[Click on Recent Resource]
    C -->|Curated Hubs| E[Browse Category Hub]
    C -->|Archive Table| F[Search or Filter Archive]
    C -->|AI Librarian| G[Ask AI for Recommendation]
    
    E --> H[Select Category]
    F --> I{Filter Type}
    I -->|All Resources| J[Show All]
    I -->|Saved| K[Show Saved Only]
    I -->|By Department| L[Show by Department]
    
    H --> M[Select Resource]
    J --> M
    K --> M
    L --> M
    G --> M
    D --> M
    
    M --> N[View Resource Details]
    N --> O{Resource Type}
    
    O -->|Textbook| P[Show TOC with Read Status]
    P --> Q[Click Continue Reading]
    Q --> R[Track Page Progress]
    
    O -->|Journal| S[Show Articles List]
    S --> T[Read Article]
    T --> R
    
    O -->|Video Lecture| U[Show Chapters with Timestamps]
    U --> V[Click Play / Continue Watching]
    V --> W[Track Watch Progress]
    
    R --> X{Save to Collection?}
    W --> X
    X -->|Yes| Y[Add to Saved Collection]
    X -->|No| Z{Download?}
    Z -->|Yes - Non-video| AA[Download PDF]
    Z -->|No| AB([End])
    Y --> AB
    AA --> AB
```

---

## 6. Dashboard Data Loading Flow

```mermaid
flowchart TD
    A([Start - User Login]) --> B[Navigate to Dashboard]
    B --> C[Fire Parallel API Calls]
    
    C --> D[GET /api/dashboard/courses]
    C --> E[GET /api/dashboard/upcoming]
    C --> F[GET /api/dashboard/grades]
    C --> G[GET /api/dashboard/schedule]
    
    D --> H{API Success?}
    E --> I{API Success?}
    F --> J{API Success?}
    G --> K{API Success?}
    
    H -->|Yes| L[Render Enrolled Courses Cards]
    H -->|No| M[Show Retry / Skeleton]
    I -->|Yes| N[Render Upcoming Assignments]
    I -->|No| O[Show Retry / Skeleton]
    J -->|Yes| P[Render Recent Grades]
    J -->|No| Q[Show Retry / Skeleton]
    K -->|Yes| R[Render Weekly Schedule]
    K -->|No| S[Show Retry / Skeleton]
    
    L --> T[All Components Ready]
    N --> T
    P --> T
    R --> T
    
    T --> U[Display Complete Dashboard]
    U --> V([End])
```

---

## 7. GPA Calculation Flow

```mermaid
flowchart TD
    A([Trigger: Grade Published]) --> B[Fetch All Student Grades]
    B --> C[Group Grades by Course]
    
    C --> D{Select Grading Strategy}
    D -->|Weighted| E[Apply Weighted Strategy]
    D -->|Curved| F[Apply Curve Strategy]
    D -->|Pass/Fail| G[Apply Pass/Fail Strategy]
    
    E --> H[For Each Course: Sum weighted_score * credits]
    F --> H
    G --> H
    
    H --> I[Calculate Total Quality Points]
    I --> J[Divide by Total Credit Hours]
    J --> K[Round to 2 Decimal Places]
    K --> L[Determine Letter Grade Mapping]
    L --> M{GPA Changed?}
    M -->|Yes| N[Update StudentProfile.gpa]
    N --> O[Calculate Rank Percentile]
    O --> P[Update StudentProfile.rank]
    M -->|No| Q[No Update Needed]
    P --> R([End])
    Q --> R
```
