import { useState, useEffect } from "react";
import { getResources, createResource } from "../../api/library";

export default function InstructorLibraryPage() {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ title: "", author: "", year: "2024", type: "textbook", category: "Computer Science", description: "", pages: 0 });
  const [saving, setSaving] = useState(false);

  const load = () => { getResources().then(res => setResources(res.data.resources)).catch(console.error).finally(() => setLoading(false)); };
  useEffect(load, []);

  const handleCreate = async (e) => {
    e.preventDefault(); setSaving(true);
    try { await createResource(form); setShowModal(false); load(); }
    catch (err) { alert(err.response?.data?.error || "Failed"); }
    finally { setSaving(false); }
  };

  const iconMap = { textbook: "menu_book", journal: "article", video_lecture: "videocam" };

  if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div></div>;

  return (
    <div className="p-12">
      <header className="mb-12 flex justify-between items-end">
        <div><h1 className="text-4xl font-extrabold font-manrope tracking-tight">Library Resources</h1><p className="text-on-surface-variant mt-2">Manage the digital library for your students.</p></div>
        <button onClick={() => setShowModal(true)} className="px-6 py-3 linear-soul text-on-primary rounded-full font-manrope font-bold text-sm flex items-center gap-2"><span className="material-symbols-outlined text-sm">add</span>Add Resource</button>
      </header>

      <div className="bg-surface-container-lowest rounded-3xl overflow-hidden shadow-sm">
        <table className="w-full text-left">
          <thead><tr className="bg-surface-container-low text-on-surface-variant text-[10px] uppercase tracking-widest">
            <th className="px-8 py-4 font-bold">Resource</th><th className="px-8 py-4 font-bold">Type</th><th className="px-8 py-4 font-bold">Category</th><th className="px-8 py-4 font-bold">Year</th>
          </tr></thead>
          <tbody className="divide-y divide-surface-container">
            {resources.map(r => (
              <tr key={r._id} className="hover:bg-surface-bright transition-colors">
                <td className="px-8 py-5"><div className="flex items-center gap-3"><span className="material-symbols-outlined text-primary">{iconMap[r.type] || "description"}</span><div><p className="text-sm font-bold font-manrope">{r.title}</p><p className="text-[10px] text-on-surface-variant">{r.author}</p></div></div></td>
                <td className="px-8 py-5"><span className={`px-2 py-1 text-[10px] font-bold rounded-xl capitalize ${r.type === 'textbook' ? 'bg-tertiary-container text-on-tertiary-container' : r.type === 'journal' ? 'bg-primary-container text-on-primary-container' : 'bg-secondary-container text-on-secondary-container'}`}>{r.type?.replace('_', ' ')}</span></td>
                <td className="px-8 py-5 text-sm text-on-surface-variant">{r.category}</td>
                <td className="px-8 py-5 text-sm text-on-surface-variant">{r.year}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowModal(false)}>
          <div className="bg-surface-container-lowest rounded-3xl p-8 max-w-lg w-full shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6"><h2 className="text-xl font-bold font-manrope">Add Resource</h2><button onClick={() => setShowModal(false)} className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center"><span className="material-symbols-outlined text-sm">close</span></button></div>
            <form onSubmit={handleCreate} className="space-y-4">
              <div><label className="block text-xs font-bold text-on-surface-variant uppercase mb-1">Title</label><input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required className="w-full px-4 py-3 bg-surface-container-low border-none rounded-3xl text-sm" /></div>
              <div><label className="block text-xs font-bold text-on-surface-variant uppercase mb-1">Author</label><input value={form.author} onChange={e => setForm({ ...form, author: e.target.value })} required className="w-full px-4 py-3 bg-surface-container-low border-none rounded-3xl text-sm" /></div>
              <div className="grid grid-cols-3 gap-3">
                <div><label className="block text-xs font-bold text-on-surface-variant uppercase mb-1">Type</label><select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })} className="w-full px-4 py-3 bg-surface-container-low border-none rounded-3xl text-sm"><option value="textbook">Textbook</option><option value="journal">Journal</option><option value="video_lecture">Video</option></select></div>
                <div><label className="block text-xs font-bold text-on-surface-variant uppercase mb-1">Year</label><input value={form.year} onChange={e => setForm({ ...form, year: e.target.value })} className="w-full px-4 py-3 bg-surface-container-low border-none rounded-3xl text-sm" /></div>
                <div><label className="block text-xs font-bold text-on-surface-variant uppercase mb-1">Pages</label><input type="number" value={form.pages} onChange={e => setForm({ ...form, pages: Number(e.target.value) })} className="w-full px-4 py-3 bg-surface-container-low border-none rounded-3xl text-sm" /></div>
              </div>
              <div><label className="block text-xs font-bold text-on-surface-variant uppercase mb-1">Description</label><textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} className="w-full px-4 py-3 bg-surface-container-low border-none rounded-3xl text-sm resize-none h-20" /></div>
              <div className="flex gap-3"><button type="button" onClick={() => setShowModal(false)} className="flex-1 py-3 bg-surface-container-high text-on-surface rounded-full font-manrope font-bold text-sm">Cancel</button><button type="submit" disabled={saving} className="flex-1 py-3 linear-soul text-on-primary rounded-full font-manrope font-bold text-sm disabled:opacity-50">{saving ? "Adding..." : "Add"}</button></div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
