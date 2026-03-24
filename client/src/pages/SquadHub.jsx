import React, { useState, useEffect } from 'react';
import api from '../utils/api';

export default function SquadHub() {
  const [sessions, setSessions] = useState([]);
  const [news, setNews] = useState([]);
  const [squads, setSquads] = useState([]);

  useEffect(() => {
    const fetchSquadData = async () => {
      try {
        const [sessRes, newsRes, squadRes] = await Promise.all([
          api.get('/community/sessions').catch(() => ({ data: [] })),
          api.get('/community/news').catch(() => ({ data: [] })),
          api.get('/leaderboard/squads').catch(() => ({ data: [] }))
        ]);
        if (sessRes.data) setSessions(sessRes.data);
        if (newsRes.data) setNews(newsRes.data);
        if (squadRes.data) setSquads(squadRes.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchSquadData();
  }, []);

  return (
    <div className="w-full">
        {/* Header Section */}
        <header className="mb-12 flex flex-col md:flex-row justify-between items-end gap-6">
          <div className="max-w-2xl">
            <span className="font-['Plus_Jakarta_Sans'] text-[#ff51fa] uppercase tracking-widest text-xs font-bold mb-4 block">Social Ecosystem</span>
            <h1 className="font-['Spline_Sans'] text-5xl md:text-7xl font-extrabold tracking-tighter leading-none mb-4">
              Squad <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#94aaff] to-[#ff51fa]">Hub.</span>
            </h1>
            <p className="text-[#a3aac4] text-lg">Your kinetic collaborative space. Connect, study, and dominate the rankings with your elite learning squads.</p>
          </div>
          <div className="flex gap-4">
            <div className="text-right">
              <div className="text-3xl font-black text-[#8eff71]">{sessions.length || 0}</div>
              <div className="text-xs uppercase tracking-widest text-[#a3aac4]">Active Sessions</div>
            </div>
            <div className="w-[1px] h-12 bg-[#40485d]/30"></div>
            <div className="text-right">
              <div className="text-3xl font-black text-[#ff51fa]">{squads.length || 0}</div>
              <div className="text-xs uppercase tracking-widest text-[#a3aac4]">Total Squads</div>
            </div>
          </div>
        </header>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Main Content Area: Active Sessions & News Feed (8 cols) */}
          <div className="md:col-span-8 flex flex-col gap-6">
            
            {/* Active Study Sessions */}
            <section className="bg-[#192540]/40 backdrop-blur-[20px] border border-white/5 rounded-4xl p-8">
              <div className="flex justify-between items-center mb-8">
                <h2 className="font-['Spline_Sans'] text-2xl font-bold flex items-center gap-3">
                  <span className="material-symbols-outlined text-[#94aaff]" style={{ fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24", verticalAlign: "middle" }}>groups</span>
                  Active Sessions
                </h2>
                <button className="text-sm font-bold text-[#94aaff] hover:text-[#ff51fa] transition-colors cursor-pointer">View All</button>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {sessions.length > 0 ? sessions.map((session, i) => (
                  <div key={session._id || i} className="bg-[#091328] rounded-2xl p-5 hover:bg-[#141f38] transition-colors group cursor-pointer relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-3">
                      <span className="flex h-2 w-2 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#8eff71] opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-[#8eff71]"></span>
                      </span>
                    </div>
                    <div className="font-['Plus_Jakarta_Sans'] text-[10px] uppercase tracking-widest text-[#94aaff] mb-2">{session.subject || 'Study Area'} • {session.topic || 'Topic'}</div>
                    <h3 className="text-lg font-bold mb-4 group-hover:text-[#94aaff] transition-colors">{session.topic}</h3>
                    <div className="flex items-center justify-between">
                      <div className="flex -space-x-2">
                        <div className="w-8 h-8 rounded-full border-2 border-[#060e20] bg-[#192540] flex items-center justify-center text-[10px] font-bold">+{session.activeUsers || 0}</div>
                      </div>
                      <button className="bg-[#94aaff]/10 text-[#94aaff] px-4 py-1.5 rounded-full text-xs font-bold hover:bg-[#94aaff] hover:text-[#00257b] transition-all cursor-pointer">Join Room</button>
                    </div>
                  </div>
                )) : (
                  <p className="text-slate-500 text-sm">No active sessions right now.</p>
                )}
              </div>
            </section>

            {/* Global Campus News Feed */}
            <section className="bg-[#192540]/40 backdrop-blur-[20px] border border-white/5 rounded-4xl p-8 relative overflow-hidden flex-1">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#94aaff] via-[#ff51fa] to-[#8eff71] opacity-50"></div>
              <h2 className="font-['Spline_Sans'] text-2xl font-bold mb-8 flex items-center gap-3">
                <span className="material-symbols-outlined text-[#ff51fa]" style={{ fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24", verticalAlign: "middle" }}>rss_feed</span>
                Campus Pulse
              </h2>
              
              <div className="space-y-8">
                {news.length > 0 ? news.map((item, i) => (
                  <div key={item._id || i} className="flex gap-6 group cursor-pointer">
                    <div className="w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0 bg-[#091328]">
                      {item.imageUrl ? (
                        <img alt="News" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" src={item.imageUrl} />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-[#40485d]">
                          <span className="material-symbols-outlined text-3xl">article</span>
                        </div>
                      )}
                    </div>
                    <div className="flex-grow">
                      <div className="flex items-center gap-3 mb-1">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-[#8eff71]">{item.category || 'Update'}</span>
                        <span className="text-[10px] text-[#a3aac4]">Recent</span>
                      </div>
                      <h3 className="text-lg font-bold group-hover:text-[#94aaff] transition-colors leading-tight mb-2">{item.title}</h3>
                      <p className="text-sm text-[#a3aac4] line-clamp-2">{item.content}</p>
                    </div>
                  </div>
                )) : (
                  <p className="text-slate-500 text-sm">No campus news available.</p>
                )}
              </div>
            </section>
          </div>

          {/* Sidebar Area: Members & Rankings (4 cols) */}
          <aside className="md:col-span-4 space-y-6 cursor-pointer">
            
            {/* Active Now Status */}
            <section className="bg-[#091328] rounded-3xl p-6">
              <h3 className="font-['Spline_Sans'] text-xl font-bold mb-6 flex items-center justify-between">
                Active Now
                <span className="text-xs font-normal text-[#a3aac4] bg-[#141f38] px-2 py-0.5 rounded-full">42 online</span>
              </h3>
              
              <div className="space-y-4">
                {/* Member 1 */}
                <div className="flex items-center gap-3 p-2 rounded-2xl hover:bg-[#141f38] transition-colors cursor-pointer">
                  <div className="relative">
                    <img alt="Avatar" className="w-10 h-10 rounded-full" data-alt="User avatar icon" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAm7HemzeGXyOVIjSpeRognvcSVbOukWcLQBNYKQRDTT4SKKS6GhpEIllHSgcwIjU3pxp4ONO9ljp6lHbBQTPZgbZJ8YRS4S8drbDoiOJxhf4mEJgXL8O2_m04A_LBOyFMGl9OzSzYcfwLal-FMcFRMUvqhwaFcv3-whUmmXMVsXOrogbRXV_Si_-JFE-3Kq7cHD2qDfZ1SA9xcZCDxf8W0inIAnLYZygGotx0iRoti0CW34ufOc-fZm6g7VQEovXH61JdSy5etcQ8" />
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-[#8eff71] border-2 border-[#091328] rounded-full"></div>
                  </div>
                  <div>
                    <div className="text-sm font-bold">Xavier_Dev</div>
                    <div className="text-[10px] text-[#a3aac4] flex items-center gap-1">
                      <span className="material-symbols-outlined text-[12px]" style={{ verticalAlign: "middle" }}>code</span> Solving React Hooks
                    </div>
                  </div>
                </div>

                {/* Member 2 */}
                <div className="flex items-center gap-3 p-2 rounded-2xl hover:bg-[#141f38] transition-colors cursor-pointer">
                  <div className="relative">
                    <img alt="Avatar" className="w-10 h-10 rounded-full" data-alt="User avatar icon" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAKvBOm2tTC2fDxyUzPdM47O67C4n_ne-ol2fKMQk8ALGzdQ1kMhn8dD6FNH5LSnarXqfvh5Wh9hrfXQcfU2nCeOw-E_PBZR6-i43Nbs_HuWbPVPJ7XWP6ZFebuLeMeRqCdYDBpLh1AXWP7z4S_hJZBDQMaWDlQbfnU4WDJfUdJSkX7oSFH5ODxSP5eHXzgOX6a1qoGW33Cd4WZkHG6NZLaCc6821ZTGv4HlTugyUxIYWrSksTAyZgj6931LQ14Y-z5XlesSDYggQE" />
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-[#8eff71] border-2 border-[#091328] rounded-full"></div>
                  </div>
                  <div>
                    <div className="text-sm font-bold">Luna.Design</div>
                    <div className="text-[10px] text-[#a3aac4] flex items-center gap-1">
                      <span className="material-symbols-outlined text-[12px]" style={{ verticalAlign: "middle" }}>brush</span> Wireframing Hub
                    </div>
                  </div>
                </div>

                {/* Member 3 */}
                <div className="flex items-center gap-3 p-2 rounded-2xl hover:bg-[#141f38] transition-colors cursor-pointer">
                  <div className="relative">
                    <img alt="Avatar" className="w-10 h-10 rounded-full" data-alt="User avatar icon" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC9cJF2p-dH8YvITZc9Gtaw8bsXVifT3rhY8yMhbOTPB7BNHcK1XfwW6DcEe4ThHvWtLyqA4tXfJoyqMiusf6ZznQljEz0anZnGP04gLSoGhLzC6tQyZ7QCkbdq1trWJpMdtsB9HeQ5OKtpkGS2FjDjiCY7SE9MfmWDwedMMT004czso8dJakeb5TjxW8DFEWnxk6W5R_7p3f-5l-Ha2Ns83m1RuFR6OjvY0JhUd-GjOPR7hK1SzE_nEZHJgbXUR7AjwYNoHpjKtmg" />
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-[#ff51fa] border-2 border-[#091328] rounded-full"></div>
                  </div>
                  <div>
                    <div className="text-sm font-bold">Atlas_Prime</div>
                    <div className="text-[10px] text-[#a3aac4] flex items-center gap-1">
                      <span className="material-symbols-outlined text-[12px]" style={{ verticalAlign: "middle" }}>bed</span> AFK
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Squad Rankings */}
            <section className="bg-[#192540]/40 backdrop-blur-[20px] border border-white/5 rounded-3xl p-6 relative overflow-hidden">
              <div className="absolute -right-4 -top-4 w-24 h-24 bg-[#94aaff]/20 blur-3xl rounded-full"></div>
              <h3 className="font-['Spline_Sans'] text-xl font-bold mb-6 flex items-center gap-3 relative z-10">
                <span className="material-symbols-outlined text-[#8eff71]" style={{ fontVariationSettings: "'FILL' 1", verticalAlign: "middle" }}>workspace_premium</span>
                Squad Rankings
              </h3>
              
              <div className="space-y-3 relative z-10">
                {squads.length > 0 ? squads.slice(0, 5).map((squad, i) => {
                  let badgeColors = [
                    'border-[#8eff71] text-[#8eff71]', 
                    'border-[#94aaff]/50 text-[#a3aac4]', 
                    'border-[#ff51fa]/50 text-[#a3aac4]'
                  ];
                  let barColors = ['bg-[#8eff71]', 'bg-[#94aaff]', 'bg-[#ff51fa]'];
                  let colorClass = badgeColors[i] || badgeColors[1];
                  let barClass = barColors[i] || barColors[1];
                  const rankNum = i + 1;
                  
                  return (
                    <div key={squad._id || i} className={`flex items-center gap-4 bg-[#192540]/${i===0 ? '50' : '20'} p-3 rounded-2xl border-l-4 ${colorClass.split(' ')[0]}`}>
                      <span className={`text-lg font-black italic w-6 ${colorClass.split(' ')[1]}`}>{rankNum < 10 ? `0${rankNum}` : rankNum}</span>
                      <div className="flex-grow">
                        <div className="text-sm font-bold">{squad.name}</div>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="flex-grow bg-[#192540] h-1.5 rounded-full">
                            <div className={`${barClass} h-full rounded-full`} style={{ width: `${Math.max(10, 100 - (i*15))}%` }}></div>
                          </div>
                          <span className={`text-[10px] font-bold ${colorClass.split(' ')[1]}`}>{squad.totalXp || 0} XP</span>
                        </div>
                      </div>
                    </div>
                  );
                }) : (
                  <p className="text-slate-500 text-sm">No squad rankings available.</p>
                )}
              </div>
              
              <button className="w-full mt-6 py-3 rounded-full border border-[#40485d]/30 text-xs font-bold tracking-widest uppercase hover:bg-white/5 transition-colors relative z-10 cursor-pointer">
                Join a Squad
              </button>
            </section>

          </aside>
        </div>
    </div>
  );
}