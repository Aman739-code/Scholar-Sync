# Sequence Diagrams — ScholarSync LMS

## Overview
These sequence diagrams detail the interaction flow between actors, frontend, backend, and database for all major use cases.

---

## 1. User Authentication (Login)

```mermaid
sequenceDiagram
    actor S as Student
    participant UI as React Frontend
    participant R as Express Router
    participant AC as AuthController
    participant AS as AuthService
    participant DB as MongoDB
    participant JWT as JWT Module

    S->>UI: Enter email & password
    UI->>UI: Client-side validation
    UI->>R: POST /api/auth/login {email, password}
    R->>AC: login(req, res)
    AC->>AS: authenticate(email, password)
    AS->>DB: findOne({email})
    DB-->>AS: User document
    alt User not found
        AS-->>AC: throw UserNotFoundError
        AC-->>UI: 404 {error: "User not found"}
        UI-->>S: Show error message
    else User found
        AS->>AS: bcrypt.compare(password, hash)
        alt Invalid password
            AS-->>AC: throw InvalidCredentialsError
            AC-->>UI: 401 {error: "Invalid credentials"}
            UI-->>S: Show error message
        else Valid password
            AS->>JWT: sign({userId, role}, secret, {expiresIn: '7d'})
            JWT-->>AS: accessToken
            AS-->>AC: {user, accessToken}
            AC-->>UI: 200 {user, token}
            UI->>UI: Store token in localStorage
            UI->>UI: Navigate to /dashboard
            UI-->>S: Show Dashboard
        end
    end
```

---

## 2. User Registration (Signup)

```mermaid
sequenceDiagram
    actor S as Student
    participant UI as React Frontend
    participant R as Express Router
    participant AC as AuthController
    participant AS as AuthService
    participant DB as MongoDB
    participant NS as NotificationService

    S->>UI: Fill signup form (name, studentId, email, password)
    UI->>UI: Validate fields (email format, password strength)
    UI->>R: POST /api/auth/signup {name, studentId, email, password}
    R->>AC: register(req, res)
    AC->>AS: createUser(userData)
    AS->>DB: findOne({email})
    DB-->>AS: null (no duplicate)
    AS->>DB: findOne({studentId})
    DB-->>AS: null (no duplicate)
    AS->>AS: bcrypt.hash(password, 12)
    AS->>DB: User.create({name, email, passwordHash, role: 'student'})
    DB-->>AS: Created User
    AS->>DB: StudentProfile.create({userId, studentId, department})
    DB-->>AS: Created Profile
    AS->>NS: notify(ENROLLMENT_CONFIRMED, user)
    NS-->>S: Welcome email sent
    AS-->>AC: {user, token}
    AC-->>UI: 201 {user, token}
    UI->>UI: Store token, navigate to /dashboard
    UI-->>S: Show Dashboard
```

---

## 3. SSO Login (Google/Outlook)

```mermaid
sequenceDiagram
    actor S as Student
    participant UI as React Frontend
    participant OAuth as OAuth Provider
    participant R as Express Router
    participant AC as AuthController
    participant AS as AuthService
    participant DB as MongoDB

    S->>UI: Click "Continue with Google"
    UI->>OAuth: Redirect to Google OAuth consent
    OAuth-->>S: Show consent screen
    S->>OAuth: Grant permission
    OAuth-->>UI: Redirect with auth code
    UI->>R: POST /api/auth/sso {provider: 'google', code}
    R->>AC: ssoLogin(req, res)
    AC->>AS: authenticateSSO(provider, code)
    AS->>OAuth: Exchange code for tokens
    OAuth-->>AS: {access_token, id_token}
    AS->>OAuth: GET /userinfo
    OAuth-->>AS: {email, name, picture}
    AS->>DB: findOne({email})
    alt New user
        AS->>DB: User.create({name, email, profileImage, ssoProvider})
        DB-->>AS: Created User
    else Existing user
        DB-->>AS: Existing User
    end
    AS-->>AC: {user, token}
    AC-->>UI: 200 {user, token}
    UI-->>S: Show Dashboard
```

---

## 4. Course Enrollment

