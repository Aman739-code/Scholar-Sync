import { useParams, Link } from "react-router-dom";
import { useState } from "react";

const coursesData = {
  "advanced-algorithms": {
    title: "Advanced Algorithm Design",
    code: "CS304",
    instructor: "Prof. Aris",
    instructorImg: "https://lh3.googleusercontent.com/aida-public/AB6AXuDRBZP87-6fWfnOiu3pwx-lcydGvLvtAxs0Nt07Ct5TPmyBGpfVKI01RRlzxGRw7G7xuJGh3sSc-3Q8e0vlktUXGa1axYvhByKWQCBo427LzARRNvjEnRH_wFg7-j1uTdUSvHfcbLQtWJWTBovSFFi5OJTiMkBjR81YYCJQ2EOplGXHXdSwc-Slzb-qyf7CNbMiPGDeMz8E4S5rHu0qV7XhGZ-jM3fdOIpAaWhw8sgIExBWEh2arA0OSDl9O70rim5HvtX5hn45BjGt",
    banner: "https://lh3.googleusercontent.com/aida-public/AB6AXuCUHaBHXlzHDEtyptu3DyJXlOc6j-ybndPrZWC0LI_VQKrD1n-MjXcvRrQTketSSNVGg44IA-PZebGLBzR6LausEkxPH9OAjiAGL-PUM5x7Gl-obhQwN6I0cnaZz7W3O_tCjwcIj9QZVXbxzdvUR4WQSTxlLNejW8B-joa1YBZLvtqXj7p0G4FjuhS0ZAVlTU0oiwuPD2zuIGB6te2E5M8Zh4HOXfwfkOoSpAfHi0rNKzbTWSyhJKZdOOtS_Hen56ZUG8Hbiloct88y",
    progress: 75,
    badge: "In Progress",
    badgeClass: "bg-tertiary-container text-on-tertiary-container",
    units: "4 Units",
    semester: "Fall 2024",
    schedule: "Mon/Wed 10:00 AM – 11:30 AM",
    description: "This course explores advanced algorithmic paradigms including dynamic programming, greedy algorithms, graph algorithms, network flow, and computational complexity. Students will analyze, design, and implement algorithms to solve complex computational problems efficiently.",
    modules: [
      { title: "Asymptotic Analysis & Recurrences", status: "completed", duration: "2 weeks" },
      { title: "Divide & Conquer Strategies", status: "completed", duration: "2 weeks" },
      { title: "Dynamic Programming", status: "completed", duration: "3 weeks" },
      { title: "Greedy Algorithms & Matroids", status: "current", duration: "2 weeks" },
      { title: "Graph Algorithms & Network Flow", status: "upcoming", duration: "3 weeks" },
      { title: "NP-Completeness & Approximation", status: "upcoming", duration: "2 weeks" },
    ],
    announcements: [
      { date: "Oct 20", text: "Midterm grades posted. Class average: 82%. Well done!" },
      { date: "Oct 18", text: "Office hours moved to Thursday 3-5 PM this week only." },
    ],
  },
  "linear-algebra": {
    title: "Linear Algebra & Logic",
    code: "MA210",
    instructor: "Dr. Lin",
    instructorImg: "https://lh3.googleusercontent.com/aida-public/AB6AXuACzjNeAf251RR0JRdQGoH9m_KALs7WOZN-cxu9hj8co9BkA1yHX324oDLkrO1XqwSmisSaRC0ieI8cQvi7oD8ZAQpblw-mVouqWQbo8RzhEEzAjhT7tjqqnItKpR1DupmKgoXYmOPOD2YL3lCmdqMBaxbg9YkvF8mhMNCqjBuMtg4ob8Hq4UKEiOR4LuCNlCb4Ir2wOdXhdmJCPL302_wz2C292WRNvVCqmGG2IZcXsRpcMq2WnzVDBcihHLgQmv8MQ9iU-io_u0Wr",
    banner: "https://lh3.googleusercontent.com/aida-public/AB6AXuB3g2nm1i5r0C6MO59z0JZmGZuOW9W2Rd1Y2z1TYBAz_ly60YwOxZQuuljEWgAjVtdbdgSjImWFU1Tl2Oo7ZPJIJOf49etOv9VORPwt1Sp4ZkzVkwfV7LxzTTP18m5PJAy9HucqqL8bulkZPHQH3Hzp6e01p-mBIxwMB2_tC69ltULEokC5UEpWj0SO9PtfanTfJuqv5zJ_adxjR7wX8lcRIyUKnsLakE1xQiN3A5lnJQBL6yqq6xUEq7sV3VasYxjC3HxuNCgzI0x5",
    progress: 25,
    badge: "Next Up",
    badgeClass: "bg-secondary-container text-on-secondary-container",
    units: "3 Units",
    semester: "Fall 2024",
    schedule: "Tue/Thu 1:00 PM – 2:30 PM",
    description: "A rigorous introduction to linear algebra and mathematical logic. Topics include vector spaces, linear transformations, eigenvalues, propositional and predicate logic, and proofs. Emphasis on building mathematical maturity through both theory and application.",
    modules: [
      { title: "Systems of Linear Equations", status: "completed", duration: "2 weeks" },
      { title: "Vector Spaces & Subspaces", status: "current", duration: "3 weeks" },
      { title: "Linear Transformations", status: "upcoming", duration: "2 weeks" },
      { title: "Eigenvalues & Eigenvectors", status: "upcoming", duration: "3 weeks" },
      { title: "Propositional Logic", status: "upcoming", duration: "2 weeks" },
      { title: "Predicate Logic & Proofs", status: "upcoming", duration: "2 weeks" },
    ],
    announcements: [
      { date: "Oct 22", text: "Quiz 3 on Vector Spaces scheduled for October 27 (in class)." },
      { date: "Oct 15", text: "Homework 4 solutions posted on the resources section." },
    ],
  },
  "advanced-data-structures": {
    title: "Advanced Algorithms & Data Structures",
    code: "CS301",
    instructor: "Prof. Elena Richardson",
    instructorImg: "https://lh3.googleusercontent.com/aida-public/AB6AXuDRBZP87-6fWfnOiu3pwx-lcydGvLvtAxs0Nt07Ct5TPmyBGpfVKI01RRlzxGRw7G7xuJGh3sSc-3Q8e0vlktUXGa1axYvhByKWQCBo427LzARRNvjEnRH_wFg7-j1uTdUSvHfcbLQtWJWTBovSFFi5OJTiMkBjR81YYCJQ2EOplGXHXdSwc-Slzb-qyf7CNbMiPGDeMz8E4S5rHu0qV7XhGZ-jM3fdOIpAaWhw8sgIExBWEh2arA0OSDl9O70rim5HvtX5hn45BjGt",
    banner: "https://lh3.googleusercontent.com/aida-public/AB6AXuDZRSMGnBh_YUaFh5kBeXokD6qQUXOxbG65jHIuWuBkd-bZOK7oHDap4vZXrXwG7d0BC6MOEWqcNuVTHzF938psUARm2BmbLKttLF_g-GjUfMRJ_7IECm6LH40KPb0dRO3s2V7LLrDzC-sr65CEiLiEJHdxczg36gPLgdWVZ25gok1tAYg0jHaLRhwqk9lBRC6oNvxV31Il17XADu5GJFte5Y49oCyxliaXejGgT74IeWfeSYi_QisyWWv6EEKfv8BEEsYA9_ZjR-bm",
    progress: 64,
    badge: "In Progress",
    badgeClass: "bg-primary/10 text-primary",
    units: "4 Units",
    semester: "Fall 2024",
    schedule: "Mon/Wed/Fri 9:00 AM – 10:00 AM",
    description: "An intensive exploration of advanced data structures and algorithmic techniques. Covers B-Trees, Red-Black Trees, hash tables, graph algorithms, amortized analysis, and randomized algorithms. Includes substantial programming assignments.",
    modules: [
      { title: "B-Trees & Balanced Search Trees", status: "completed", duration: "3 weeks" },
      { title: "Hash Tables & Collision Resolution", status: "completed", duration: "2 weeks" },
      { title: "Graph Traversals & Shortest Paths", status: "completed", duration: "3 weeks" },
      { title: "Minimum Spanning Trees", status: "current", duration: "2 weeks" },
      { title: "Amortized Analysis", status: "upcoming", duration: "2 weeks" },
      { title: "Randomized Algorithms", status: "upcoming", duration: "2 weeks" },
    ],
    announcements: [
      { date: "Oct 21", text: "Lab 5 on MST algorithms is now available. Due Nov 1." },
      { date: "Oct 17", text: "Midterm exam results: Class median 78/100. Great work!" },
    ],
  },
  "discrete-math": {
    title: "Discrete Mathematical Structures",
    code: "MATH204",
    instructor: "Prof. Marcus Thorne",
    instructorImg: "https://lh3.googleusercontent.com/aida-public/AB6AXuBuamVIWEfVPxILw9TqCZuOYOS4oiYAGO9iSVRRyZLKigGXiO4Dj-Cu08waGxxvKmjVjm8LU8QuCDUo3sxDYrYQxfVQ48nzRtpiv38h3VUrJo8hbz0CFZnUhNe8PACf8ry2I20XXGdkqscKGDgNNFyK3esCMX_fC5TDyopDvJLRe-FH91wAX7ShQYffji1DARfzimjaqFeBtdAMHuTv1yd3JZwkmGY5VkPOLtdYsXPFuC-TY364uJwNNt29jegoHA4VbQRBkkoO8Va9",
    banner: "https://lh3.googleusercontent.com/aida-public/AB6AXuAh0Hvr25SsEcLEQk930JQU2dMAaY0zEK2hgvVInCfd3njtDZve0W3W5QRivHlvk0btpPgkc5_WxVhrEDwwEX7v6HCgTI5H_Bp30QWT4rHutGn2PRuhKLv6DSY0QSZfgCs2U-wp13cxsIlPNysT0NP1AF4Ry12v-FOvPtvO7Vr7tqurJTWP2aHQ3GWfDA0M8ZjswAWVEWRGFp6cM_CBVL5J8EPMHYTBgYp_9mDYlSR3TQ12efI3VpYb91-CgjHYYx6J6NgpsAaFOhYg",
    progress: 42,
    badge: "Midterm Season",
    badgeClass: "bg-tertiary-container text-on-tertiary-container",
    units: "3 Units",
    semester: "Fall 2024",
    schedule: "Tue/Thu 10:00 AM – 11:30 AM",
    description: "A foundational course in discrete mathematics covering combinatorics, graph theory, number theory, set theory, relations, and formal proof techniques. Essential for computer science and mathematics students.",
    modules: [
      { title: "Set Theory & Logic", status: "completed", duration: "2 weeks" },
      { title: "Combinatorics & Counting", status: "completed", duration: "3 weeks" },
      { title: "Graph Theory Fundamentals", status: "current", duration: "3 weeks" },
      { title: "Number Theory & Modular Arithmetic", status: "upcoming", duration: "2 weeks" },
      { title: "Relations & Functions", status: "upcoming", duration: "2 weeks" },
      { title: "Formal Proofs & Induction", status: "upcoming", duration: "2 weeks" },
    ],
    announcements: [
      { date: "Oct 23", text: "Midterm exam: November 3 in class. Review sheet provided." },
      { date: "Oct 19", text: "Study groups for midterm prep available in the Forum." },
    ],
  },
  "info-systems": {
    title: "Global Information Systems",
    code: "INFO102",
    instructor: "Prof. Sarah Jenkins",
    instructorImg: "https://lh3.googleusercontent.com/aida-public/AB6AXuCgnL857GFMk9L7ji2FEgcy6-4MCXfOr_apI3EhPwxRQxTQoyroXZdEYILCkd96XZKNhuORO3hthssoBFqnLQeVnU6MxgTRcIyWWVAfB2QAYngTebOqZIfRHZCANL4CPXWf8pgEx7CHhAVOtgCQG_jsHE36lcLZcgEXV2BV-TPoBZATsveYhTgbuzNc4_HcENF89_QlunrQa4C1MXmKG_H3nNf4MvWYXpMLUMJ7nUfekUBTZtvjSsNU8QqYqDxPkRUOopSDSv4XRDDh",
    banner: "https://lh3.googleusercontent.com/aida-public/AB6AXuDv4U9BHWEmwABDldKtQoETJV3f_z34SvMxsroPoeaD3wXNkwP7cKFE8Q4SLahTmmMR5tzGUu4Af9lJrngvOk2BhdavaQDbUTG64U9VQjuTAgJ2V9HYLle8XVTVAfTy9Wv0KrkF-p-1SqN1h27uXKgtQO5SAS5y-0As5_07slrd2-JxK9kGvGK9hnbyYP5smwnRscT3Z898deIC7R_ZpuTJ-fGldeaUe2kMSsJRIA2vC3773eHP5iZfSYxN4g8Y75poiBhFs1H_aeVu",
    progress: 88,
    badge: "Up Next: Lab",
    badgeClass: "bg-secondary-container text-on-secondary-container",
    units: "3 Units",
    semester: "Fall 2024",
    schedule: "Wed/Fri 2:00 PM – 3:30 PM",
    description: "Examines how global organizations leverage information systems for strategic advantage. Topics include ERP systems, cloud computing, cybersecurity, data governance, and the societal impact of IT across different cultures and economies.",
    modules: [
      { title: "Foundations of Information Systems", status: "completed", duration: "2 weeks" },
      { title: "Enterprise Resource Planning", status: "completed", duration: "2 weeks" },
      { title: "Cloud Computing & Infrastructure", status: "completed", duration: "3 weeks" },
      { title: "Cybersecurity Fundamentals", status: "completed", duration: "2 weeks" },
      { title: "Data Governance & Compliance", status: "current", duration: "2 weeks" },
      { title: "Global IT Strategy & Ethics", status: "upcoming", duration: "3 weeks" },
    ],
    announcements: [
      { date: "Oct 22", text: "Final project proposals due November 10. See rubric." },
      { date: "Oct 20", text: "Guest lecture by AWS Solutions Architect on Friday." },
    ],
  },
  "neural-networks": {
    title: "Neural Networks & Deep Learning Essentials",
    code: "CS450",
    instructor: "Dr. Elena Rodriguez",
    instructorImg: "https://lh3.googleusercontent.com/aida-public/AB6AXuBZzP3drDySh-AmjqEK5H2G4TirlEosFOxVwzWPT1gChSPe-Stj0mreexu0vtCKwwQNzJbn8FiESlngFQEmdYvs9NaJpCygYSkhwbhMBNNAuN1Blv01AGBkawwSK84sYWrcnBSqLRpogWVokzQ3CdUnkBj9lf9TjDmzwdGtDuI8nVTX7M6FHX3W5IEiuiRGQfgwcXOVtgqCnoB7QwqLx1W9qAGaEHJy-QBQnBG_sJ2AJpv_WRfcTS71UotShN3yuHdpLavwxYBfnNRZ",
    banner: "https://lh3.googleusercontent.com/aida-public/AB6AXuBrokmwUiV-lF_Q2s_AJdRcqWrEX1W0I3S8WeNIy-0J6MDOSz0gy4daMv923SNUpfjbKgDV656CxKBHnAmWYfJ1Ak5xfObdg_WYYblG4Gdk29E9RPccoSJjzQXJ5IyqFHGo_I7E_osLYTTBw-hlRKV0WtbYprqbzp4QA7zTtZiD-ItQP_-DwU6Boo_SdyqylZr1-UBBMHZlvOsN7eb3KLxI4pwtTjX3QXTDMUjPNmHD1-KGELrEqoA4kSIRx3n2Blfy3NqyyEcXIxEC",
    progress: 0,
    badge: "Recommended",
    badgeClass: "bg-primary-container text-on-primary-container",
    units: "4 Units",
    semester: "Spring 2025",
    schedule: "To be announced",
    description: "A deep dive into the foundations of modern AI. Covers perceptrons, backpropagation, convolutional networks, recurrent networks, transformers, and generative models. Recommended for CS track students with interest in AI/ML.",
    modules: [
      { title: "Perceptrons & Activation Functions", status: "upcoming", duration: "2 weeks" },
      { title: "Backpropagation & Optimization", status: "upcoming", duration: "3 weeks" },
      { title: "Convolutional Neural Networks", status: "upcoming", duration: "3 weeks" },
      { title: "Recurrent Networks & LSTMs", status: "upcoming", duration: "2 weeks" },
      { title: "Transformers & Attention", status: "upcoming", duration: "3 weeks" },
      { title: "Generative Models & GANs", status: "upcoming", duration: "2 weeks" },
    ],
    announcements: [
      { date: "—", text: "Course begins Spring 2025. Pre-registration now open." },
    ],
  },
  "quantum-computing": {
    title: "Advanced Quantum Computing",
    code: "CS480",
    instructor: "Dr. Elena Rodriguez",
    instructorImg: "https://lh3.googleusercontent.com/aida-public/AB6AXuBZzP3drDySh-AmjqEK5H2G4TirlEosFOxVwzWPT1gChSPe-Stj0mreexu0vtCKwwQNzJbn8FiESlngFQEmdYvs9NaJpCygYSkhwbhMBNNAuN1Blv01AGBkawwSK84sYWrcnBSqLRpogWVokzQ3CdUnkBj9lf9TjDmzwdGtDuI8nVTX7M6FHX3W5IEiuiRGQfgwcXOVtgqCnoB7QwqLx1W9qAGaEHJy-QBQnBG_sJ2AJpv_WRfcTS71UotShN3yuHdpLavwxYBfnNRZ",
    banner: "https://lh3.googleusercontent.com/aida-public/AB6AXuBrokmwUiV-lF_Q2s_AJdRcqWrEX1W0I3S8WeNIy-0J6MDOSz0gy4daMv923SNUpfjbKgDV656CxKBHnAmWYfJ1Ak5xfObdg_WYYblG4Gdk29E9RPccoSJjzQXJ5IyqFHGo_I7E_osLYTTBw-hlRKV0WtbYprqbzp4QA7zTtZiD-ItQP_-DwU6Boo_SdyqylZr1-UBBMHZlvOsN7eb3KLxI4pwtTjX3QXTDMUjPNmHD1-KGELrEqoA4kSIRx3n2Blfy3NqyyEcXIxEC",
    progress: 0,
    badge: "Best Seller",
    badgeClass: "bg-tertiary-container text-on-tertiary-container",
    units: "4 Units",
    semester: "Spring 2025",
    schedule: "To be announced",
    description: "A comprehensive deep-dive into qubit manipulation and quantum algorithmic structures for senior researchers. Covers quantum gates, entanglement, Shor's algorithm, quantum error correction, and quantum machine learning.",
    modules: [
      { title: "Quantum Mechanics Foundations", status: "upcoming", duration: "2 weeks" },
      { title: "Qubits & Quantum Gates", status: "upcoming", duration: "3 weeks" },
      { title: "Quantum Entanglement", status: "upcoming", duration: "2 weeks" },
      { title: "Shor's & Grover's Algorithms", status: "upcoming", duration: "3 weeks" },
      { title: "Quantum Error Correction", status: "upcoming", duration: "2 weeks" },
      { title: "Quantum Machine Learning", status: "upcoming", duration: "3 weeks" },
    ],
    announcements: [
      { date: "—", text: "Course begins Spring 2025. Prerequisites: Linear Algebra, CS301." },
    ],
  },
};

