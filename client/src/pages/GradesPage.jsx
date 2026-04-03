import { Link } from "react-router-dom";

export default function GradesPage() {
  return (
    <div className="min-h-screen p-8 lg:p-12">
      {/* Header */}
      <header className="mb-12 flex flex-col md:flex-row justify-between items-end gap-6">
        <div className="space-y-2">
          <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight text-on-surface">Academic Performance</h1>
          <p className="text-on-surface-variant font-medium">Detailed breakdown for Spring Semester 2024</p>
        </div>
        <div className="bg-surface-container-lowest p-6 rounded-3xl shadow-sm border border-outline-variant/10 flex items-center gap-8 min-w-[320px]">
          <div className="space-y-1">
            <p className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">Cumulative GPA</p>
            <p className="text-4xl font-extrabold text-primary">3.88</p>
          </div>
          <div className="h-12 w-px bg-surface-container-high"></div>
          <div className="space-y-1">
            <p className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">Rank</p>
            <p className="text-xl font-bold text-on-surface">Top 5%</p>
            <p className="text-[10px] text-tertiary flex items-center">
              <span className="material-symbols-outlined text-xs mr-1">trending_up</span>+0.12 this term
            </p>
          </div>
        </div>
      </header>

      {/* Insights Bento Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="md:col-span-2 bg-surface-container-lowest p-8 rounded-3xl shadow-sm border border-outline-variant/10 relative overflow-hidden group">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h3 className="text-lg font-bold font-headline mb-1">Grade Distribution</h3>
              <p className="text-sm text-on-surface-variant">Weighted average across core modules</p>
            </div>
            <button className="text-xs font-semibold text-primary px-4 py-2 bg-primary-container rounded-full">Detailed Analysis</button>
          </div>
          <div className="flex items-end justify-between h-48 gap-4 px-4">
            {[
              { label: "HUM", height: "60%", cls: "bg-primary/20 group-hover:bg-primary/30" },
              { label: "STEM", height: "92%", cls: "bg-primary" },
              { label: "ARTS", height: "75%", cls: "bg-primary/40 group-hover:bg-primary/50" },
              { label: "ECON", height: "85%", cls: "bg-primary/60 group-hover:bg-primary/70" },
              { label: "LANG", height: "50%", cls: "bg-primary/20 group-hover:bg-primary/30" },
            ].map((bar) => (
              <div key={bar.label} className="flex flex-col items-center gap-2 w-full">
                <div className={`w-full ${bar.cls} rounded-t-3xl transition-all duration-500`} style={{ height: bar.height }}></div>
                <span className="text-[10px] font-bold text-on-surface-variant">{bar.label}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-tertiary-container p-8 rounded-3xl shadow-sm flex flex-col justify-between text-on-tertiary-container">
          <div className="space-y-4">
            <span className="material-symbols-outlined text-3xl">tips_and_updates</span>
            <h3 className="text-xl font-bold font-headline leading-tight">Strength: Advanced Algorithms</h3>
            <p className="text-sm opacity-80">You are performing 22% better than the cohort average in computational logic.</p>
          </div>
          <div className="pt-6">
            <div className="flex justify-between text-xs font-bold mb-2">
              <span>Current Mastery</span>
              <span>94%</span>
            </div>
            <div className="w-full bg-on-tertiary-container/10 h-1.5 rounded-full overflow-hidden">
              <div className="bg-on-tertiary-container h-full" style={{ width: "94%" }}></div>
            </div>
          </div>
        </div>
      </section>

      {/* Course Detailed Breakdown */}
      <section className="space-y-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold font-headline">Detailed Course Breakdown</h2>
          <div className="flex gap-2">
            <button className="p-2 rounded-3xl bg-surface-container-high text-on-surface-variant"><span className="material-symbols-outlined">filter_list</span></button>
            <button className="p-2 rounded-3xl bg-surface-container-high text-on-surface-variant"><span className="material-symbols-outlined">download</span></button>
          </div>
        </div>

        {[
          { courseId: "advanced-data-structures", icon: "code", iconBg: "bg-primary-container", iconColor: "text-primary", badge: "In Progress", badgeBg: "bg-tertiary-container text-on-tertiary-container", code: "CS-402", title: "Advanced Data Structures", prof: "Dr. Helena Vance • 4 Units", grade: "A-", pct: "91.4%", barW: "91.4%", barColor: "bg-primary", feedback: "\"Exceptional performance on the B-Tree implementation. Ensure your documentation covers edge cases for concurrent access in the final module.\"", instructorImg: "https://lh3.googleusercontent.com/aida-public/AB6AXuDRBZP87-6fWfnOiu3pwx-lcydGvLvtAxs0Nt07Ct5TPmyBGpfVKI01RRlzxGRw7G7xuJGh3sSc-3Q8e0vlktUXGa1axYvhByKWQCBo427LzARRNvjEnRH_wFg7-j1uTdUSvHfcbLQtWJWTBovSFFi5OJTiMkBjR81YYCJQ2EOplGXHXdSwc-Slzb-qyf7CNbMiPGDeMz8E4S5rHu0qV7XhGZ-jM3fdOIpAaWhw8sgIExBWEh2arA0OSDl9O70rim5HvtX5hn45BjGt" },
          { courseId: "discrete-math", icon: "history_edu", iconBg: "bg-surface-container-high", iconColor: "text-on-surface-variant", badge: "Completed", badgeBg: "bg-secondary-container text-on-secondary-container", code: "HIS-210", title: "Modern Political Philosophy", prof: "Prof. Marcus Thorne • 3 Units", grade: "A", pct: "96.0%", barW: "96%", barColor: "bg-primary", feedback: "\"Your critique of the Social Contract theory was sophisticated and well-cited. A standout paper in the mid-term reviews.\"", instructorImg: "https://lh3.googleusercontent.com/aida-public/AB6AXuACzjNeAf251RR0JRdQGoH9m_KALs7WOZN-cxu9hj8co9BkA1yHX324oDLkrO1XqwSmisSaRC0ieI8cQvi7oD8ZAQpblw-mVouqWQbo8RzhEEzAjhT7tjqqnItKpR1DupmKgoXYmOPOD2YL3lCmdqMBaxbg9YkvF8mhMNCqjBuMtg4ob8Hq4UKEiOR4LuCNlCb4Ir2wOdXhdmJCPL302_wz2C292WRNvVCqmGG2IZcXsRpcMq2WnzVDBcihHLgQmv8MQ9iU-io_u0Wr" },
          { courseId: "info-systems", icon: "database", iconBg: "bg-tertiary-container/30", iconColor: "text-tertiary", badge: "In Progress", badgeBg: "bg-tertiary-container text-on-tertiary-container", code: "CS-305", title: "Database Systems", prof: "Dr. Sarah Jenkins • 3 Units", grade: "B+", pct: "88.2%", barW: "88.2%", barColor: "bg-tertiary", feedback: "\"Strong understanding of SQL joins. Focus on Query Optimization and indexing strategies for the next lab to boost your grade.\"", instructorImg: "https://lh3.googleusercontent.com/aida-public/AB6AXuCCKd8j7trgQdT9L8htMrlqu8tYRERP_WgGoOqdji0K7SKhhbrQD5bT8bkfLv8SA48ibr5WG7lKHrPvzcOy4SU4fLtiNlX48wxipN1LAmS0CHTQ0N-teAkQWuckneIWwScX5Ihi52Qszh7QttPTpdU6rntvAjwAdpXfTkW5bA0eLzWNBDp0hzSQc7ki0OY0P_UM0asPe15Xy_DrcY2wRsNI0ac5YtEvOkZn5vl19yn_lAaAUCG6EgZCZQz1lxNnbQGfj_IwVL7YSAvG" },
        ].map((course) => (
          <Link to={`/courses/${course.courseId}`} key={course.code} className="block bg-surface-container-lowest rounded-3xl p-6 shadow-sm border border-outline-variant/10 group hover:border-primary/10 transition-all">
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="lg:w-1/3 flex gap-4">
                <div className={`w-16 h-16 rounded-3xl ${course.iconBg} flex items-center justify-center shrink-0`}>
                  <span className={`material-symbols-outlined ${course.iconColor} text-3xl`}>{course.icon}</span>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-bold px-2 py-0.5 ${course.badgeBg} rounded-full uppercase`}>{course.badge}</span>
                    <span className="text-[10px] font-bold text-on-surface-variant">{course.code}</span>
                  </div>
                  <h4 className="text-lg font-bold font-headline group-hover:text-primary transition-colors">{course.title}</h4>
                  <p className="text-xs text-on-surface-variant">{course.prof}</p>
                </div>
              </div>
              <div className="lg:w-1/4 flex flex-col justify-center">
                <div className="flex justify-between items-end mb-2">
                  <span className="text-3xl font-black text-on-surface">{course.grade}</span>
                  <span className="text-sm font-semibold text-on-surface-variant mb-1">{course.pct}</span>
                </div>
                <div className="w-full bg-surface-container-high h-1 rounded-full overflow-hidden">
                  <div className={`${course.barColor} h-full`} style={{ width: course.barW }}></div>
                </div>
              </div>
              <div className="lg:w-5/12 bg-surface-container-low p-4 rounded-3xl flex gap-4 items-start border border-outline-variant/5">
                <img alt="Instructor" className="w-8 h-8 rounded-full object-cover shrink-0 grayscale group-hover:grayscale-0 transition-all" src={course.instructorImg} />
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-tighter">Instructor Feedback</p>
                  <p className="text-xs leading-relaxed text-secondary italic">{course.feedback}</p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </section>

      {/* Grade Legend */}
      <footer className="mt-16 bg-surface-container-low p-8 rounded-3xl flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="text-center md:text-left">
          <p className="font-headline font-bold text-on-surface mb-2">Grading Policy 2024</p>
          <p className="text-xs text-on-surface-variant max-w-sm">Grades are calculated based on a weighted system including assignments (30%), mid-terms (30%), and final exams (40%). GPA reflects the 4.0 standard scale.</p>
        </div>
        <div className="flex gap-6">
          <div className="text-center">
            <p className="text-xs font-bold text-on-surface-variant mb-1">Credits Earned</p>
            <p className="text-xl font-bold font-headline">94 / 120</p>
          </div>
          <div className="text-center">
            <p className="text-xs font-bold text-on-surface-variant mb-1">Status</p>
            <p className="text-xl font-bold font-headline text-primary">Good Standing</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
