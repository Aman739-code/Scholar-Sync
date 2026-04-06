import { useParams, Link } from "react-router-dom";

const libraryData = {
  "neural-design": {
    title: "Principles of Neural Design",
    author: "Peter Sterling & Simon Laughlin",
    year: "2021",
    type: "Textbook",
    typeBg: "bg-tertiary-container text-on-tertiary-container",
    pages: 480,
    currentPage: 142,
    category: "Neuroscience",
    isbn: "978-0-262-53468-0",
    publisher: "MIT Press",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCOPjirJSPJ4aifofM6qdz6VSYl1RcQooTrsQwkbZAjrEKWKWswlkXEH0n4eM8WbvfzMn-enHY0rJX1O_HDHRH20mXmlmlQj3DwJecTEOSr0AO8fLKtg9porZT_aAZIW6oIXh33SSSoLkdFmEsVNVdQBqGFSXJwQlDypMP4DUkSSpDGHbYX2BFdhMa0CA7ppu4z2MNDBf1mzmSrDkgHaUfqcH8iozkFBnZlwGOhvGjYm842BrwVYYx6VApSQ8ou28m1j1pNyPzbWysq",
    description: "A comprehensive exploration of why neural systems are designed the way they are. This book reveals the engineering principles governing how organisms process information, from single neurons to complex brains. Essential reading for computational neuroscience students.",
    chapters: [
      { title: "Why an Animal Needs a Brain", pages: "1-22", read: true },
      { title: "What Engineers Know About Design", pages: "23-48", read: true },
      { title: "Why Use Analogue?", pages: "49-84", read: true },
      { title: "The Principles of Efficient Transport", pages: "85-120", read: true },
      { title: "How Neurons Manage Space", pages: "121-160", read: false },
      { title: "Information Processing", pages: "161-210", read: false },
      { title: "Neural Circuits", pages: "211-265", read: false },
      { title: "The Design of Retina", pages: "266-320", read: false },
    ],
    relatedResources: [
      { title: "Computational Neuroscience (Dayan & Abbott)", type: "Textbook" },
      { title: "Neural Engineering (Eliasmith)", type: "Textbook" },
    ],
  },
  "quantum-computing-ethics": {
    title: "Quantum Computing Ethics",
    author: "MIT Technology Review",
    year: "Vol 14, 2024",
    type: "Journal",
    typeBg: "bg-primary-container text-on-primary-container",
    pages: 32,
    currentPage: 32,
    category: "Computer Science",
    isbn: "ISSN 0040-1692",
    publisher: "MIT Technology Review",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDeeUhpyHPm_T9i8c55WuQ2WaHNB0iV3D9eaunNPEwfi9-t46EKIKHSh4YPRfT3SB-y285DxYvlLuFiwEDpA-iGUxjjl9jdthFCpmPZaEul2o5UyGXg6m7Pc7k89sQ7VxHs8CiuJyJFvPOT-GUVLGQgjxd_WPqIvlQfT13RakEPUVyE95QZv10X66Ov5P6e5cpk8AoE1XI4GSLXQgDilbncSDyHUQDDt-cz8hWxR3z-MH5yqWEAUWk2ayXzY7eLOm5SIozAuTg9Ivjk",
    description: "A special issue exploring the ethical dimensions of quantum computing, including impacts on cryptography, drug discovery, financial modeling, and societal inequalities in access to quantum resources.",
    chapters: [
      { title: "The Quantum Computing Landscape 2024", pages: "1-6", read: true },
      { title: "Ethics of Quantum Supremacy", pages: "7-14", read: true },
      { title: "Post-Quantum Cryptography: Who's at Risk?", pages: "15-22", read: true },
      { title: "Quantum Access and Digital Divide", pages: "23-32", read: true },
    ],
    relatedResources: [
      { title: "Quantum Computing Since Democritus (Aaronson)", type: "Textbook" },
      { title: "IEEE Quantum Ethics Workshop 2024", type: "Conference" },
    ],
  },
  "algorithm-design-video": {
    title: "Advanced Algorithm Design — Lecture 14",
    author: "Dr. Sarah Jenkins • Stanford University",
    year: "2024",
    type: "Video Lecture",
    typeBg: "bg-secondary-container text-on-secondary-container",
    duration: "35:00",
    currentTime: "14:02",
    category: "Computer Science",
    series: "CS161 — Stanford Engineering",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCmuiIE9TP9TiUUNPUwTdBp_z4tClOj-6zwFXEqjOZIDOEntTXUyjJhqaRrv0Dnba4E7lYLHaVeSn2Xwh_okFaMUj4tkekeyyxk1iy6miNu0cE_6nm_BXu_nzY_V6wIhf78x6bMwBMBkgz3_bHveYC8mdy3zC1e144WYTVaudsaF-XKsp6XseH1PCRIDX06x_BZUuC8YqGZQVaLXn6KCjTWcBun2A6IKBtbmh8yyCK4WBKgODk75V7ASj6ayArn-LiqTElgu53aiimS",
    description: "Lecture 14 covers advanced dynamic programming techniques including the Bellman-Ford algorithm, all-pairs shortest paths (Floyd-Warshall), and an introduction to linear programming as a generalization of network flow.",
    chapters: [
      { title: "Recap: Single-Source Shortest Paths", timestamp: "0:00", watched: true },
      { title: "Bellman-Ford Algorithm", timestamp: "4:30", watched: true },
      { title: "Detecting Negative Cycles", timestamp: "12:15", watched: true },
      { title: "Floyd-Warshall Algorithm", timestamp: "14:02", watched: false },
      { title: "Applications & Analysis", timestamp: "22:00", watched: false },
      { title: "Introduction to Linear Programming", timestamp: "28:30", watched: false },
    ],
    relatedResources: [
      { title: "Lecture 13: Shortest Paths I", type: "Video" },
      { title: "Lecture 15: LP Duality", type: "Video" },
      { title: "CLRS Ch. 24-25: Shortest Paths", type: "Textbook" },
    ],
  },
  "computational-fluid-dynamics": {
    title: "Computational Fluid Dynamics",
    author: "Dr. Alan Turing",
    year: "2023",
    type: "Textbook",
    typeBg: "bg-tertiary-container text-on-tertiary-container",
    pages: 520,
    currentPage: 0,
    category: "Engineering",
    isbn: "978-0-521-84210-4",
    publisher: "Cambridge University Press",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDMWKB-UeVCRhFYdsr4N3ECbdlqTnXCLypJsEtsFJP6VbKj7vZrpOmB75TJ5TJbtuLkthcji9kSO5iPtQE7BP32rOnyei3DyCefNc5_ar_pWeBZfRisOE1Owe08CFcX5gk3F1BfdeTBVo3ay4VnRTDYQIcnh_NJl659uwqEMi9Cy-rsBzfRMJ4Jf_wctrRDYegY87U0lGwc9V_LNz6j1Zb22udpNz6unyAtX4aNtGqHHvKdsFIbgJG6r_UQOgwodvwM9SKkOKZHu44k",
    description: "A comprehensive introduction to the computational techniques used to solve fluid dynamics problems. Covers finite difference, finite volume, and finite element methods with applications in aerospace and mechanical engineering.",
    chapters: [
      { title: "Introduction to Fluid Mechanics", pages: "1-40", read: false },
      { title: "Governing Equations", pages: "41-90", read: false },
      { title: "Finite Difference Methods", pages: "91-160", read: false },
      { title: "Finite Volume Methods", pages: "161-240", read: false },
    ],
    relatedResources: [
      { title: "Numerical Heat Transfer (Patankar)", type: "Textbook" },
    ],
  },
  "ai-governance": {
    title: "The Future of AI Governance",
    author: "Global Policy Review",
    year: "2023",
    type: "Journal",
    typeBg: "bg-primary-container text-on-primary-container",
    pages: 28,
    currentPage: 0,
    category: "Political Science",
    isbn: "ISSN 2058-4016",
    publisher: "Global Policy Review",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDeeUhpyHPm_T9i8c55WuQ2WaHNB0iV3D9eaunNPEwfi9-t46EKIKHSh4YPRfT3SB-y285DxYvlLuFiwEDpA-iGUxjjl9jdthFCpmPZaEul2o5UyGXg6m7Pc7k89sQ7VxHs8CiuJyJFvPOT-GUVLGQgjxd_WPqIvlQfT13RakEPUVyE95QZv10X66Ov5P6e5cpk8AoE1XI4GSLXQgDilbncSDyHUQDDt-cz8hWxR3z-MH5yqWEAUWk2ayXzY7eLOm5SIozAuTg9Ivjk",
    description: "An analysis of current and proposed frameworks for governing artificial intelligence at national and international levels. Examines regulatory approaches from the EU, US, and China, and proposes a multi-stakeholder governance model.",
    chapters: [
      { title: "The Regulatory Landscape", pages: "1-8", read: false },
      { title: "EU AI Act Analysis", pages: "9-16", read: false },
      { title: "US Executive Orders on AI", pages: "17-22", read: false },
      { title: "Towards Global AI Governance", pages: "23-28", read: false },
    ],
    relatedResources: [
      { title: "EU AI Act (Full Text)", type: "Legislation" },
    ],
  },
  "linear-algebra-session-1": {
    title: "Linear Algebra — Session 1",
    author: "MIT OpenCourseWare",
    year: "2023",
    type: "Video Lecture",
    typeBg: "bg-secondary-container text-on-secondary-container",
    duration: "49:30",
    currentTime: "0:00",
    category: "Mathematics",
    series: "18.06 — MIT OCW",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCmuiIE9TP9TiUUNPUwTdBp_z4tClOj-6zwFXEqjOZIDOEntTXUyjJhqaRrv0Dnba4E7lYLHaVeSn2Xwh_okFaMUj4tkekeyyxk1iy6miNu0cE_6nm_BXu_nzY_V6wIhf78x6bMwBMBkgz3_bHveYC8mdy3zC1e144WYTVaudsaF-XKsp6XseH1PCRIDX06x_BZUuC8YqGZQVaLXn6KCjTWcBun2A6IKBtbmh8yyCK4WBKgODk75V7ASj6ayArn-LiqTElgu53aiimS",
    description: "The geometry of linear equations: row picture and column picture. Introduction to matrix-vector multiplication, elimination and back-substitution.",
    chapters: [
      { title: "Introduction", timestamp: "0:00", watched: false },
      { title: "Row Picture", timestamp: "8:30", watched: false },
      { title: "Column Picture", timestamp: "18:00", watched: false },
      { title: "Matrix Form", timestamp: "30:00", watched: false },
      { title: "Summary", timestamp: "44:00", watched: false },
    ],
    relatedResources: [
      { title: "Session 2: Elimination with Matrices", type: "Video" },
      { title: "Strang: Introduction to Linear Algebra", type: "Textbook" },
    ],
  },
};

