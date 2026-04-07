import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getCourse, addModule, addAnnouncement } from "../../api/courses";

export default function InstructorCourseDetailPage() {
  const { courseId } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("modules");
  const [modForm, setModForm] = useState({ title: "", duration: "2 weeks", status: "upcoming" });
  const [annText, setAnnText] = useState("");

  const load = () => { getCourse(courseId).then(res => setData(res.data)).catch(console.error).finally(() => setLoading(false)); };
  useEffect(load, [courseId]);

  const handleAddModule = async (e) => { e.preventDefault(); await addModule(data.course._id, modForm); setModForm({ title: "", duration: "2 weeks", status: "upcoming" }); load(); };
  const handleAddAnnouncement = async (e) => { e.preventDefault(); await addAnnouncement(data.course._id, annText); setAnnText(""); load(); };

  if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div></div>;
  if (!data?.course) return <div className="min-h-screen flex items-center justify-center"><p>Course not found.</p></div>;

  const { course, modules, announcements, enrolledCount } = data;

  return (
    <div className="p-12">
      <nav className="flex space-x-2 text-xs font-medium text-on-surface-variant mb-6"><Link to="/instructor/dashboard" className="hover:text-primary transition-colors">Dashboard</Link><span className="opacity-30">/</span><Link to="/instructor/courses" className="hover:text-primary transition-colors">Courses</Link><span className="opacity-30">/</span><span className="text-primary font-semibold">{course.code}</span></nav>

      <header className="mb-10 flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-extrabold font-manrope">{course.title}</h1>
          <p className="text-on-surface-variant mt-1">{course.code} • {course.units} Units • {course.semester}</p>
          <p className="text-on-surface-variant text-sm mt-1">{course.schedule}</p>
        </div>
        <div className="flex gap-6 text-center">
          <div className="bg-primary-container p-6 rounded-3xl"><p className="text-3xl font-extrabold font-manrope text-on-primary-container">{enrolledCount}</p><p className="text-[10px] font-bold text-on-primary-container uppercase">Students</p></div>
          <div className="bg-secondary-container p-6 rounded-3xl"><p className="text-3xl font-extrabold font-manrope text-on-secondary-container">{modules?.length || 0}</p><p className="text-[10px] font-bold text-on-secondary-container uppercase">Modules</p></div>
        </div>
      </header>

      <div className="flex space-x-10 mb-8 border-b border-surface-container-high pb-4">
        {["modules", "announcements", "about"].map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)} className={`font-manrope font-bold capitalize pb-4 -mb-4 relative transition-colors ${activeTab === tab ? "text-primary border-b-2 border-primary" : "text-on-surface-variant hover:text-on-surface"}`}>{tab}</button>
        ))}
      </div>

      {activeTab === "modules" && (
        <div className="space-y-4">
          {(modules || []).map((mod, i) => (
            <div key={mod._id} className="bg-surface-container-lowest rounded-3xl p-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center"><span className="text-sm font-bold text-on-surface-variant">{i + 1}</span></div>
                <div><p className="text-xs text-on-surface-variant font-bold uppercase tracking-wider">{mod.duration}</p><h3 className="font-bold font-manrope">{mod.title}</h3></div>
              </div>
              <span className={`px-3 py-1 text-[10px] font-bold rounded-full uppercase ${mod.status === 'completed' ? 'bg-primary/10 text-primary' : mod.status === 'current' ? 'bg-tertiary-container text-on-tertiary-container' : 'bg-surface-container text-on-surface-variant'}`}>{mod.status}</span>
            </div>
          ))}
          <form onSubmit={handleAddModule} className="bg-surface-container-low rounded-3xl p-6 flex items-end gap-4">
            <div className="flex-1"><label className="block text-xs font-bold text-on-surface-variant uppercase mb-1">New Module Title</label><input value={modForm.title} onChange={e => setModForm({ ...modForm, title: e.target.value })} required className="w-full px-4 py-3 bg-surface-container-lowest border-none rounded-3xl text-sm" placeholder="Module title" /></div>
            <div className="w-32"><label className="block text-xs font-bold text-on-surface-variant uppercase mb-1">Duration</label><input value={modForm.duration} onChange={e => setModForm({ ...modForm, duration: e.target.value })} className="w-full px-4 py-3 bg-surface-container-lowest border-none rounded-3xl text-sm" /></div>
            <button type="submit" className="px-6 py-3 linear-soul text-on-primary rounded-full font-manrope font-bold text-sm">Add</button>
          </form>
        </div>
      )}

      {activeTab === "announcements" && (
        <div className="space-y-4 max-w-3xl">
          <form onSubmit={handleAddAnnouncement} className="bg-surface-container-low rounded-3xl p-6 flex gap-4">
            <input value={annText} onChange={e => setAnnText(e.target.value)} required className="flex-1 px-4 py-3 bg-surface-container-lowest border-none rounded-3xl text-sm" placeholder="Write an announcement..." />
            <button type="submit" className="px-6 py-3 linear-soul text-on-primary rounded-full font-manrope font-bold text-sm">Post</button>
          </form>
          {(announcements || []).map((a, i) => (
            <div key={i} className="bg-surface-container-lowest rounded-3xl p-6 flex gap-4 items-start">
              <div className="w-12 h-12 rounded-3xl bg-primary-container text-on-primary-container flex items-center justify-center flex-shrink-0"><span className="text-xs font-bold">{new Date(a.postedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span></div>
              <div><p className="font-medium">{a.text}</p><p className="text-xs text-on-surface-variant mt-2">Posted by {a.postedBy?.name || course.instructorId?.name}</p></div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "about" && (
        <div className="bg-surface-container-lowest rounded-3xl p-8 max-w-3xl"><h3 className="text-xl font-bold font-manrope mb-4">Course Description</h3><p className="text-on-surface-variant leading-relaxed">{course.description}</p></div>
      )}
    </div>
  );
}
