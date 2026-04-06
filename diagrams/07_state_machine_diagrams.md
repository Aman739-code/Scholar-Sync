# State Machine Diagram — ScholarSync LMS

## Overview
State machine diagrams define the valid lifecycle states and transitions for key domain entities.

---

## 1. Assignment Status Lifecycle

```mermaid
stateDiagram-v2
    [*] --> DRAFT : Instructor creates assignment

    DRAFT --> AVAILABLE : Instructor publishes
    AVAILABLE --> DUE_SOON : System (deadline within 48h)
    DUE_SOON --> URGENT : System (deadline within 24h)
    URGENT --> OVERDUE : System (deadline passed)
    
    AVAILABLE --> CLOSED : Instructor manually closes
    DUE_SOON --> CLOSED : Instructor manually closes
    URGENT --> CLOSED : Instructor manually closes
    OVERDUE --> CLOSED : Instructor manually closes

    note right of DRAFT : Assignment is being\nconfigured by instructor
    note right of DUE_SOON : Warning state -\nstudents see red badge
    note right of URGENT : Critical state -\nhighest priority in list
```

---

## 2. Submission Lifecycle

```mermaid
stateDiagram-v2
    [*] --> NOT_STARTED : Student views assignment

    NOT_STARTED --> DRAFT : Student saves draft
    DRAFT --> DRAFT : Student updates draft
    DRAFT --> SUBMITTED : Student submits
    NOT_STARTED --> SUBMITTED : Student submits directly
    
    SUBMITTED --> LATE : System marks (after deadline)
    NOT_STARTED --> LATE : Submitted after deadline

    SUBMITTED --> UNDER_REVIEW : Instructor begins review
    LATE --> UNDER_REVIEW : Instructor begins review
    UNDER_REVIEW --> GRADED : Instructor publishes grade
    
    GRADED --> [*]

    note right of DRAFT : Files uploaded,\nnot yet submitted
    note right of SUBMITTED : Timestamp recorded,\nawaiting review
    note left of LATE : Late penalty\nmay apply
    note right of GRADED : Grade + feedback\nvisible to student
```

---

## 3. Enrollment Lifecycle

```mermaid
stateDiagram-v2
    [*] --> PENDING : Student requests enrollment

    PENDING --> ACTIVE : System confirms (capacity OK)
    PENDING --> WAITLISTED : Course is full
    WAITLISTED --> ACTIVE : Spot opens up

    ACTIVE --> IN_PROGRESS : Student begins modules
    IN_PROGRESS --> IN_PROGRESS : Completes module
    IN_PROGRESS --> COMPLETED : All modules done (100%)
    
    ACTIVE --> DROPPED : Student drops course
    IN_PROGRESS --> DROPPED : Student drops course
    
    COMPLETED --> [*]
    DROPPED --> [*]

    note right of ACTIVE : Progress = 0%,\nappears on dashboard
    note right of IN_PROGRESS : Progress > 0% and < 100%
    note right of COMPLETED : Progress = 100%,\nfinal grade issued
```

---

## 4. User Account Lifecycle

```mermaid
stateDiagram-v2
    [*] --> REGISTERED : User signs up

    REGISTERED --> EMAIL_VERIFIED : Verifies email
    REGISTERED --> UNVERIFIED : Timeout (48h)
    UNVERIFIED --> REGISTERED : Resend verification

    EMAIL_VERIFIED --> ACTIVE : Profile completed
    ACTIVE --> ACTIVE : Normal usage
    
    ACTIVE --> SUSPENDED : Admin suspends
    SUSPENDED --> ACTIVE : Admin reinstates
    
    ACTIVE --> DEACTIVATED : User deactivates
    DEACTIVATED --> ACTIVE : User reactivates (within 30d)
    DEACTIVATED --> DELETED : System (after 30d)

    DELETED --> [*]
```

---

## 5. Library Resource Progress Lifecycle

```mermaid
stateDiagram-v2
    [*] --> NOT_ACCESSED : Resource exists in library

    NOT_ACCESSED --> IN_PROGRESS : User opens resource
    IN_PROGRESS --> IN_PROGRESS : User reads/watches more

    state IN_PROGRESS {
        [*] --> Reading : Textbook/Journal
        [*] --> Watching : Video Lecture
        
        Reading : currentPage / totalPages
        Watching : currentTime / duration
    }

    IN_PROGRESS --> COMPLETED : 100% progress
    IN_PROGRESS --> BOOKMARKED : User saves to collection
    NOT_ACCESSED --> BOOKMARKED : User saves without opening
    BOOKMARKED --> IN_PROGRESS : User opens saved resource
    
    COMPLETED --> [*]

    note right of IN_PROGRESS : Progress bar shown\non library cards
    note right of BOOKMARKED : Appears in\nSaved Collection
```

---

## 6. Notification Lifecycle

```mermaid
stateDiagram-v2
    [*] --> CREATED : System generates notification

    CREATED --> DELIVERED : Push/Email sent
    DELIVERED --> READ : User views notification
    READ --> DISMISSED : User dismisses
    
    DELIVERED --> EXPIRED : TTL exceeded (7d)
    CREATED --> EXPIRED : Delivery failed

    DISMISSED --> [*]
    EXPIRED --> [*]

    note right of CREATED : Types: deadline_reminder,\ngrade_posted, announcement,\nenrollment_confirmed
```

---

## 7. Grade Calculation State

```mermaid
stateDiagram-v2
    [*] --> PENDING_GRADE : Submission received

    PENDING_GRADE --> SCORING : Instructor reviews
    SCORING --> SCORED : Criteria scores entered
    SCORED --> FEEDBACK_ADDED : Feedback written
    FEEDBACK_ADDED --> PUBLISHED : Grade released

    PUBLISHED --> GPA_UPDATED : System recalculates GPA
    GPA_UPDATED --> RANK_UPDATED : Rank recalculated
    RANK_UPDATED --> [*]

    note right of SCORING : Rubric-based\nweighted scoring
    note right of GPA_UPDATED : Strategy Pattern selects\ngrading algorithm
```
