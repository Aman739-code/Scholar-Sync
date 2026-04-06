# ScholarSync LMS — System Design Diagrams

## 📋 Project Overview

ScholarSync is a full-stack Learning Management System built as a System Design & Software Engineering course project. This `diagrams/` folder contains all UML and architectural diagrams that document the system's design, adhering to **OOP principles**, **SOLID principles**, and established **design patterns**.

---

## 📁 Diagram Index

| # | File | Diagram Type | Description |
|---|------|-------------|-------------|
| 01 | [Use Case Diagram](./01_use_case_diagram.md) | UML Use Case | All actor-system interactions across 6 modules (Auth, Course, Assignment, Grade, Library, Dashboard) with 51 use cases and detailed descriptions |
| 02 | [Class Diagram](./02_class_diagram.md) | UML Class | Complete object-oriented class hierarchy with interfaces, abstract classes, enums, and design pattern implementations |
| 03 | [ER Diagram](./03_er_diagram.md) | Entity-Relationship | MongoDB data model with 18 collections, all relationships, cardinalities, and indexing strategy |
| 04 | [Sequence Diagrams](./04_sequence_diagrams.md) | UML Sequence | 10 detailed interaction diagrams covering login, signup, SSO, enrollment, submission, grading, library, dashboard, module progress, and notifications |
| 05 | [Activity Diagrams](./05_activity_diagrams.md) | UML Activity | 7 workflow diagrams with decision branches for login, enrollment, submission, grading, library access, dashboard loading, and GPA calculation |
| 06 | [Architecture Diagram](./06_architecture_diagram.md) | Component / Architecture | Full system architecture (client → API → service → repository → DB), middleware pipeline, 30+ API routes, deployment architecture, and backend folder structure |
| 07 | [State Machine Diagrams](./07_state_machine_diagrams.md) | UML State Machine | 7 lifecycle diagrams for assignments, submissions, enrollments, user accounts, library resources, notifications, and grade calculation |
| 08 | [Design Patterns](./08_design_patterns.md) | Pattern Documentation | 7 design patterns with class diagrams, pseudocode, and explicit SOLID/OOP mapping: Factory, Strategy, Observer, Repository, Singleton, MVC, Decorator |
| 09 | [Data Flow Diagrams](./09_data_flow_diagrams.md) | DFD (Level 0-2) | 3-level DFDs showing context, major processes, and detailed submission/GPA flows, plus a complete data dictionary |
| 10 | [Component Diagram](./10_component_diagram.md) | UML Component | Frontend component hierarchy, backend package architecture, dependency matrix, interaction flows, and dependency injection overview |

---

## 🏗️ Design Principles Applied

### Object-Oriented Programming (OOP)

| Principle | Where Applied |
|-----------|--------------|
| **Encapsulation** | All classes have private fields with public getters/methods (e.g., `User._passwordHash` is never exposed) |
| **Inheritance** | `User` → `Student`, `Instructor`, `Admin`; `LibraryResource` → `Textbook`, `Journal`, `VideoLecture` |
| **Polymorphism** | `getProgress()` returns page-based % for Textbook, time-based % for Video; `calculateFinalGrade()` varies by strategy |
| **Abstraction** | Abstract `User` and `LibraryResource` base classes define interface contracts for subclasses |

### SOLID Principles

| Principle | Where Applied |
|-----------|--------------|
| **S** — Single Responsibility | `GradeCalculator` only handles grade math; `NotificationService` only handles dispatching; `FileService` only handles uploads |
| **O** — Open/Closed | New resource types (Podcast, Slides) can be added without modifying `ResourceFactory` logic significantly; strategies are plug-and-play |
| **L** — Liskov Substitution | Any `LibraryResource` subclass works wherever `LibraryResource` is expected (e.g., `SavedCollection` stores any type) |
| **I** — Interface Segregation | `ISubmittable`, `IGradable`, `ISearchable`, `INotificationObserver` are small, focused interfaces |
| **D** — Dependency Inversion | Services depend on `IRepository` and `IGradingStrategy` abstractions, not concrete MongoDB or algorithm implementations |