export default function LibraryItemPage() {
  const { itemId } = useParams();
  const item = libraryData[itemId];

  if (!item) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-12">
        <span className="material-symbols-outlined text-6xl text-outline-variant mb-6">find_in_page</span>
        <h1 className="text-3xl font-extrabold font-manrope mb-4">Resource Not Found</h1>
        <p className="text-on-surface-variant mb-8">This resource doesn't exist or has been removed from the library.</p>
        <Link to="/library" className="px-8 py-3 linear-soul text-on-primary rounded-full font-manrope font-bold text-sm">
          Browse Library
        </Link>
      </div>
    );
  }

  const isVideo = item.type === "Video Lecture";
  const progress = isVideo
    ? (() => {
        const [cm, cs] = (item.currentTime || "0:00").split(":").map(Number);
        const [dm, ds] = (item.duration || "0:00").split(":").map(Number);
        return Math.round(((cm * 60 + cs) / (dm * 60 + ds)) * 100);
      })()
    : item.pages > 0 ? Math.round((item.currentPage / item.pages) * 100) : 0;

  return (
    <div className="min-h-screen p-8 lg:p-12">
      {/* Breadcrumb */}
      <nav className="flex space-x-2 text-xs font-medium text-on-surface-variant mb-6">
        <Link to="/dashboard" className="hover:text-primary transition-colors">LMS</Link>
        <span className="opacity-30">/</span>
        <Link to="/library" className="hover:text-primary transition-colors">Library</Link>
        <span className="opacity-30">/</span>
        <span className="text-primary font-semibold">{item.type}</span>
      </nav>

      <div className="grid grid-cols-12 gap-8">
        {/* Main Content */}
        <div className="col-span-12 lg:col-span-8 space-y-8">
          {/* Preview / Hero */}
          <div className="bg-surface-container-lowest rounded-3xl overflow-hidden shadow-sm">
            <div className="relative h-80 overflow-hidden">
              <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              {isVideo && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <button className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/30 hover:scale-110 transition-all">
                    <span className="material-symbols-outlined text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
                  </button>
                </div>
              )}
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <span className={`${item.typeBg} text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest`}>{item.type}</span>
                <h1 className="text-3xl font-extrabold font-manrope text-white mt-3">{item.title}</h1>
                <p className="text-white/70 mt-1">{item.author} • {item.year}</p>
              </div>
            </div>

            {/* Progress Bar */}
            {progress > 0 && (
              <div className="px-8 py-4 bg-surface-container-low flex items-center gap-4">
                <div className="flex-1 h-1.5 bg-surface-container-high rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ width: `${progress}%` }}></div>
                </div>
                <span className="text-xs font-bold text-on-surface-variant">
                  {isVideo ? `${item.currentTime} / ${item.duration}` : `Page ${item.currentPage} / ${item.pages}`}
                </span>
              </div>
            )}
          </div>

          {/* Description */}
          <div className="bg-surface-container-lowest rounded-3xl p-8 shadow-sm">
            <h2 className="text-xl font-bold font-manrope mb-4">About this resource</h2>
            <p className="text-on-surface-variant leading-relaxed">{item.description}</p>
          </div>

          {/* Chapters / Contents */}
          <div className="bg-surface-container-lowest rounded-3xl p-8 shadow-sm">
            <h2 className="text-xl font-bold font-manrope mb-6">{isVideo ? "Chapters" : "Table of Contents"}</h2>
            <div className="space-y-3">
              {item.chapters.map((ch, i) => {
                const isRead = isVideo ? ch.watched : ch.read;
                return (
                  <div key={i} className={`flex items-center gap-4 p-4 rounded-3xl hover:bg-surface-bright transition-colors cursor-pointer group ${!isRead ? "opacity-70" : ""}`}>
                    <div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center flex-shrink-0">
                      {isRead ? (
                        <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                      ) : (
                        <span className="text-sm font-bold text-on-surface-variant">{i + 1}</span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold font-manrope text-sm group-hover:text-primary transition-colors">{ch.title}</h4>
                      <p className="text-[10px] text-on-surface-variant font-bold uppercase tracking-wider">
                        {isVideo ? ch.timestamp : `Pages ${ch.pages}`}
                      </p>
                    </div>
                    <span className="material-symbols-outlined text-outline-variant group-hover:text-primary transition-colors">
                      {isVideo ? "play_circle" : "chevron_right"}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
          {/* Actions */}
          <div className="bg-surface-container-lowest rounded-3xl p-6 shadow-sm space-y-4">
            <button className="w-full py-4 linear-soul text-on-primary rounded-full font-manrope font-bold text-sm flex items-center justify-center gap-2">
              <span className="material-symbols-outlined text-sm">{isVideo ? "play_arrow" : "menu_book"}</span>
              {isVideo ? "Continue Watching" : progress > 0 ? "Continue Reading" : "Start Reading"}
            </button>
            <button className="w-full py-3 bg-surface-container-high text-on-surface rounded-full font-manrope font-bold text-sm hover:bg-surface-container-highest transition-colors flex items-center justify-center gap-2">
              <span className="material-symbols-outlined text-sm">bookmark</span>
              Save to Collection
            </button>
            {!isVideo && (
              <button className="w-full py-3 bg-surface-container-high text-on-surface rounded-full font-manrope font-bold text-sm hover:bg-surface-container-highest transition-colors flex items-center justify-center gap-2">
                <span className="material-symbols-outlined text-sm">download</span>
                Download PDF
              </button>
            )}
          </div>

          {/* Details Card */}
          <div className="bg-surface-container-lowest rounded-3xl p-6 shadow-sm space-y-4">
            <h3 className="font-bold font-manrope text-sm">Details</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Category</span>
                <span className="font-medium">{item.category}</span>
              </div>
              {item.publisher && (
                <div className="flex justify-between">
                  <span className="text-on-surface-variant">Publisher</span>
                  <span className="font-medium">{item.publisher}</span>
                </div>
              )}
              {item.isbn && (
                <div className="flex justify-between">
                  <span className="text-on-surface-variant">{item.isbn.startsWith("ISSN") ? "ISSN" : "ISBN"}</span>
                  <span className="font-medium text-xs">{item.isbn}</span>
                </div>
              )}
              {item.series && (
                <div className="flex justify-between">
                  <span className="text-on-surface-variant">Series</span>
                  <span className="font-medium">{item.series}</span>
                </div>
              )}
              {isVideo ? (
                <div className="flex justify-between">
                  <span className="text-on-surface-variant">Duration</span>
                  <span className="font-medium">{item.duration}</span>
                </div>
              ) : (
                <div className="flex justify-between">
                  <span className="text-on-surface-variant">Pages</span>
                  <span className="font-medium">{item.pages}</span>
                </div>
              )}
            </div>
          </div>

          {/* Related Resources */}
          <div className="bg-surface-container-lowest rounded-3xl p-6 shadow-sm">
            <h3 className="font-bold font-manrope text-sm mb-4">Related Resources</h3>
            <div className="space-y-3">
              {item.relatedResources.map((r) => (
                <div key={r.title} className="flex items-center gap-3 p-3 bg-surface-container-low rounded-3xl hover:bg-surface-container transition-colors cursor-pointer group">
                  <span className="material-symbols-outlined text-primary text-lg">
                    {r.type === "Textbook" ? "menu_book" : r.type === "Video" ? "videocam" : r.type === "Conference" ? "groups" : "article"}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate group-hover:text-primary transition-colors">{r.title}</p>
                    <p className="text-[10px] text-on-surface-variant uppercase tracking-wider font-bold">{r.type}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
