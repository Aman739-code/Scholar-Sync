import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAssignments, createAssignment } from "../../api/assignments";
import { getInstructorCourses } from "../../api/courses";

export default function InstructorAssignmentsPage() {
  const [assignments, setAssignments] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ courseId: "", title: "", description: "", type: "lab", deadline: "", points: 100, instructorNote: "" });
  const [saving, setSaving] = useState(false);

  const load = () => { getAssignments().then(res => setAssignments(res.data.assignments)).catch(console.error).finally(() => setLoading(false)); };
  useEffect(() => { load(); getInstructorCourses().then(res => setCourses(res.data.courses)); }, []);

  const handleCreate = async (e) => {
    e.preventDefault(); setSaving(true);
    try { await createAssignment({ ...form, requirements: [], rubric: [], resources: [] }); setShowModal(false); load(); }
    catch (err) { alert(err.response?.data?.error || "Failed"); }
    finally { setSaving(false); }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div></div>;

  return (
    <div className="p-12">
      <header className="mb-12 flex justify-between items-end">
        <div><h1 className="text-4xl font-extrabold font-manrope tracking-tight">Assignments</h1><p className="text-on-surface-variant mt-2">Create and manage assignments for your courses.</p></div>
        <button onClick={() => setShowModal(true)} className="px-6 py-3 linear-soul text-on-primary rounded-full font-manrope font-bold text-sm flex items-center gap-2"><span className="material-symbols-outlined text-sm">add</span>Create Assignment</button>
      </header>

      <div className="space-y-4">
        {assignments.map(a => (
          <div key={a._id} className="bg-surface-container-lowest rounded-3xl p-6 flex items-center justify-between group hover:bg-surface-bright transition-colors">
            <div className="flex items-center gap-5">
              <div className="w-12 h-12 rounded-3xl bg-surface-container-high flex items-center justify-center"><span className="material-symbols-outlined text-primary">{a.icon || "assignment"}</span></div>
              <div>
                <h3 className="font-manrope font-bold text-lg group-hover:text-primary transition-colors">{a.title}</h3>
                <p className="text-xs text-on-surface-variant mt-1">{a.courseId?.code || ""} • {a.type} • {a.points} pts</p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-right"><p className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider">Deadline</p><p className="text-sm font-bold">{new Date(a.deadline).toLocaleDateString()}</p></div>
              <span className={`px-4 py-2 text-xs font-bold rounded-full capitalize ${a.status === 'due_soon' ? 'bg-error-container text-on-error-container' : a.status === 'urgent' ? 'bg-error-container text-on-error-container' : 'bg-surface-container text-on-surface'}`}>{a.status?.replace('_', ' ')}</span>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowModal(false)}>
          <div className="bg-surface-container-lowest rounded-3xl p-8 max-w-lg w-full shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6"><h2 className="text-xl font-bold font-manrope">New Assignment</h2><button onClick={() => setShowModal(false)} className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center"><span className="material-symbols-outlined text-sm">close</span></button></div>
            <form onSubmit={handleCreate} className="space-y-4">
              <div><label className="block text-xs font-bold text-on-surface-variant uppercase mb-1">Course</label><select value={form.courseId} onChange={e => setForm({ ...form, courseId: e.target.value })} required className="w-full px-4 py-3 bg-surface-container-low border-none rounded-3xl text-sm"><option value="">Select course</option>{courses.map(c => <option key={c._id} value={c._id}>{c.code} — {c.title}</option>)}</select></div>
              <div><label className="block text-xs font-bold text-on-surface-variant uppercase mb-1">Title</label><input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required className="w-full px-4 py-3 bg-surface-container-low border-none rounded-3xl text-sm" /></div>
              <div><label className="block text-xs font-bold text-on-surface-variant uppercase mb-1">Description</label><textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} required className="w-full px-4 py-3 bg-surface-container-low border-none rounded-3xl text-sm resize-none h-20" /></div>
              <div className="grid grid-cols-3 gap-3">
                <div><label className="block text-xs font-bold text-on-surface-variant uppercase mb-1">Type</label><select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })} className="w-full px-4 py-3 bg-surface-container-low border-none rounded-3xl text-sm"><option value="lab">Lab</option><option value="quiz">Quiz</option><option value="project">Project</option><option value="reflection">Reflection</option><option value="submission">Submission</option></select></div>
                <div><label className="block text-xs font-bold text-on-surface-variant uppercase mb-1">Points</label><input type="number" value={form.points} onChange={e => setForm({ ...form, points: Number(e.target.value) })} className="w-full px-4 py-3 bg-surface-container-low border-none rounded-3xl text-sm" /></div>
                <div><label className="block text-xs font-bold text-on-surface-variant uppercase mb-1">Deadline</label><input type="date" value={form.deadline} onChange={e => setForm({ ...form, deadline: e.target.value })} required className="w-full px-4 py-3 bg-surface-container-low border-none rounded-3xl text-sm" /></div>
              </div>
              <div className="flex gap-3 pt-2"><button type="button" onClick={() => setShowModal(false)} className="flex-1 py-3 bg-surface-container-high text-on-surface rounded-full font-manrope font-bold text-sm">Cancel</button><button type="submit" disabled={saving} className="flex-1 py-3 linear-soul text-on-primary rounded-full font-manrope font-bold text-sm disabled:opacity-50">{saving ? "Creating..." : "Create"}</button></div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
