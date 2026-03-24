import React, { useState, useEffect } from 'react';
import api from '../utils/api';

export default function Assignments() {
  const [quests, setQuests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuests = async () => {
      try {
        const res = await api.get('/quests');
        setQuests(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchQuests();
  }, []);

  if (loading) return <div className="p-8 text-[#dee5ff]">Loading assignments...</div>;

  return (
    <div className="w-full">
        {/* Performance Hub Header */}
        <header className="mb-16 flex flex-col md:flex-row justify-between items-end gap-8">
          <div className="max-w-2xl">
            <span className="font-['Plus_Jakarta_Sans'] text-[#ff51fa] uppercase tracking-[0.3em] text-xs font-bold mb-4 block">Performance Portal</span>
            <h1 className="font-['Spline_Sans'] text-5xl md:text-7xl font-black tracking-tighter leading-none mb-6">
              Achieve <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8eff71] to-[#94aaff]">Flow State.</span>
            </h1>
            <p className="text-[#a3aac4] text-lg leading-relaxed font-medium">
              Your cognitive output is syncing with the Performance Hub. Track your grades, maintain your streak, and harvest Scholar Shards.
            </p>
          </div>
          
          {/* Quick Stats Chips */}
          <div className="flex gap-4">
            <div className="bg-[#141f38] px-6 py-4 rounded-xl flex items-center gap-4 border border-[#40485d]/10">
              <div className="w-12 h-12 rounded-full bg-[#ff51fa]/10 flex items-center justify-center">
                <span className="material-symbols-outlined text-[#ff51fa]" style={{ fontVariationSettings: "'FILL' 1", verticalAlign: "middle" }}>local_fire_department</span>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-[#a3aac4] font-bold">Current Streak</p>
                <p className="text-xl font-black font-['Spline_Sans']">14 Days</p>
              </div>
            </div>
            <div className="bg-[#141f38] px-6 py-4 rounded-xl flex items-center gap-4 border border-[#40485d]/10">
              <div className="w-12 h-12 rounded-full bg-[#8eff71]/10 flex items-center justify-center">
                <span className="material-symbols-outlined text-[#8eff71]" style={{ fontVariationSettings: "'FILL' 1", verticalAlign: "middle" }}>token</span>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-[#a3aac4] font-bold">Scholar Shards</p>
                <p className="text-xl font-black font-['Spline_Sans']">2,840</p>
              </div>
            </div>
          </div>
        </header>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-12 gap-6">
          
          {/* Left Column: Grade Analytics */}
          <div className="col-span-12 lg:col-span-8 grid grid-cols-12 gap-6">
            
            {/* Main Analytics Card */}
            <div className="col-span-12 bg-[#091328] rounded-4xl p-8 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#94aaff]/5 blur-[100px] rounded-full -mr-20 -mt-20"></div>
              
              <div className="flex justify-between items-start mb-12 relative z-10">
                <div>
                  <h2 className="font-['Spline_Sans'] text-2xl font-bold">Academic Synthesis</h2>
                  <p className="text-[#a3aac4] text-sm">Visualizing performance across dimensions</p>
                </div>
                <div className="bg-[#192540] rounded-full px-4 py-1 text-xs font-bold border border-[#40485d]/20">
                  Semester 02 Analysis
                </div>
              </div>

              {/* Subjects Visual Blocks */}
              <div className="grid md:grid-cols-3 gap-6 mb-8 relative z-10">
                {/* STEM */}
                <div className="space-y-4">
                  <div className="flex justify-between items-end">
                    <span className="font-['Plus_Jakarta_Sans'] text-[#94aaff] text-xs font-black tracking-widest uppercase">STEM</span>
                    <span className="text-3xl font-black font-['Spline_Sans']">94<span className="text-sm opacity-50">%</span></span>
                  </div>
                  <div className="h-3 w-full bg-[#192540]/20 rounded-full overflow-hidden">
                    <div className="h-full bg-[#94aaff] rounded-full w-[94%]"></div>
                  </div>
                  <p className="text-[10px] text-[#a3aac4] leading-tight">Excelled in Quantum Logic & Linear Algebra</p>
                </div>
                
                {/* Creative Logic */}
                <div className="space-y-4">
                  <div className="flex justify-between items-end">
                    <span className="font-['Plus_Jakarta_Sans'] text-[#ff51fa] text-xs font-black tracking-widest uppercase">Creative Logic</span>
                    <span className="text-3xl font-black font-['Spline_Sans']">88<span className="text-sm opacity-50">%</span></span>
                  </div>
                  <div className="h-3 w-full bg-[#192540]/20 rounded-full overflow-hidden">
                    <div className="h-full bg-[#ff51fa] rounded-full w-[88%]"></div>
                  </div>
                  <p className="text-[10px] text-[#a3aac4] leading-tight">Strong performance in Visual Semiotics</p>
                </div>
                
                {/* Humanities */}
                <div className="space-y-4">
                  <div className="flex justify-between items-end">
                    <span className="font-['Plus_Jakarta_Sans'] text-[#8eff71] text-xs font-black tracking-widest uppercase">Humanities</span>
                    <span className="text-3xl font-black font-['Spline_Sans']">79<span className="text-sm opacity-50">%</span></span>
                  </div>
                  <div className="h-3 w-full bg-[#192540]/20 rounded-full overflow-hidden">
                    <div className="h-full bg-[#8eff71] rounded-full w-[79%]"></div>
                  </div>
                  <p className="text-[10px] text-[#a3aac4] leading-tight">Focus required on Post-Digital History</p>
                </div>
              </div>

              {/* Asymmetric Graphic Bleed */}
              <div className="mt-12 -mx-8 -mb-8 h-48 bg-gradient-to-t from-[#141f38]/50 to-transparent flex items-end px-8 relative z-0">
                <div className="flex items-end gap-1 w-full h-full pb-4">
                  <div className="w-full bg-[#94aaff]/20 h-[40%] rounded-t-sm"></div>
                  <div className="w-full bg-[#94aaff]/20 h-[60%] rounded-t-sm"></div>
                  <div className="w-full bg-[#94aaff]/20 h-[55%] rounded-t-sm"></div>
                  <div className="w-full bg-[#94aaff]/20 h-[85%] rounded-t-sm"></div>
                  <div className="w-full bg-[#94aaff]/20 h-[70%] rounded-t-sm"></div>
                  <div className="w-full bg-[#94aaff]/20 h-[95%] rounded-t-sm border-t-2 border-[#94aaff]"></div>
                  <div className="w-full bg-[#94aaff]/20 h-[80%] rounded-t-sm"></div>
                  <div className="w-full bg-[#94aaff]/20 h-[90%] rounded-t-sm"></div>
                </div>
              </div>
            </div>

            {/* Recent Assignments */}
            <div className="col-span-12 md:col-span-7 bg-[#0f1930] rounded-3xl p-6">
              <h3 className="font-['Spline_Sans'] text-lg font-bold mb-6">Recent Deliverables</h3>
              
              <div className="space-y-4">
                {quests.length > 0 ? quests.map((q) => (
                  <div key={q._id} className="group bg-[#091328] p-4 rounded-md flex items-center justify-between hover:bg-[#141f38] transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-[#94aaff]/10 flex items-center justify-center">
                        <span className="material-symbols-outlined text-[#94aaff] text-sm" style={{ verticalAlign: "middle" }}>{q.category === 'STEM' ? 'terminal' : q.category === 'Humanities' ? 'menu_book' : 'palette'}</span>
                      </div>
                      <div>
                        <h4 className="text-sm font-bold">{q.title}</h4>
                        <p className="text-[10px] text-[#a3aac4]">{q.category} • {q.status}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-black text-[#8eff71]">{q.points} XP</p>
                      <p className="text-[8px] uppercase font-bold text-[#a3aac4] tracking-widest">{q.deadline ? new Date(q.deadline).toLocaleDateString() : 'Active'}</p>
                    </div>
                  </div>
                )) : (
                  <p className="text-slate-500 text-xs italic">No active assignments found.</p>
                )}
              </div>
            </div>

            {/* Upcoming Challenges */}
            <div className="col-span-12 md:col-span-5 bg-[#192540] rounded-3xl p-6 flex flex-col justify-between">
              <div>
                <h3 className="font-['Spline_Sans'] text-lg font-bold mb-2">Priority Lab</h3>
                <p className="text-xs text-[#a3aac4] mb-6">High intensity tasks ahead</p>
                
                <div className="bg-[#091328] p-4 rounded-md mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[10px] font-black text-[#ff6e84] uppercase tracking-tighter">Due in 4h</span>
                    <span className="material-symbols-outlined text-[#ff6e84] text-xs" style={{ verticalAlign: "middle" }}>priority_high</span>
                  </div>
                  <h4 className="text-sm font-bold mb-1">Vector Field Analysis</h4>
                  <p className="text-[10px] text-[#a3aac4]">250 Scholar Shards on completion</p>
                </div>
              </div>
              <button className="w-full bg-[#1f2b49] py-3 rounded-full text-xs font-bold hover:bg-white hover:text-[#060e20] transition-colors cursor-pointer">
                View All Assignments
              </button>
            </div>

          </div>

          {/* Right Column: Flow State & Sync */}
          <div className="col-span-12 lg:col-span-4 space-y-6">
            
            {/* Flow State Circular Indicator */}
            <div className="bg-[#091328] rounded-4xl p-8 flex flex-col items-center text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-[#8eff71]/5 to-transparent"></div>
              
              <h3 className="font-['Spline_Sans'] text-xl font-bold mb-8 relative z-10">Performance Sync</h3>
              
              <div className="relative w-48 h-48 flex items-center justify-center mb-8">
                <svg className="w-full h-full -rotate-90">
                  <circle className="text-[#192540]/20" cx="96" cy="96" fill="transparent" r="88" stroke="currentColor" strokeWidth="8"></circle>
                  <circle 
                    className="text-[#8eff71] drop-shadow-[0_0_10px_rgba(142,255,113,0.3)]" 
                    cx="96" cy="96" fill="transparent" r="88" 
                    stroke="currentColor" strokeDasharray="553" strokeDashoffset="110" 
                    strokeLinecap="round" strokeWidth="12">
                  </circle>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-5xl font-black font-['Spline_Sans']">82%</span>
                  <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#8eff71] mt-1">Flow Achieved</span>
                </div>
              </div>
              
              <p className="text-sm text-[#a3aac4] mb-8 px-4 relative z-10">
                You are performing <span className="text-white font-bold">12% better</span> than last week. Peak cognitive window: <span className="text-white font-bold">10:00 AM - 1:00 PM</span>.
              </p>
              
              <div className="w-full space-y-3 relative z-10">
                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest px-2">
                  <span>Focus Capacity</span>
                  <span className="text-[#8eff71]">Optimal</span>
                </div>
                <div className="h-1.5 w-full bg-[#192540]/30 rounded-full overflow-hidden">
                  <div className="h-full bg-[#8eff71] w-[82%]"></div>
                </div>
              </div>
            </div>

            {/* Shard Conversion Card */}
            <div className="bg-[#192540]/40 backdrop-blur-[12px] rounded-3xl p-6 border border-white/5">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#ff51fa] to-[#94aaff] flex items-center justify-center rotate-3 group-hover:rotate-0 transition-transform">
                  <span className="material-symbols-outlined text-white" style={{ fontVariationSettings: "'FILL' 1", verticalAlign: "middle" }}>auto_awesome</span>
                </div>
                <div>
                  <h3 className="font-bold text-sm">Scholar Shard Hub</h3>
                  <p className="text-[10px] text-[#a3aac4] uppercase tracking-widest font-bold">Tier: Neon Adept</p>
                </div>
              </div>
              
              <div className="bg-black/20 rounded-md p-4 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-xs">Next Reward Unlock</span>
                  <span className="text-xs font-bold">160 Shards</span>
                </div>
                <div className="h-1 w-full bg-white/5 rounded-full">
                  <div className="h-full bg-[#ff51fa] w-[65%]"></div>
                </div>
              </div>
              
              <button className="w-full mt-6 bg-transparent border border-[#ff51fa] text-[#ff51fa] py-3 rounded-full text-xs font-black uppercase tracking-widest hover:bg-[#ff51fa] hover:text-white transition-all cursor-pointer">
                Redeem Rewards
              </button>
            </div>

            {/* System Status */}
            <div className="p-4 flex items-center justify-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#8eff71] animate-pulse"></span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#a3aac4]">Hub Sync Active</span>
            </div>
            
          </div>
        </div>
    </div>
  );
}