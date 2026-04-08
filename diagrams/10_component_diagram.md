# Component & Package Diagram — ScholarSync LMS

## Overview
This diagram shows the high-level component structure and the dependencies between packages in the system.

---

## Frontend Component Hierarchy

```mermaid
graph TB
    subgraph "App Root"
        APP[App.jsx]
        GS[GlobalStyles.jsx]
        RR[React Router]
    end

    subgraph "Layouts"
        PL[PublicLayout]
        DL[DashboardLayout]
    end

    subgraph "Shared Components"
        TN[TopNavBar]
        SN[SideNavBar]
        FT[Footer]
    end

    subgraph "Public Pages"
        LP[LandingPage]
        LGP[LoginPage]
        SUP[SignupPage]
    end

    subgraph "Dashboard Pages"
        DP[DashboardPage]
        CP[CoursesPage]
        CDP[CourseDetailPage]
        AP[AssignmentsPage]
        ADP[AssignmentDetailPage]
        GP[GradesPage]
        LBP[LibraryPage]
        LBDP[LibraryItemPage]
    end

    APP --> GS
    APP --> RR

    RR --> PL
    RR --> DL

    PL --> TN
    PL --> FT
    PL --> LP
    PL --> LGP
    PL --> SUP

    DL --> SN
    DL --> FT
    DL --> DP
    DL --> CP
    DL --> CDP
    DL --> AP
    DL --> ADP
    DL --> GP
    DL --> LBP
    DL --> LBDP

    style APP fill:#4e79a7,stroke:#333,color:#fff
    style PL fill:#76b7b2,stroke:#333,color:#fff
    style DL fill:#76b7b2,stroke:#333,color:#fff
```

---

## Backend Package Architecture

```mermaid
graph TB
    subgraph "Presentation Layer"
        direction LR
        ROUTES[Routes Package]
        MW[Middleware Package]
    end

    subgraph "Application Layer"
        direction LR
        CTRL[Controllers Package]
        SVC[Services Package]
    end

    subgraph "Domain Layer"
        direction LR
        MODELS[Models Package]
        STRAT[Strategies Package]
        OBS[Observers Package]
        FACTORY[Factories Package]
    end

    subgraph "Infrastructure Layer"
        direction LR
        REPO[Repositories Package]
        CONFIG[Config Package]
        UTILS[Utils Package]
    end

    subgraph "External"
        direction LR
        MONGO[(MongoDB)]
        S3[(File Storage)]
        SMTP[Email Service]
        OAUTH[OAuth Provider]
    end

    ROUTES --> MW
    ROUTES --> CTRL
    CTRL --> SVC
    SVC --> MODELS
    SVC --> STRAT
    SVC --> OBS
    SVC --> FACTORY
    SVC --> REPO
    REPO --> MODELS
    REPO --> CONFIG
    CONFIG --> MONGO
    SVC --> UTILS
    OBS --> SMTP
    SVC --> S3
    SVC --> OAUTH

    style ROUTES fill:#e15759,stroke:#333,color:#fff
    style CTRL fill:#f28e2b,stroke:#333,color:#fff
    style SVC fill:#edc948,stroke:#333,color:#000
    style MODELS fill:#59a14f,stroke:#333,color:#fff
    style REPO fill:#4e79a7,stroke:#333,color:#fff
```

---

## Package Dependencies Matrix

| Package | Depends On | Depended By |
|---------|-----------|-------------|
| **Routes** | Middleware, Controllers | App Entry |
| **Middleware** | Utils (JWT) | Routes |
| **Controllers** | Services | Routes |
| **Services** | Models, Repositories, Strategies, Observers, Factories | Controllers |
| **Models** | — (leaf) | Services, Repositories |
| **Repositories** | Models, Config | Services |
| **Strategies** | — (leaf) | Services |
| **Observers** | External (SMTP) | Services |
| **Factories** | Models | Services |
| **Config** | External (MongoDB) | Repositories, App |
| **Utils** | — (leaf) | Middleware, Services |

