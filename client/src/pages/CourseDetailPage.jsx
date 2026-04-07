import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getCourse } from "../api/courses";
import { enroll } from "../api/dashboard";

export default function CourseDetailPage() {
  const { courseId } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("modules");

  const load = () => {
    getCourse(courseId).then(res => setData(res.data)).catch(console.error).finally(() => setLoading(false));
  };
  useEffect(load, [courseId]);

  const handleEnroll = async () => {
    try { await enroll(data.course._id); load(); } catch (err) { alert(err.response?.data?.error || "Failed"); }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div></div>;
  if (!data?.course) return <div className="min-h-screen flex items-center justify-center"><p className="text-on-surface-variant">Course not found.</p></div>;

  const { course, modules, announcements, enrollment, enrolledCount } = data;
  const instructor = course.instructorId;
  const completedCount = modules?.filter(m => m.status === "completed").length || 0;
  const totalModules = modules?.length || 0;
  const progress = enrollment?.progress || (totalModules > 0 ? Math.round((completedCount / totalModules) * 100) : 0);

  return (
    <div className="p-8 lg:p-12">
      {/* Breadcrumb */}
      <nav className="flex space-x-2 text-xs font-medium text-on-surface-variant mb-6">
        <Link to="/dashboard" className="hover:text-primary transition-colors">Dashboard</Link>
        <span className="opacity-30">/</span>
        <Link to="/courses" className="hover:text-primary transition-colors">Courses</Link>
        <span className="opacity-30">/</span>
        <span className="text-primary font-semibold">{course.code}</span>
      </nav>

      {/* Hero Banner */}
      <div className="relative rounded-3xl overflow-hidden mb-8 h-56 bg-surface-container-high">
        <img className="w-full h-full object-cover" src={course.bannerImage || "https://placehold.co/1200x400"} alt={course.title} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-6 left-6 right-6 text-white">
          <p className="text-xs font-semibold uppercase tracking-wider opacity-80">{course.code} • {course.units} Units • {course.semester}</p>
          <h1 className="text-3xl font-extrabold font-manrope mt-1">{course.title}</h1>
        </div>
      </div>

      {/* Course Info Bar */}
      <div className="flex flex-wrap items-center justify-between gap-6 mb-10">
        <div className="flex items-center gap-4">
          {instructor?.profileImage ? (
            <img className="w-12 h-12 rounded-full object-cover" src={instructor.profileImage} alt="" />
          ) : (
            <div className="w-12 h-12 rounded-full bg-primary-container flex items-center justify-center"><span className="material-symbols-outlined text-primary">person</span></div>
          )}
          <div>
            <p className="font-bold font-manrope">{instructor?.name || "Instructor"}</p>
            <p className="text-xs text-on-surface-variant">{course.schedule}</p>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="text-center"><p className="text-2xl font-extrabold font-manrope text-primary">{enrolledCount}</p><p className="text-[10px] font-bold text-on-surface-variant uppercase">Students</p></div>
          <div className="text-center"><p className="text-2xl font-extrabold font-manrope text-on-surface">{totalModules}</p><p className="text-[10px] font-bold text-on-surface-variant uppercase">Modules</p></div>
          {!enrollment ? (
            <button onClick={handleEnroll} className="px-6 py-3 linear-soul text-on-primary rounded-full font-manrope font-bold text-sm">Enroll Now</button>
          ) : (
            <div className="flex items-center gap-3">
              <div className="w-24 h-2 bg-surface-container rounded-full overflow-hidden"><div className="h-full bg-primary rounded-full" style={{ width: `${progress}%` }}></div></div>
              <span className="text-sm font-bold text-primary">{progress}%</span>
            </div>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-10 mb-8 border-b border-surface-container-high pb-4">
        {["modules", "announcements", "about"].map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)} className={`font-manrope font-bold capitalize pb-4 -mb-4 relative transition-colors ${activeTab === tab ? "text-primary border-b-2 border-primary" : "text-on-surface-variant hover:text-on-surface"}`}>{tab}</button>
        ))}
      </div>

      {/* Modules Tab */}
      {activeTab === "modules" && (
        <div className="space-y-3">
          {(modules || []).map((mod, i) => (
            <div key={mod._id} className="bg-surface-container-lowest rounded-3xl p-6 flex items-center justify-between group hover:bg-surface-bright transition-colors">
              <div className="flex items-center gap-5">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${mod.status === 'completed' ? 'bg-primary text-on-primary' : mod.status === 'current' ? 'bg-primary-container text-on-primary-container' : 'bg-surface-container text-on-surface-variant'}`}>
                  {mod.status === 'completed' ? <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span> : <span className="text-sm font-bold">{i + 1}</span>}
                </div>
                <div>
                  <p className="text-xs text-on-surface-variant font-bold uppercase tracking-wider">{mod.duration}</p>
                  <h3 className="font-bold font-manrope">{mod.title}</h3>
                </div>
              </div>
              <span className={`px-3 py-1 text-[10px] font-bold rounded-full uppercase ${mod.status === 'completed' ? 'bg-primary/10 text-primary' : mod.status === 'current' ? 'bg-tertiary-container text-on-tertiary-container' : 'bg-surface-container text-on-surface-variant'}`}>{mod.status}</span>
            </div>
          ))}
        </div>
      )}

      {/* Announcements Tab */}
      {activeTab === "announcements" && (
        <div className="space-y-4 max-w-3xl">
          {(announcements || []).map((a, i) => (
            <div key={i} className="bg-surface-container-lowest rounded-3xl p-6 flex gap-4 items-start">
              <div className="w-12 h-12 rounded-3xl bg-primary-container text-on-primary-container flex items-center justify-center flex-shrink-0">
                <span className="text-xs font-bold">{new Date(a.postedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
              </div>
              <div>
                <p className="font-medium">{a.text}</p>
                <p className="text-xs text-on-surface-variant mt-2">Posted by {a.postedBy?.name || instructor?.name}</p>
              </div>
            </div>
          ))}
          {(!announcements || announcements.length === 0) && <p className="text-on-surface-variant text-sm">No announcements yet.</p>}
        </div>
      )}

      {/* About Tab */}
      {activeTab === "about" && (
        <div className="bg-surface-container-lowest rounded-3xl p-8 max-w-3xl">
          <h3 className="text-xl font-bold font-manrope mb-4">Course Description</h3>
          <p className="text-on-surface-variant leading-relaxed">{course.description}</p>
          <div className="mt-6 grid grid-cols-2 gap-4">
            <div className="bg-surface-container-low rounded-3xl p-4"><p className="text-[10px] font-bold text-on-surface-variant uppercase">Track</p><p className="font-bold font-manrope mt-1">{course.track}</p></div>
            <div className="bg-surface-container-low rounded-3xl p-4"><p className="text-[10px] font-bold text-on-surface-variant uppercase">Capacity</p><p className="font-bold font-manrope mt-1">{enrolledCount} / {course.maxCapacity}</p></div>
          </div>
        </div>
      )}
    </div>
  );
}
