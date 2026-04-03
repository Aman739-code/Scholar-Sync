import { Link } from "react-router-dom";
import { useState } from "react";

const recentlyAccessed = [
  { id: "neural-design", type: "Textbook", typeBg: "bg-tertiary-container text-on-tertiary-container", title: "Principles of Neural Design", author: "Sterling & Laughlin • 2021", progress: "Page 142/480", progressW: "65%", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCOPjirJSPJ4aifofM6qdz6VSYl1RcQooTrsQwkbZAjrEKWKWswlkXEH0n4eM8WbvfzMn-enHY0rJX1O_HDHRH20mXmlmlQj3DwJecTEOSr0AO8fLKtg9porZT_aAZIW6oIXh33SSSoLkdFmEsVNVdQBqGFSXJwQlDypMP4DUkSSpDGHbYX2BFdhMa0CA7ppu4z2MNDBf1mzmSrDkgHaUfqcH8iozkFBnZlwGOhvGjYm842BrwVYYx6VApSQ8ou28m1j1pNyPzbWysq" },
  { id: "quantum-computing-ethics", type: "Journal", typeBg: "bg-primary-container text-on-primary-container", title: "Quantum Computing Ethics", author: "MIT Technology Review • Vol 14", progress: "Read 2h ago", progressW: null, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDeeUhpyHPm_T9i8c55WuQ2WaHNB0iV3D9eaunNPEwfi9-t46EKIKHSh4YPRfT3SB-y285DxYvlLuFiwEDpA-iGUxjjl9jdthFCpmPZaEul2o5UyGXg6m7Pc7k89sQ7VxHs8CiuJyJFvPOT-GUVLGQgjxd_WPqIvlQfT13RakEPUVyE95QZv10X66Ov5P6e5cpk8AoE1XI4GSLXQgDilbncSDyHUQDDt-cz8hWxR3z-MH5yqWEAUWk2ayXzY7eLOm5SIozAuTg9Ivjk" },
  { id: "algorithm-design-video", type: "Video", typeBg: "bg-secondary-container text-on-secondary-container", title: "Advanced Algorithm Design", author: "Dr. Sarah Jenkins • Stanford", progress: "14:02 / 35:00", progressW: "40%", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCmuiIE9TP9TiUUNPUwTdBp_z4tClOj-6zwFXEqjOZIDOEntTXUyjJhqaRrv0Dnba4E7lYLHaVeSn2Xwh_okFaMUj4tkekeyyxk1iy6miNu0cE_6nm_BXu_nzY_V6wIhf78x6bMwBMBkgz3_bHveYC8mdy3zC1e144WYTVaudsaF-XKsp6XseH1PCRIDX06x_BZUuC8YqGZQVaLXn6KCjTWcBun2A6IKBtbmh8yyCK4WBKgODk75V7ASj6ayArn-LiqTElgu53aiimS", isVideo: true },
];

const archiveItems = [
  { id: "computational-fluid-dynamics", icon: "picture_as_pdf", title: "Computational Fluid Dynamics", author: "Dr. Alan Turing • 12MB", cat: "Engineering", catBg: "bg-surface-container", catColor: "text-on-surface-variant", date: "Oct 12, 2023", action: "download" },
  { id: "ai-governance", icon: "description", title: "The Future of AI Governance", author: "Global Policy Review • 4MB", cat: "Political Science", catBg: "bg-tertiary-container", catColor: "text-on-tertiary-container", date: "Nov 02, 2023", action: "bookmark" },
  { id: "linear-algebra-session-1", icon: "movie", title: "Linear Algebra - Session 1", author: "MIT OpenCourseWare • 1.2GB", cat: "Mathematics", catBg: "bg-secondary-container", catColor: "text-on-secondary-container", date: "Sep 28, 2023", action: "play_circle" },
];

export default function LibraryPage() {
  const [activeFilter, setActiveFilter] = useState("all");
  const filterOptions = [
    { key: "all", label: "All Resources" },
    { key: "saved", label: "Saved" },
    { key: "department", label: "By Department" },
  ];

  return (
    <div className="min-h-screen p-12">
      {/* Header */}
      <header className="mb-12 flex justify-between items-end">
        <div>
          <h1 className="text-5xl font-extrabold font-manrope tracking-tight text-on-background mb-3">Digital Library</h1>
          <p className="text-on-surface-variant font-body max-w-lg">Access a curated repository of global academic intelligence. Explore deep textbooks, peer-reviewed journals, and high-fidelity video lectures.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative group">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
            <input className="pl-12 pr-6 py-3 bg-surface-container-lowest border-none rounded-full w-80 shadow-sm focus:ring-2 focus:ring-primary/20 transition-all font-body text-sm" placeholder="Search resources, authors, or topics..." type="text" />
          </div>
          <button className="w-12 h-12 flex items-center justify-center rounded-full bg-surface-container hover:bg-surface-container-high transition-colors">
            <span className="material-symbols-outlined">tune</span>
          </button>
        </div>
      </header>

      {/* Recently Accessed */}
      <section className="mb-16">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold font-manrope">Recently Accessed</h2>
          <a className="text-primary text-sm font-semibold hover:underline" href="#">View History</a>
        </div>
        <div className="flex gap-6 overflow-x-auto pb-4 hide-scrollbar">
          {recentlyAccessed.map((item) => (
            <Link to={`/library/${item.id}`} key={item.title} className="min-w-[320px] bg-surface-container-lowest p-6 rounded-3xl relative group cursor-pointer hover:bg-surface-bright transition-all">
              <div className={`absolute -top-2 left-4 px-3 py-1 ${item.typeBg} text-[10px] font-bold rounded-full uppercase tracking-tighter`}>{item.type}</div>
              <div className="h-40 w-full rounded-3xl mb-4 overflow-hidden bg-surface-container relative">
                <img className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" src={item.img} alt={item.title} />
                {item.isVideo && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white">
                      <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
                    </div>
                  </div>
                )}
              </div>
              <h3 className="font-manrope font-bold text-on-surface mb-1 group-hover:text-primary transition-colors">{item.title}</h3>
              <p className="text-xs text-on-surface-variant mb-4">{item.author}</p>
              {item.progressW ? (
                <div className="flex items-center gap-2">
                  <div className="h-1 flex-1 bg-surface-container rounded-full overflow-hidden">
                    <div className="h-full bg-primary" style={{ width: item.progressW }}></div>
                  </div>
                  <span className="text-[10px] font-bold text-on-surface-variant">{item.progress}</span>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-on-surface-variant flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">schedule</span>{item.progress}
                  </span>
                  <span className="material-symbols-outlined text-primary text-xl">arrow_forward</span>
                </div>
              )}
            </Link>
          ))}
        </div>
      </section>

      {/* Category Grid */}
      <section className="mb-16">
        <h2 className="text-xl font-bold font-manrope mb-8">Curated Hubs</h2>
        <div className="grid grid-cols-12 gap-6">
          <Link to="/library/neural-design" className="col-span-8 bg-surface-container-lowest p-8 rounded-3xl flex items-center gap-8 relative overflow-hidden group cursor-pointer border border-transparent hover:border-primary/10 transition-all">
            <div className="relative z-10 w-1/2">
              <span className="text-primary font-bold text-xs uppercase tracking-widest block mb-4">Academic Collection</span>
              <h3 className="text-3xl font-extrabold font-manrope mb-4 leading-tight">Comprehensive Textbooks</h3>
              <p className="text-on-surface-variant text-sm mb-6">Explore over 12,000 digitized textbooks across sciences, arts, and humanities with interactive annotations.</p>
              <span className="px-6 py-2 bg-on-surface text-surface rounded-full text-xs font-bold hover:bg-primary transition-colors inline-block">Explore Collection</span>
            </div>
            <div className="w-1/2 h-full absolute right-0 top-0 opacity-40 group-hover:opacity-100 transition-opacity">
              <img className="w-full h-full object-cover rounded-r-3xl" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDMWKB-UeVCRhFYdsr4N3ECbdlqTnXCLypJsEtsFJP6VbKj7vZrpOmB75TJ5TJbtuLkthcji9kSO5iPtQE7BP32rOnyei3DyCefNc5_ar_pWeBZfRisOE1Owe08CFcX5gk3F1BfdeTBVo3ay4VnRTDYQIcnh_NJl659uwqEMi9Cy-rsBzfRMJ4Jf_wctrRDYegY87U0lGwc9V_LNz6j1Zb22udpNz6unyAtX4aNtGqHHvKdsFIbgJG6r_UQOgwodvwM9SKkOKZHu44k" alt="Library" />
            </div>
          </Link>
          <Link to="/library/ai-governance" className="col-span-4 bg-tertiary-container p-8 rounded-3xl flex flex-col justify-between relative overflow-hidden group cursor-pointer transition-all">
            <div className="relative z-10">
              <span className="material-symbols-outlined text-on-tertiary-container text-4xl mb-4">description</span>
              <h3 className="text-xl font-bold font-manrope text-on-tertiary-container mb-2">Research Papers</h3>
              <p className="text-on-tertiary-container/70 text-sm">Direct access to IEEE, JSTOR, and ArXiv publications.</p>
            </div>
            <div className="relative z-10 mt-8 flex justify-between items-center">
              <span className="text-xs font-bold text-on-tertiary-container">2.4M+ Papers</span>
              <span className="material-symbols-outlined group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">north_east</span>
            </div>
          </Link>
          <Link to="/library/quantum-computing-ethics" className="col-span-4 bg-surface-container-low p-8 rounded-3xl flex flex-col justify-between group cursor-pointer hover:bg-surface-container-high transition-all">
            <div>
              <div className="w-10 h-10 bg-white rounded-3xl flex items-center justify-center mb-6 shadow-sm">
                <span className="material-symbols-outlined text-primary">article</span>
              </div>
              <h3 className="text-xl font-bold font-manrope mb-2">Scientific Journals</h3>
              <p className="text-on-surface-variant text-sm">Peer-reviewed weekly releases and archival issues.</p>
            </div>
            <div className="mt-8 flex -space-x-3">
              <div className="w-8 h-8 rounded-full border-2 border-white bg-slate-200"></div>
              <div className="w-8 h-8 rounded-full border-2 border-white bg-slate-300"></div>
              <div className="w-8 h-8 rounded-full border-2 border-white bg-slate-400"></div>
              <div className="w-8 h-8 rounded-full border-2 border-white bg-primary flex items-center justify-center text-[8px] text-white font-bold">+12</div>
            </div>
          </Link>
          <Link to="/library/algorithm-design-video" className="col-span-8 bg-surface-container-lowest p-8 rounded-3xl flex justify-between relative overflow-hidden group cursor-pointer border border-transparent hover:border-primary/10 transition-all">
            <div className="w-2/3">
              <h3 className="text-2xl font-bold font-manrope mb-4">Video Lecture Vault</h3>
              <p className="text-on-surface-variant text-sm mb-6">4K recordings of lectures from global partner universities with synchronized transcription and search.</p>
              <div className="flex gap-4">
                <span className="px-3 py-1 bg-surface-container rounded-full text-[10px] font-bold text-on-surface-variant">4K Resolution</span>
                <span className="px-3 py-1 bg-surface-container rounded-full text-[10px] font-bold text-on-surface-variant">Transcripts Incl.</span>
              </div>
            </div>
            <div className="w-1/3 flex items-center justify-center">
              <div className="w-24 h-24 rounded-full bg-primary-container flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>videocam</span>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Library Archive Table */}
      <section>
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-xl font-bold font-manrope">Library Archive</h2>
          <div className="flex gap-2">
            {filterOptions.map((f) => (
              <button
                key={f.key}
                onClick={() => setActiveFilter(f.key)}
                className={`px-4 py-2 text-xs font-bold rounded-full transition-colors ${activeFilter === f.key
                  ? "text-primary bg-primary-container"
                  : "text-on-surface-variant hover:bg-surface-container"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
        <div className="bg-surface-container-lowest rounded-3xl overflow-hidden shadow-sm">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-surface-container-low text-on-surface-variant text-[10px] uppercase tracking-widest">
                <th className="px-8 py-4 font-bold">Document Name</th>
                <th className="px-8 py-4 font-bold">Category</th>
                <th className="px-8 py-4 font-bold">Date Added</th>
                <th className="px-8 py-4 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container">
              {archiveItems.map((item) => (
                <tr key={item.title} className="hover:bg-surface-bright transition-colors group cursor-pointer" onClick={() => window.location.href = `/library/${item.id}`}>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-on-surface-variant">{item.icon}</span>
                      <div>
                        <p className="text-sm font-bold font-manrope group-hover:text-primary transition-colors">{item.title}</p>
                        <p className="text-[10px] text-on-surface-variant">{item.author}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5"><span className={`px-2 py-1 ${item.catBg} text-[10px] font-bold rounded-xl ${item.catColor}`}>{item.cat}</span></td>
                  <td className="px-8 py-5 text-sm text-on-surface-variant">{item.date}</td>
                  <td className="px-8 py-5 text-right">
                    <button className="p-2 hover:bg-primary-container rounded-full text-primary opacity-0 group-hover:opacity-100 transition-opacity"><span className="material-symbols-outlined text-lg">{item.action}</span></button>
                    <button className="p-2 hover:bg-surface-container rounded-full text-on-surface-variant opacity-0 group-hover:opacity-100 transition-opacity"><span className="material-symbols-outlined text-lg">more_vert</span></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="px-8 py-4 bg-surface-container-low flex justify-between items-center">
            <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Showing 1-10 of 12,450 records</p>
            <div className="flex gap-2">
              <button className="w-8 h-8 flex items-center justify-center rounded-xl bg-surface-container-lowest text-on-surface-variant hover:bg-primary hover:text-white transition-all"><span className="material-symbols-outlined text-sm">chevron_left</span></button>
              <button className="w-8 h-8 flex items-center justify-center rounded-xl bg-primary text-white font-bold text-[10px]">1</button>
              <button className="w-8 h-8 flex items-center justify-center rounded-xl bg-surface-container-lowest text-on-surface-variant hover:bg-primary hover:text-white transition-all font-bold text-[10px]">2</button>
              <button className="w-8 h-8 flex items-center justify-center rounded-xl bg-surface-container-lowest text-on-surface-variant hover:bg-primary hover:text-white transition-all font-bold text-[10px]">3</button>
              <button className="w-8 h-8 flex items-center justify-center rounded-xl bg-surface-container-lowest text-on-surface-variant hover:bg-primary hover:text-white transition-all"><span className="material-symbols-outlined text-sm">chevron_right</span></button>
            </div>
          </div>
        </div>
      </section>

      {/* FAB */}
      <button className="fixed bottom-8 right-8 w-14 h-14 bg-gradient-to-br from-primary to-primary-dim text-on-primary rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform active:scale-95 group z-50">
        <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
        <span className="absolute right-16 bg-on-surface text-surface text-xs font-bold py-2 px-4 rounded-3xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">AI Librarian</span>
      </button>
    </div>
  );
}
