import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { getStudentDashboard } from "../api/dashboard";

export default function DashboardPage() {
  const [fabOpen, setFabOpen] = useState(false);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    getStudentDashboard()
      .then((res) => setData(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="p-8 lg:p-12 min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const enrollments = data?.enrollments || [];
  const upcomingAssignments = data?.upcomingAssignments || [];
  const recentGrades = data?.recentGrades || [];
  const firstName = user?.name?.split(" ")[0] || "Student";

  return (
    <div className="p-8 lg:p-12">
      {/* Dashboard Header */}
      <header className="mb-12">
        <h1 className="text-[3.5rem] font-extrabold tracking-tight leading-tight mb-2 text-on-background">
          Welcome back, {firstName}.
        </h1>
        <p className="text-on-surface-variant text-lg">
          You have {upcomingAssignments.length} assignment{upcomingAssignments.length !== 1 ? "s" : ""} coming up. Stay curious.
        </p>
      </header>

      {/* Dashboard Bento Grid */}
      <div className="grid grid-cols-12 gap-8">
        {/* Left Column */}
        <div className="col-span-12 lg:col-span-8 space-y-12">
          {/* Enrolled Courses */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold font-manrope">Enrolled Courses</h2>
              <Link to="/courses" className="text-primary font-semibold text-sm hover:underline">View All</Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {enrollments.slice(0, 2).map((enrollment) => {
                const course = enrollment.courseId;
                if (!course) return null;
                return (
                  <Link to={`/courses/${course.slug || course._id}`} key={enrollment._id} className="group relative bg-surface-container-lowest rounded-3xl p-6 transition-all duration-300 hover:bg-surface-bright">
                    <span className="absolute top-4 left-4 z-10 px-3 py-1 bg-tertiary-container text-on-tertiary-container text-[10px] font-bold uppercase rounded-full tracking-widest">
                      {enrollment.progress >= 100 ? "Completed" : "In Progress"}
                    </span>
                    <div className="aspect-video w-full rounded-3xl overflow-hidden mb-6 bg-surface-container">
                      <img alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src={course.bannerImage || "https://placehold.co/400x225?text=Course"} />
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">{course.code} • {course.instructorId?.name || "Instructor"}</span>
                      <h3 className="text-xl font-bold font-manrope group-hover:text-primary transition-colors">{course.title}</h3>
                      <div className="mt-4 flex items-center gap-3">
                        <div className="flex-1 h-1 bg-surface-container rounded-full overflow-hidden">
                          <div className="h-full bg-primary rounded-full" style={{ width: `${enrollment.progress}%` }}></div>
                        </div>
                        <span className="text-xs font-semibold text-on-surface-variant">{enrollment.progress}%</span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>

          {/* Weekly Schedule */}
          <section className="bg-surface-container-low rounded-3xl p-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold font-manrope">Weekly Schedule</h2>
              <div className="flex gap-2">
                <button className="w-8 h-8 flex items-center justify-center rounded-full bg-surface-container-lowest hover:bg-white transition-colors">
                  <span className="material-symbols-outlined text-sm">chevron_left</span>
                </button>
                <button className="w-8 h-8 flex items-center justify-center rounded-full bg-surface-container-lowest hover:bg-white transition-colors">
                  <span className="material-symbols-outlined text-sm">chevron_right</span>
                </button>
              </div>
            </div>
            <div className="grid grid-cols-7 gap-4">
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, i) => {
                const today = new Date().getDay();
                const dayIndex = i === 6 ? 0 : i + 1; // Mon=1 ... Sun=0
                const isToday = dayIndex === today;
                return (
                  <div key={day} className={`flex flex-col items-center gap-2 ${i >= 5 ? "opacity-40" : ""}`}>
                    <span className="text-[10px] font-bold text-on-surface-variant uppercase">{day}</span>
                    <div className={`w-full h-24 bg-surface-container-lowest rounded-3xl p-2 flex flex-col gap-1 ${isToday ? "ring-2 ring-primary" : ""}`}>
                      {enrollments.slice(0, 3).map((en, ci) => {
                        const course = en.courseId;
                        if (!course?.schedule) return null;
                        const sched = course.schedule.toLowerCase();
                        const dayNames = ["mon", "tue", "wed", "thu", "fri"];
                        if (sched.includes(dayNames[i])) {
                          const colors = ["bg-primary", "bg-tertiary-container", "bg-secondary"];
                          return <div key={ci} className={`w-full h-2 ${colors[ci % colors.length]} rounded-full`}></div>;
                        }
                        return null;
                      })}
                      {isToday && <span className="text-[10px] font-bold text-center mt-auto">TODAY</span>}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </div>

        {/* Right Column */}
        <div className="col-span-12 lg:col-span-4 space-y-8">
          {/* Upcoming Assignments */}
          <section className="bg-surface-container-lowest rounded-3xl p-8">
            <h2 className="text-xl font-bold font-manrope mb-6">Upcoming</h2>
            <div className="space-y-6">
              {upcomingAssignments.slice(0, 3).map((item) => {
                const deadline = new Date(item.deadline);
                const month = deadline.toLocaleDateString("en-US", { month: "short" });
                const day = deadline.getDate();
                const isThisWeek = (deadline - new Date()) < 7 * 24 * 60 * 60 * 1000;
                return (
                  <Link to={`/assignments/${item.slug || item._id}`} key={item._id} className="flex gap-4 group cursor-pointer">
                    <div className={`flex-shrink-0 w-12 h-12 rounded-3xl flex flex-col items-center justify-center ${isThisWeek ? "bg-primary-container text-on-primary-container" : "bg-surface-container text-on-surface-variant"}`}>
                      <span className="text-[10px] font-bold leading-none uppercase">{month}</span>
                      <span className="text-xl font-extrabold font-manrope leading-none">{day}</span>
                    </div>
                    <div className="flex flex-col overflow-hidden">
                      <h4 className="font-bold text-sm text-slate-900 group-hover:text-primary transition-colors truncate">{item.title}</h4>
                      <span className="text-xs text-on-surface-variant">{item.courseId?.title || "Course"}</span>
                    </div>
                  </Link>
                );
              })}
              {upcomingAssignments.length === 0 && (
                <p className="text-sm text-on-surface-variant">No upcoming assignments. 🎉</p>
              )}
            </div>
            <Link to="/assignments" className="block w-full mt-8 py-3 rounded-3xl bg-surface-container-low text-on-surface-variant font-bold text-xs hover:bg-surface-container transition-colors text-center">
              View Assignment Calendar
            </Link>
          </section>

          {/* Recent Grades */}
          <section className="bg-surface-container-lowest rounded-3xl p-8">
            <h2 className="text-xl font-bold font-manrope mb-6">Recent Grades</h2>
            <div className="space-y-4">
              {recentGrades.slice(0, 3).map((item) => {
                const pct = item.maxScore > 0 ? Math.round((item.score / item.maxScore) * 100) : 0;
                return (
                  <Link to={`/courses/${item.courseId?.slug || item.courseId?._id}`} key={item._id} className="block p-4 rounded-3xl bg-surface-container-low hover:bg-surface-container transition-all flex items-center justify-between">
                    <div>
                      <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-tighter">{item.assignmentId?.title || "Assignment"}</p>
                      <h4 className="font-bold text-sm">{item.courseId?.title || "Course"}</h4>
                    </div>
                    <div className="px-3 py-1 rounded-full bg-tertiary-container text-on-tertiary-container text-sm font-extrabold">{pct}%</div>
                  </Link>
                );
              })}
              {recentGrades.length === 0 && (
                <p className="text-sm text-on-surface-variant">No grades yet.</p>
              )}
            </div>
          </section>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-24 py-12 border-t border-surface-container">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 max-w-7xl mx-auto">
          <div className="flex flex-col gap-1 items-center md:items-start">
            <span className="font-manrope font-bold text-slate-900 text-lg tracking-tight">ScholarSync</span>
            <p className="font-inter text-xs text-slate-500">© 2024 ScholarSync. All rights reserved.</p>
          </div>
          <div className="flex gap-6">
            {["Privacy Policy", "Terms of Service", "Contact Support"].map((link) => (
              <a key={link} className="font-inter text-xs text-slate-500 hover:text-blue-500 transition-colors duration-200" href="#">{link}</a>
            ))}
          </div>
        </div>
      </footer>

      {/* FAB with menu */}
      <div className="fixed bottom-8 right-8 z-50">
        {fabOpen && (
          <div className="absolute bottom-16 right-0 bg-surface-container-lowest rounded-3xl shadow-2xl p-4 mb-2 space-y-2 min-w-[200px] border border-outline-variant/10 animate-[fadeIn_0.2s_ease-out]">
            <Link to="/assignments" className="flex items-center gap-3 p-3 rounded-3xl hover:bg-surface-container-low transition-colors">
              <span className="material-symbols-outlined text-primary text-lg">assignment</span>
              <span className="text-sm font-bold font-manrope">New Assignment</span>
            </Link>
            <Link to="/library" className="flex items-center gap-3 p-3 rounded-3xl hover:bg-surface-container-low transition-colors">
              <span className="material-symbols-outlined text-primary text-lg">library_books</span>
              <span className="text-sm font-bold font-manrope">Browse Library</span>
            </Link>
            <Link to="/courses" className="flex items-center gap-3 p-3 rounded-3xl hover:bg-surface-container-low transition-colors">
              <span className="material-symbols-outlined text-primary text-lg">add_circle</span>
              <span className="text-sm font-bold font-manrope">Enroll Course</span>
            </Link>
          </div>
        )}
        <button
          onClick={() => setFabOpen(!fabOpen)}
          className={`w-14 h-14 rounded-full bg-primary text-on-primary shadow-2xl flex items-center justify-center hover:scale-110 transition-all active:scale-95 ${fabOpen ? "rotate-45" : ""}`}
        >
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>add</span>
        </button>
      </div>
    </div>
  );
}
