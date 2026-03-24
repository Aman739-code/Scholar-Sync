import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function LandingPage() {
  return (
    <div 
      className="dark selection:bg-[#ff51fa]/30" 
      style={{ 
        backgroundColor: '#060e20', 
        color: '#dee5ff', 
        fontFamily: '"Plus Jakarta Sans", sans-serif',
        overflowX: 'clip'
      }}
    >
      {/* Font Links - Kept inline so it works standalone */}
      <link href="https://fonts.googleapis.com/css2?family=Spline+Sans:wght@300;400;500;600;700;800;900&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
      <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />

      {/* TopNavBar */}
      <Navbar activePage="" />

      <main className="relative">
        {/* Hero Section */}
        <section className="min-h-[819px] flex flex-col items-center justify-center text-center px-6 pt-20 pb-32">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 overflow-hidden">
            <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-[#94aaff]/10 rounded-full blur-[120px]"></div>
            <div className="absolute bottom-0 right-[10%] w-[400px] h-[400px] bg-[#ff51fa]/5 rounded-full blur-[100px]"></div>
          </div>
          <span className="font-['Plus_Jakarta_Sans'] text-[#ff51fa] uppercase tracking-[0.3em] text-xs mb-6 block font-bold">Evolutionizing Education</span>
          <h1 className="font-['Spline_Sans'] text-6xl md:text-8xl font-black tracking-tighter leading-none mb-8">
            The Future of <br />
            <span className="bg-gradient-to-r from-[#94aaff] to-[#ff51fa] bg-clip-text text-transparent italic pr-2">Learning is ScholarSync</span>
          </h1>
          <p className="font-['Plus_Jakarta_Sans'] text-[#a3aac4] max-w-2xl text-lg md:text-xl leading-relaxed mb-12">
            A high-octane academic ecosystem designed for the next generation of thinkers, creators, and leaders. Master your flow, conquer your squad, and own your future.
          </p>
          <div className="flex flex-col md:flex-row gap-4">
            <button className="bg-gradient-to-br from-[#94aaff] to-[#809bff] text-[#001b61] px-8 py-3.5 rounded-full font-bold text-sm hover:scale-105 transition-all shadow-[0_0_30px_rgba(148,170,255,0.3)] cursor-pointer">Enter the Campus</button>
            <button className="bg-[#141f38] text-[#dee5ff] px-8 py-3.5 rounded-full font-bold text-sm hover:bg-[#1f2b49] transition-all border border-[#40485d]/20 cursor-pointer">View Curriculum</button>
          </div>
        </section>

        {/* Bento Grid Value Props */}
        <section className="max-w-7xl mx-auto px-6 py-24">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Gamified Growth */}
            <div className="md:col-span-8 bg-[#091328] rounded-4xl p-10 relative overflow-hidden group hover:bg-[#0f1930] transition-colors border border-[#40485d]/20">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#8eff71]/5 rounded-full blur-[60px] translate-x-1/2 -translate-y-1/2"></div>
              <span className="material-symbols-outlined text-[#8eff71] text-5xl mb-6" style={{ fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>sports_esports</span>
              <h3 className="font-['Spline_Sans'] text-4xl font-extrabold mb-4">Gamified Growth</h3>
              <p className="text-[#a3aac4] text-lg max-w-md">Turn every study session into a quest. Earn XP, unlock rare achievements, and watch your intellectual avatar evolve in real-time.</p>
              <div className="mt-12 flex gap-2">
                <div className="h-2 w-24 bg-[#8eff71] rounded-full"></div>
                <div className="h-2 w-12 bg-[#192540] rounded-full"></div>
                <div className="h-2 w-8 bg-[#192540] rounded-full"></div>
              </div>
            </div>

            {/* Squad-Based Learning */}
            <div className="md:col-span-4 bg-[#192540] rounded-4xl p-10 flex flex-col justify-between border border-[#40485d]/20">
              <div>
                <span className="material-symbols-outlined text-[#ff51fa] text-5xl mb-6" style={{ fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>groups_3</span>
                <h3 className="font-['Spline_Sans'] text-3xl font-extrabold mb-4">Squad-Based Learning</h3>
                <p className="text-[#a3aac4]">Don't study alone. Join elite squads, tackle massive group projects, and dominate the global leaderboards.</p>
              </div>
              <div className="flex -space-x-4 mt-8">
                <div className="w-12 h-12 rounded-full border-2 border-[#060e20] bg-[#a3aac4] flex items-center justify-center overflow-hidden"></div>
                <div className="w-12 h-12 rounded-full border-2 border-[#060e20] bg-[#192540] flex items-center justify-center overflow-hidden"></div>
                <div className="w-12 h-12 rounded-full border-2 border-[#060e20] bg-[#dee5ff] flex items-center justify-center overflow-hidden"></div>
                <div className="w-12 h-12 rounded-full bg-[#a900a9] text-white flex items-center justify-center text-xs font-bold">+12</div>
              </div>
            </div>

            {/* AI Insights */}
            <div className="md:col-span-5 bg-[#141f38] rounded-4xl p-10 border border-[#40485d]/20">
              <span className="material-symbols-outlined text-[#94aaff] text-5xl mb-6" style={{ fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>psychology</span>
              <h3 className="font-['Spline_Sans'] text-3xl font-extrabold mb-4">AI-Powered Insights</h3>
              <p className="text-[#a3aac4] mb-8">Our proprietary neural engine analyzes your learning patterns to provide hyper-personalized study routes and memory hacks.</p>
              <div className="p-5 bg-[#000000] rounded-3xl border border-[#94aaff]/20">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-bold uppercase tracking-widest text-[#94aaff]">Neural Optimization</span>
                  <span className="text-xs text-[#94aaff]">88%</span>
                </div>
                <div className="w-full bg-[#192540] h-1 rounded-full overflow-hidden">
                  <div className="bg-[#94aaff] h-full w-[88%]"></div>
                </div>
              </div>
            </div>

            {/* Study Streak Visual */}
            <div className="md:col-span-7 bg-[#060e20] rounded-4xl p-10 relative overflow-hidden border border-[#40485d]/20 flex items-center justify-between">
              <div className="relative z-10">
                <h3 className="font-['Spline_Sans'] text-4xl font-black mb-2">Unstoppable Flow</h3>
                <p className="text-[#a3aac4] max-w-[280px]">Maintain your Study Streak to unlock 'Zen Mode' and double your XP gain.</p>
                <div className="mt-8 inline-flex items-center gap-2 bg-[#8eff71]/10 text-[#8eff71] px-6 py-3 rounded-full border border-[#8eff71]/20">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>local_fire_department</span>
                  <span className="font-black text-2xl tracking-tighter">42 - Day Streak</span>
                </div>
              </div>
              <div className="absolute right-[-10%] top-[-10%] opacity-20 group-hover:opacity-40 transition-opacity">
                <span className="material-symbols-outlined text-[200px] text-[#8eff71] rotate-12" style={{ fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>bolt</span>
              </div>
              <div className="hidden md:block w-48 h-48 flex items-center justify-center rounded-full border-[16px] border-[#8eff71]/10 border-t-[#8eff71] animate-pulse relative">
                  <span className="absolute inset-0 flex items-center justify-center text-4xl font-black font-['Spline_Sans'] text-[#8eff71]">75%</span>
                </div>
            </div>
          </div>
        </section>

        {/* Flow State Immersive Section */}
        <section className="py-32 px-6 bg-[#091328] overflow-hidden relative">
          <div className="max-w-7xl mx-auto px-4 md:px-10 flex flex-col md:flex-row items-center gap-16">
            <div className="flex-1 space-y-8 relative">
              <div className="absolute -top-20 -left-20 w-64 h-64 bg-[#ff51fa]/10 blur-[80px]"></div>
              <h2 className="font-['Spline_Sans'] text-5xl md:text-6xl font-black leading-tight tracking-tighter">
                Master the <br />
                <span className="text-[#ff51fa]">Flow State</span>
              </h2>
              <p className="text-[#a3aac4] text-xl leading-relaxed">
                Our interface disappears when you're in the zone. Using biometric feedback and task-anchoring, The Neon Scholar helps you achieve 4x deeper focus than traditional digital tools.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center gap-4">
                  <span className="material-symbols-outlined text-[#ff51fa]" style={{ fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>check_circle</span>
                  <span className="font-bold">Adaptive UI scaling based on heart rate</span>
                </li>
                <li className="flex items-center gap-4">
                  <span className="material-symbols-outlined text-[#ff51fa]" style={{ fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>check_circle</span>
                  <span className="font-bold">Spatial audio study environments</span>
                </li>
                <li className="flex items-center gap-4">
                  <span className="material-symbols-outlined text-[#ff51fa]" style={{ fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>check_circle</span>
                  <span className="font-bold">Dynamic difficulty adjustment (DDA)</span>
                </li>
              </ul>
            </div>
            <div className="flex-1 relative">
              {/* Flow State Visual Component */}
              <div className="w-full aspect-square max-w-lg mx-auto bg-[#192540] rounded-full p-8 border border-[#40485d]/20 relative flex items-center justify-center">
                <div className="absolute inset-0 border-4 border-dashed border-[#ff51fa]/20 rounded-full animate-[spin_20s_linear_infinite]"></div>
                <div className="absolute inset-10 border-2 border-[#94aaff]/20 rounded-full animate-[spin_15s_linear_infinite_reverse]"></div>
                <div className="text-center z-10">
                  <div className="text-7xl font-black font-['Spline_Sans'] tracking-tighter mb-2">185</div>
                  <div className="text-[#ff51fa] font-bold tracking-widest uppercase text-xs">BPM FOCUS BEAT</div>
                  <div className="mt-4 flex justify-center gap-1">
                    <div className="h-6 w-1 bg-[#ff51fa] rounded-full"></div>
                    <div className="h-10 w-1 bg-[#ff51fa] rounded-full"></div>
                    <div className="h-16 w-1 bg-[#ff51fa] rounded-full"></div>
                    <div className="h-12 w-1 bg-[#ff51fa] rounded-full"></div>
                    <div className="h-8 w-1 bg-[#ff51fa] rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-32 px-6 text-center">
          <div className="max-w-7xl mx-auto bg-gradient-to-br from-[#141f38] to-[#192540] rounded-4xl p-16 relative overflow-hidden border border-[#40485d]/20 shadow-2xl">
            <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-[#94aaff]/20 rounded-full blur-[100px]"></div>
            <h2 className="font-['Spline_Sans'] text-5xl font-black mb-6">Ready to transcend?</h2>
            <p className="text-[#a3aac4] text-xl mb-10 max-w-2xl mx-auto">Join 500,000+ scholars redefining academic excellence in the neon age.</p>
            <button className="bg-gradient-to-r from-[#94aaff] to-[#809bff] text-[#001b61] px-12 py-5 rounded-full font-black text-xl hover:scale-105 transition-all shadow-xl cursor-pointer">Claim your scholarship</button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}