### Design Patterns

| Pattern | Implementation | Diagram Reference |
|---------|---------------|-------------------|
| **Factory** | `ResourceFactory` creates `Textbook`/`Journal`/`VideoLecture` | [Class Diagram](./02_class_diagram.md), [Design Patterns](./08_design_patterns.md) |
| **Strategy** | `GradeCalculator` with `WeightedGrading`/`CurveGrading`/`PassFail` | [Class Diagram](./02_class_diagram.md), [Design Patterns](./08_design_patterns.md) |
| **Observer** | `NotificationService` with `EmailNotifier`/`InAppNotifier` | [Sequence #10](./04_sequence_diagrams.md), [Design Patterns](./08_design_patterns.md) |
| **Repository** | `IRepository<T>` abstracts data access for all entities | [Architecture](./06_architecture_diagram.md), [Design Patterns](./08_design_patterns.md) |
| **Singleton** | `Database` connection manager | [Design Patterns](./08_design_patterns.md) |
| **MVC** | React (View) → Express Controllers → Mongoose Models | [Architecture](./06_architecture_diagram.md) |
| **Decorator** | `AnnotatedResource` adds annotations to any library resource | [Design Patterns](./08_design_patterns.md) |

---

## 🛠️ Technology Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, Vite, Tailwind CSS v4, React Router, Framer Motion |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas, Mongoose ODM |
| Auth | JWT, bcrypt, Google OAuth 2.0, Microsoft OAuth |
| File Storage | Cloudinary / AWS S3 |
| Email | SendGrid |
| Scheduling | node-cron |

---

## 📐 How to View Diagrams

All diagrams use **Mermaid.js** syntax embedded in Markdown files. They render automatically in:
- **GitHub** — Mermaid blocks render natively in `.md` files
- **VS Code** — Install the "Markdown Preview Mermaid Support" extension
- **Mermaid Live Editor** — Paste code at [mermaid.live](https://mermaid.live)

---

## 🗂️ Features Covered by Diagrams

| Feature | Use Case | Class | ER | Sequence | Activity | State |
|---------|:--------:|:-----:|:--:|:--------:|:--------:|:-----:|
| Login/Signup | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| SSO (Google/Outlook) | ✅ | — | ✅ | ✅ | ✅ | — |
| Browse Courses | ✅ | ✅ | ✅ | ✅ | ✅ | — |
| Filter/Search Courses | ✅ | — | ✅ | ✅ | ✅ | — |
| Course Enrollment | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Course Progress | ✅ | ✅ | ✅ | ✅ | — | ✅ |
| View Modules | ✅ | ✅ | ✅ | ✅ | — | ✅ |
| Announcements | ✅ | ✅ | ✅ | — | — | — |
| View Assignments | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Filter by Status | ✅ | — | — | — | ✅ | — |
| Submit Assignment | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| File Upload | ✅ | ✅ | ✅ | ✅ | ✅ | — |
| Save Draft | ✅ | — | ✅ | — | ✅ | ✅ |
| View Rubric | ✅ | ✅ | ✅ | ✅ | — | — |
| Grade Assignment | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| GPA Calculation | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Instructor Feedback | ✅ | ✅ | ✅ | ✅ | ✅ | — |
| Browse Library | ✅ | ✅ | ✅ | ✅ | ✅ | — |
| Reading Progress | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Video Watching | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Save to Collection | ✅ | ✅ | ✅ | — | ✅ | ✅ |
| Download Resource | ✅ | — | — | — | ✅ | — |
| Dashboard Overview | ✅ | — | — | ✅ | ✅ | — |
| Notifications | ✅ | ✅ | ✅ | ✅ | — | ✅ |
| Weekly Schedule | ✅ | — | ✅ | — | — | — |