```mermaid
sequenceDiagram
    actor S as Student
    participant UI as React Frontend
    participant R as Express Router
    participant CC as CourseController
    participant CS as CourseService
    participant ES as EnrollmentService
    participant DB as MongoDB
    participant NS as NotificationService

    S->>UI: Browse Course Catalog
    UI->>R: GET /api/courses?track=CS
    R->>CC: getCourses(req, res)
    CC->>CS: listCourses({track: 'CS'})
    CS->>DB: Course.find({track: 'CS'}).populate('instructor')
    DB-->>CS: Course[]
    CS-->>CC: courses
    CC-->>UI: 200 {courses}
    UI-->>S: Display course catalog

    S->>UI: Click "Enroll" on a course
    UI->>R: POST /api/enrollments {courseId}
    R->>CC: enrollStudent(req, res)
    CC->>ES: enroll(studentId, courseId)
    ES->>DB: Enrollment.findOne({studentId, courseId})
    DB-->>ES: null (not enrolled yet)
    ES->>DB: Course.findById(courseId)
    DB-->>ES: Course (check capacity)
    ES->>ES: Validate capacity & prerequisites
    ES->>DB: Enrollment.create({studentId, courseId, progress: 0})
    DB-->>ES: Created Enrollment
    ES->>DB: StudentProfile.update({$push: {enrolledCourses: courseId}})
    ES->>NS: notify(ENROLLMENT_CONFIRMED, {student, course})
    ES-->>CC: enrollment
    CC-->>UI: 201 {enrollment}
    UI-->>S: Show "Enrolled!" confirmation

    S->>UI: Navigate to /dashboard
    UI->>R: GET /api/enrollments?studentId=xxx
    R->>CC: getStudentEnrollments(req, res)
    CC->>ES: getEnrollments(studentId)
    ES->>DB: Enrollment.find({studentId}).populate('course')
    DB-->>ES: Enrollment[] with Courses
    ES-->>CC: enrollments
    CC-->>UI: 200 {enrollments}
    UI-->>S: Show enrolled courses with progress bars
```

---

## 5. Assignment Submission

```mermaid
sequenceDiagram
    actor S as Student
    participant UI as React Frontend
    participant R as Express Router
    participant AsC as AssignmentController
    participant AsS as AssignmentService
    participant FS as FileService
    participant DB as MongoDB

    S->>UI: Navigate to /assignments/dynamic-programming-lab
    UI->>R: GET /api/assignments/dynamic-programming-lab
    R->>AsC: getAssignment(req, res)
    AsC->>AsS: getAssignmentById(id)
    AsS->>DB: Assignment.findById(id).populate('course rubric resources')
    DB-->>AsS: Assignment with details
    AsS-->>AsC: assignment
    AsC-->>UI: 200 {assignment}
    UI-->>S: Show assignment details, rubric, requirements

    S->>UI: Click "Start Submission"
    UI-->>S: Show upload modal

    S->>UI: Drag files + add note
    UI->>R: POST /api/submissions {assignmentId, note, files[]}
    R->>AsC: submitAssignment(req, res)
    AsC->>AsS: createSubmission(data)
    AsS->>AsS: Check deadline
    alt Past deadline
        AsS->>AsS: Mark as LATE
    end
    loop For each file
        AsS->>FS: uploadFile(file)
        FS->>FS: Validate type & size (ZIP/PDF/PY ≤ 50MB)
        FS-->>AsS: {fileId, url}
    end
    AsS->>DB: Submission.create({assignmentId, studentId, files, note, status})
    DB-->>AsS: Created Submission
    AsS-->>AsC: submission
    AsC-->>UI: 201 {submission}
    UI->>UI: Close modal, update status to "Submitted"
    UI-->>S: Show success confirmation
```

---

## 6. Assignment Grading & Feedback

