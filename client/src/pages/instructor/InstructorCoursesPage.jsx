import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getInstructorCourses, createCourse } from "../../api/courses";

export default function InstructorCoursesPage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ title: "", code: "", description: "", units: 3, semester: "Fall 2024", schedule: "", track: "Computer Science", maxCapacity: 60 });
  const [saving, setSaving] = useState(false);

  const loadCourses = () => { getInstructorCourses().then(res => setCourses(res.data.courses)).catch(console.error).finally(() => setLoading(false)); };
  useEffect(loadCourses, []);

  const handleCreate = async (e) => {
    e.preventDefault(); setSaving(true);
    try { await createCourse(form); setShowModal(false); setForm({ title: "", code: "", description: "", units: 3, semester: "Fall 2024", schedule: "", track: "Computer Science", maxCapacity: 60 }); loadCourses(); }
    catch (err) { alert(err.response?.data?.error || "Failed to create course"); }
    finally { setSaving(false); }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div></div>;

  return (
    <div className="p-12">
      <header className="mb-12 flex justify-between items-end">
        <div><h1 className="text-4xl font-extrabold font-manrope tracking-tight text-on-surface">My Courses</h1><p className="text-on-surface-variant mt-2">Manage your courses and modules.</p></div>
        <button onClick={() => setShowModal(true)} className="px-6 py-3 linear-soul text-on-primary rounded-full font-manrope font-bold text-sm flex items-center gap-2"><span className="material-symbols-outlined text-sm">add</span>Create Course</button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {courses.map(c => (
          <Link to={`/instructor/courses/${c._id}`} key={c._id} className="group bg-surface-container-lowest rounded-3xl overflow-hidden hover:translate-y-[-4px] transition-all">
            <div className="aspect-video w-full overflow-hidden relative bg-surface-container-high">
              {c.bannerImage ? <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src={c.bannerImage} alt={c.title} /> : <div className="w-full h-full flex items-center justify-center"><span className="material-symbols-outlined text-5xl text-outline-variant">auto_stories</span></div>}
            </div>
            <div className="p-6 space-y-4">
              <div>
                <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">{c.code} • {c.semester}</p>
                <h3 className="font-manrope font-bold text-lg leading-tight group-hover:text-primary transition-colors">{c.title}</h3>
              </div>
              <div className="flex justify-between text-xs font-semibold text-on-surface-variant">
                <span>{c.enrolledCount} Students</span>
                <span>{c.moduleCount} Modules</span>
                <span>{c.units} Units</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowModal(false)}>
          <div className="bg-surface-container-lowest rounded-3xl p-8 max-w-lg w-full shadow-2xl max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6"><h2 className="text-xl font-bold font-manrope">Create Course</h2><button onClick={() => setShowModal(false)} className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center"><span className="material-symbols-outlined text-sm">close</span></button></div>
            <form onSubmit={handleCreate} className="space-y-4">
              {[{ l: "Title", n: "title", t: "text" }, { l: "Code", n: "code", t: "text", p: "CS301" }, { l: "Schedule", n: "schedule", t: "text", p: "Mon/Wed 10:00 AM" }].map(f => (
                <div key={f.n}><label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1">{f.l}</label><input type={f.t} value={form[f.n]} onChange={e => setForm({ ...form, [f.n]: e.target.value })} required className="w-full px-4 py-3 bg-surface-container-low border-none rounded-3xl text-sm" placeholder={f.p || ""} /></div>
              ))}
              <div><label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1">Description</label><textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} required className="w-full px-4 py-3 bg-surface-container-low border-none rounded-3xl text-sm resize-none h-24" /></div>
              <div className="grid grid-cols-3 gap-3">
                <div><label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1">Units</label><input type="number" min={1} max={6} value={form.units} onChange={e => setForm({ ...form, units: Number(e.target.value) })} className="w-full px-4 py-3 bg-surface-container-low border-none rounded-3xl text-sm" /></div>
                <div><label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1">Track</label><select value={form.track} onChange={e => setForm({ ...form, track: e.target.value })} className="w-full px-4 py-3 bg-surface-container-low border-none rounded-3xl text-sm"><option>Computer Science</option><option>Mathematics</option><option>Humanities</option><option>Design Systems</option></select></div>
                <div><label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1">Capacity</label><input type="number" min={1} value={form.maxCapacity} onChange={e => setForm({ ...form, maxCapacity: Number(e.target.value) })} className="w-full px-4 py-3 bg-surface-container-low border-none rounded-3xl text-sm" /></div>
              </div>
              <div className="flex gap-3 pt-2"><button type="button" onClick={() => setShowModal(false)} className="flex-1 py-3 bg-surface-container-high text-on-surface rounded-full font-manrope font-bold text-sm">Cancel</button><button type="submit" disabled={saving} className="flex-1 py-3 linear-soul text-on-primary rounded-full font-manrope font-bold text-sm disabled:opacity-50">{saving ? "Creating..." : "Create"}</button></div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
