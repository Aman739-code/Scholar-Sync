import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getCourses } from "../api/courses";
import { enroll } from "../api/dashboard";

const tracks = ["All Tracks", "Computer Science", "Mathematics", "Humanities", "Design Systems"];

export default function CoursesPage() {
  const [activeTrack, setActiveTrack] = useState("All Tracks");
  const [searchQuery, setSearchQuery] = useState("");
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadCourses = () => {
    const params = {};
    if (activeTrack !== "All Tracks") params.track = activeTrack;
    if (searchQuery) params.search = searchQuery;
    setLoading(true);
    getCourses(params).then(res => setCourses(res.data.courses)).catch(console.error).finally(() => setLoading(false));
  };

  useEffect(loadCourses, [activeTrack]);

  const handleSearch = (e) => {
    e.preventDefault();
    loadCourses();
  };

  const handleEnroll = async (e, courseId) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await enroll(courseId);
      loadCourses();
    } catch (err) {
      alert(err.response?.data?.error || "Enrollment failed");
    }
  };

  return (
    <div className="p-8 lg:p-12">
      {/* Header */}
      <header className="mb-12">
        <p className="text-primary font-bold text-xs uppercase tracking-[0.2em] mb-2">Knowledge Hub</p>
        <h1 className="text-4xl font-extrabold font-manrope tracking-tight text-on-surface">Course Catalog</h1>
        <p className="text-on-surface-variant mt-2">Explore and enroll in courses to level up your academic journey.</p>
      </header>

      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row gap-6 items-start md:items-center mb-12">
        <form onSubmit={handleSearch} className="flex-1 relative max-w-xl">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">search</span>
          <input
            type="text" placeholder="Search courses..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-surface-container-lowest border-none rounded-full focus:ring-2 focus:ring-primary/20 text-sm font-body"
          />
        </form>
        <div className="flex gap-2 flex-wrap">
          {tracks.map((track) => (
            <button key={track} onClick={() => setActiveTrack(track)}
              className={`px-4 py-2 rounded-full text-xs font-bold font-manrope transition-all ${activeTrack === track ? "linear-soul text-on-primary" : "bg-surface-container-lowest text-on-surface-variant hover:bg-surface-container"}`}
            >{track}</button>
          ))}
        </div>
      </div>

      {/* Courses Grid */}
      {loading ? (
        <div className="flex justify-center py-16"><div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div></div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <Link to={`/courses/${course.slug || course._id}`} key={course._id} className="group bg-surface-container-lowest rounded-3xl overflow-hidden transition-all duration-300 hover:translate-y-[-4px]">
              <div className="aspect-video w-full overflow-hidden relative bg-surface-container-high">
                <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src={course.bannerImage || "https://placehold.co/400x225?text=Course"} alt={course.title} />
                {course.enrollment && (
                  <div className="absolute top-3 right-3 px-3 py-1 bg-primary text-on-primary text-[10px] font-bold rounded-full uppercase">Enrolled</div>
                )}
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">{course.code} • {course.units} Units • {course.semester}</p>
                  <h3 className="text-lg font-bold font-manrope leading-tight group-hover:text-primary transition-colors mt-1">{course.title}</h3>
                </div>
                <p className="text-xs text-on-surface-variant line-clamp-2">{course.description}</p>
                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-2">
                    {course.instructorId?.profileImage ? (
                      <img className="w-6 h-6 rounded-full object-cover" src={course.instructorId.profileImage} alt="" />
                    ) : (
                      <div className="w-6 h-6 rounded-full bg-surface-container flex items-center justify-center"><span className="material-symbols-outlined text-xs">person</span></div>
                    )}
                    <span className="text-xs font-medium text-on-surface-variant">{course.instructorId?.name || "Instructor"}</span>
                  </div>
                  {!course.enrollment && (
                    <button onClick={(e) => handleEnroll(e, course._id)} className="px-4 py-2 bg-primary-container text-on-primary-container text-xs font-bold rounded-full hover:bg-primary hover:text-on-primary transition-all">
                      Enroll
                    </button>
                  )}
                  {course.enrollment && (
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1 bg-surface-container rounded-full overflow-hidden">
                        <div className="h-full bg-primary rounded-full" style={{ width: `${course.enrollment.progress}%` }}></div>
                      </div>
                      <span className="text-[10px] font-bold text-on-surface-variant">{course.enrollment.progress}%</span>
                    </div>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
      {!loading && courses.length === 0 && (
        <div className="text-center py-16">
          <span className="material-symbols-outlined text-5xl text-outline-variant mb-4">search_off</span>
          <p className="text-on-surface-variant font-medium">No courses found matching your criteria.</p>
        </div>
      )}
    </div>
  );
}
