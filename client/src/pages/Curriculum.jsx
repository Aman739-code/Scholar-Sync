import React, { useState, useEffect } from 'react';
import api from '../utils/api';

export default function Curriculum() {
  const [enrollments, setEnrollments] = useState([]);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCurriculum = async () => {
      try {
        const [enrollRes, courseRes] = await Promise.all([
          api.get('/courses/my-enrollments').catch(() => ({ data: [] })),
          api.get('/courses').catch(() => ({ data: [] }))
        ]);
        if (enrollRes.data) setEnrollments(enrollRes.data);
        if (courseRes.data) setCourses(courseRes.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCurriculum();
  }, []);

  return (
    <div className="w-full">
      {/* Custom Styles */}
      <style dangerouslySetInnerHTML={{
        __html: `
          .glass-effect {
            backdrop-filter: blur(20px);
          }
          .neon-glow-primary {
            box-shadow: 0 0 40px -5px rgba(148, 170, 255, 0.2);
          }
          .no-scrollbar::-webkit-scrollbar {
            display: none;
          }
        `
      }} />
      <div className="w-full">
        
        {/* Header Section */}
        <header className="mb-12 relative">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#94aaff]/10 blur-[120px] rounded-full -z-10"></div>
          <div className="absolute top-10 -left-10 w-64 h-64 bg-[#ff51fa]/10 blur-[100px] rounded-full -z-10"></div>
          <span className="text-[#ff51fa] font-['Plus_Jakarta_Sans'] font-bold uppercase tracking-[0.3em] text-xs">Academic Pathway</span>
          <h1 className="text-6xl font-['Spline_Sans'] font-black tracking-tight text-white mt-4 mb-2">
            Master Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#94aaff] to-[#ff51fa]">Future.</span>
          </h1>
          <p className="text-[#a3aac4] max-w-2xl text-lg">
            Your personalized curriculum is a living map. Track your progress, unlock achievements, and dominate your learning path.
          </p>
        </header>

        {/* Subjects Grid (Bento Style) */}
        <div className="grid grid-cols-12 gap-6 mb-12">
          
          {/* Featured: STEM */}
          <div className="col-span-12 lg:col-span-7 group relative overflow-hidden rounded-4xl bg-[#141f38] p-8 flex flex-col justify-between border border-[#94aaff]/10 hover:border-[#94aaff]/30 transition-all duration-500">
            <div className="absolute top-0 right-0 w-1/2 h-full opacity-20 pointer-events-none transition-transform group-hover:scale-110 duration-700">
              <img alt="STEM Visualization" className="w-full h-full object-cover rounded-l-full" data-alt="Abstract glowing 3D particle network representing technology" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCDoqwwZTpzjLyR6lONuTFFZui8ChSK-FSA2FBX1rCI-F1zZA_qF8ENbWzjRWO8EW3Nu9i_1GLR0Z-Ez-ViuuDGjfWiCRX3xs2OY0f3tkGqY3WauyqDgt9Wwi-u474P_PpwvoldFcijOuk67TBUPqTXHTMGADCmAuQB4B5TOhfcE8GP_nzj4YARxPsK5xqrsJxcSA1P1ca5SidTyGvRC1TKRe_kd1H_pxnKLhoBdDey7epJ_9lEd2HUWax0Tn-OIzu30XJ356N1NJ8" />
            </div>
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-12">
                <div className="bg-[#94aaff]/20 p-4 rounded-xl">
                  <span className="material-symbols-outlined text-[#94aaff] text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>science</span>
                </div>
                <span className="bg-[#94aaff]/10 text-[#94aaff] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Most Active</span>
              </div>
              <h3 className="text-4xl font-['Spline_Sans'] font-extrabold text-white mb-4">Quantum STEM</h3>
              <p className="text-[#a3aac4] max-w-sm mb-8">Master the fundamental laws of the universe through data-driven modules and real-time simulations.</p>
            </div>
            <div className="flex items-center gap-6 relative z-10">
              <div className="flex-1">
                <div className="flex justify-between text-xs font-bold mb-2">
                  <span className="text-[#94aaff] uppercase tracking-widest">Progress</span>
                  <span className="text-white">68%</span>
                </div>
                <div className="h-2 w-full bg-[#192540] rounded-full overflow-hidden">
                  <div className="h-full bg-[#8eff71] rounded-full shadow-[0_0_10px_#8eff71]" style={{ width: "68%" }}></div>
                </div>
              </div>
              <button className="bg-white text-[#060e20] p-4 rounded-full hover:bg-[#94aaff] transition-colors flex items-center justify-center">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>arrow_forward</span>
              </button>
            </div>
          </div>

          {/* Arts Card */}
          <div className="col-span-12 lg:col-span-5 group relative rounded-4xl bg-[#141f38] p-8 border border-[#ff51fa]/10 hover:border-[#ff51fa]/30 transition-all duration-500">
            <div className="flex justify-between items-start mb-8">
              <div className="bg-[#ff51fa]/20 p-3 rounded-xl">
                <span className="material-symbols-outlined text-[#ff51fa] text-3xl" style={{ fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>palette</span>
              </div>
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full border-2 border-[#060e20] bg-slate-800 flex items-center justify-center text-[10px] font-bold">+12</div>
                <img alt="Student" className="w-8 h-8 rounded-full border-2 border-[#060e20]" data-alt="User avatar image" src="https://lh3.googleusercontent.com/aida-public/AB6AXuChyMJb4m1oho_aGtcj7zD28jdPuMSW-2ijcY2-VzgcXhyMD7Nv6iV-C0Ln8L5-zn3eFfA7ncvVaXYZ8BZLrJxf7ErgMWgdH1lKS9lM23XiULdVKSc8Emz86zgNeIKNCpMukw_-dLwFp_aw8fsq-binKMB5ZBsJdYGmHkIcf5S1mT5kpY2_TqoLPx5I71F45DfY1PJuf8bp4-NY-DWz3lVf4rX2gqQ7wTmMf4fghXES4zVcKIzoKsrJyalWHBo7eEhW3gvdn_h7V5k" />
                <img alt="Student" className="w-8 h-8 rounded-full border-2 border-[#060e20]" data-alt="User avatar image" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDx5vc6WDDDSwpixP3z1HfuX01S_6-jzZJfdnoRomB-So6IYhCLlOLUyuJHiD1FX1AHbxb48KKq_HPT0lqie15yl2tGJ2LFYkpJpNXtqljQc3gGDO7xx4Bpepv5lnIfeKcZlJ8LKbwGzImTRZApBqD2fQJjx5Tw2Xj7IkFISQhhQ8V6MTnk33-FQ9wJ0-ZgUcPl8vi8Hv-TgWWylWBzMH-giy-Nrmmf0wcSLSHRe1Uo8b2SHAlitLjcDt_QJs178R4oov13uuUjOtE" />
              </div>
            </div>
            <h3 className="text-3xl font-['Spline_Sans'] font-bold text-white mb-2">Digital Arts</h3>
            <p className="text-[#a3aac4] mb-8">Unleash creativity through generative AI and classic theory.</p>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-xl bg-[#192540]/50">
                <span className="text-sm font-medium">Neural Painting</span>
                <span className="text-xs text-[#ff51fa] font-bold">New</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-[#192540]/50">
                <span className="text-sm font-medium">UX Principles</span>
                <span className="text-xs text-[#a3aac4]">4 Modules</span>
              </div>
            </div>
            <div className="mt-8">
              <button className="w-full border border-[#ff51fa]/40 text-[#ff51fa] font-bold py-3 rounded-full hover:bg-[#ff51fa] hover:text-[#400040] transition-all">Explore Studios</button>
            </div>
          </div>

          {/* Humanities Card */}
          <div className="col-span-12 lg:col-span-4 group rounded-4xl bg-[#091328] p-6 border border-[#40485d]/5 hover:bg-[#141f38] transition-all">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-[#8eff71]/10 rounded-full flex items-center justify-center">
                <span className="material-symbols-outlined text-[#8eff71]" style={{ fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>history_edu</span>
              </div>
              <div>
                <h4 className="font-bold text-white">Humanities</h4>
                <p className="text-xs text-[#a3aac4]">Global Perspectives</p>
              </div>
            </div>
            <div className="h-32 rounded-xl bg-[#000000] mb-6 overflow-hidden relative">
              <img alt="History" className="w-full h-full object-cover opacity-40" data-alt="Close up of an old library or ancient book pages" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDDT7lP1pFuzF8KIkk2bF4HwMUgA74OqNfrtBqnthZxBAYBpv29GJElSv3_KWCNo71nIpt5_mMrHH26wN3sA9-0Fba80K2rjXcDai5qIaqMMdIyromQtEfCMMUs-yddWX0-iJC_9Cc1fR79wN-uENfN0NLY8r45LNc39ldbqq3FT2oBRlyNuFZOOqOMwDDLP_E-eNtbIDzdrnSErkCcRfIYdGcBndd1xjQlNKt-7JoSVbGpAtvGcE2-3WrKZe0LcCqgWXs6iOXSCSA" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="bg-black/40 backdrop-blur-md px-4 py-2 rounded-full text-xs font-bold border border-white/10 tracking-widest uppercase">The Silk Road</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs font-medium text-[#a3aac4]">Difficulty: <span className="text-[#8eff71]">Beginner</span></span>
              <button className="text-[#94aaff] text-sm font-bold flex items-center gap-2">Start Module <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>bolt</span></button>
            </div>
          </div>

          {/* Logic & Code Card */}
          <div className="col-span-12 lg:col-span-4 group rounded-4xl bg-[#091328] p-6 border border-[#40485d]/5 hover:bg-[#141f38] transition-all">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-[#94aaff]/10 rounded-full flex items-center justify-center">
                <span className="material-symbols-outlined text-[#94aaff]" style={{ fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>terminal</span>
              </div>
              <div>
                <h4 className="font-bold text-white">Logic & Code</h4>
                <p className="text-xs text-[#a3aac4]">Architectural Design</p>
              </div>
            </div>
            <div className="space-y-3 mb-6">
              <div className="bg-[#192540] p-3 rounded-xl border-l-4 border-[#94aaff]">
                <p className="text-xs font-bold text-[#94aaff] mb-1">CURRENT</p>
                <p className="text-sm text-white font-medium">Complex Algorithmic Patterns</p>
              </div>
              <div className="bg-[#192540] p-3 rounded-xl opacity-50">
                <p className="text-sm text-[#a3aac4] font-medium">Machine Vision Basics</p>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs font-medium text-[#a3aac4]">Difficulty: <span className="text-[#ff6e84]">Expert</span></span>
              <button className="text-[#94aaff] text-sm font-bold flex items-center gap-2">Resume <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>play_arrow</span></button>
            </div>
          </div>

          {/* Economics Slot */}
          <div className="col-span-12 lg:col-span-4 group rounded-4xl bg-[#091328] p-6 border border-[#40485d]/5 hover:bg-[#141f38] transition-all">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-[#ff51fa]/10 rounded-full flex items-center justify-center">
                <span className="material-symbols-outlined text-[#ff51fa]" style={{ fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>payments</span>
              </div>
              <div>
                <h4 className="font-bold text-white">Economics</h4>
                <p className="text-xs text-[#a3aac4]">Market Dynamics</p>
              </div>
            </div>
            <div className="relative h-24 flex items-end gap-2 mb-6 px-4">
              <div className="flex-1 bg-[#192540] rounded-t-lg h-[40%]"></div>
              <div className="flex-1 bg-[#192540] rounded-t-lg h-[70%]"></div>
              <div className="flex-1 bg-[#ff51fa] rounded-t-lg h-[90%] shadow-[0_0_15px_rgba(255,81,250,0.4)]"></div>
              <div className="flex-1 bg-[#192540] rounded-t-lg h-[55%]"></div>
              <div className="flex-1 bg-[#192540] rounded-t-lg h-[30%]"></div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs font-medium text-[#a3aac4]">Difficulty: <span className="text-[#94aaff]">Advanced</span></span>
              <button className="text-[#94aaff] text-sm font-bold flex items-center gap-2">Enroll <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>add_circle</span></button>
            </div>
          </div>
        </div>

        {/* Course List Section */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-['Spline_Sans'] font-bold text-white">Available Learning Paths</h2>
            <div className="flex gap-2">
              <button className="px-4 py-2 rounded-full bg-[#141f38] text-sm font-medium hover:bg-[#94aaff]/20 hover:text-[#94aaff] transition-all">All Paths</button>
              <button className="px-4 py-2 rounded-full bg-[#141f38] text-sm font-medium hover:bg-[#94aaff]/20 hover:text-[#94aaff] transition-all">Trending</button>
              <button className="px-4 py-2 rounded-full bg-[#141f38] text-sm font-medium hover:bg-[#94aaff]/20 hover:text-[#94aaff] transition-all">Near Completion</button>
            </div>
          </div>

          <div className="space-y-4">
            {enrollments.length > 0 ? enrollments.map((enr, i) => {
              const course = enr.course || {};
              const progress = enr.progressPercentage || 0;
              return (
                <div key={enr._id || i} className="flex items-center gap-6 p-5 rounded-3xl bg-[#091328] hover:bg-[#141f38] border border-[#40485d]/5 transition-all">
                  <div className="w-20 h-20 rounded-2xl flex-shrink-0 relative overflow-hidden bg-[#141f38]">
                    {course.imageUrl ? (
                      <img alt="Course" className="w-full h-full object-cover" src={course.imageUrl} />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[#40485d]">
                        <span className="material-symbols-outlined text-3xl">book</span>
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-xs font-bold text-[#8eff71] uppercase tracking-tighter">{course.category || 'General'}</span>
                      <span className="text-xs text-[#a3aac4]">• {course.modules?.length || 0} Modules</span>
                    </div>
                    <h4 className="text-lg font-bold text-white truncate">{course.title || 'Course Title'}</h4>
                  </div>
                  <div className="hidden md:block w-48 px-4">
                    <div className="flex justify-between text-[10px] font-bold mb-1 uppercase tracking-widest text-[#a3aac4]">
                      <span>Progress</span>
                      <span>{progress}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-[#192540] rounded-full">
                      <div className="h-full bg-[#94aaff] rounded-full shadow-[0_0_8px_rgba(148,170,255,0.5)]" style={{ width: `${progress}%` }}></div>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <button className="bg-[#192540] px-6 py-2.5 rounded-full text-sm font-bold hover:bg-[#94aaff] hover:text-[#00257b] transition-all active:scale-95">
                      {progress > 0 ? (progress >= 100 ? 'Review' : 'Continue') : 'Start Path'}
                    </button>
                  </div>
                </div>
              );
            }) : (
              <p className="text-[#a3aac4] text-sm py-4">No active enrollments found. Join a course to track progress!</p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}