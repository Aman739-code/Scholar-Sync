import { useState, useEffect } from "react";
import { getSubmissions } from "../../api/dashboard";
import { createGrade } from "../../api/grades";

export default function InstructorSubmissionsPage() {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [gradeModal, setGradeModal] = useState(null);
  const [gradeForm, setGradeForm] = useState({ score: 0, maxScore: 100, letterGrade: "A", feedback: "" });

  const load = () => { getSubmissions().then(res => setSubmissions(res.data.submissions)).catch(console.error).finally(() => setLoading(false)); };
  useEffect(load, []);

  const handleGrade = async (e) => {
    e.preventDefault();
    try { await createGrade({ submissionId: gradeModal._id, ...gradeForm }); setGradeModal(null); load(); }
    catch (err) { alert(err.response?.data?.error || "Failed to grade"); }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div></div>;

  return (
    <div className="p-12">
      <header className="mb-12"><h1 className="text-4xl font-extrabold font-manrope tracking-tight">Submissions</h1><p className="text-on-surface-variant mt-2">Review and grade student submissions.</p></header>

      <div className="space-y-4">
        {submissions.map(s => (
          <div key={s._id} className="bg-surface-container-lowest rounded-3xl p-6 flex items-center justify-between group hover:bg-surface-bright transition-colors">
            <div className="flex items-center gap-5">
              <div className="w-12 h-12 rounded-3xl bg-surface-container-high flex items-center justify-center">
                <span className="material-symbols-outlined text-primary" style={s.status === 'graded' ? { fontVariationSettings: "'FILL' 1" } : undefined}>{s.status === "graded" ? "check_circle" : "description"}</span>
              </div>
              <div>
                <h3 className="font-manrope font-bold text-lg">{s.assignmentId?.title || "Assignment"}</h3>
                <p className="text-xs text-on-surface-variant mt-1">{s.studentId?.name} • {s.studentId?.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <p className="text-sm text-on-surface-variant">{new Date(s.submittedAt).toLocaleDateString()}</p>
              <span className={`px-4 py-2 text-xs font-bold rounded-full capitalize ${s.status === 'submitted' ? 'bg-tertiary-container text-on-tertiary-container' : s.status === 'graded' ? 'bg-primary/10 text-primary' : 'bg-error-container text-on-error-container'}`}>{s.status}</span>
              {s.status === "submitted" && (
                <button onClick={() => { setGradeModal(s); setGradeForm({ score: 0, maxScore: s.assignmentId?.points || 100, letterGrade: "A", feedback: "" }); }} className="px-4 py-2 linear-soul text-on-primary rounded-full font-manrope font-bold text-xs">Grade</button>
              )}
            </div>
          </div>
        ))}
        {submissions.length === 0 && (
          <div className="text-center py-16"><span className="material-symbols-outlined text-5xl text-outline-variant mb-4">inbox</span><p className="text-on-surface-variant font-medium">No submissions to review.</p></div>
        )}
      </div>

      {gradeModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setGradeModal(null)}>
          <div className="bg-surface-container-lowest rounded-3xl p-8 max-w-md w-full shadow-2xl" onClick={e => e.stopPropagation()}>
            <h2 className="text-xl font-bold font-manrope mb-6">Grade Submission</h2>
            <p className="text-sm text-on-surface-variant mb-4">{gradeModal.studentId?.name} — {gradeModal.assignmentId?.title}</p>
            <form onSubmit={handleGrade} className="space-y-4">
              <div className="grid grid-cols-3 gap-3">
                <div><label className="block text-xs font-bold text-on-surface-variant uppercase mb-1">Score</label><input type="number" value={gradeForm.score} onChange={e => setGradeForm({ ...gradeForm, score: Number(e.target.value) })} className="w-full px-4 py-3 bg-surface-container-low border-none rounded-3xl text-sm" /></div>
                <div><label className="block text-xs font-bold text-on-surface-variant uppercase mb-1">Max</label><input type="number" value={gradeForm.maxScore} onChange={e => setGradeForm({ ...gradeForm, maxScore: Number(e.target.value) })} className="w-full px-4 py-3 bg-surface-container-low border-none rounded-3xl text-sm" /></div>
                <div><label className="block text-xs font-bold text-on-surface-variant uppercase mb-1">Grade</label><select value={gradeForm.letterGrade} onChange={e => setGradeForm({ ...gradeForm, letterGrade: e.target.value })} className="w-full px-4 py-3 bg-surface-container-low border-none rounded-3xl text-sm"><option>A</option><option>A-</option><option>B+</option><option>B</option><option>B-</option><option>C+</option><option>C</option><option>D</option><option>F</option></select></div>
              </div>
              <div><label className="block text-xs font-bold text-on-surface-variant uppercase mb-1">Feedback</label><textarea value={gradeForm.feedback} onChange={e => setGradeForm({ ...gradeForm, feedback: e.target.value })} className="w-full px-4 py-3 bg-surface-container-low border-none rounded-3xl text-sm resize-none h-24" placeholder="Write feedback..." /></div>
              <div className="flex gap-3"><button type="button" onClick={() => setGradeModal(null)} className="flex-1 py-3 bg-surface-container-high text-on-surface rounded-full font-manrope font-bold text-sm">Cancel</button><button type="submit" className="flex-1 py-3 linear-soul text-on-primary rounded-full font-manrope font-bold text-sm">Submit Grade</button></div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
