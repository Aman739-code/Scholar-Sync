import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getResources } from "../api/library";

const tabs = ["All", "Textbooks", "Journals", "Video Lectures"];
const typeMap = { "All": null, "Textbooks": "textbook", "Journals": "journal", "Video Lectures": "video_lecture" };
const iconMap = { textbook: "menu_book", journal: "article", video_lecture: "videocam" };

export default function LibraryPage() {
  const [activeTab, setActiveTab] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadResources = () => {
    const params = {};
    if (typeMap[activeTab]) params.type = typeMap[activeTab];
    if (searchQuery) params.search = searchQuery;
    setLoading(true);
    getResources(params).then(res => setResources(res.data.resources)).catch(console.error).finally(() => setLoading(false));
  };

  useEffect(loadResources, [activeTab]);

  const handleSearch = (e) => { e.preventDefault(); loadResources(); };

  return (
    <div className="p-8 lg:p-12">
      <header className="mb-12">
        <p className="text-primary font-bold text-xs uppercase tracking-[0.2em] mb-2">Digital Library</p>
        <h1 className="text-4xl font-extrabold font-manrope tracking-tight text-on-surface">Library</h1>
        <p className="text-on-surface-variant mt-2">Explore textbooks, journals, and video lectures.</p>
      </header>

      {/* Search & Tabs */}
      <div className="flex flex-col md:flex-row gap-6 items-start md:items-center mb-10">
        <form onSubmit={handleSearch} className="flex-1 relative max-w-xl">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">search</span>
          <input type="text" placeholder="Search resources..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="w-full pl-12 pr-4 py-3 bg-surface-container-lowest border-none rounded-full focus:ring-2 focus:ring-primary/20 text-sm font-body" />
        </form>
        <div className="flex gap-2 flex-wrap">
          {tabs.map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} className={`px-4 py-2 rounded-full text-xs font-bold font-manrope transition-all ${activeTab === tab ? "linear-soul text-on-primary" : "bg-surface-container-lowest text-on-surface-variant hover:bg-surface-container"}`}>{tab}</button>
          ))}
        </div>
      </div>

      {/* Resource Cards */}
      {loading ? (
        <div className="flex justify-center py-16"><div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div></div>
      ) : (
        <>
          {/* Featured (first 3 with images) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {resources.filter(r => r.coverImage).slice(0, 3).map(r => (
              <Link to={`/library/${r.slug || r._id}`} key={r._id} className="group bg-surface-container-lowest rounded-3xl overflow-hidden hover:translate-y-[-4px] transition-all">
                <div className="aspect-[4/3] w-full overflow-hidden bg-surface-container-high">
                  <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src={r.coverImage} alt={r.title} />
                </div>
                <div className="p-6 space-y-3">
                  <span className={`px-3 py-1 text-[10px] font-bold rounded-full uppercase ${r.type === 'textbook' ? 'bg-tertiary-container text-on-tertiary-container' : r.type === 'journal' ? 'bg-primary-container text-on-primary-container' : 'bg-secondary-container text-on-secondary-container'}`}>{r.type?.replace('_', ' ')}</span>
                  <h3 className="font-manrope font-bold text-lg leading-tight group-hover:text-primary transition-colors">{r.title}</h3>
                  <p className="text-xs text-on-surface-variant">{r.author} • {r.year}</p>
                </div>
              </Link>
            ))}
          </div>

          {/* Archive Table */}
          {resources.length > 0 && (
            <div className="bg-surface-container-lowest rounded-3xl overflow-hidden shadow-sm">
              <div className="p-6 bg-surface-container-low"><h2 className="font-bold font-manrope text-lg">Archive</h2></div>
              <table className="w-full text-left">
                <thead><tr className="bg-surface-container-low/50 text-on-surface-variant text-[10px] uppercase tracking-widest">
                  <th className="px-8 py-4 font-bold">Resource</th><th className="px-8 py-4 font-bold">Type</th><th className="px-8 py-4 font-bold">Category</th><th className="px-8 py-4 font-bold">Year</th><th className="px-8 py-4 font-bold"></th>
                </tr></thead>
                <tbody className="divide-y divide-surface-container">
                  {resources.map(r => (
                    <tr key={r._id} className="hover:bg-surface-bright transition-colors">
                      <td className="px-8 py-5"><Link to={`/library/${r.slug || r._id}`} className="flex items-center gap-3 hover:text-primary transition-colors"><span className="material-symbols-outlined text-primary text-lg">{iconMap[r.type] || "description"}</span><div><p className="text-sm font-bold font-manrope">{r.title}</p><p className="text-[10px] text-on-surface-variant">{r.author}</p></div></Link></td>
                      <td className="px-8 py-5"><span className={`px-2 py-1 text-[10px] font-bold rounded-xl capitalize ${r.type === 'textbook' ? 'bg-tertiary-container text-on-tertiary-container' : r.type === 'journal' ? 'bg-primary-container text-on-primary-container' : 'bg-secondary-container text-on-secondary-container'}`}>{r.type?.replace('_', ' ')}</span></td>
                      <td className="px-8 py-5 text-sm text-on-surface-variant">{r.category}</td>
                      <td className="px-8 py-5 text-sm text-on-surface-variant">{r.year}</td>
                      <td className="px-8 py-5"><Link to={`/library/${r.slug || r._id}`} className="text-xs font-bold text-primary hover:underline">View</Link></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {resources.length === 0 && (
            <div className="text-center py-16">
              <span className="material-symbols-outlined text-5xl text-outline-variant mb-4">local_library</span>
              <p className="text-on-surface-variant font-medium">No resources found.</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