```mermaid
sequenceDiagram
    actor I as Instructor
    participant UI as React Frontend
    participant R as Express Router
    participant GC as GradeController
    participant GS as GradeService
    participant GCalc as GradeCalculator
    participant DB as MongoDB
    participant NS as NotificationService

    I->>UI: View submissions for assignment
    UI->>R: GET /api/submissions?assignmentId=xxx
    R->>GC: getSubmissions(req, res)
    GC->>DB: Submission.find({assignmentId}).populate('student files')
    DB-->>GC: Submission[]
    GC-->>UI: 200 {submissions}
    UI-->>I: Display submissions list

    I->>UI: Open student submission, review files
    I->>UI: Enter score per rubric criteria + feedback
    UI->>R: POST /api/grades {submissionId, score, letterGrade, feedback}
    R->>GC: gradeSubmission(req, res)
    GC->>GS: createGrade(gradeData)
    GS->>DB: Grade.create({studentId, courseId, assignmentId, score, feedback})
    DB-->>GS: Created Grade
    GS->>DB: Submission.updateOne({_id: submissionId}, {status: 'graded', grade: gradeId})
    DB-->>GS: Updated

    GS->>GCalc: calculateGPA(studentId)
    GCalc->>DB: Grade.find({studentId})
    DB-->>GCalc: All student grades
    GCalc->>GCalc: Apply WeightedGradingStrategy
    GCalc->>DB: StudentProfile.update({gpa: newGPA})
    GCalc-->>GS: Updated GPA

    GS->>NS: notify(GRADE_POSTED, {student, assignment, grade})
    NS-->>NS: Send email + in-app notification

    GS-->>GC: grade
    GC-->>UI: 201 {grade}
    UI-->>I: Show "Grade saved" confirmation
```

---

## 7. Library Resource Access & Progress Tracking

```mermaid
sequenceDiagram
    actor S as Student
    participant UI as React Frontend
    participant R as Express Router
    participant LC as LibraryController
    participant LS as LibraryService
    participant RF as ResourceFactory
    participant DB as MongoDB

    S->>UI: Navigate to /library
    UI->>R: GET /api/library/recent?userId=xxx
    R->>LC: getRecentResources(req, res)
    LC->>LS: getRecentlyAccessed(userId)
    LS->>DB: ReadingProgress.find({userId}).sort({lastAccessed: -1}).limit(5)
    DB-->>LS: Progress records
    LS->>DB: LibraryResource.find({_id: {$in: resourceIds}})
    DB-->>LS: Resources
    LS-->>LC: resources with progress
    LC-->>UI: 200 {resources}
    UI-->>S: Display recently accessed with progress bars

    S->>UI: Click on "Principles of Neural Design"
    UI->>R: GET /api/library/neural-design
    R->>LC: getResource(req, res)
    LC->>LS: getResourceById(id)
    LS->>DB: LibraryResource.findById(id)
    DB-->>LS: Resource document
    LS->>RF: createResource(type, data)
    RF-->>LS: Textbook instance
    LS->>DB: ReadingProgress.findOne({userId, resourceId})
    DB-->>LS: Progress (page 142/480)
    LS->>DB: ResourceChapter.find({resourceId}).sort({orderIndex: 1})
    DB-->>LS: Chapters
    LS-->>LC: {resource, progress, chapters}
    LC-->>UI: 200 {resource, progress, chapters}
    UI-->>S: Show textbook detail with TOC & progress

    S->>UI: Continue reading, reach page 160
    UI->>R: PUT /api/library/progress {resourceId, currentPage: 160}
    R->>LC: updateProgress(req, res)
    LC->>LS: updateProgress(userId, resourceId, {currentPage: 160})
    LS->>DB: ReadingProgress.updateOne({userId, resourceId}, {currentPage: 160, lastAccessed: new Date()})
    DB-->>LS: Updated
    LS-->>LC: progress
    LC-->>UI: 200 {progress}
    UI-->>S: Progress bar updated
```

---

## 8. Dashboard Data Aggregation

