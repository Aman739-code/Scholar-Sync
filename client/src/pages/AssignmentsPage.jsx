import { Link } from "react-router-dom";
import { useState } from "react";

const allAssignments = {
  upcoming: [
    { icon: "neurology", title: "Advanced Neural Networks: Term Project Phase 1", sub: "CS450 • Detailed architectural proposal • 150 pts", date: "Oct 24, 2024", status: "Due Soon", statusClass: "bg-error-container text-on-error-container", dateClass: "text-error", id: "neural-networks-term-project" },
    { icon: "description", title: "Distributed Systems: Consensus Algorithms Quiz", sub: "CS402 • 30 mins estimated • Late penalty applies", date: "Oct 26, 2024", status: "Available", statusClass: "bg-surface-container text-on-surface", dateClass: "", id: "consensus-algorithms-quiz" },
    { icon: "code", title: "Cryptography: RSA Implementation Lab", sub: "CS405 • Submission required in .zip format", date: "Oct 21, 2024", status: "Urgent", statusClass: "bg-error-container text-on-error-container", dateClass: "text-error", id: "rsa-implementation-lab" },
    { icon: "edit_note", title: "Ethics in AI: Weekly Reflection", sub: "CS450 • 500-word reflection essay", date: "Oct 27, 2024", status: "Available", statusClass: "bg-surface-container text-on-surface", dateClass: "", id: "ethics-weekly-reflection" },
  ],
  submitted: [
    { icon: "check_circle", title: "Compiler Design: Lexical Analysis", sub: "CS408 • Submitted Oct 18, 2024", date: "Awaiting Grade", status: "Submitted", statusClass: "bg-surface-container-high text-secondary", dateClass: "", id: "lexical-analysis", opacity: true, fill: true },
    { icon: "check_circle", title: "Dynamic Programming Lab", sub: "CS304 • Submitted Oct 15, 2024", date: "Awaiting Grade", status: "Submitted", statusClass: "bg-surface-container-high text-secondary", dateClass: "", id: "dynamic-programming-lab", opacity: true, fill: true },
    { icon: "check_circle", title: "Vector Spaces Problem Set", sub: "MA210 • Submitted Oct 12, 2024", date: "Graded", status: "Submitted", statusClass: "bg-surface-container-high text-secondary", dateClass: "", id: "vector-spaces-quiz", opacity: true, fill: true },
  ],
  graded: [
    { icon: "grade", title: "B-Tree Implementation", sub: "CS301 • Graded Oct 10, 2024 • Score: 92/100", date: "92%", status: "A-", statusClass: "bg-tertiary-container text-on-tertiary-container", dateClass: "text-primary font-extrabold", id: "dynamic-programming-lab", opacity: true, fill: true },
    { icon: "grade", title: "Social Contract Theory Critique", sub: "HIS210 • Graded Oct 8, 2024 • Score: 96/100", date: "96%", status: "A", statusClass: "bg-primary-container text-on-primary-container", dateClass: "text-primary font-extrabold", id: "vector-spaces-quiz", opacity: true, fill: true },
    { icon: "grade", title: "SQL Joins Lab", sub: "CS305 • Graded Oct 5, 2024 • Score: 88/100", date: "88%", status: "B+", statusClass: "bg-secondary-container text-on-secondary-container", dateClass: "text-primary font-extrabold", id: "consensus-algorithms-quiz", opacity: true, fill: true },
  ],
};

