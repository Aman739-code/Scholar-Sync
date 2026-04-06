import { useParams, Link } from "react-router-dom";
import { useState } from "react";

const assignmentsData = {
  "neural-networks-term-project": {
    title: "Advanced Neural Networks: Term Project Phase 1",
    course: "CS450 • Neural Networks & Deep Learning",
    courseId: "neural-networks",
    icon: "neurology",
    deadline: "Oct 24, 2024 • 11:59 PM",
    points: "150 Units",
    status: "Due Soon",
    statusClass: "bg-error-container text-on-error-container",
    type: "Project",
    description: "Design and submit a detailed architectural proposal for a transformer-based model focusing on efficient memory management. Your proposal should include a complete model architecture diagram, training strategy, and expected performance benchmarks.",
    requirements: [
      "Architecture diagram of proposed transformer model (min 6 layers)",
      "Training strategy with learning rate schedule and optimizer selection",
      "Memory efficiency analysis comparing to baseline architectures",
      "Expected performance benchmarks with justification",
      "Code implementation plan with timeline (Phase 2 preparation)",
    ],
    rubric: [
      { criteria: "Architecture Design", weight: "30%", description: "Novelty and technical soundness of the proposed architecture" },
      { criteria: "Technical Writing", weight: "25%", description: "Clarity, structure, and depth of the written proposal" },
      { criteria: "Memory Analysis", weight: "25%", description: "Thoroughness of efficiency analysis and comparisons" },
      { criteria: "Implementation Plan", weight: "20%", description: "Feasibility and detail of the proposed code timeline" },
    ],
    resources: [
      { name: "Attention Is All You Need (Vaswani et al.)", type: "Paper" },
      { name: "Efficient Transformers: A Survey", type: "Paper" },
      { name: "Project Template (LaTeX)", type: "Template" },
    ],
    instructorNote: "Focus on the memory efficiency angle — this is what separates strong proposals. Reference at least 3 recent papers from 2023-2024.",
    instructor: "Dr. Elena Rodriguez",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCbeORq6rC9nVB_eVQZ7aAUlA445wqv_JqcUWxAplhfP2IfmTjd1NcSk0UEfmG040X_4roykQUYrqfG5t2GFoiXSGpTmpiFAHkmGtABnssDiOwS9a7AadaBECvKFe9gSj8-umcwU0S8ajFdQC8OPK7f0SG3rG9-XKGE4Uko_42FaHXgllznKS4nDmsxH8V29SwHyCwpiyyPsEvOzAOuzI7OLwm0GhG4METrJ8Yl2xF3Gv2ztPvbO4qxht7oyDcAkNm2SmqC_Orl37FV",
  },
  "dynamic-programming-lab": {
    title: "Dynamic Programming Lab",
    course: "CS304 • Advanced Algorithm Design",
    courseId: "advanced-algorithms",
    icon: "code",
    deadline: "Oct 24, 2024 • 11:59 PM",
    points: "80 Units",
    status: "Due Soon",
    statusClass: "bg-error-container text-on-error-container",
    type: "Lab",
    description: "Implement solutions to three dynamic programming problems of increasing complexity. Focus on identifying optimal substructure and overlapping subproblems to construct efficient bottom-up solutions.",
    requirements: [
      "Implement the Longest Common Subsequence (LCS) algorithm",
      "Solve the Matrix Chain Multiplication problem",
      "Design an efficient solution for the Knapsack problem (0/1 variant)",
      "Include time/space complexity analysis for each solution",
      "Write unit tests for edge cases",
    ],
    rubric: [
      { criteria: "Correctness", weight: "40%", description: "All three algorithms produce correct output for all test cases" },
      { criteria: "Efficiency", weight: "25%", description: "Optimal time and space complexity with proper memoization" },
      { criteria: "Code Quality", weight: "20%", description: "Clean, well-documented code following style guidelines" },
      { criteria: "Testing", weight: "15%", description: "Comprehensive unit tests covering edge cases" },
    ],
    resources: [
      { name: "CLRS Chapter 15: Dynamic Programming", type: "Textbook" },
      { name: "Lab Starter Code (GitHub)", type: "Code" },
    ],
    instructorNote: "Start with LCS — it's the most straightforward. The Knapsack variant is intentionally challenging; consider both recursive and iterative approaches.",
    instructor: "Prof. Aris",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCUHaBHXlzHDEtyptu3DyJXlOc6j-ybndPrZWC0LI_VQKrD1n-MjXcvRrQTketSSNVGg44IA-PZebGLBzR6LausEkxPH9OAjiAGL-PUM5x7Gl-obhQwN6I0cnaZz7W3O_tCjwcIj9QZVXbxzdvUR4WQSTxlLNejW8B-joa1YBZLvtqXj7p0G4FjuhS0ZAVlTU0oiwuPD2zuIGB6te2E5M8Zh4HOXfwfkOoSpAfHi0rNKzbTWSyhJKZdOOtS_Hen56ZUG8Hbiloct88y",
  },
  "vector-spaces-quiz": {
    title: "Vector Spaces Quiz",
    course: "MA210 • Linear Algebra & Logic",
    courseId: "linear-algebra",
    icon: "quiz",
    deadline: "Oct 27, 2024 • In Class",
    points: "50 Units",
    status: "Upcoming",
    statusClass: "bg-surface-container text-on-surface",
    type: "Quiz",
    description: "In-class quiz covering vector spaces, subspaces, linear independence, basis, and dimension. The quiz will include both computational problems and proof-based questions.",
    requirements: [
      "Know definitions: vector space, subspace, span, basis, dimension",
      "Prove whether a set is a subspace of a given vector space",
      "Determine if vectors are linearly independent",
      "Find a basis for a given subspace",
      "Compute dimension of vector spaces",
    ],
    rubric: [
      { criteria: "Definitions", weight: "20%", description: "Correct statement of definitions and theorems" },
      { criteria: "Computational", weight: "40%", description: "Accuracy of calculations and matrix operations" },
      { criteria: "Proofs", weight: "30%", description: "Logical rigor and clarity of proof constructions" },
      { criteria: "Presentation", weight: "10%", description: "Neat, organized work with clear notation" },
    ],
    resources: [
      { name: "Practice Quiz (Solutions Posted)", type: "Practice" },
      { name: "Chapter 4 Review Notes", type: "Notes" },
    ],
    instructorNote: "Focus on the proof techniques from Homework 3 and 4. The quiz structure will be similar.",
    instructor: "Dr. Lin",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuB3g2nm1i5r0C6MO59z0JZmGZuOW9W2Rd1Y2z1TYBAz_ly60YwOxZQuuljEWgAjVtdbdgSjImWFU1Tl2Oo7ZPJIJOf49etOv9VORPwt1Sp4ZkzVkwfV7LxzTTP18m5PJAy9HucqqL8bulkZPHQH3Hzp6e01p-mBIxwMB2_tC69ltULEokC5UEpWj0SO9PtfanTfJuqv5zJ_adxjR7wX8lcRIyUKnsLakE1xQiN3A5lnJQBL6yqq6xUEq7sV3VasYxjC3HxuNCgzI0x5",
  },
  "neural-network-draft": {
    title: "Neural Network Draft",
    course: "CS450 • Machine Learning",
    courseId: "neural-networks",
    icon: "description",
    deadline: "Nov 02, 2024 • 11:59 PM",
    points: "100 Units",
    status: "Upcoming",
    statusClass: "bg-surface-container text-on-surface",
    type: "Submission",
    description: "Submit a working draft of your neural network implementation including the forward pass, loss calculation, and initial training loop. This draft will be reviewed and returned with feedback for the final submission.",
    requirements: [
      "Implement forward pass with at least 3 hidden layers",
      "Include cross-entropy loss function implementation",
      "Basic training loop with configurable hyperparameters",
      "Training log showing loss decrease over at least 100 epochs",
      "Brief writeup explaining architecture choices (1 page max)",
    ],
    rubric: [
      { criteria: "Implementation", weight: "45%", description: "Working forward pass, loss, and training loop" },
      { criteria: "Training Results", weight: "25%", description: "Evidence of learning (decreasing loss)" },
      { criteria: "Documentation", weight: "20%", description: "Clear explanation of design decisions" },
      { criteria: "Code Structure", weight: "10%", description: "Modular, readable code organization" },
    ],
    resources: [
      { name: "Neural Network From Scratch (Lecture Notes)", type: "Notes" },
      { name: "PyTorch Reference Implementation", type: "Code" },
    ],
    instructorNote: "This is a draft — it doesn't need to be perfect. Focus on getting the core pipeline working.",
    instructor: "Dr. Elena Rodriguez",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBrokmwUiV-lF_Q2s_AJdRcqWrEX1W0I3S8WeNIy-0J6MDOSz0gy4daMv923SNUpfjbKgDV656CxKBHnAmWYfJ1Ak5xfObdg_WYYblG4Gdk29E9RPccoSJjzQXJ5IyqFHGo_I7E_osLYTTBw-hlRKV0WtbYprqbzp4QA7zTtZiD-ItQP_-DwU6Boo_SdyqylZr1-UBBMHZlvOsN7eb3KLxI4pwtTjX3QXTDMUjPNmHD1-KGELrEqoA4kSIRx3n2Blfy3NqyyEcXIxEC",
  },
  "consensus-algorithms-quiz": {
    title: "Distributed Systems: Consensus Algorithms Quiz",
    course: "CS402 • Distributed Systems",
    courseId: "advanced-data-structures",
    icon: "description",
    deadline: "Oct 26, 2024",
    points: "40 Units",
    status: "Available",
    statusClass: "bg-surface-container text-on-surface",
    type: "Quiz",
    description: "Online quiz covering consensus algorithms including Paxos, Raft, and Byzantine Fault Tolerance. Estimated time: 30 minutes. Late submissions will incur a penalty.",
    requirements: [
      "Understand the Paxos consensus protocol phases",
      "Compare Raft and Paxos in terms of understandability and performance",
      "Explain Byzantine Fault Tolerance and the Byzantine Generals problem",
      "Analyze fault tolerance guarantees of each protocol",
    ],
    rubric: [
      { criteria: "Knowledge", weight: "50%", description: "Correct understanding of consensus protocols" },
      { criteria: "Analysis", weight: "30%", description: "Ability to compare and evaluate protocols" },
      { criteria: "Application", weight: "20%", description: "Apply concepts to new scenarios" },
    ],
    resources: [
      { name: "Raft Visualization (thesecretlivesofdata.com)", type: "Interactive" },
      { name: "Paxos Made Simple (Lamport)", type: "Paper" },
    ],
    instructorNote: "The quiz is open-note but timed. Review the lecture recordings on Raft leader election.",
    instructor: "Prof. Elena Richardson",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDZRSMGnBh_YUaFh5kBeXokD6qQUXOxbG65jHIuWuBkd-bZOK7oHDap4vZXrXwG7d0BC6MOEWqcNuVTHzF938psUARm2BmbLKttLF_g-GjUfMRJ_7IECm6LH40KPb0dRO3s2V7LLrDzC-sr65CEiLiEJHdxczg36gPLgdWVZ25gok1tAYg0jHaLRhwqk9lBRC6oNvxV31Il17XADu5GJFte5Y49oCyxliaXejGgT74IeWfeSYi_QisyWWv6EEKfv8BEEsYA9_ZjR-bm",
  },
  "rsa-implementation-lab": {
    title: "Cryptography: RSA Implementation Lab",
    course: "CS405 • Cryptography",
    courseId: "advanced-data-structures",
    icon: "code",
    deadline: "Oct 21, 2024",
    points: "100 Units",
    status: "Urgent",
    statusClass: "bg-error-container text-on-error-container",
    type: "Lab",
    description: "Implement the RSA public-key cryptosystem from scratch. Your implementation must include key generation, encryption, and decryption. Submit as a .zip file.",
    requirements: [
      "Implement prime number generation using Miller-Rabin primality test",
      "RSA key pair generation (public + private keys)",
      "Encryption and decryption functions",
      "Digital signature generation and verification",
      "Include at least 10 test cases with automated testing",
    ],
    rubric: [
      { criteria: "Key Generation", weight: "25%", description: "Correct prime generation and key pair creation" },
      { criteria: "Encryption/Decryption", weight: "30%", description: "Correct RSA operations" },
      { criteria: "Signatures", weight: "25%", description: "Working digital signature scheme" },
      { criteria: "Testing & Docs", weight: "20%", description: "Comprehensive tests and documentation" },
    ],
    resources: [
      { name: "NIST FIPS 186-5", type: "Standard" },
      { name: "Handbook of Applied Cryptography Ch. 8", type: "Textbook" },
    ],
    instructorNote: "Use Python's built-in big integer support. Do NOT use any cryptography libraries — the goal is understanding the math.",
    instructor: "Prof. Elena Richardson",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDZRSMGnBh_YUaFh5kBeXokD6qQUXOxbG65jHIuWuBkd-bZOK7oHDap4vZXrXwG7d0BC6MOEWqcNuVTHzF938psUARm2BmbLKttLF_g-GjUfMRJ_7IECm6LH40KPb0dRO3s2V7LLrDzC-sr65CEiLiEJHdxczg36gPLgdWVZ25gok1tAYg0jHaLRhwqk9lBRC6oNvxV31Il17XADu5GJFte5Y49oCyxliaXejGgT74IeWfeSYi_QisyWWv6EEKfv8BEEsYA9_ZjR-bm",
  },
  "lexical-analysis": {
    title: "Compiler Design: Lexical Analysis",
    course: "CS408 • Compiler Design",
    courseId: "advanced-data-structures",
    icon: "check_circle",
    deadline: "Oct 18, 2024",
    points: "60 Units",
    status: "Submitted",
    statusClass: "bg-surface-container-high text-secondary",
    type: "Lab",
    submitted: true,
    submittedDate: "Oct 18, 2024 at 10:42 PM",
    description: "Build a lexical analyzer (tokenizer) for a simplified programming language. The lexer should handle keywords, identifiers, operators, literals, and comments.",
    requirements: [
      "Tokenize keywords, identifiers, and operators",
      "Handle string and numeric literals",
      "Support single-line and multi-line comments",
      "Error reporting for invalid tokens with line numbers",
      "Generate a token stream output file",
    ],
    rubric: [
      { criteria: "Tokenization", weight: "40%", description: "Correctly identifies all token types" },
      { criteria: "Error Handling", weight: "20%", description: "Graceful error reporting with context" },
      { criteria: "Edge Cases", weight: "20%", description: "Handles nested comments, escape sequences" },
      { criteria: "Code Quality", weight: "20%", description: "Clean state machine implementation" },
    ],
    resources: [
      { name: "Dragon Book Ch. 3: Lexical Analysis", type: "Textbook" },
    ],
    instructorNote: "Good submission. Awaiting grade.",
    instructor: "Prof. Elena Richardson",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDZRSMGnBh_YUaFh5kBeXokD6qQUXOxbG65jHIuWuBkd-bZOK7oHDap4vZXrXwG7d0BC6MOEWqcNuVTHzF938psUARm2BmbLKttLF_g-GjUfMRJ_7IECm6LH40KPb0dRO3s2V7LLrDzC-sr65CEiLiEJHdxczg36gPLgdWVZ25gok1tAYg0jHaLRhwqk9lBRC6oNvxV31Il17XADu5GJFte5Y49oCyxliaXejGgT74IeWfeSYi_QisyWWv6EEKfv8BEEsYA9_ZjR-bm",
  },
  "ethics-weekly-reflection": {
    title: "Ethics in AI: Weekly Reflection",
    course: "CS450 • Neural Networks & Deep Learning",
    courseId: "neural-networks",
    icon: "edit_note",
    deadline: "Oct 27, 2024 • 11:59 PM",
    points: "20 Units",
    status: "Available",
    statusClass: "bg-surface-container text-on-surface",
    type: "Reflection",
    description: "Write a 500-word reflection on the ethical implications of the AI topic covered this week. Consider perspectives from multiple stakeholders and propose thoughtful guidelines.",
    requirements: [
      "500-word minimum reflection essay",
      "Address at least 2 ethical frameworks (e.g., utilitarian, deontological)",
      "Include real-world case study references",
      "Propose actionable ethical guidelines",
    ],
    rubric: [
      { criteria: "Depth of Analysis", weight: "40%", description: "Thoughtful engagement with ethical questions" },
      { criteria: "Framework Application", weight: "30%", description: "Correct use of ethical frameworks" },
      { criteria: "Writing Quality", weight: "20%", description: "Clear, well-structured prose" },
      { criteria: "References", weight: "10%", description: "Relevant and properly cited sources" },
    ],
    resources: [
      { name: "AI Ethics: A Textbook (DRAFT)", type: "Textbook" },
    ],
    instructorNote: "Be bold with your opinions — this is a reflection, not a research paper.",
    instructor: "Dr. Elena Rodriguez",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBrokmwUiV-lF_Q2s_AJdRcqWrEX1W0I3S8WeNIy-0J6MDOSz0gy4daMv923SNUpfjbKgDV656CxKBHnAmWYfJ1Ak5xfObdg_WYYblG4Gdk29E9RPccoSJjzQXJ5IyqFHGo_I7E_osLYTTBw-hlRKV0WtbYprqbzp4QA7zTtZiD-ItQP_-DwU6Boo_SdyqylZr1-UBBMHZlvOsN7eb3KLxI4pwtTjX3QXTDMUjPNmHD1-KGELrEqoA4kSIRx3n2Blfy3NqyyEcXIxEC",
  },
};