```mermaid
sequenceDiagram
    actor S as Student
    participant UI as React Frontend
    participant R as Express Router
    participant DC as DashboardController
    participant ES as EnrollmentService
    participant AsS as AssignmentService
    participant GS as GradeService
    participant DB as MongoDB

    S->>UI: Navigate to /dashboard
    
    par Parallel API calls
        UI->>R: GET /api/dashboard/courses
        R->>DC: getEnrolledCourses(req, res)
        DC->>ES: getEnrollments(studentId)
        ES->>DB: Enrollment.find({studentId, status: 'active'}).populate('course')
        DB-->>ES: Enrollments with courses
        ES-->>DC: enrolledCourses
        DC-->>UI: 200 {courses}
    and
        UI->>R: GET /api/dashboard/upcoming
        R->>DC: getUpcomingAssignments(req, res)
        DC->>AsS: getUpcoming(studentId, limit=3)
        AsS->>DB: Assignment.find({courseId: {$in: enrolledIds}, deadline: {$gte: now}}).sort({deadline: 1}).limit(3)
        DB-->>AsS: Upcoming assignments
        AsS-->>DC: assignments
        DC-->>UI: 200 {assignments}
    and
        UI->>R: GET /api/dashboard/grades
        R->>DC: getRecentGrades(req, res)
        DC->>GS: getRecentGrades(studentId, limit=2)
        GS->>DB: Grade.find({studentId}).sort({gradedAt: -1}).limit(2).populate('course assignment')
        DB-->>GS: Recent grades
        GS-->>DC: grades
        DC-->>UI: 200 {grades}
    end

    UI->>UI: Compose dashboard view
    UI-->>S: Display dashboard with courses, assignments, grades
```

---

## 9. Course Module Progress

```mermaid
sequenceDiagram
    actor S as Student
    participant UI as React Frontend
    participant R as Express Router
    participant CC as CourseController
    participant CS as CourseService
    participant DB as MongoDB

    S->>UI: Navigate to /courses/advanced-algorithms
    UI->>R: GET /api/courses/advanced-algorithms
    R->>CC: getCourse(req, res)
    CC->>CS: getCourseWithProgress(courseId, studentId)
    CS->>DB: Course.findById(courseId).populate('instructor modules')
    DB-->>CS: Course with modules
    CS->>DB: Enrollment.findOne({studentId, courseId})
    DB-->>CS: Enrollment (progress: 75%, completedModules: [m1, m2, m3])
    CS-->>CC: {course, enrollment, moduleStatuses}
    CC-->>UI: 200 {course, progress, modules}
    UI-->>S: Show course detail with module statuses

    S->>UI: Complete Module 4 content
    UI->>R: PUT /api/enrollments/:id/module-complete {moduleId}
    R->>CC: completeModule(req, res)
    CC->>CS: markModuleComplete(enrollmentId, moduleId)
    CS->>DB: Enrollment.updateOne({_id}, {$push: {completedModules: moduleId}})
    DB-->>CS: Updated
    CS->>CS: Recalculate progress (4/6 = 66.7%)
    CS->>DB: Enrollment.updateOne({_id}, {progress: 66.7})
    DB-->>CS: Updated
    CS-->>CC: {progress: 66.7, completedModules: 4}
    CC-->>UI: 200 {progress}
    UI-->>S: Update progress bar to 67%
```

---

## 10. Notification Flow (Observer Pattern)

```mermaid
sequenceDiagram
    participant CRON as Scheduler (Cron)
    participant NS as NotificationService
    participant DB as MongoDB
    participant EN as EmailNotifier
    participant IN as InAppNotifier

    Note over CRON: Runs every hour

    CRON->>NS: checkDeadlines()
    NS->>DB: Assignment.find({deadline: {$lte: now + 24h, $gte: now}})
    DB-->>NS: Assignments due within 24h

    loop For each assignment
        NS->>DB: Enrollment.find({courseId: assignment.courseId})
        DB-->>NS: Enrolled students
        NS->>DB: Submission.find({assignmentId, studentId: {$in: studentIds}})
        DB-->>NS: Existing submissions

        loop For each student without submission
            NS->>NS: Create NotificationEvent(DEADLINE_REMINDER)
            NS->>EN: onEvent(event)
            EN->>EN: Send deadline reminder email
            NS->>IN: onEvent(event)
            IN->>DB: Notification.create({userId, type, message, isRead: false})
            DB-->>IN: Saved
        end
    end
```

