import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getResource } from "../api/library";

export default function LibraryItemPage() {
  const { itemId } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getResource(itemId).then(res => setData(res.data)).catch(console.error).finally(() => setLoading(false));
  }, [itemId]);

  if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div></div>;
  if (!data?.resource) return <div className="min-h-screen flex items-center justify-center"><p>Resource not found.</p></div>;

  const { resource, chapters, progress } = data;
  const isVideo = resource.type === "video_lecture";
  const isTextbook = resource.type === "textbook";
  const isJournal = resource.type === "journal";
  const typeLabel = isVideo ? "Video Lecture" : isJournal ? "Journal" : "Textbook";
  const typeColor = isVideo ? "bg-secondary-container text-on-secondary-container" : isJournal ? "bg-primary-container text-on-primary-container" : "bg-tertiary-container text-on-tertiary-container";

  const completedChapters = chapters?.filter(ch => (isVideo ? ch.isWatched : ch.isRead)).length || 0;
  const totalChapters = chapters?.length || 0;
  const chapterProgress = totalChapters > 0 ? Math.round((completedChapters / totalChapters) * 100) : 0;

  return (
    <div className="p-8 lg:p-12">
      {/* Breadcrumb */}
      <nav className="flex space-x-2 text-xs font-medium text-on-surface-variant mb-6">
        <Link to="/dashboard" className="hover:text-primary">Dashboard</Link><span className="opacity-30">/</span>
        <Link to="/library" className="hover:text-primary">Library</Link><span className="opacity-30">/</span>
        <span className="text-primary font-semibold truncate max-w-[200px]">{resource.title}</span>
      </nav>

      <div className="grid grid-cols-12 gap-8">
        {/* Main */}
        <div className="col-span-12 lg:col-span-8 space-y-8">
          {/* Hero */}
          <div className="bg-surface-container-lowest rounded-3xl overflow-hidden">
            <div className="aspect-[16/7] w-full overflow-hidden bg-surface-container-high relative">
              {resource.coverImage ? <img className="w-full h-full object-cover" src={resource.coverImage} alt={resource.title} /> : <div className="w-full h-full flex items-center justify-center"><span className="material-symbols-outlined text-6xl text-outline-variant">menu_book</span></div>}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-6 left-6 text-white">
                <span className={`px-3 py-1 text-[10px] font-bold rounded-full uppercase ${typeColor}`}>{typeLabel}</span>
                <h1 className="text-3xl font-extrabold font-manrope mt-2">{resource.title}</h1>
                <p className="text-sm opacity-80 mt-1">{resource.author}</p>
              </div>
            </div>
            <div className="p-8">
              <p className="text-on-surface-variant leading-relaxed">{resource.description}</p>
            </div>
          </div>

          {/* Chapters / Table of Contents */}
          {chapters && chapters.length > 0 && (
            <div className="bg-surface-container-lowest rounded-3xl p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold font-manrope">{isVideo ? "Chapters" : "Table of Contents"}</h2>
                <p className="text-xs font-bold text-on-surface-variant">{completedChapters} / {totalChapters} {isVideo ? "watched" : "read"}</p>
              </div>
              <div className="space-y-3">
                {chapters.map((ch, i) => {
                  const done = isVideo ? ch.isWatched : ch.isRead;
                  return (
                    <div key={ch._id || i} className={`flex items-center justify-between p-4 rounded-3xl transition-colors ${done ? "bg-primary/5" : "bg-surface-container-low hover:bg-surface-container"}`}>
                      <div className="flex items-center gap-4">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${done ? "bg-primary text-on-primary" : "bg-surface-container text-on-surface-variant"}`}>
                          {done ? <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>check</span> : <span className="text-xs font-bold">{i + 1}</span>}
                        </div>
                        <div>
                          <p className={`font-bold text-sm ${done ? "text-primary" : ""}`}>{ch.title}</p>
                          <p className="text-[10px] text-on-surface-variant">{isVideo ? ch.timestamp : ch.pages}</p>
                        </div>
                      </div>
                      {done && <span className="text-[10px] font-bold text-primary uppercase">{isVideo ? "Watched" : "Read"}</span>}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
          {/* Progress */}
          <div className="bg-surface-container-lowest rounded-3xl p-6 space-y-4">
            <h3 className="font-bold font-manrope">Your Progress</h3>
            <div className="flex items-center gap-3">
              <div className="flex-1 h-2 bg-surface-container rounded-full overflow-hidden"><div className="h-full bg-primary rounded-full" style={{ width: `${chapterProgress}%` }}></div></div>
              <span className="text-sm font-bold text-primary">{chapterProgress}%</span>
            </div>
            {isTextbook && progress && <p className="text-xs text-on-surface-variant">Currently on page {progress.currentPage} of {resource.pages}</p>}
            {isVideo && progress && <p className="text-xs text-on-surface-variant">Last watched at {progress.currentTime}</p>}
          </div>

          {/* Details */}
          <div className="bg-surface-container-lowest rounded-3xl p-6 space-y-4">
            <h3 className="font-bold font-manrope">Details</h3>
            <div className="space-y-3">
              {[
                { label: "Author", value: resource.author },
                { label: "Year", value: resource.year },
                { label: "Category", value: resource.category },
                ...(resource.publisher ? [{ label: "Publisher", value: resource.publisher }] : []),
                ...(resource.isbn ? [{ label: "ISBN", value: resource.isbn }] : []),
                ...(resource.issn ? [{ label: "ISSN", value: resource.issn }] : []),
                ...(resource.pages ? [{ label: "Pages", value: resource.pages }] : []),
                ...(resource.duration ? [{ label: "Duration", value: resource.duration }] : []),
                ...(resource.series ? [{ label: "Series", value: resource.series }] : []),
              ].map((d, i) => (
                <div key={i} className="flex justify-between py-2 border-b border-surface-container last:border-none">
                  <span className="text-xs font-bold text-on-surface-variant uppercase">{d.label}</span>
                  <span className="text-xs font-medium text-right max-w-[60%]">{d.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