export default function AssignmentDetailPage() {
  const { assignmentId } = useParams();
  const assignment = assignmentsData[assignmentId];
  const [showSubmitModal, setShowSubmitModal] = useState(false);

  if (!assignment) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-12">
        <span className="material-symbols-outlined text-6xl text-outline-variant mb-6">assignment_late</span>
        <h1 className="text-3xl font-extrabold font-manrope mb-4">Assignment Not Found</h1>
        <p className="text-on-surface-variant mb-8">This assignment doesn't exist or has been archived.</p>
        <Link to="/assignments" className="px-8 py-3 linear-soul text-on-primary rounded-full font-manrope font-bold text-sm">
          View All Assignments
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8 lg:p-12">
      {/* Breadcrumb */}
      <nav className="flex space-x-2 text-xs font-medium text-on-surface-variant mb-6">
        <Link to="/dashboard" className="hover:text-primary transition-colors">LMS</Link>
        <span className="opacity-30">/</span>
        <Link to="/assignments" className="hover:text-primary transition-colors">Assignments</Link>
        <span className="opacity-30">/</span>
        <span className="text-primary font-semibold">{assignment.type}</span>
      </nav>

      <div className="grid grid-cols-12 gap-8">
        {/* Main Content */}
        <div className="col-span-12 lg:col-span-8 space-y-8">
          {/* Header */}
          <div className="bg-surface-container-lowest rounded-3xl p-8 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-1/3 h-full opacity-5 pointer-events-none">
              <img className="w-full h-full object-cover" src={assignment.img} alt="" />
            </div>
            <div className="relative z-10">
              <span className={`inline-block px-3 py-1 ${assignment.statusClass} text-xs font-bold rounded-full mb-4 uppercase tracking-widest`}>{assignment.status}</span>
              <h1 className="text-3xl lg:text-4xl font-extrabold font-manrope tracking-tight mb-3">{assignment.title}</h1>
              <p className="text-on-surface-variant mb-6">
                <Link to={`/courses/${assignment.courseId}`} className="hover:text-primary transition-colors">{assignment.course}</Link>
              </p>
              <div className="flex flex-wrap items-center gap-6">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-on-surface-variant text-lg">calendar_today</span>
                  <div>
                    <p className="text-[10px] text-on-surface-variant font-bold uppercase tracking-wider">Deadline</p>
                    <p className="text-sm font-bold">{assignment.deadline}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-on-surface-variant text-lg">star</span>
                  <div>
                    <p className="text-[10px] text-on-surface-variant font-bold uppercase tracking-wider">Points</p>
                    <p className="text-sm font-bold">{assignment.points}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-on-surface-variant text-lg">category</span>
                  <div>
                    <p className="text-[10px] text-on-surface-variant font-bold uppercase tracking-wider">Type</p>
                    <p className="text-sm font-bold">{assignment.type}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="bg-surface-container-lowest rounded-3xl p-8 shadow-sm">
            <h2 className="text-xl font-bold font-manrope mb-4">Description</h2>
            <p className="text-on-surface-variant leading-relaxed">{assignment.description}</p>
          </div>

          {/* Requirements */}
          <div className="bg-surface-container-lowest rounded-3xl p-8 shadow-sm">
            <h2 className="text-xl font-bold font-manrope mb-6">Requirements</h2>
            <div className="space-y-3">
              {assignment.requirements.map((req, i) => (
                <div key={i} className="flex items-start gap-3 p-3 bg-surface-container-low rounded-3xl">
                  <div className="w-6 h-6 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5">{i + 1}</div>
                  <p className="text-sm">{req}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Rubric */}
          <div className="bg-surface-container-lowest rounded-3xl p-8 shadow-sm">
            <h2 className="text-xl font-bold font-manrope mb-6">Grading Rubric</h2>
            <div className="space-y-4">
              {assignment.rubric.map((r) => (
                <div key={r.criteria} className="flex items-center gap-4">
                  <div className="w-20 text-right">
                    <span className="text-lg font-extrabold text-primary">{r.weight}</span>
                  </div>
                  <div className="flex-1 bg-surface-container-low p-4 rounded-3xl">
                    <h4 className="font-bold font-manrope text-sm mb-1">{r.criteria}</h4>
                    <p className="text-xs text-on-surface-variant">{r.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
          {/* Actions */}
          {!assignment.submitted ? (
            <div className="bg-surface-container-lowest rounded-3xl p-6 shadow-sm space-y-4">
              <button
                onClick={() => setShowSubmitModal(true)}
                className="w-full py-4 linear-soul text-on-primary rounded-full font-manrope font-bold text-sm flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-sm">upload_file</span>
                Start Submission
              </button>
              <button className="w-full py-3 bg-surface-container-high text-on-surface rounded-full font-manrope font-bold text-sm hover:bg-surface-container-highest transition-colors">
                Save Draft
              </button>
            </div>
          ) : (
            <div className="bg-secondary-container rounded-3xl p-6 text-on-secondary-container">
              <div className="flex items-center gap-3 mb-3">
                <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                <h3 className="font-bold font-manrope">Submitted</h3>
              </div>
              <p className="text-sm opacity-80">{assignment.submittedDate}</p>
              <p className="text-sm font-bold mt-2">Awaiting Grade</p>
            </div>
          )}

          {/* Instructor Note */}
          <div className="bg-tertiary-container rounded-3xl p-6 text-on-tertiary-container">
            <div className="flex items-center gap-2 mb-3">
              <span className="material-symbols-outlined">tips_and_updates</span>
              <h3 className="font-bold font-manrope text-sm">Instructor Tip</h3>
            </div>
            <p className="text-sm italic leading-relaxed opacity-90">"{assignment.instructorNote}"</p>
            <p className="text-xs font-bold mt-3 opacity-70">— {assignment.instructor}</p>
          </div>

          {/* Resources */}
          <div className="bg-surface-container-lowest rounded-3xl p-6 shadow-sm">
            <h3 className="font-bold font-manrope mb-4">Resources</h3>
            <div className="space-y-3">
              {assignment.resources.map((r) => (
                <div key={r.name} className="flex items-center gap-3 p-3 bg-surface-container-low rounded-3xl hover:bg-surface-container transition-colors cursor-pointer group">
                  <span className="material-symbols-outlined text-primary text-lg">
                    {r.type === "Paper" ? "article" : r.type === "Textbook" ? "menu_book" : r.type === "Code" ? "code" : r.type === "Template" ? "draft" : r.type === "Notes" ? "sticky_note_2" : r.type === "Practice" ? "exercise" : r.type === "Interactive" ? "touch_app" : "description"}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate group-hover:text-primary transition-colors">{r.name}</p>
                    <p className="text-[10px] text-on-surface-variant uppercase tracking-wider font-bold">{r.type}</p>
                  </div>
                  <span className="material-symbols-outlined text-outline-variant text-sm group-hover:text-primary transition-colors">open_in_new</span>
                </div>
              ))}
            </div>
          </div>

          {/* Related Course */}
          <Link to={`/courses/${assignment.courseId}`} className="block bg-surface-container-lowest rounded-3xl p-6 shadow-sm hover:bg-surface-bright transition-colors group">
            <p className="text-[10px] text-on-surface-variant font-bold uppercase tracking-wider mb-2">From Course</p>
            <h4 className="font-bold font-manrope group-hover:text-primary transition-colors">{assignment.course}</h4>
            <div className="flex items-center gap-1 mt-3 text-primary text-sm font-bold">
              <span>View Course</span>
              <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </div>
          </Link>
        </div>
      </div>

      {/* Submission Modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowSubmitModal(false)}>
          <div className="bg-surface-container-lowest rounded-3xl p-8 max-w-lg w-full shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold font-manrope">Submit Assignment</h2>
              <button onClick={() => setShowSubmitModal(false)} className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center hover:bg-surface-container-high transition-colors">
                <span className="material-symbols-outlined text-sm">close</span>
              </button>
            </div>
            <div className="border-2 border-dashed border-primary/20 rounded-3xl p-12 text-center mb-6 hover:border-primary/40 transition-colors cursor-pointer">
              <span className="material-symbols-outlined text-4xl text-primary mb-4">cloud_upload</span>
              <p className="font-bold font-manrope mb-1">Drop your files here</p>
              <p className="text-xs text-on-surface-variant">or click to browse • ZIP, PDF, PY up to 50MB</p>
            </div>
            <textarea className="w-full bg-surface-container-low border-none rounded-3xl px-4 py-3 text-on-surface placeholder:text-outline/50 focus:ring-2 focus:ring-primary/20 transition-all resize-none h-24 mb-6" placeholder="Add a note to your instructor (optional)..."></textarea>
            <div className="flex gap-3">
              <button onClick={() => setShowSubmitModal(false)} className="flex-1 py-3 bg-surface-container-high text-on-surface rounded-full font-manrope font-bold text-sm hover:bg-surface-container-highest transition-colors">Cancel</button>
              <button onClick={() => setShowSubmitModal(false)} className="flex-1 py-3 linear-soul text-on-primary rounded-full font-manrope font-bold text-sm">Submit</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
