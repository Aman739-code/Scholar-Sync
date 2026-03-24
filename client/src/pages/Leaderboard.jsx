import React, { useState, useEffect } from 'react';
import api from '../utils/api';

export default function ScholarSyncHallOfFame() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [view, setView] = useState('global');

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await api.get(`/leaderboard/${view}`);
        setLeaderboard(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchLeaderboard();
  }, [view]);

  const top3 = leaderboard.slice(0, 3);
  const rest = leaderboard.slice(3);

  return (
    <div className="w-full font-['Plus_Jakarta_Sans']">
      {/* Custom Styles */}
      <style dangerouslySetInnerHTML={{
        __html: `
          .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
          }
          .glass-glow {
            backdrop-filter: blur(20px);
            background: linear-gradient(135deg, rgba(148, 170, 255, 0.05), rgba(255, 81, 250, 0.05));
          }
          .podium-shadow-1 { box-shadow: 0 0 60px -10px rgba(142, 255, 113, 0.4); }
          .podium-shadow-2 { box-shadow: 0 0 60px -10px rgba(148, 170, 255, 0.4); }
          .podium-shadow-3 { box-shadow: 0 0 60px -10px rgba(255, 81, 250, 0.4); }
          .cinematic-text {
            background: linear-gradient(to bottom, #ffffff 30%, #94aaff 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }
        `
      }} />
      <div className="w-full">
        {/* Header Section */}
        <header className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <span className="text-[#ff51fa] font-bold uppercase tracking-[0.3em] text-xs mb-2 block">Season 04: Neural Overdrive</span>
            <h1 className="text-6xl md:text-8xl font-black font-['Spline_Sans'] tracking-tighter text-white">Hall of <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#94aaff] to-[#ff51fa]">Fame</span></h1>
            <p className="text-[#a3aac4] text-lg max-w-xl mt-4">The ultimate echelon of academic excellence. Only the sharpest minds ascend to the podium.</p>
          </div>
          <div className="flex bg-[#192540] p-1.5 rounded-full self-start">
            <button 
              onClick={() => setView('global')}
              className={`px-8 py-3 rounded-full font-bold text-sm transition-all ${view === 'global' ? 'bg-[#94aaff] text-[#00257b]' : 'text-[#a3aac4] hover:text-white'}`}
            >Global</button>
            <button 
              onClick={() => setView('squads')}
              className={`px-8 py-3 rounded-full font-bold text-sm transition-all ${view === 'squads' ? 'bg-[#94aaff] text-[#00257b]' : 'text-[#a3aac4] hover:text-white'}`}
            >The Squads</button>
          </div>
        </header>

        {/* Podium Section */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 items-end mb-24 relative">
          <div className="absolute inset-0 bg-[#94aaff]/5 blur-[120px] rounded-full -z-10"></div>
          
          {/* Rank 2 */}
          {top3[1] && (
          <div className="order-2 md:order-1 flex flex-col items-center group">
            <div className="relative mb-6">
              <div className="absolute -inset-4 bg-[#94aaff]/20 blur-2xl rounded-full"></div>
              <div className="w-32 h-32 rounded-full border-4 border-[#94aaff] relative z-10 bg-[#192540] flex items-center justify-center text-5xl font-bold text-white uppercase">{top3[1].name.charAt(0)}</div>
              <div className="absolute -bottom-2 -right-2 bg-[#060e20] border-2 border-[#94aaff] w-10 h-10 rounded-full flex items-center justify-center font-black text-xl z-20 text-[#94aaff]">2</div>
            </div>
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-white font-['Spline_Sans']">{top3[1].name}</h3>
              <p className="text-[#94aaff] font-medium">{top3[1].xp || top3[1].totalXp || 0} XP</p>
            </div>
            <div className="w-full h-48 bg-[#141f38] rounded-t-3xl podium-shadow-2 relative flex flex-col items-center justify-center border-t border-[#94aaff]/20">
              <span className="text-5xl font-black text-[#94aaff]/10 absolute top-4">SILVER</span>
              <div className="flex gap-4 mt-8">
                <div className="text-center">
                  <p className="text-[10px] uppercase tracking-widest text-[#a3aac4]">Streak</p>
                  <p className="font-bold text-white">{top3[1].streak || 0}</p>
                </div>
                <div className="w-px h-8 bg-[#40485d]/30"></div>
                <div className="text-center">
                  <p className="text-[10px] uppercase tracking-widest text-[#a3aac4]">Level</p>
                  <p className="font-bold text-white">{top3[1].level || 1}</p>
                </div>
              </div>
            </div>
          </div>
          )}

          {/* Rank 1 (Centerpiece) */}
          {top3[0] && (
          <div className="order-1 md:order-2 flex flex-col items-center group -translate-y-8">
            <div className="relative mb-8 scale-110">
              <div className="absolute -inset-8 bg-[#8eff71]/30 blur-3xl rounded-full animate-pulse"></div>
              <div className="w-44 h-44 rounded-full border-4 border-[#8eff71] relative z-10 bg-[#192540] flex items-center justify-center text-6xl font-bold text-white uppercase">{top3[0].name.charAt(0)}</div>
              <div className="absolute -bottom-4 -right-4 bg-[#8eff71] text-[#0d6100] w-14 h-14 rounded-full flex items-center justify-center font-black text-3xl z-20">1</div>
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 text-[#8eff71]">
                <span className="material-symbols-outlined text-6xl" style={{ fontVariationSettings: "'FILL' 1" }}>workspace_premium</span>
              </div>
            </div>
            <div className="text-center mb-8">
              <h3 className="text-4xl font-black text-white font-['Spline_Sans'] tracking-tight">{top3[0].name}</h3>
              <p className="text-[#8eff71] font-bold text-xl">{top3[0].xp || top3[0].totalXp || 0} XP</p>
            </div>
            <div className="w-full h-64 bg-[#192540] rounded-t-3xl podium-shadow-1 relative flex flex-col items-center justify-center border-t-2 border-[#8eff71]/30">
              <span className="text-6xl font-black text-[#8eff71]/10 absolute top-6">CROWNED</span>
              <div className="flex gap-8 mt-12">
                <div className="text-center">
                  <p className="text-xs uppercase tracking-widest text-[#a3aac4]">Streak</p>
                  <p className="text-2xl font-black text-white">{top3[0].streak || 0}</p>
                </div>
                <div className="w-px h-12 bg-[#40485d]/50"></div>
                <div className="text-center">
                  <p className="text-xs uppercase tracking-widest text-[#a3aac4]">Level</p>
                  <p className="text-2xl font-black text-white">{top3[0].level || 1}</p>
                </div>
              </div>
            </div>
          </div>
          )}

          {/* Rank 3 */}
          {top3[2] && (
          <div className="order-3 md:order-3 flex flex-col items-center group">
            <div className="relative mb-6">
              <div className="absolute -inset-4 bg-[#ff51fa]/20 blur-2xl rounded-full"></div>
              <div className="w-32 h-32 rounded-full border-4 border-[#ff51fa] relative z-10 bg-[#192540] flex items-center justify-center text-5xl font-bold text-white uppercase">{top3[2].name.charAt(0)}</div>
              <div className="absolute -bottom-2 -right-2 bg-[#060e20] border-2 border-[#6d758c] w-10 h-10 rounded-full flex items-center justify-center font-black text-[#6d758c]">3</div>
            </div>
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-white font-['Spline_Sans']">{top3[2].name}</h3>
              <p className="text-[#ff51fa] font-medium">{top3[2].xp || top3[2].totalXp || 0} XP</p>
            </div>
            <div className="w-full h-36 bg-[#141f38] rounded-t-3xl podium-shadow-3 relative flex flex-col items-center justify-center border-t border-[#ff51fa]/20 asymmetric-podium" style={{ transform: "scaleX(-1)" }}>
              <div className="flex flex-col items-center" style={{ transform: "scaleX(-1)" }}>
                <span className="text-4xl font-black text-[#ff51fa]/10 absolute top-4">BRONZE</span>
                <div className="flex gap-4 mt-6">
                  <div className="text-center">
                    <p className="text-[10px] uppercase tracking-widest text-[#a3aac4]">Streak</p>
                    <p className="font-bold text-white">{top3[2].streak || 0}</p>
                  </div>
                  <div className="w-px h-8 bg-[#40485d]/30"></div>
                  <div className="text-center">
                    <p className="text-[10px] uppercase tracking-widest text-[#a3aac4]">Level</p>
                    <p className="font-bold text-white">{top3[2].level || 1}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          )}
        </section>

        {/* Search & Filter Controls */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-grow relative">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#6d758c]">search</span>
            <input 
              className="w-full bg-[#192540] border-none rounded-3xl py-4 pl-12 pr-6 text-[#dee5ff] focus:ring-2 focus:ring-[#94aaff] placeholder:text-[#6d758c] transition-all outline-none" 
              placeholder="Search scholars by username or squad..." 
              type="text" 
            />
          </div>
          <div className="flex gap-2">
            <button className="bg-[#141f38] px-6 py-4 rounded-3xl flex items-center gap-2 hover:bg-[#1f2b49] transition-colors text-[#dee5ff] font-medium border border-[#40485d]/20">
              <span className="material-symbols-outlined text-sm">filter_list</span>
              Filters
            </button>
          </div>
        </div>

        {/* Top 100 List */}
        <div className="bg-[#091328] rounded-4xl overflow-hidden mb-24">
          {/* Table Header */}
          <div className="grid grid-cols-[60px_1fr_120px_120px_120px] px-8 py-6 border-b border-[#40485d]/10 text-xs font-black uppercase tracking-[0.2em] text-[#6d758c]">
            <span>Rank</span>
            <span>Scholar</span>
            <span className="text-center">Level</span>
            <span className="text-center">Streak</span>
            <span className="text-right">Total XP</span>
          </div>
          
          {/* List Items */}
          <div className="flex flex-col gap-2 mt-4">
            {rest.map((item, i) => {
              const rank = i + 4;
              return (
                <div key={item._id || item.name} className="grid grid-cols-[60px_1fr_120px_120px_120px] px-8 py-5 items-center bg-[#0f1930] rounded-2xl hover:bg-[#141f38] transition-colors group cursor-pointer border-b border-[#40485d]/5">
                  <div className="font-['Spline_Sans'] font-bold text-lg text-[#a3aac4] group-hover:text-[#94aaff] transition-colors">{rank < 10 ? `0${rank}` : rank}</div>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#192540] flex items-center justify-center font-bold text-white">{item.name.charAt(0)}</div>
                    <div>
                      <div className="font-bold text-white">{item.name}</div>
                      <div className="text-xs text-[#a3aac4]">{view === 'squads' ? 'Squad' : 'Scholar'}</div>
                    </div>
                  </div>
                  <div className="text-center font-black text-[#809bff]">{item.level || 1}</div>
                  <div className="text-center">
                    <span className="bg-[#192540] px-3 py-1 rounded-full text-xs font-bold border border-[#94aaff]/20 text-white">{item.streak || 0} DAYS</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-bold px-2 py-1 rounded bg-[#8eff71]/10 text-[#8eff71] uppercase">{item.xp || item.totalXp || 0} XP</span>
                  </div>
                </div>
              );
            })}
          </div>
          
          <button className="w-full py-6 text-[#94aaff] font-bold text-sm bg-[#141f38] hover:bg-[#1f2b49] transition-colors uppercase tracking-widest mt-4">
            Load Top 100 Scholars
          </button>
        </div>

        {/* Monthly Rewards Highlights */}
        <section className="mb-24">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-black font-['Spline_Sans'] text-white tracking-tight">Season Rewards</h2>
            <span className="text-[#a3aac4] font-medium">Ending in 12d 04h 22m</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Reward 1 */}
            <div className="bg-[#141f38] p-8 rounded-4xl border border-[#40485d]/10 relative overflow-hidden group">
              <div className="absolute -top-12 -right-12 w-32 h-32 bg-[#8eff71]/10 rounded-full blur-3xl group-hover:bg-[#8eff71]/20 transition-all"></div>
              <div className="flex flex-col gap-4 relative z-10">
                <div className="w-16 h-16 bg-[#192540] rounded-2xl flex items-center justify-center text-[#8eff71] shadow-inner">
                  <span className="material-symbols-outlined text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>shield</span>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white">Rank 1: Titan Crown</h4>
                  <p className="text-[#a3aac4] text-sm mt-2">Exclusive animated avatar border and permanent 'Oracle' title in all chat hubs.</p>
                </div>
              </div>
            </div>
            
            {/* Reward 2 */}
            <div className="bg-[#141f38] p-8 rounded-4xl border border-[#40485d]/10 relative overflow-hidden group">
              <div className="absolute -top-12 -right-12 w-32 h-32 bg-[#94aaff]/10 rounded-full blur-3xl group-hover:bg-[#94aaff]/20 transition-all"></div>
              <div className="flex flex-col gap-4 relative z-10">
                <div className="w-16 h-16 bg-[#192540] rounded-2xl flex items-center justify-center text-[#94aaff] shadow-inner">
                  <span className="material-symbols-outlined text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>token</span>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white">Top 10: Sync Crystals</h4>
                  <p className="text-[#a3aac4] text-sm mt-2">5,000 Scholar Crystals to unlock premium UI themes and course power-ups.</p>
                </div>
              </div>
            </div>
            
            {/* Reward 3 */}
            <div className="bg-[#141f38] p-8 rounded-4xl border border-[#40485d]/10 relative overflow-hidden group">
              <div className="absolute -top-12 -right-12 w-32 h-32 bg-[#ff51fa]/10 rounded-full blur-3xl group-hover:bg-[#ff51fa]/20 transition-all"></div>
              <div className="flex flex-col gap-4 relative z-10">
                <div className="w-16 h-16 bg-[#192540] rounded-2xl flex items-center justify-center text-[#ff51fa] shadow-inner">
                  <span className="material-symbols-outlined text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>card_giftcard</span>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white">Top 100: Study Pass</h4>
                  <p className="text-[#a3aac4] text-sm mt-2">Next month's Premium Study Pass for free, including access to expert seminars.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}