const statusIcon = { completed: "check_circle", current: "play_circle", upcoming: "radio_button_unchecked" };
const statusColor = { completed: "text-primary", current: "text-tertiary", upcoming: "text-outline-variant" };
const statusLabel = { completed: "Completed", current: "In Progress", upcoming: "Upcoming" };

export default function CourseDetailPage() {
  const { courseId } = useParams();
  const course = coursesData[courseId];
  const [activeTab, setActiveTab] = useState("modules");

  if (!course) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-12">
        <span className="material-symbols-outlined text-6xl text-outline-variant mb-6">search_off</span>
        <h1 className="text-3xl font-extrabold font-manrope mb-4">Course Not Found</h1>
        <p className="text-on-surface-variant mb-8">The course you're looking for doesn't exist or has been moved.</p>
        <Link to="/courses" className="px-8 py-3 linear-soul text-on-primary rounded-full font-manrope font-bold text-sm">
          Browse All Courses
        </Link>
      </div>
    );
  }

  const completedModules = course.modules.filter((m) => m.status === "completed").length;

  return (
    <div className="min-h-screen">
      {/* Hero Banner */}
      <div className="relative h-72 overflow-hidden">
        <img src={course.banner} alt={course.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/60 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 px-12 pb-8">
          <nav className="flex space-x-2 text-xs font-medium text-on-surface-variant mb-3">
            <Link to="/dashboard" className="hover:text-primary transition-colors">LMS</Link>
            <span className="opacity-30">/</span>
            <Link to="/courses" className="hover:text-primary transition-colors">Courses</Link>
            <span className="opacity-30">/</span>
            <span className="text-primary font-semibold">{course.code}</span>
          </nav>
          <div className="flex items-end justify-between">
            <div>
              <span className={`${course.badgeClass} text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest`}>{course.badge}</span>
              <h1 className="text-4xl font-extrabold font-manrope tracking-tight text-on-surface mt-3">{course.title}</h1>
              <p className="text-on-surface-variant mt-1">{course.code} • {course.instructor} • {course.units}</p>
            </div>
            <div className="flex gap-3">
              <button className="px-6 py-3 bg-surface-container-highest text-on-surface rounded-full font-manrope font-bold text-sm hover:bg-surface-container-high transition-colors flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">forum</span>
                Discussion
              </button>
              <button className="px-6 py-3 linear-soul text-on-primary rounded-full font-manrope font-bold text-sm flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">play_arrow</span>
                Continue Learning
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="px-12 pb-20">
        {/* Progress Overview */}
        <section className="grid grid-cols-12 gap-6 mt-8">
          <div className="col-span-12 lg:col-span-8 bg-surface-container-lowest rounded-3xl p-8 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold font-manrope">Course Progress</h2>
              <span className="text-primary font-bold text-sm">{course.progress}% Complete</span>
            </div>
            <div className="h-2 w-full bg-surface-container-high rounded-full overflow-hidden mb-6">
              <div className="h-full bg-primary rounded-full transition-all duration-700" style={{ width: `${course.progress}%` }}></div>
            </div>
            <div className="grid grid-cols-3 gap-6">
              <div className="bg-surface-container-low p-4 rounded-3xl text-center">
                <p className="text-2xl font-extrabold font-manrope text-primary">{completedModules}</p>
                <p className="text-xs text-on-surface-variant font-bold uppercase tracking-wider mt-1">Completed</p>
              </div>
              <div className="bg-surface-container-low p-4 rounded-3xl text-center">
                <p className="text-2xl font-extrabold font-manrope text-tertiary">{course.modules.filter((m) => m.status === "current").length}</p>
                <p className="text-xs text-on-surface-variant font-bold uppercase tracking-wider mt-1">In Progress</p>
              </div>
              <div className="bg-surface-container-low p-4 rounded-3xl text-center">
                <p className="text-2xl font-extrabold font-manrope text-on-surface-variant">{course.modules.filter((m) => m.status === "upcoming").length}</p>
                <p className="text-xs text-on-surface-variant font-bold uppercase tracking-wider mt-1">Remaining</p>
              </div>
            </div>
          </div>
          <div className="col-span-12 lg:col-span-4 space-y-6">
            <div className="bg-surface-container-lowest rounded-3xl p-6 shadow-sm flex items-center gap-4">
              <img src={course.instructorImg} alt={course.instructor} className="w-14 h-14 rounded-full object-cover" />
              <div>
                <p className="font-bold font-manrope">{course.instructor}</p>
                <p className="text-xs text-on-surface-variant">Instructor</p>
              </div>
            </div>
            <div className="bg-surface-container-lowest rounded-3xl p-6 shadow-sm space-y-4">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-on-surface-variant">calendar_today</span>
                <div>
                  <p className="text-xs text-on-surface-variant font-bold uppercase tracking-wider">Schedule</p>
                  <p className="text-sm font-medium">{course.schedule}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-on-surface-variant">school</span>
                <div>
                  <p className="text-xs text-on-surface-variant font-bold uppercase tracking-wider">Semester</p>
                  <p className="text-sm font-medium">{course.semester}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-on-surface-variant">token</span>
                <div>
                  <p className="text-xs text-on-surface-variant font-bold uppercase tracking-wider">Credits</p>
                  <p className="text-sm font-medium">{course.units}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tabs */}
        <section className="mt-12">
          <div className="flex items-center space-x-10 mb-8 border-b border-surface-container-high pb-4">
            {["modules", "about", "announcements"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`font-manrope font-bold capitalize pb-4 -mb-4 relative transition-colors ${activeTab === tab ? "text-primary border-b-2 border-primary" : "text-on-surface-variant hover:text-on-surface"}`}
              >
                {tab === "modules" ? `Modules (${course.modules.length})` : tab === "announcements" ? `Announcements (${course.announcements.length})` : "About"}
              </button>
            ))}
          </div>

          {/* Modules Tab */}
          {activeTab === "modules" && (
            <div className="space-y-4">
              {course.modules.map((mod, i) => (
                <div
                  key={mod.title}
                  className={`bg-surface-container-lowest rounded-3xl p-6 flex items-center justify-between group hover:bg-surface-bright transition-colors ${mod.status === "upcoming" ? "opacity-60" : ""}`}
                >
                  <div className="flex items-center gap-5">
                    <div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center">
                      <span className={`material-symbols-outlined ${statusColor[mod.status]}`} style={mod.status === "completed" ? { fontVariationSettings: "'FILL' 1" } : undefined}>
                        {statusIcon[mod.status]}
                      </span>
                    </div>
                    <div>
                      <p className="text-xs text-on-surface-variant font-bold uppercase tracking-wider">Module {i + 1} • {mod.duration}</p>
                      <h3 className="font-bold font-manrope text-lg group-hover:text-primary transition-colors">{mod.title}</h3>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className={`px-3 py-1 text-[10px] font-bold rounded-full uppercase tracking-wider ${mod.status === "completed" ? "bg-primary/10 text-primary" : mod.status === "current" ? "bg-tertiary-container text-on-tertiary-container" : "bg-surface-container text-on-surface-variant"}`}>
                      {statusLabel[mod.status]}
                    </span>
                    <span className="material-symbols-outlined text-outline-variant group-hover:text-primary transition-colors">chevron_right</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* About Tab */}
          {activeTab === "about" && (
            <div className="bg-surface-container-lowest rounded-3xl p-8 shadow-sm max-w-3xl">
              <h3 className="text-xl font-bold font-manrope mb-4">Course Description</h3>
              <p className="text-on-surface-variant leading-relaxed mb-8">{course.description}</p>
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-surface-container-low p-6 rounded-3xl">
                  <span className="material-symbols-outlined text-primary text-3xl mb-3">menu_book</span>
                  <h4 className="font-bold font-manrope mb-1">Prerequisites</h4>
                  <p className="text-sm text-on-surface-variant">Introduction to Programming, Calculus I</p>
                </div>
                <div className="bg-surface-container-low p-6 rounded-3xl">
                  <span className="material-symbols-outlined text-primary text-3xl mb-3">workspace_premium</span>
                  <h4 className="font-bold font-manrope mb-1">Assessment</h4>
                  <p className="text-sm text-on-surface-variant">Assignments 30%, Midterm 30%, Final 40%</p>
                </div>
              </div>
            </div>
          )}

          {/* Announcements Tab */}
          {activeTab === "announcements" && (
            <div className="space-y-4 max-w-3xl">
              {course.announcements.map((a, i) => (
                <div key={i} className="bg-surface-container-lowest rounded-3xl p-6 flex gap-4 items-start shadow-sm">
                  <div className="w-12 h-12 rounded-3xl bg-primary-container text-on-primary-container flex flex-col items-center justify-center flex-shrink-0">
                    <span className="text-xs font-bold leading-none">{a.date}</span>
                  </div>
                  <div>
                    <p className="font-medium">{a.text}</p>
                    <p className="text-xs text-on-surface-variant mt-2">Posted by {course.instructor}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