export default function AssignmentsPage() {
  const [activeTab, setActiveTab] = useState("upcoming");
  const tabs = [
    { key: "upcoming", label: `Upcoming (${allAssignments.upcoming.length})` },
    { key: "submitted", label: `Submitted (${allAssignments.submitted.length})` },
    { key: "graded", label: `Graded (${allAssignments.graded.length})` },
  ];
  const currentAssignments = allAssignments[activeTab];

  return (
    <div className="min-h-screen bg-surface p-12">
      <header className="mb-16">
        <h1 className="text-6xl font-headline font-extrabold text-on-background tracking-tighter mb-4">Assignments</h1>
        <p className="text-on-surface-variant max-w-2xl text-lg">Manage your intellectual progress. Track upcoming deadlines, review your submissions, and explore feedback from your curators.</p>
      </header>

      <div className="grid grid-cols-12 gap-8">
        {/* Urgent Action Section */}
        <Link to="/assignments/neural-networks-term-project" className="col-span-12 lg:col-span-8 bg-surface-container-lowest p-8 rounded-3xl shadow-sm relative overflow-hidden flex flex-col justify-between min-h-[400px] group">
          <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
            <img className="w-full h-full object-cover rounded-3xl" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCbeORq6rC9nVB_eVQZ7aAUlA445wqv_JqcUWxAplhfP2IfmTjd1NcSk0UEfmG040X_4roykQUYrqfG5t2GFoiXSGpTmpiFAHkmGtABnssDiOwS9a7AadaBECvKFe9gSj8-umcwU0S8ajFdQC8OPK7f0SG3rG9-XKGE4Uko_42FaHXgllznKS4nDmsxH8V29SwHyCwpiyyPsEvOzAOuzI7OLwm0GhG4METrJ8Yl2xF3Gv2ztPvbO4qxht7oyDcAkNm2SmqC_Orl37FV" alt="Workspace" />
          </div>
          <div className="relative z-10">
            <span className="inline-block px-3 py-1 bg-error-container text-on-error-container text-xs font-bold rounded-full mb-6 uppercase tracking-widest">Due Soon</span>
            <h2 className="text-4xl font-headline font-bold mb-4 group-hover:text-primary transition-colors">Advanced Neural Networks: Term Project Phase 1</h2>
            <p className="text-on-surface-variant text-lg mb-8 max-w-md">Detailed architectural proposal for a transformer-based model focusing on efficient memory management.</p>
            <div className="flex items-center space-x-8 mb-8">
              <div>
                <p className="text-xs text-on-surface-variant font-semibold uppercase tracking-wider mb-1">Deadline</p>
                <p className="text-on-surface font-bold">Oct 24, 2024 • 11:59 PM</p>
              </div>
              <div>
                <p className="text-xs text-on-surface-variant font-semibold uppercase tracking-wider mb-1">Points</p>
                <p className="text-on-surface font-bold">150 Units</p>
              </div>
            </div>
          </div>
          <div className="relative z-10 flex space-x-4">
            <span className="px-8 py-3 bg-primary text-on-primary rounded-full font-headline font-bold text-sm hover:bg-primary-dim transition-colors">Start Submission</span>
            <span className="px-8 py-3 bg-surface-container-highest text-on-surface rounded-full font-headline font-bold text-sm hover:opacity-80 transition-opacity">View Prompt</span>
          </div>
        </Link>

        {/* Stats */}
        <div className="col-span-12 lg:col-span-4 flex flex-col gap-8">
          <div className="bg-primary-container p-8 rounded-3xl flex flex-col justify-center">
            <p className="text-on-primary-container font-headline font-bold text-sm uppercase tracking-widest mb-2">Overall Progress</p>
            <div className="text-5xl font-headline font-extrabold text-on-primary-container mb-4">84%</div>
            <div className="w-full bg-on-primary/20 h-2 rounded-full overflow-hidden">
              <div className="bg-on-primary-container h-full" style={{ width: "84%" }}></div>
            </div>
            <p className="text-on-primary-container/80 text-xs mt-4">12 of 14 assignments completed this semester.</p>
          </div>
          <Link to="/assignments/ethics-weekly-reflection" className="bg-tertiary-container p-8 rounded-3xl flex flex-col justify-center group hover:shadow-lg transition-all">
            <p className="text-on-tertiary-container font-headline font-bold text-sm uppercase tracking-widest mb-2">Next Milestone</p>
            <p className="text-xl font-headline font-bold text-on-tertiary-container group-hover:opacity-80 transition-opacity">Ethics in AI: Weekly Reflection</p>
            <p className="text-on-tertiary-container/80 text-sm mt-1">Due in 3 days</p>
          </Link>
        </div>

        {/* Assignment Tabs + List */}
        <div className="col-span-12 mt-8">
          <div className="flex items-center space-x-12 mb-10 border-b border-surface-container-high pb-4">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`font-headline font-bold pb-4 -mb-4 relative transition-colors ${activeTab === tab.key
                  ? "text-primary border-b-2 border-primary"
                  : "text-on-surface-variant hover:text-on-surface"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="space-y-6">
            {currentAssignments.map((item) => (
              <Link to={`/assignments/${item.id}`} key={item.title + item.sub} className={`group bg-surface-container-lowest p-6 rounded-3xl flex items-center justify-between hover:bg-surface-bright transition-colors ${item.opacity ? "opacity-80" : ""}`}>
                <div className="flex items-center space-x-6">
                  <div className="w-12 h-12 rounded-3xl bg-surface-container-high flex items-center justify-center">
                    <span className={`material-symbols-outlined ${item.fill ? "text-secondary" : "text-primary"}`} style={item.fill ? { fontVariationSettings: "'FILL' 1" } : undefined}>{item.icon}</span>
                  </div>
                  <div>
                    <h3 className={`font-headline font-bold text-lg ${item.opacity ? "text-on-surface-variant" : "text-on-surface group-hover:text-primary"} transition-colors`}>{item.title}</h3>
                    <p className="text-sm text-on-surface-variant mt-1">{item.sub}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-12">
                  <div className="text-right">
                    <p className="text-xs font-semibold text-on-surface-variant uppercase tracking-widest mb-1">{item.opacity && activeTab !== "graded" ? "Status" : activeTab === "graded" ? "Score" : "Due Date"}</p>
                    <p className={`text-sm font-bold ${item.dateClass}`}>{item.date}</p>
                  </div>
                  <span className={`px-4 py-2 ${item.statusClass} text-xs font-bold rounded-full`}>{item.status}</span>
                  <span className="material-symbols-outlined text-outline-variant group-hover:text-primary transition-colors">chevron_right</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-16 flex flex-col items-center">
        <button className="px-12 py-4 bg-white border border-outline-variant/20 rounded-full font-headline font-bold text-sm text-on-surface-variant hover:bg-surface-container transition-colors mb-12">
          Load Historical Assignments
        </button>
      </div>
    </div>
  );
}