---

## Component Interaction — Course Enrollment Flow

```mermaid
graph LR
    subgraph "React Client"
        UI[CoursesPage\nComponent]
    end

    subgraph "Express Server"
        R[courseRoutes.js]
        M[auth.js\nmiddleware]
        C[CourseController]
    end

    subgraph "Business Logic"
        ES[EnrollmentService]
        NS[NotificationService]
    end

    subgraph "Data Access"
        ER[EnrollmentRepository]
        CR[CourseRepository]
    end

    subgraph "Database"
        DB[(MongoDB)]
    end

    UI -->|POST /api/enrollments| R
    R -->|verify token| M
    M -->|authorized| C
    C -->|enroll(studentId, courseId)| ES
    ES -->|findById(courseId)| CR
    CR -->|query| DB
    ES -->|create enrollment| ER
    ER -->|insert| DB
    ES -->|notify| NS
    NS -->|email + in-app| DB
    
    DB -->|enrollment| ER
    ER -->|result| ES
    ES -->|enrollment| C
    C -->|201 JSON| UI
```

---

## Component Interaction — Grade Publishing Flow

```mermaid
graph LR
    subgraph "React Client"
        UI[GradingView\nComponent]
    end

    subgraph "Express Server"
        R[gradeRoutes.js]
        M[rbac.js\nmiddleware]
        C[GradeController]
    end

    subgraph "Business Logic"
        GS[GradeService]
        GC[GradeCalculator]
        WS[WeightedStrategy]
        NS[NotificationService]
        EN[EmailNotifier]
        IN[InAppNotifier]
    end

    subgraph "Data Access"
        GR[GradeRepository]
        SR[StudentRepository]
    end

    subgraph "Database"
        DB[(MongoDB)]
    end

    UI -->|POST /api/grades| R
    R -->|role: instructor| M
    M -->|authorized| C
    C -->|publishGrade(data)| GS
    GS -->|create grade| GR
    GR -->|insert| DB
    GS -->|recalculate| GC
    GC -->|use strategy| WS
    WS -->|weighted avg| GC
    GC -->|update GPA| SR
    SR -->|update| DB
    GS -->|notify| NS
    NS -->|dispatch| EN
    NS -->|dispatch| IN
    EN -->|send email| UI
    IN -->|save notification| DB
```

---

## Dependency Injection Overview

```mermaid
graph TB
    subgraph "Composition Root - app.js"
        CR[Create Dependencies]
    end

    subgraph "Concrete Implementations"
        MR[MongoUserRepository]
        MCR[MongoCourseRepository]
        WGS[WeightedGradingStrategy]
        EN[EmailNotifier]
        IN[InAppNotifier]
    end

    subgraph "Abstractions - Interfaces"
        IR[IRepository - User]
        ICR[IRepository - Course]
        IGS[IGradingStrategy]
        INO[INotificationObserver]
    end

    subgraph "Services - Depend on Abstractions"
        AS[AuthService]
        CS[CourseService]
        GCal[GradeCalculator]
        NS[NotificationService]
    end

    CR --> MR
    CR --> MCR
    CR --> WGS
    CR --> EN
    CR --> IN

    MR -.->|implements| IR
    MCR -.->|implements| ICR
    WGS -.->|implements| IGS
    EN -.->|implements| INO
    IN -.->|implements| INO

    AS -->|depends on| IR
    CS -->|depends on| ICR
    GCal -->|depends on| IGS
    NS -->|depends on| INO

    style IR fill:#fff3cd,stroke:#856404
    style ICR fill:#fff3cd,stroke:#856404
    style IGS fill:#fff3cd,stroke:#856404
    style INO fill:#fff3cd,stroke:#856404
```

> **Dependency Inversion Principle**: Services (high-level modules) never depend on Repositories/Strategies (low-level modules) directly. Both depend on abstractions (interfaces). The composition root wires concrete implementations at startup.

