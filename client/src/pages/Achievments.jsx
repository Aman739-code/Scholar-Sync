import React, { useState, useEffect } from 'react';
import api from '../utils/api';

export default function ScholarSyncTrophyRoom() {
  const [user, setUser] = useState(null);
  const [achievements, setAchievements] = useState([]);
  const [squads, setSquads] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userRes, achRes, squadRes] = await Promise.all([
          api.get('/users/profile').catch(() => ({ data: null })),
          api.get('/achievements/me').catch(() => ({ data: [] })),
          api.get('/leaderboard/global').catch(() => ({ data: [] }))
        ]);
        if (userRes.data) setUser(userRes.data);
        if (achRes.data) setAchievements(achRes.data);
        if (squadRes.data) setSquads(squadRes.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="w-full">
      {/* Custom Styles */}
      <style dangerouslySetInnerHTML={{
        __html: `
          .glass-glow {
            background: rgba(25, 37, 64, 0.4);
            backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.05);
          }
          .rare-glow {
            box-shadow: 0 0 20px -5px rgba(255, 81, 250, 0.3);
            border: 1px solid rgba(255, 81, 250, 0.2);
          }
          .legendary-glow {
            box-shadow: 0 0 25px -5px rgba(142, 255, 113, 0.3);
            border: 1px solid rgba(142, 255, 113, 0.2);
          }
          .epic-glow {
            box-shadow: 0 0 30px -5px rgba(148, 170, 255, 0.4);
            border: 1px solid rgba(148, 170, 255, 0.3);
          }
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
          .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
          .cinematic-text {
            background: linear-gradient(to bottom, #ffffff 30%, #94aaff 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }
        `
      }} />
      <div className="w-full">
        
        {/* Header */}
        <header className="mb-16 relative">
          <div className="absolute -top-20 -left-20 w-96 h-96 bg-[#94aaff]/20 rounded-full blur-[120px] -z-10 animate-pulse"></div>
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#ff51fa]/15 rounded-full blur-[100px] -z-10"></div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="uppercase tracking-[0.4em] text-[#ff51fa] font-black text-[10px] mb-3 block font-['Plus_Jakarta_Sans']">Digital Legacy Explorer // Scholar_Alpha</span>
              <h1 className="text-6xl md:text-8xl font-black font-['Spline_Sans'] tracking-tighter text-white mb-6 cinematic-text">Trophy Room</h1>
              <p className="text-[#a3aac4] text-lg max-w-2xl font-medium leading-relaxed opacity-80">
                Your academic legacy visualized. Every late night, every line of code, and every mastered concept mapped in real-time cosmic space.
              </p>
            </div>
            <div className="flex items-center gap-6 bg-white/5 backdrop-blur-xl p-6 rounded-3xl border border-white/10">
              <div className="text-center px-4 border-r border-white/10">
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">Global Rank</p>
                <p className="text-3xl font-black text-white">---</p>
              </div>
              <div className="text-center px-4">
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">Total Badges</p>
                <p className="text-3xl font-black text-[#ff51fa]">{achievements.length}</p>
              </div>
            </div>
          </div>
        </header>

        {/* Stats and Matrix */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20">
          
          {/* XP Progress */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="bg-[#141f38] rounded-4xl p-8 relative overflow-hidden group border border-white/5">
              <div className="relative z-10">
                <div className="flex justify-between items-end mb-8">
                  <div>
                    <p className="text-[10px] text-[#94aaff] font-bold uppercase tracking-widest mb-1">Current Tier</p>
                    <h3 className="text-4xl font-black text-white tracking-tighter">Level {user?.level || 1}</h3>
                    <p className="text-[#94aaff] font-bold text-sm">Scholar</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-slate-400 uppercase tracking-widest mb-1">Total XP</p>
                    <p className="text-2xl font-black text-white">{user?.xp || 0}</p>
                  </div>
                </div>
                <div className="h-5 w-full bg-slate-900 rounded-full overflow-hidden p-1 border border-white/5">
                  <div className="h-full bg-gradient-to-r from-[#8eff71] to-[#94aaff] w-[78%] rounded-full shadow-[0_0_20px_rgba(142,255,113,0.4)]"></div>
                </div>
                <div className="flex justify-between mt-3">
                  <p className="text-[10px] text-[#a3aac4] font-bold uppercase">12,600 XP to Next Level</p>
                  <p className="text-[10px] text-white font-bold">78%</p>
                </div>
              </div>
              <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-[#94aaff]/10 rounded-full blur-[80px] group-hover:bg-[#94aaff]/20 transition-all duration-700"></div>
            </div>
            
            {/* Next Milestone Motivation */}
            <div className="bg-[#091328] rounded-4xl p-6 border border-dashed border-white/10 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center">
                    <span className="material-symbols-outlined text-slate-500 text-xl" style={{ fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>lock_open</span>
                  </div>
                  <h4 className="font-black text-white text-sm uppercase tracking-wider">Next Milestone</h4>
                </div>
                <p className="text-xl font-bold text-white mb-2">Sigma Researcher</p>
                <p className="text-xs text-slate-500 leading-relaxed mb-6">Complete 3 Peer Reviews and master 'Data structures Part II' to unlock this legendary title.</p>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full border-2 border-[#94aaff] flex items-center justify-center">
                    <div className="w-2 h-2 bg-[#94aaff] rounded-full"></div>
                  </div>
                  <p className="text-[10px] font-bold text-slate-300">Peer Reviews (2/3)</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full border-2 border-slate-700"></div>
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">Master Data Structures II</p>
                </div>
              </div>
            </div>
          </div>

          {/* High-Tech Skill Matrix */}
          <div className="lg:col-span-8 bg-[#091328] rounded-4xl p-8 border border-white/5 relative overflow-hidden">
            <div className="flex justify-between items-start mb-8">
              <div>
                <h4 className="text-[10px] uppercase tracking-[0.3em] text-slate-500 font-black mb-1">Advanced Diagnostics</h4>
                <h3 className="text-2xl font-black text-white font-['Spline_Sans']">Skill Matrix</h3>
              </div>
              <div className="flex gap-2">
                <div className="w-2 h-2 bg-[#94aaff] rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-[#ff51fa] rounded-full"></div>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row items-center justify-around gap-12">
              <div className="relative w-72 h-72">
                {/* Background Grid */}
                <div className="absolute inset-0 flex items-center justify-center opacity-10">
                  <div className="w-full h-full border border-slate-500 rounded-full"></div>
                  <div className="absolute w-2/3 h-2/3 border border-slate-500 rounded-full"></div>
                  <div className="absolute w-1/3 h-1/3 border border-slate-500 rounded-full"></div>
                  <div className="absolute inset-0 rotate-45 border-l border-r border-slate-500"></div>
                  <div className="absolute inset-0 -rotate-45 border-l border-r border-slate-500"></div>
                </div>
                
                <svg className="w-full h-full drop-shadow-[0_0_15px_rgba(148,170,255,0.4)] relative z-10" viewBox="0 0 100 100">
                  {/* Hexagonal Guide */}
                  <polygon className="text-white/5" fill="none" points="50,5 95,25 95,75 50,95 5,75 5,25" stroke="currentColor" strokeWidth="0.5"></polygon>
                  {/* Data Polygon */}
                  <polygon className="animate-pulse" fill="rgba(148,170,255,0.2)" points="50,15 85,30 80,75 50,90 25,75 20,30" stroke="#94aaff" strokeWidth="2"></polygon>
                  {/* Points */}
                  <circle cx="50" cy="15" fill="#94aaff" r="2.5"></circle>
                  <circle cx="85" cy="30" fill="#ff51fa" r="2.5"></circle>
                  <circle cx="80" cy="75" fill="#8eff71" r="2.5"></circle>
                  <circle cx="50" cy="90" fill="#ff6e84" r="2.5"></circle>
                  <circle cx="25" cy="75" fill="#dee5ff" r="2.5"></circle>
                  <circle cx="20" cy="30" fill="#6c8cff" r="2.5"></circle>
                </svg>
                
                {/* Labels */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-[10px] font-black text-[#94aaff] tracking-widest">LOGIC</div>
                <div className="absolute top-1/4 -right-10 text-[10px] font-black text-[#ff51fa] tracking-widest">CREATIVITY</div>
                <div className="absolute bottom-1/4 -right-8 text-[10px] font-black text-[#8eff71] tracking-widest">AGILITY</div>
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-[10px] font-black text-[#ff6e84] tracking-widest">FOCUS</div>
                <div className="absolute bottom-1/4 -left-8 text-[10px] font-black text-[#dee5ff] tracking-widest">SOCIAL</div>
                <div className="absolute top-1/4 -left-10 text-[10px] font-black text-[#809bff] tracking-widest">MEMORY</div>
              </div>
              
              <div className="flex-1 w-full max-w-sm space-y-4">
                <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-bold text-slate-300">Logic Efficiency</span>
                    <span className="text-xs font-black text-[#94aaff]">88%</span>
                  </div>
                  <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-[#94aaff] w-[88%]"></div>
                  </div>
                </div>
                <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-bold text-slate-300">Creativity Index</span>
                    <span className="text-xs font-black text-[#ff51fa]">72%</span>
                  </div>
                  <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-[#ff51fa] w-[72%]"></div>
                  </div>
                </div>
                <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-bold text-slate-300">Focus Stamina</span>
                    <span className="text-xs font-black text-[#ff6e84]">94%</span>
                  </div>
                  <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-[#ff6e84] w-[94%]"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Unlocked Badges Section */}
        <section className="mb-20">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
            <div>
              <h4 className="text-[10px] uppercase tracking-[0.4em] text-[#ff51fa] font-black mb-2">Collection Hub</h4>
              <h2 className="text-4xl font-black text-white font-['Spline_Sans'] tracking-tight">Unlocked Badges</h2>
            </div>
            <div className="flex bg-slate-900/50 p-1 rounded-full border border-white/10">
              <button className="bg-[#94aaff] text-[#000000] px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all">All Badges</button>
              <button className="text-slate-500 hover:text-white px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all">Rare</button>
              <button className="text-slate-500 hover:text-white px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all">Legendary</button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {achievements.length > 0 ? achievements.map((item) => {
              const ach = item.achievement;
              let glow = 'glass-glow p-8 rounded-3xl group hover:-translate-y-2 transition-all duration-300 relative overflow-hidden';
              let iconColor = 'text-blue-400';
              let bgColor = 'bg-blue-600/10';
              let borderColor = 'border-blue-400/20';
              let textColor = 'text-blue-400';
              
              if (ach?.rarity === 'Legendary') {
                glow += ' legendary-glow';
                iconColor = 'text-[#8eff71]';
                bgColor = 'bg-[#8eff71]/20';
                borderColor = 'border-[#8eff71]/30';
                textColor = 'text-[#8eff71]';
              } else if (ach?.rarity === 'Epic') {
                glow += ' epic-glow';
                iconColor = 'text-[#94aaff]';
                bgColor = 'bg-[#94aaff]/20';
                borderColor = 'border-[#94aaff]/30';
                textColor = 'text-[#94aaff]';
              } else if (ach?.rarity === 'Rare') {
                glow += ' rare-glow';
                iconColor = 'text-[#ff51fa]';
                bgColor = 'bg-[#ff51fa]/20';
                borderColor = 'border-[#ff51fa]/30';
                textColor = 'text-[#ff51fa]';
              }

              return (
                <div key={item._id} className={glow}>
                  <div className={`w-16 h-16 ${bgColor} rounded-2xl flex items-center justify-center mb-6 border ${borderColor} group-hover:scale-110 transition-transform relative z-10`}>
                    <span className={`material-symbols-outlined text-4xl ${iconColor}`} style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
                  </div>
                  <h3 className="text-xl font-black text-white mb-2 relative z-10">{ach?.title || 'Unknown Badge'}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed mb-6 relative z-10">{ach?.description || 'No description available.'}</p>
                  <div className="flex items-center gap-3 relative z-10">
                    <span className={`text-[9px] font-black ${textColor} uppercase ${bgColor} px-3 py-1 rounded-full border ${borderColor} tracking-widest`}>{ach?.rarity || 'Common'}</span>
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">+{ach?.xpReward || 0} XP</span>
                  </div>
                </div>
              );
            }) : (
              <p className="text-slate-500 text-sm col-span-full py-8 text-center italic border border-white/5 rounded-2xl">No achievements unlocked yet. Keep studying!</p>
            )}
          </div>
        </section>

        {/* Squad Comparison Section */}
        <section className="mt-32">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
            <div>
              <h4 className="text-[10px] uppercase tracking-[0.4em] text-[#94aaff] font-black mb-2">Social Pulse</h4>
              <h2 className="text-4xl font-black text-white font-['Spline_Sans'] tracking-tight">The Squad Comparison</h2>
            </div>
            <a className="text-sm font-bold text-[#94aaff] hover:text-white transition-colors flex items-center gap-2" href="#">
              Full Leaderboard
              <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>arrow_forward</span>
            </a>
          </div>
          
          <div className="flex gap-6 overflow-x-auto pb-8 scrollbar-hide px-2">
            {squads.length > 0 ? squads.slice(0, 4).map((member, index) => {
              const isCurrentUser = user && member._id === user._id;
              
              if (isCurrentUser) {
                return (
                  <div key={member._id} className="min-w-[320px] bg-gradient-to-br from-[#94aaff]/10 to-[#ff51fa]/10 p-6 rounded-3xl border-2 border-[#94aaff]/30 flex items-center gap-5 relative ring-4 ring-[#94aaff]/5">
                    <div className="relative">
                      <div className="w-16 h-16 rounded-full border-2 border-white p-0.5 bg-[#192540] flex items-center justify-center text-xl font-bold">{member.name.charAt(0)}</div>
                      <div className="absolute -bottom-1 -right-1 bg-white text-[#060e20] w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black border-2 border-[#060e20] shadow-lg">{member.level || 1}</div>
                    </div>
                    <div>
                      <p className="text-base font-black text-white">You</p>
                      <p className="text-xs text-[#94aaff] font-bold mb-2">{member.xp || 0} XP</p>
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-[#ff51fa] text-sm" style={{ fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>workspace_premium</span>
                        <span className="text-[10px] text-[#ff51fa] font-black uppercase tracking-tighter">Rank #{index + 1}</span>
                      </div>
                    </div>
                    {index === 0 && <div className="absolute -top-3 right-4 bg-[#ff51fa] px-3 py-1 rounded-full text-[9px] font-black text-white uppercase tracking-widest shadow-lg shadow-[#ff51fa]/20">MVP</div>}
                  </div>
                );
              }
              
              return (
                <div key={member._id} className="min-w-[320px] bg-[#091328] p-6 rounded-3xl border border-white/5 flex items-center gap-5 hover:bg-white/5 transition-all group">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-full border-2 border-[#94aaff] p-0.5 bg-[#192540] flex items-center justify-center text-xl font-bold">{member.name.charAt(0)}</div>
                    <div className="absolute -bottom-1 -right-1 bg-[#94aaff] text-[#00257b] w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black border-2 border-[#060e20] shadow-lg">{member.level || 1}</div>
                  </div>
                  <div>
                    <p className="text-base font-black text-white group-hover:text-[#94aaff] transition-colors">{member.name}</p>
                    <p className="text-xs text-slate-500 mb-2">{member.xp || 0} XP</p>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-slate-500 font-bold uppercase tracking-tighter">Rank #{index + 1}</span>
                    </div>
                  </div>
                </div>
              );
            }) : (
              <p className="text-slate-500 text-sm italic">No leaderboard data found.</p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}