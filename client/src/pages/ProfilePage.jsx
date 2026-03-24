import React, { useState, useEffect } from 'react';
import api from '../utils/api';

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get('/users/profile');
        setUser(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading) return <div className="p-8 text-[#dee5ff]">Syncing profile...</div>;

  return (
    <div className="w-full">
        {/* Hero Profile Section */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-4 space-y-6">
            
            {/* Profile Identity Card */}
            <div className="bg-[#141f38] p-8 rounded-4xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4">
                <span className="text-[0.6rem] uppercase tracking-widest font-bold text-[#ff51fa] bg-[#ff51fa]/10 px-3 py-1 rounded-full border border-[#ff51fa]/20">Scholar Level 42</span>
              </div>
              
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-32 h-32 rounded-full p-1 bg-gradient-to-tr from-[#94aaff] via-[#ff51fa] to-[#8eff71]">
                  <div className="w-full h-full rounded-full bg-[#000000] flex items-center justify-center overflow-hidden">
                    <img className="w-full h-full object-cover opacity-90 group-hover:scale-110 transition-transform duration-700" data-alt="Main profile portrait of the user" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDRiH0fd9qrqwTgZ0mysfySZWyIMgn-jWcnvYpz1bM6G7JN800leCCENNbvbaYjdePq55VvkNkD3UGGJQ8OeL6-en5TUHxvUxXFkdOlWP41P5N4nB6by6ONr4wywAacU49hS6Qgz35WENDsaP7ksWWnJHcRCvGg6nzi-1we2xACnjYrfcrSPh5XTjwtWcTLFK2Ixt2I2rUV252HvL7Oy265rnqdtre265qc3dwEZSgLh1Y5RxydHKNHTfD6KYEeFpkM3oeMLEoURZc" alt="" />
                  </div>
                </div>
                
                <div className="space-y-1">
                  <h1 className="font-['Spline_Sans'] text-3xl font-black tracking-tight">{user?.name || 'Scholar'}</h1>
                  <p className="font-['Plus_Jakarta_Sans'] text-[#a3aac4] text-sm">{user?.bio || 'Full-Stack Alchemist & Quantum Learner'}</p>
                </div>
                
                <div className="flex gap-4 pt-2">
                  <div className="text-center">
                    <p className="text-xl font-['Spline_Sans'] font-bold text-[#94aaff]">1,240</p>
                    <p className="text-[0.65rem] uppercase tracking-tighter text-[#a3aac4] font-bold">Followers</p>
                  </div>
                  <div className="w-px h-8 bg-[#40485d]/30"></div>
                  <div className="text-center">
                    <p className="text-xl font-['Spline_Sans'] font-bold text-[#8eff71]">89%</p>
                    <p className="text-[0.65rem] uppercase tracking-tighter text-[#a3aac4] font-bold">Accuracy</p>
                  </div>
                  <div className="w-px h-8 bg-[#40485d]/30"></div>
                  <div className="text-center">
                    <p className="text-xl font-['Spline_Sans'] font-bold text-[#ff51fa]">#12</p>
                    <p className="text-[0.65rem] uppercase tracking-tighter text-[#a3aac4] font-bold">Ranking</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Pro Upgrade CTA */}
            <div className="bg-gradient-to-br from-[#192540] to-[#091328] p-6 rounded-3xl border border-[#94aaff]/20 relative overflow-hidden group">
              <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-[#94aaff]/10 rounded-full blur-3xl group-hover:bg-[#94aaff]/20 transition-colors"></div>
              <div className="relative z-10 space-y-4">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[#94aaff]" style={{ fontVariationSettings: "'FILL' 1" }}>workspace_premium</span>
                  <h3 className="font-['Spline_Sans'] font-bold tracking-tight">Scholar Tier: <span className="text-[#94aaff]">Free</span></h3>
                </div>
                <p className="text-sm text-[#a3aac4] leading-relaxed">Unlock advanced neuro-analytics and 4K kinetic study streams with Scholar Sync Pro.</p>
                <button className="w-full py-3 bg-[#94aaff] text-[#00257b] rounded-full font-['Spline_Sans'] font-extrabold tracking-tight hover:shadow-[0_0_20px_rgba(148,170,255,0.4)] transition-all cursor-pointer">Upgrade to Pro</button>
              </div>
            </div>
            
          </div>

          {/* Bento Content Grid */}
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Skill Hex-Chart Card */}
            <div className="md:col-span-2 bg-[#091328] p-8 rounded-4xl overflow-hidden relative">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h2 className="font-['Spline_Sans'] text-2xl font-black tracking-tight italic">Skill Matrix</h2>
                  <p className="text-sm text-[#a3aac4] font-['Plus_Jakarta_Sans']">Real-time intellectual distribution</p>
                </div>
                <div className="flex gap-2">
                  <span className="px-3 py-1 bg-[#192540] rounded-full text-[0.65rem] font-bold text-[#94aaff] uppercase tracking-widest border border-[#94aaff]/10">Lvl {user?.level || 1}</span>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row items-center justify-between gap-12">
                {/* Simulated Radar Chart */}
                <div className="relative w-64 h-64 flex items-center justify-center">
                  <div className="absolute inset-0 border border-[#40485d]/20 skill-hex scale-[1]"></div>
                  <div className="absolute inset-0 border border-[#40485d]/20 skill-hex scale-[0.75]"></div>
                  <div className="absolute inset-0 border border-[#40485d]/20 skill-hex scale-[0.5]"></div>
                  <div className="absolute inset-0 border border-[#40485d]/20 skill-hex scale-[0.25]"></div>
                  
                  {/* Skill Vectors */}
                  <div className="absolute inset-0 bg-[#94aaff]/20 skill-hex" style={{ clipPath: "polygon(50% 10%, 90% 30%, 80% 80%, 40% 90%, 20% 70%, 15% 30%)" }}></div>
                  
                  {/* Labels */}
                  <span className="absolute top-0 -translate-y-6 font-['Spline_Sans'] font-bold text-[0.7rem] uppercase text-[#94aaff]">Logic</span>
                  <span className="absolute top-1/4 right-0 translate-x-8 font-['Spline_Sans'] font-bold text-[0.7rem] uppercase text-[#ff51fa]">Creative</span>
                  <span className="absolute bottom-1/4 right-0 translate-x-8 font-['Spline_Sans'] font-bold text-[0.7rem] uppercase text-[#8eff71]">Speed</span>
                  <span className="absolute bottom-0 translate-y-6 font-['Spline_Sans'] font-bold text-[0.7rem] uppercase text-[#94aaff]">Ethics</span>
                  <span className="absolute bottom-1/4 left-0 -translate-x-10 font-['Spline_Sans'] font-bold text-[0.7rem] uppercase text-[#ff51fa]">Focus</span>
                  <span className="absolute top-1/4 left-0 -translate-x-10 font-['Spline_Sans'] font-bold text-[0.7rem] uppercase text-[#8eff71]">Theory</span>
                </div>
                
                <div className="grid grid-cols-2 gap-4 flex-1 w-full">
                  <div className="p-4 bg-[#141f38] rounded-2xl border-l-4 border-[#94aaff]">
                    <p className="text-[0.6rem] uppercase tracking-widest font-bold text-[#a3aac4]">Logic Mastery</p>
                    <p className="text-2xl font-black font-['Spline_Sans'] text-[#94aaff]">94.2%</p>
                  </div>
                  <div className="p-4 bg-[#141f38] rounded-2xl border-l-4 border-[#ff51fa]">
                    <p className="text-[0.6rem] uppercase tracking-widest font-bold text-[#a3aac4]">Creativity</p>
                    <p className="text-2xl font-black font-['Spline_Sans'] text-[#ff51fa]">78.0%</p>
                  </div>
                  <div className="p-4 bg-[#141f38] rounded-2xl border-l-4 border-[#8eff71]">
                    <p className="text-[0.6rem] uppercase tracking-widest font-bold text-[#a3aac4]">Synthesis</p>
                    <p className="text-2xl font-black font-['Spline_Sans'] text-[#8eff71]">86.5%</p>
                  </div>
                  <div className="p-4 bg-[#141f38] rounded-2xl border-l-4 border-[#809bff]">
                    <p className="text-[0.6rem] uppercase tracking-widest font-bold text-[#a3aac4]">Recall</p>
                    <p className="text-2xl font-black font-['Spline_Sans'] text-[#809bff]">91.0%</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Achievements Card */}
            <div className="bg-[#0f1930] p-8 rounded-4xl space-y-6">
              <div>
                <h2 className="font-['Spline_Sans'] text-xl font-black tracking-tight">Unlocked Trophies</h2>
                <p className="text-xs text-[#a3aac4]">Proof of intellectual vigor</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="group cursor-help relative p-4 rounded-2xl bg-[#141f38] border border-[#40485d]/10 hover:border-[#ff51fa]/40 transition-colors">
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-[#ff51fa]/10 flex items-center justify-center text-[#ff51fa]">
                      <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>dark_mode</span>
                    </div>
                    <div className="text-center">
                      <p className="font-['Spline_Sans'] font-bold text-xs">Late Night Sage</p>
                      <p className="text-[0.6rem] text-[#a3aac4]">Study 100 hrs past midnight</p>
                    </div>
                  </div>
                </div>
                
                <div className="group cursor-help relative p-4 rounded-2xl bg-[#141f38] border border-[#40485d]/10 hover:border-[#94aaff]/40 transition-colors">
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-[#94aaff]/10 flex items-center justify-center text-[#94aaff]">
                      <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
                    </div>
                    <div className="text-center">
                      <p className="font-['Spline_Sans'] font-bold text-xs">The Catalyst</p>
                      <p className="text-[0.6rem] text-[#a3aac4]">First to finish 10 exams</p>
                    </div>
                  </div>
                </div>
                
                <div className="group cursor-help relative p-4 rounded-2xl bg-[#141f38] border border-[#40485d]/10 hover:border-[#8eff71]/40 transition-colors">
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-[#8eff71]/10 flex items-center justify-center text-[#8eff71]">
                      <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>terminal</span>
                    </div>
                    <div className="text-center">
                      <p className="font-['Spline_Sans'] font-bold text-xs">Code Wraith</p>
                      <p className="text-[0.6rem] text-[#a3aac4]">0 bugs in final project</p>
                    </div>
                  </div>
                </div>
                
                <div className="group cursor-help relative p-4 rounded-2xl bg-[#141f38] border border-[#40485d]/10 hover:border-[#dee5ff]/40 transition-colors">
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-[#40485d]/20 flex items-center justify-center text-[#6d758c]">
                      <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>lock</span>
                    </div>
                    <div className="text-center">
                      <p className="font-['Spline_Sans'] font-bold text-xs text-[#6d758c]">???</p>
                      <p className="text-[0.6rem] text-[#6d758c]">Secret Achievement</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Academic Ranking Card */}
            <div className="bg-[#0f1930] p-8 rounded-4xl space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="font-['Spline_Sans'] text-xl font-black tracking-tight">Global Ranking</h2>
                  <p className="text-xs text-[#a3aac4]">Competitive ecosystem</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-['Spline_Sans'] font-black text-[#8eff71]">#1,248</p>
                  <p className="text-[0.6rem] uppercase font-bold text-[#a3aac4] tracking-widest">Top 0.8%</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center gap-4 p-3 rounded-2xl bg-[#192540]/40">
                  <span className="text-xs font-['Spline_Sans'] font-bold text-[#a3aac4] w-4">10</span>
                  <div className="w-8 h-8 rounded-full bg-slate-700 flex-shrink-0">
                    <img className="w-full h-full object-cover rounded-full" data-alt="User avatar for rank 10" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDU_oNX9urHjLRXcI4DU1xWc3RXJdG8s7tjQtqAREaunbXE9E_4teDwwZVPxyQeKKzk8rCKHzGzhpiJjYgDazBxYcJAmI3omT4ITfRFLvXIiXqnwZjNKquK65kKzcmjlX5DSgb9td4Q1d7NLuaSMYVKlDo0zLMB-COw3s16Xbfgl0CDmkFUzxK4mtFRkUTUKWGikfBC2Et_OlRCjjEUqmgIpQDhauTRxGnZ8EzGDqtjj7vEgNPkGasHR5dnF6S9fzYiFs3ZUi1Bs_I" alt="" />
                  </div>
                  <span className="text-xs font-bold flex-1">Elena M.</span>
                  <span className="text-xs font-['Spline_Sans'] text-[#8eff71]">98.4k</span>
                </div>
                
                <div className="flex items-center gap-4 p-3 rounded-2xl bg-[#192540]/40">
                  <span className="text-xs font-['Spline_Sans'] font-bold text-[#a3aac4] w-4">11</span>
                  <div className="w-8 h-8 rounded-full bg-slate-700 flex-shrink-0">
                    <img className="w-full h-full object-cover rounded-full" data-alt="User avatar for rank 11" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBELvOU5yb92fYZlCY2bqfJKxk22coB-5T7AfPjqNTZ2LfCbjg0aBZkuU4cCeNB1Bf_0O-oAKrfo5jW4u-dO85ikx-yO8MZ4ErlTwa4m8_VSb7jqw-9OSVitAFfv3z34QLJYeu8QYi2AVQ3oqtkJswaLVduqlmLP-kKHs2b4i4difZdG0kD3Q0KL5U1S4JMM6bbyi4GZc72ZCyrXFC9vE69hDlCM4nykvacCcXNiFMVzGCE2zs9pqJuzYn6jswlArIcCkjIdPJJhF0" alt="" />
                  </div>
                  <span className="text-xs font-bold flex-1">Sarah Wu</span>
                  <span className="text-xs font-['Spline_Sans'] text-[#8eff71]">97.2k</span>
                </div>
                
                <div className="flex items-center gap-4 p-3 rounded-2xl bg-[#94aaff]/20 ring-1 ring-[#94aaff]/40 relative">
                  <span className="text-xs font-['Spline_Sans'] font-bold text-[#94aaff] w-4">12</span>
                  <div className="w-8 h-8 rounded-full bg-slate-700 flex-shrink-0">
                    <img className="w-full h-full object-cover rounded-full" data-alt="Your profile avatar in the leaderboard" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCGG2xxsL0twzdEVyjyGeru04rCDp5252qxfoEXiNgzXayBYcDcPfAB5jIcTzvUbqiZtg5ZRFzIjk-gQ2Ob2ro0a3Ztg2IjOCJmMftZzIiFqGl7mk2vI_BTlR7fAD0LYIFU-jz4GYFDk69BHkh3jHBa52i95UnuDNIxk2FqMRwa7UY8aIIpt6TmME_wS1lPEqWuKekG2RazqsN2yqz3OtsnSMEamABjUFEC94Lcui3smucvjX-kqU7QDcGe_IWhKzJK3_0xzEsQtdk" alt="" />
                  </div>
                  <span className="text-xs font-bold flex-1">You</span>
                  <span className="text-xs font-['Spline_Sans'] text-[#94aaff] font-black italic">96.8k</span>
                </div>
              </div>
              <button className="w-full py-2 text-[0.7rem] uppercase font-bold tracking-[0.2em] text-[#a3aac4] hover:text-white transition-colors cursor-pointer">View Full Leaderboard</button>
            </div>
          </div>
        </section>

        {/* Course Progress Flow */}
        <section className="space-y-6">
          <h2 className="font-['Spline_Sans'] text-2xl font-black tracking-tight italic">Current Trajectories</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="bg-[#091328] p-6 rounded-3xl space-y-4">
              <div className="flex justify-between items-start">
                <span className="px-3 py-1 bg-[#94aaff]/10 text-[#94aaff] text-[0.6rem] font-bold uppercase tracking-widest rounded-full border border-[#94aaff]/20">STEM</span>
                <span className="material-symbols-outlined text-[#a3aac4] text-sm" style={{ fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>more_horiz</span>
              </div>
              <h3 className="font-['Spline_Sans'] font-bold">Quantum Cryptography</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-['Plus_Jakarta_Sans'] font-medium">
                  <span className="text-[#a3aac4]">Completion</span>
                  <span className="text-[#8eff71]">72%</span>
                </div>
                <div className="h-2 w-full bg-[#192540]/20 rounded-full overflow-hidden">
                  <div className="h-full bg-[#8eff71] rounded-full" style={{ width: "72%" }}></div>
                </div>
              </div>
            </div>

            <div className="bg-[#091328] p-6 rounded-3xl space-y-4">
              <div className="flex justify-between items-start">
                <span className="px-3 py-1 bg-[#ff51fa]/10 text-[#ff51fa] text-[0.6rem] font-bold uppercase tracking-widest rounded-full border border-[#ff51fa]/20">Arts</span>
                <span className="material-symbols-outlined text-[#a3aac4] text-sm" style={{ fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>more_horiz</span>
              </div>
              <h3 className="font-['Spline_Sans'] font-bold">Neon-Gothic Architecture</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-['Plus_Jakarta_Sans'] font-medium">
                  <span className="text-[#a3aac4]">Completion</span>
                  <span className="text-[#8eff71]">45%</span>
                </div>
                <div className="h-2 w-full bg-[#192540]/20 rounded-full overflow-hidden">
                  <div className="h-full bg-[#8eff71] rounded-full" style={{ width: "45%" }}></div>
                </div>
              </div>
            </div>

            <div className="bg-[#091328] p-6 rounded-3xl space-y-4">
              <div className="flex justify-between items-start">
                <span className="px-3 py-1 bg-[#8eff71]/10 text-[#8eff71] text-[0.6rem] font-bold uppercase tracking-widest rounded-full border border-[#8eff71]/20">Economics</span>
                <span className="material-symbols-outlined text-[#a3aac4] text-sm" style={{ fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>more_horiz</span>
              </div>
              <h3 className="font-['Spline_Sans'] font-bold">Post-Scarcity Theory</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-['Plus_Jakarta_Sans'] font-medium">
                  <span className="text-[#a3aac4]">Completion</span>
                  <span className="text-[#8eff71]">12%</span>
                </div>
                <div className="h-2 w-full bg-[#192540]/20 rounded-full overflow-hidden">
                  <div className="h-full bg-[#8eff71] rounded-full" style={{ width: "12%" }}></div>
                </div>
              </div>
            </div>

          </div>
        </section>
      </div>
  );
}