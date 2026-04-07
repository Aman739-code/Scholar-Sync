import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getGrades, getGPA } from "../api/grades";
import { useAuth } from "../context/AuthContext";

export default function GradesPage() {
  const [grades, setGrades] = useState([]);
  const [gpaData, setGpaData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    Promise.all([getGrades(), getGPA()])
      .then(([gradesRes, gpaRes]) => { setGrades(gradesRes.data.grades); setGpaData(gpaRes.data); })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div></div>;

  // Group grades by course
  const courseGroups = {};
  grades.forEach(g => {
    const key = g.courseId?._id || "unknown";
    if (!courseGroups[key]) courseGroups[key] = { course: g.courseId, grades: [] };
    courseGroups[key].grades.push(g);
  });

  return (
    <div className="p-8 lg:p-12">
      <header className="mb-12">
        <p className="text-primary font-bold text-xs uppercase tracking-[0.2em] mb-2">Academic Performance</p>
        <h1 className="text-4xl font-extrabold font-manrope tracking-tight text-on-surface">Grades & GPA</h1>
        <p className="text-on-surface-variant mt-2">Track your academic performance across all courses.</p>
      </header>

      {/* GPA Card */}
      <div className="grid grid-cols-12 gap-8 mb-12">
        <div className="col-span-12 md:col-span-4 linear-soul rounded-3xl p-8 text-on-primary">
          <p className="text-xs font-bold uppercase tracking-wider opacity-70">Cumulative GPA</p>
          <p className="text-6xl font-extrabold font-manrope mt-2">{gpaData?.gpa?.toFixed(2) || "0.00"}</p>
          <p className="text-xs mt-2 opacity-70">Out of 4.00</p>
        </div>
        <div className="col-span-12 md:col-span-4 bg-surface-container-lowest rounded-3xl p-8">
          <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Class Rank</p>
          <p className="text-4xl font-extrabold font-manrope mt-2 text-on-surface">{gpaData?.rank || "N/A"}</p>
          <p className="text-xs text-on-surface-variant mt-1">Keep up the great work!</p>
        </div>
        <div className="col-span-12 md:col-span-4 bg-surface-container-lowest rounded-3xl p-8">
          <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Average Score</p>
          <p className="text-4xl font-extrabold font-manrope mt-2 text-on-surface">{gpaData?.averagePercentage || 0}%</p>
          <p className="text-xs text-on-surface-variant mt-1">Across {gpaData?.totalGrades || 0} graded assignments</p>
        </div>
      </div>

      {/* Grades by Course */}
      <div className="space-y-8">
        {Object.entries(courseGroups).map(([key, { course, grades: courseGrades }]) => (
          <section key={key} className="bg-surface-container-lowest rounded-3xl overflow-hidden">
            <div className="p-6 bg-surface-container-low flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">{course?.code || "Course"}</p>
                <h3 className="font-bold font-manrope text-lg">{course?.title || "Unknown Course"}</h3>
              </div>
              <Link to={`/courses/${course?.slug || course?._id}`} className="text-xs font-bold text-primary hover:underline">View Course</Link>
            </div>
            <div className="divide-y divide-surface-container">
              {courseGrades.map(g => {
                const pct = g.maxScore > 0 ? Math.round((g.score / g.maxScore) * 100) : 0;
                return (
                  <div key={g._id} className="p-6 flex items-center justify-between hover:bg-surface-bright transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center">
                        <span className="material-symbols-outlined text-primary text-sm">assignment</span>
                      </div>
                      <div>
                        <p className="font-bold text-sm">{g.assignmentId?.title || "Assignment"}</p>
                        <p className="text-[10px] text-on-surface-variant">{new Date(g.gradedAt).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <p className="text-sm font-medium text-on-surface-variant">{g.score}/{g.maxScore}</p>
                      <div className="px-3 py-1 rounded-full bg-primary-container text-on-primary-container text-sm font-extrabold">{g.letterGrade}</div>
                      <div className="px-3 py-1 rounded-full bg-tertiary-container text-on-tertiary-container text-sm font-extrabold">{pct}%</div>
                    </div>
                  </div>
                );
              })}
            </div>
            {courseGrades.length > 0 && courseGrades[0].feedback && (
              <div className="px-6 pb-6">
                <div className="bg-surface-container-low rounded-3xl p-4 mt-2">
                  <p className="text-[10px] font-bold text-on-surface-variant uppercase mb-1">Latest Feedback</p>
                  <p className="text-sm text-on-surface-variant">{courseGrades[0].feedback}</p>
                </div>
              </div>
            )}
          </section>
        ))}
      </div>

      {grades.length === 0 && (
        <div className="text-center py-16">
          <span className="material-symbols-outlined text-5xl text-outline-variant mb-4">school</span>
          <p className="text-on-surface-variant font-medium">No grades available yet. Keep working on your assignments!</p>
        </div>
      )}
    </div>
  );
}
