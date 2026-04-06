import { Link } from "react-router-dom";
import { useState } from "react";

const enrolledCourses = [
  { id: "advanced-data-structures", badge: "In Progress", badgeClass: "bg-primary/10 text-primary", title: "Advanced Algorithms & Data Structures", code: "CS301 • Prof. Elena Richardson", progress: 64, track: "Computer Science", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDZRSMGnBh_YUaFh5kBeXokD6qQUXOxbG65jHIuWuBkd-bZOK7oHDap4vZXrXwG7d0BC6MOEWqcNuVTHzF938psUARm2BmbLKttLF_g-GjUfMRJ_7IECm6LH40KPb0dRO3s2V7LLrDzC-sr65CEiLiEJHdxczg36gPLgdWVZ25gok1tAYg0jHaLRhwqk9lBRC6oNvxV31Il17XADu5GJFte5Y49oCyxliaXejGgT74IeWfeSYi_QisyWWv6EEKfv8BEEsYA9_ZjR-bm" },
  { id: "discrete-math", badge: "Midterm Season", badgeClass: "bg-tertiary-container text-on-tertiary-container", title: "Discrete Mathematical Structures", code: "MATH204 • Prof. Marcus Thorne", progress: 42, track: "Mathematics", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAh0Hvr25SsEcLEQk930JQU2dMAaY0zEK2hgvVInCfd3njtDZve0W3W5QRivHlvk0btpPgkc5_WxVhrEDwwEX7v6HCgTI5H_Bp30QWT4rHutGn2PRuhKLv6DSY0QSZfgCs2U-wp13cxsIlPNysT0NP1AF4Ry12v-FOvPtvO7Vr7tqurJTWP2aHQ3GWfDA0M8ZjswAWVEWRGFp6cM_CBVL5J8EPMHYTBgYp_9mDYlSR3TQ12efI3VpYb91-CgjHYYx6J6NgpsAaFOhYg" },
  { id: "info-systems", badge: "Up Next: Lab", badgeClass: "bg-secondary-container text-on-secondary-container", title: "Global Information Systems", code: "INFO102 • Prof. Sarah Jenkins", progress: 88, track: "Computer Science", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDv4U9BHWEmwABDldKtQoETJV3f_z34SvMxsroPoeaD3wXNkwP7cKFE8Q4SLahTmmMR5tzGUu4Af9lJrngvOk2BhdavaQDbUTG64U9VQjuTAgJ2V9HYLle8XVTVAfTy9Wv0KrkF-p-1SqN1h27uXKgtQO5SAS5y-0As5_07slrd2-JxK9kGvGK9hnbyYP5smwnRscT3Z898deIC7R_ZpuTJ-fGldeaUe2kMSsJRIA2vC3773eHP5iZfSYxN4g8Y75poiBhFs1H_aeVu" },
];

const filters = ["All Tracks", "Computer Science", "Mathematics", "Humanities", "Design Systems"];

export default function CoursesPage() {
  const [activeFilter, setActiveFilter] = useState("All Tracks");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCourses = enrolledCourses.filter((c) => {
    const matchesFilter = activeFilter === "All Tracks" || c.track === activeFilter;
    const matchesSearch = searchQuery === "" || c.title.toLowerCase().includes(searchQuery.toLowerCase()) || c.code.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div>
      {/* Header Section */}
      <header className="sticky top-0 z-30 bg-surface/80 backdrop-blur-md px-12 py-8 flex justify-between items-end">
        <div>
          <nav className="flex space-x-2 text-xs font-medium text-on-surface-variant mb-2">
            <Link to="/dashboard" className="hover:text-primary transition-colors">LMS</Link>
            <span className="opacity-30">/</span>
            <span className="text-primary font-semibold">My Courses</span>
          </nav>
          <h1 className="text-4xl font-extrabold font-manrope tracking-tight text-on-surface">Course Catalog</h1>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant text-lg">search</span>
            <input
              className="pl-12 pr-6 py-3 bg-surface-container-lowest border-none rounded-full w-64 text-sm focus:ring-2 focus:ring-primary-container font-body shadow-sm"
              placeholder="Find a module..."
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button className="p-3 bg-surface-container-high rounded-full hover:bg-surface-container-highest transition-colors">
            <span className="material-symbols-outlined text-on-surface">tune</span>
          </button>
        </div>
      </header>

      <div className="px-12 pb-20 space-y-12">
        {/* Filters */}
        <section className="flex flex-wrap items-center gap-3">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${activeFilter === f
                ? "bg-on-surface text-surface"
                : "bg-surface-container-high text-on-surface hover:bg-surface-container-highest"
              }`}
            >
              {f}
            </button>
          ))}
        </section>

        {/* Enrolled Courses */}
        <section className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold font-manrope text-on-surface">Enrolled Courses</h2>
            <Link to="/grades" className="text-sm font-medium text-primary cursor-pointer hover:underline">View Progress Report</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.length > 0 ? filteredCourses.map((course) => (
              <Link to={`/courses/${course.id}`} key={course.title} className="group relative bg-surface-container-lowest rounded-3xl overflow-hidden p-6 transition-all hover:translate-y-[-4px]">
                <div className="absolute top-4 left-4 z-10">
                  <span className={`${course.badgeClass} text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider`}>{course.badge}</span>
                </div>
                <div className="aspect-video w-full mb-6 rounded-3xl overflow-hidden relative">
                  <img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" src={course.img} alt="Course" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-manrope font-bold text-lg leading-tight group-hover:text-primary transition-colors">{course.title}</h3>
                    <p className="text-xs text-on-surface-variant mt-1 font-medium">{course.code}</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-on-surface-variant">Course Progress</span>
                      <span className="text-primary">{course.progress}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-surface-container-high rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full" style={{ width: `${course.progress}%` }}></div>
                    </div>
                  </div>
                </div>
              </Link>
            )) : (
              <div className="col-span-3 text-center py-16">
                <span className="material-symbols-outlined text-5xl text-outline-variant mb-4">search_off</span>
                <p className="text-on-surface-variant font-medium">No courses match your current filters.</p>
                <button onClick={() => { setActiveFilter("All Tracks"); setSearchQuery(""); }} className="mt-4 text-primary font-bold text-sm hover:underline">Clear Filters</button>
              </div>
            )}
          </div>
        </section>

        {/* Recommended Courses */}
        <section className="space-y-8 bg-surface-container-low -mx-12 px-12 py-16 rounded-3xl">
          <div className="max-w-7xl">
            <div className="mb-10">
              <span className="text-primary font-bold text-xs uppercase tracking-[0.2em]">Curated for your track</span>
              <h2 className="text-3xl font-extrabold font-manrope text-on-surface mt-2">Expand Your Horizon</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {/* Large Featured Card */}
              <Link to="/courses/neural-networks" className="md:col-span-2 bg-surface-container-lowest rounded-3xl p-8 flex flex-col justify-between group cursor-pointer transition-all hover:shadow-xl hover:shadow-primary/5">
                <div className="space-y-6">
                  <div className="w-16 h-16 bg-primary-container rounded-3xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-3xl">psychology</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold font-manrope leading-tight">Neural Networks &amp; Deep Learning Essentials</h3>
                    <p className="text-on-surface-variant mt-4 leading-relaxed">A deep dive into the foundations of modern AI. Recommended for your Computer Science track based on your elective interests.</p>
                  </div>
                </div>
                <div className="mt-12 flex items-center justify-between">
                  <div className="flex -space-x-2">
                    <img className="w-8 h-8 rounded-full border-2 border-white" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC5wiR1ESfAaUFi_n6dgoOX3NlfKQWFedbkOanjvoACdYqZTEU7-yDlEueP2T7VsiB2HjMNEhVPQ9MidA1TZvT6XcNht_C40ZZ_mnWVGOgbIysyhg6tyWhtAePjxjtVO5kaFkfjylh5mZq9MxMo39y9w-I_SNHBWw2bqQz5vsbvdRB8hhwRzP_06OrNu1fx7Eggwesuv7o0wlkPzkv0giACc0svyqBXKuRM_e3yh2U2AJD8usZiKhXa7JcjTQ0NEf3s90erm8Xl2j_5" alt="Instructor" />
                    <img className="w-8 h-8 rounded-full border-2 border-white" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB00TxNqrbwsUiYwmKig0i_4TLHHA49pk8yWTdXa_AMk4pDG92avFTF2QCAnNUZSzz9JH6-WkmmQUegFuVuBzMQqE9tNm_AEgbuy90a57fWuNVP_uMRTFHkyFwH2bWO0vd07GowZ4Ijk6wawqWqDn75DgdFr4qi6sI6_ENI60BOeyoyOmM_HoxB3PDFY_9gZB-pXchEv0EwV9w3fzQk5Exfxt8g5eXH9XoTnTgu9_TBYTpKlTVAwXljJD2PIEq_X3mZrBpG5NRnut9p" alt="Instructor" />
                    <div className="w-8 h-8 rounded-full bg-surface-container-high border-2 border-white flex items-center justify-center text-[10px] font-bold">+4</div>
                  </div>
                  <span className="flex items-center space-x-2 text-primary font-bold text-sm">
                    <span>Learn More</span>
                    <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
                  </span>
                </div>
              </Link>

              {/* Secondary Cards */}
              {[
                { id: "quantum-computing", icon: "architecture", color: "tertiary-container/30", textColor: "tertiary", title: "UX Theory in Digital Humanities", desc: "Exploring the intersection of classical study and modern design.", units: "2.5 UNITS" },
                { id: "quantum-computing", icon: "calculate", color: "secondary-container/30", textColor: "secondary", title: "Applied Game Theory for CS", desc: "Strategic decision-making models within computational systems.", units: "3 UNITS" },
              ].map((item) => (
                <Link to={`/courses/${item.id}`} key={item.title} className="bg-surface-container-lowest rounded-3xl p-6 group cursor-pointer transition-all hover:translate-y-[-4px]">
                  <div className={`h-32 rounded-3xl mb-4 bg-${item.color} flex items-center justify-center`}>
                    <span className={`material-symbols-outlined text-4xl text-${item.textColor}`}>{item.icon}</span>
                  </div>
                  <h4 className="font-bold font-manrope leading-tight">{item.title}</h4>
                  <p className="text-xs text-on-surface-variant mt-3 line-clamp-2">{item.desc}</p>
                  <div className="mt-6 flex items-center justify-between">
                    <span className="text-[10px] font-bold text-on-surface-variant">{item.units}</span>
                    <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary transition-colors">add_circle</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
