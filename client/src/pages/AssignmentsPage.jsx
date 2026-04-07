import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getAssignments } from "../api/assignments";

const tabs = ["upcoming", "submitted", "graded"];
const iconMap = { lab: "code", quiz: "description", project: "neurology", reflection: "edit_note", submission: "upload_file" };

export default function AssignmentsPage() {
  const [activeTab, setActiveTab] = useState("upcoming");
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAssignments().then(res => setAssignments(res.data.assignments)).catch(console.error).finally(() => setLoading(false));
  }, []);

  const now = new Date();
  const filtered = assignments.filter(a => {
    const hasSubmission = !!a.submission;
    const isGraded = a.submission?.status === "graded";
    if (activeTab === "upcoming") return !hasSubmission && new Date(a.deadline) >= now;
    if (activeTab === "submitted") return hasSubmission && !isGraded;
    if (activeTab === "graded") return isGraded;
    return true;
  });

  if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div></div>;

  return (
    <div className="p-8 lg:p-12">
      <header className="mb-12">
        <p className="text-primary font-bold text-xs uppercase tracking-[0.2em] mb-2">Assignments</p>
        <h1 className="text-4xl font-extrabold font-manrope tracking-tight text-on-surface">Your Assignments</h1>
        <p className="text-on-surface-variant mt-2">Track and manage your academic work.</p>
      </header>

      {/* Tabs */}
      <div className="flex gap-3 mb-10">
        {tabs.map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            className={`px-5 py-2.5 rounded-full text-xs font-bold font-manrope capitalize transition-all ${activeTab === tab ? "linear-soul text-on-primary" : "bg-surface-container-lowest text-on-surface-variant hover:bg-surface-container"}`}
          >{tab}</button>
        ))}
      </div>

      {/* Assignment Cards */}
      <div className="space-y-4">
        {filtered.map(a => {
          const deadline = new Date(a.deadline);
          const daysLeft = Math.max(0, Math.ceil((deadline - now) / (1000 * 60 * 60 * 24)));
          return (
            <Link to={`/assignments/${a.slug || a._id}`} key={a._id} className="block bg-surface-container-lowest rounded-3xl p-6 transition-all hover:bg-surface-bright group">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-5">
                  <div className="w-12 h-12 rounded-3xl bg-surface-container-high flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary">{iconMap[a.type] || a.icon || "assignment"}</span>
                  </div>
                  <div>
                    <h3 className="font-manrope font-bold text-lg group-hover:text-primary transition-colors">{a.title}</h3>
                    <p className="text-xs text-on-surface-variant mt-1">{a.courseId?.code || ""} • {a.type} • {a.points} pts</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  {activeTab === "upcoming" && (
                    <div className="text-right">
                      <p className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider">Due In</p>
                      <p className={`text-sm font-bold ${daysLeft <= 3 ? "text-error" : "text-on-surface"}`}>{daysLeft === 0 ? "Today" : `${daysLeft} day${daysLeft > 1 ? "s" : ""}`}</p>
                    </div>
                  )}
                  {activeTab === "submitted" && (
                    <span className="px-4 py-2 text-xs font-bold rounded-full bg-tertiary-container text-on-tertiary-container">Submitted</span>
                  )}
                  {activeTab === "graded" && a.submission && (
                    <span className="px-4 py-2 text-xs font-bold rounded-full bg-primary/10 text-primary">Graded</span>
                  )}
                  <span className="material-symbols-outlined text-on-surface-variant text-sm">chevron_right</span>
                </div>
              </div>
            </Link>
          );
        })}
        {filtered.length === 0 && (
          <div className="text-center py-16">
            <span className="material-symbols-outlined text-5xl text-outline-variant mb-4">
              {activeTab === "upcoming" ? "event_available" : activeTab === "submitted" ? "task_alt" : "school"}
            </span>
            <p className="text-on-surface-variant font-medium">
              {activeTab === "upcoming" ? "No upcoming assignments! 🎉" : activeTab === "submitted" ? "No pending submissions." : "No graded assignments yet."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
