import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getAssignment } from "../api/assignments";
import { createSubmission } from "../api/dashboard";

export default function AssignmentDetailPage() {
  const { assignmentId } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showSubmit, setShowSubmit] = useState(false);
  const [submitNote, setSubmitNote] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const load = () => {
    getAssignment(assignmentId).then(res => setData(res.data)).catch(console.error).finally(() => setLoading(false));
  };
  useEffect(load, [assignmentId]);

  const handleSubmit = async (e) => {
    e.preventDefault(); setSubmitting(true);
    try { await createSubmission({ assignmentId: data.assignment._id, note: submitNote }); setShowSubmit(false); setSubmitNote(""); load(); }
    catch (err) { alert(err.response?.data?.error || "Submission failed"); }
    finally { setSubmitting(false); }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div></div>;
  if (!data?.assignment) return <div className="min-h-screen flex items-center justify-center"><p>Assignment not found.</p></div>;

  const { assignment, submission, course } = data;
  const deadline = new Date(assignment.deadline);
  const isPast = deadline < new Date();
  const typeColors = { lab: "bg-primary-container text-on-primary-container", quiz: "bg-tertiary-container text-on-tertiary-container", project: "bg-secondary-container text-on-secondary-container", reflection: "bg-surface-container text-on-surface-variant", submission: "bg-error-container text-on-error-container" };

  return (
    <div className="p-8 lg:p-12">
      {/* Breadcrumb */}
      <nav className="flex space-x-2 text-xs font-medium text-on-surface-variant mb-6">
        <Link to="/dashboard" className="hover:text-primary">Dashboard</Link><span className="opacity-30">/</span>
        <Link to="/assignments" className="hover:text-primary">Assignments</Link><span className="opacity-30">/</span>
        <span className="text-primary font-semibold truncate max-w-[200px]">{assignment.title}</span>
      </nav>

      {/* Hero */}
      <div className="relative rounded-3xl overflow-hidden mb-8 h-48 bg-surface-container-high">
        <img className="w-full h-full object-cover" src={assignment.bannerImage || "https://placehold.co/1200x400"} alt="" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        <div className="absolute bottom-6 left-6 right-6 text-white flex items-end justify-between">
          <div>
            <span className={`px-3 py-1 text-[10px] font-bold rounded-full uppercase ${typeColors[assignment.type] || "bg-white/20 text-white"}`}>{assignment.type}</span>
            <h1 className="text-3xl font-extrabold font-manrope mt-2">{assignment.title}</h1>
            <p className="text-sm opacity-80 mt-1">{course?.title || assignment.courseId?.title || ""}</p>
          </div>
          <div className="text-right">
            <p className="text-3xl font-extrabold font-manrope">{assignment.points}</p>
            <p className="text-[10px] uppercase font-bold opacity-80">Points</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-8">
        {/* Main Content */}
        <div className="col-span-12 lg:col-span-8 space-y-8">
          {/* Description */}
          <section className="bg-surface-container-lowest rounded-3xl p-8">
            <h2 className="text-xl font-bold font-manrope mb-4">Description</h2>
            <p className="text-on-surface-variant leading-relaxed">{assignment.description}</p>
          </section>

          {/* Requirements */}
          {assignment.requirements?.length > 0 && (
            <section className="bg-surface-container-lowest rounded-3xl p-8">
              <h2 className="text-xl font-bold font-manrope mb-6">Requirements</h2>
              <ul className="space-y-3">
                {assignment.requirements.map((req, i) => (
                  <li key={i} className="flex items-start gap-3"><span className="material-symbols-outlined text-primary text-sm mt-0.5">check_circle</span><span className="text-sm">{req}</span></li>
                ))}
              </ul>
            </section>
          )}

          {/* Rubric */}
          {assignment.rubric?.length > 0 && (
            <section className="bg-surface-container-lowest rounded-3xl p-8">
              <h2 className="text-xl font-bold font-manrope mb-6">Grading Rubric</h2>
              <div className="space-y-4">
                {assignment.rubric.map((r, i) => (
                  <div key={i} className="bg-surface-container-low rounded-3xl p-5 flex items-center justify-between">
                    <div><h3 className="font-bold font-manrope">{r.criteria}</h3><p className="text-xs text-on-surface-variant mt-1">{r.description}</p></div>
                    <div className="px-4 py-2 bg-primary-container text-on-primary-container text-sm font-extrabold rounded-full">{r.weight}</div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Instructor Note */}
          {assignment.instructorNote && (
            <section className="bg-tertiary-container rounded-3xl p-8">
              <div className="flex items-center gap-3 mb-3"><span className="material-symbols-outlined text-on-tertiary-container">tips_and_updates</span><h2 className="font-bold font-manrope text-on-tertiary-container">Instructor Note</h2></div>
              <p className="text-on-tertiary-container text-sm leading-relaxed">{assignment.instructorNote}</p>
            </section>
          )}
        </div>

        {/* Sidebar */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
          {/* Status Card */}
          <div className="bg-surface-container-lowest rounded-3xl p-6 space-y-5">
            <div><p className="text-[10px] font-bold text-on-surface-variant uppercase mb-1">Deadline</p><p className="font-bold font-manrope">{deadline.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</p><p className="text-xs text-on-surface-variant">{deadline.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</p></div>
            <div><p className="text-[10px] font-bold text-on-surface-variant uppercase mb-1">Status</p><span className={`px-3 py-1 text-[10px] font-bold rounded-full uppercase ${submission ? (submission.status === 'graded' ? 'bg-primary/10 text-primary' : 'bg-tertiary-container text-on-tertiary-container') : (isPast ? 'bg-error-container text-on-error-container' : 'bg-surface-container text-on-surface-variant')}`}>{submission ? submission.status : (isPast ? "Past Due" : "Not Submitted")}</span></div>
            {!submission && !isPast && (
              <button onClick={() => setShowSubmit(true)} className="w-full py-3 linear-soul text-on-primary rounded-full font-manrope font-bold text-sm">Submit Assignment</button>
            )}
          </div>

          {/* Resources */}
          {assignment.resources?.length > 0 && (
            <div className="bg-surface-container-lowest rounded-3xl p-6">
              <h3 className="font-bold font-manrope mb-4">Resources</h3>
              <div className="space-y-3">
                {assignment.resources.map((r, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 bg-surface-container-low rounded-3xl">
                    <span className="material-symbols-outlined text-primary text-sm">description</span>
                    <div><p className="text-sm font-bold">{r.name}</p><p className="text-[10px] text-on-surface-variant">{r.type}</p></div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Instructor */}
          {course?.instructorId && (
            <div className="bg-surface-container-lowest rounded-3xl p-6 flex items-center gap-4">
              {course.instructorId.profileImage ? <img className="w-12 h-12 rounded-full object-cover" src={course.instructorId.profileImage} alt="" /> : <div className="w-12 h-12 rounded-full bg-primary-container flex items-center justify-center"><span className="material-symbols-outlined text-primary">person</span></div>}
              <div><p className="text-[10px] font-bold text-on-surface-variant uppercase">Instructor</p><p className="font-bold font-manrope">{course.instructorId.name}</p></div>
            </div>
          )}
        </div>
      </div>

      {/* Submit Modal */}
      {showSubmit && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowSubmit(false)}>
          <div className="bg-surface-container-lowest rounded-3xl p-8 max-w-md w-full shadow-2xl" onClick={e => e.stopPropagation()}>
            <h2 className="text-xl font-bold font-manrope mb-6">Submit Assignment</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div><label className="block text-xs font-bold text-on-surface-variant uppercase mb-2">Note (Optional)</label><textarea value={submitNote} onChange={e => setSubmitNote(e.target.value)} className="w-full px-4 py-3 bg-surface-container-low border-none rounded-3xl text-sm resize-none h-24" placeholder="Add a note for your instructor..." /></div>
              <div className="bg-surface-container-low rounded-3xl p-6 text-center"><span className="material-symbols-outlined text-4xl text-outline-variant mb-2">cloud_upload</span><p className="text-sm text-on-surface-variant">File uploads will be available in a future update.</p></div>
              <div className="flex gap-3"><button type="button" onClick={() => setShowSubmit(false)} className="flex-1 py-3 bg-surface-container-high text-on-surface rounded-full font-manrope font-bold text-sm">Cancel</button><button type="submit" disabled={submitting} className="flex-1 py-3 linear-soul text-on-primary rounded-full font-manrope font-bold text-sm disabled:opacity-50">{submitting ? "Submitting..." : "Submit"}</button></div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
