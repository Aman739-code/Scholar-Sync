import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getInstructorDashboard } from "../../api/dashboard";
import { useAuth } from "../../context/AuthContext";

export default function InstructorDashboardPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    getInstructorDashboard().then(res => setData(res.data)).catch(console.error).finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div></div>;

  const stats = data?.stats || { totalStudents: 0, totalAssignments: 0, totalCourses: 0, pendingSubmissions: 0 };

  return (
    <div className="p-12">
      <header className="mb-12">
        <p className="text-primary font-bold text-xs uppercase tracking-[0.2em] mb-2">Instructor Portal</p>
        <h1 className="text-4xl font-extrabold font-manrope tracking-tight text-on-surface">Welcome back, {user?.name?.split(' ').pop()}</h1>
        <p className="text-on-surface-variant mt-2">Here's your teaching overview for this semester.</p>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-4 gap-6 mb-12">
        {[
          { label: "Active Courses", value: stats.totalCourses, icon: "auto_stories", bg: "bg-primary-container", text: "text-on-primary-container" },
          { label: "Students Enrolled", value: stats.totalStudents, icon: "groups", bg: "bg-secondary-container", text: "text-on-secondary-container" },
          { label: "Assignments", value: stats.totalAssignments, icon: "assignment", bg: "bg-tertiary-container", text: "text-on-tertiary-container" },
          { label: "Pending Reviews", value: stats.pendingSubmissions, icon: "pending_actions", bg: "bg-error-container", text: "text-on-error-container" },
        ].map(s => (
          <div key={s.label} className={`${s.bg} p-6 rounded-3xl`}>
            <span className={`material-symbols-outlined ${s.text} text-3xl mb-4`}>{s.icon}</span>
            <p className={`text-3xl font-extrabold font-manrope ${s.text}`}>{s.value}</p>
            <p className={`text-xs font-bold uppercase tracking-wider mt-1 ${s.text} opacity-70`}>{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-12 gap-8">
        {/* Courses */}
        <div className="col-span-7 space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold font-manrope">Your Courses</h2>
            <Link to="/instructor/courses" className="text-sm font-medium text-primary hover:underline">View All</Link>
          </div>
          {(data?.courses || []).map(c => (
            <Link to={`/instructor/courses/${c._id}`} key={c._id} className="block bg-surface-container-lowest rounded-3xl p-6 hover:bg-surface-bright transition-colors group">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">{c.code}</p>
                  <h3 className="font-bold font-manrope text-lg group-hover:text-primary transition-colors">{c.title}</h3>
                  <p className="text-xs text-on-surface-variant mt-1">{c.semester} • {c.units} Units</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-extrabold font-manrope text-primary">{c.enrolledCount}</p>
                  <p className="text-[10px] font-bold text-on-surface-variant uppercase">Students</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Recent Submissions */}
        <div className="col-span-5 space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold font-manrope">Recent Submissions</h2>
            <Link to="/instructor/submissions" className="text-sm font-medium text-primary hover:underline">View All</Link>
          </div>
          {(data?.recentSubmissions || []).map(s => (
            <div key={s._id} className="bg-surface-container-lowest rounded-3xl p-5 flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center">
                <span className="material-symbols-outlined text-primary">description</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold font-manrope text-sm truncate">{s.assignmentId?.title || "Assignment"}</p>
                <p className="text-xs text-on-surface-variant">{s.studentId?.name} • {new Date(s.submittedAt).toLocaleDateString()}</p>
              </div>
              <span className={`px-3 py-1 text-[10px] font-bold rounded-full uppercase ${s.status === 'submitted' ? 'bg-tertiary-container text-on-tertiary-container' : s.status === 'graded' ? 'bg-primary/10 text-primary' : 'bg-error-container text-on-error-container'}`}>{s.status}</span>
            </div>
          ))}
          {(!data?.recentSubmissions || data.recentSubmissions.length === 0) && (
            <div className="bg-surface-container-lowest rounded-3xl p-8 text-center">
              <span className="material-symbols-outlined text-4xl text-outline-variant mb-2">inbox</span>
              <p className="text-on-surface-variant text-sm">No submissions yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
