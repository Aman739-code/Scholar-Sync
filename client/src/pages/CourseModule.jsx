import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function CourseModule() {
  return (
    <div 
      className="dark selection:bg-[#ff51fa]/30 min-h-screen"
      style={{ 
        backgroundColor: '#060e20', 
        color: '#dee5ff', 
        fontFamily: '"Plus Jakarta Sans", sans-serif'
      }}
    >
      {/* Font Links - Kept inline so it works standalone */}
      <link href="https://fonts.googleapis.com/css2?family=Spline+Sans:wght@300;400;500;600;700;800;900&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
      <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />

      {/* Custom Scrollbar Styles */}
      <style dangerouslySetInnerHTML={{
        __html: `
          ::-webkit-scrollbar { width: 4px; }
          ::-webkit-scrollbar-track { background: transparent; }
          ::-webkit-scrollbar-thumb { background: #40485d; border-radius: 10px; }
        `
      }} />

      {/* TopNavBar */}
      <Navbar activePage="Courses" />

      <main className="max-w-[1600px] mx-auto p-6 lg:p-10 grid grid-cols-12 gap-8 min-h-[calc(100vh-180px)]">
        
        {/* Left Column: Video & Main Content */}
        <section className="col-span-12 lg:col-span-8 flex flex-col gap-6">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs font-['Plus_Jakarta_Sans'] uppercase tracking-widest text-[#ff51fa]">
            <span>Advanced UI Architecture</span>
            <span className="material-symbols-outlined text-[10px]" style={{ fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>chevron_right</span>
            <span className="text-[#a3aac4]">Module 04: Kinetic Systems</span>
          </nav>

          {/* Video Player Shell */}
          <div className="relative aspect-video w-full rounded-3xl overflow-hidden bg-[#000000] shadow-2xl ring-1 ring-[#40485d]/20">
            <img className="w-full h-full object-cover opacity-80" data-alt="Futuristic glowing technology background with neon circuits" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBK78d7eeNPqXsr27U5bExrg558Q-qIA2Z9uPXKFjAbKizigK9TGsCG9u15TvplgpBJ1s2ewE0A3N2kQ6kJqdAXYvHhGL80CQCjWyeAEScbToKl1TqCG3BFWsEwqwq39AFVW-c8zRldKJF_lXm9dJiUmLU2smdchlgmYryCKv1jtXO80H7UBltkH8_nz5x5210T0MgRhVliV6ZpxyJ3M1mPA-KwEzBRz-FfLR8uoOiv5Y1VIRLyIpsOsAG8o9Xux_g4f0loEuRGKxM" alt="" />
            
            {/* Video Controls Overlay */}
            <div className="absolute inset-0 flex items-center justify-center group cursor-pointer">
              <div className="w-20 h-20 rounded-full bg-[#94aaff]/20 backdrop-blur-md flex items-center justify-center border border-[#94aaff]/30 group-hover:scale-110 transition-transform duration-500">
                <span className="material-symbols-outlined text-[#94aaff] text-5xl translate-x-1" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
              </div>
            </div>
            
            {/* Custom Scrubber */}
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono text-[#94aaff]">12:45 / 45:00</span>
                <span className="text-xs font-mono text-[#a3aac4]">HD 1080p</span>
              </div>
              <div className="h-2 w-full bg-[#192540]/30 rounded-full overflow-hidden">
                <div className="h-full w-1/3 bg-gradient-to-r from-[#94aaff] to-[#ff51fa] rounded-full shadow-[0_0_10px_rgba(148,170,255,0.5)]"></div>
              </div>
            </div>
          </div>

          {/* Module Info */}
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-start">
              <h1 className="text-4xl font-black font-['Spline_Sans'] tracking-tighter text-[#dee5ff]">
                Engineering Kinetic <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#94aaff] to-[#8eff71]">Fluidity</span>
              </h1>
              <div className="flex gap-2">
                <button className="p-3 rounded-full bg-[#141f38] border border-[#40485d]/20 hover:bg-[#1f2b49] transition-colors cursor-pointer">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>bookmark</span>
                </button>
                <button className="p-3 rounded-full bg-[#141f38] border border-[#40485d]/20 hover:bg-[#1f2b49] transition-colors cursor-pointer">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>share</span>
                </button>
              </div>
            </div>
            <p className="text-[#a3aac4] max-w-2xl leading-relaxed">
              In this session, we deep dive into the physics of digital motion. Learn how to create interfaces that feel alive using CSS variables, intentional asymmetry, and non-linear transitions.
            </p>

            {/* Resources Bento */}
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="p-6 rounded-3xl bg-[#091328] border border-[#40485d]/10 flex items-center gap-4 hover:bg-[#141f38] transition-all group">
                <div className="w-12 h-12 rounded-2xl bg-[#8eff71]/10 flex items-center justify-center text-[#8eff71]">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>folder_zip</span>
                </div>
                <div>
                  <h4 className="font-bold text-sm">Assets_Pack_v2.zip</h4>
                  <p className="text-xs text-[#a3aac4] uppercase tracking-widest">Download • 45MB</p>
                </div>
                <span className="material-symbols-outlined ml-auto text-[#a3aac4] group-hover:text-[#94aaff] transition-colors" style={{ fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>download</span>
              </div>
              <div className="p-6 rounded-3xl bg-[#091328] border border-[#40485d]/10 flex items-center gap-4 hover:bg-[#141f38] transition-all group">
                <div className="w-12 h-12 rounded-2xl bg-[#ff51fa]/10 flex items-center justify-center text-[#ff51fa]">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>description</span>
                </div>
                <div>
                  <h4 className="font-bold text-sm">Reference_Guide.pdf</h4>
                  <p className="text-xs text-[#a3aac4] uppercase tracking-widest">View Online • 2.4MB</p>
                </div>
                <span className="material-symbols-outlined ml-auto text-[#a3aac4] group-hover:text-[#94aaff] transition-colors" style={{ fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>visibility</span>
              </div>
            </div>
          </div>
        </section>

        {/* Right Column: Navigation & Squad Chat */}
        <aside className="col-span-12 lg:col-span-4 flex flex-col gap-6 cursor-pointer">
          {/* Module Progress Card */}
          <div className="bg-[#192540]/40 backdrop-blur-[20px] p-6 rounded-3xl border border-[#40485d]/20 shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-black font-['Spline_Sans'] text-lg tracking-tight uppercase">Curriculum</h3>
              <span className="text-[#8eff71] font-bold text-sm">45% Complete</span>
            </div>
            
            {/* Module List */}
            <div className="flex flex-col gap-3 max-h-[400px] overflow-y-auto pr-2">
              {/* Item 1 (Completed) */}
              <div className="flex items-center gap-4 p-4 rounded-md bg-[#091328]/50 hover:bg-[#141f38] transition-colors cursor-pointer group">
                <div className="w-8 h-8 rounded-full bg-[#8eff71] text-[#0d6100] flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-sm font-bold" style={{ fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>check</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-[#a3aac4]">01 Introduction to Scholar Sync</p>
                  <p className="text-[10px] text-[#0b5800] uppercase tracking-widest">12:00 mins</p>
                </div>
              </div>
              
              {/* Item 2 (Active) */}
              <div className="flex items-center gap-4 p-4 rounded-md bg-[#94aaff]/10 border-l-4 border-[#94aaff] transition-colors cursor-pointer relative overflow-hidden">
                <div className="absolute inset-0 bg-[#94aaff]/5 animate-pulse"></div>
                <div className="w-8 h-8 rounded-full bg-[#94aaff] text-[#00257b] flex items-center justify-center shrink-0 z-10">
                  <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
                </div>
                <div className="flex-1 z-10">
                  <p className="text-sm font-bold text-[#dee5ff]">02 Kinetic Fluidity</p>
                  <p className="text-[10px] text-[#94aaff] font-bold uppercase tracking-widest">Now Playing</p>
                </div>
              </div>
              
              {/* Item 3 (Locked) */}
              <div className="flex items-center gap-4 p-4 rounded-md bg-[#091328]/30 opacity-60 transition-colors cursor-not-allowed">
                <div className="w-8 h-8 rounded-full bg-[#192540] flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>lock</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-[#dee5ff]">03 Reactive Components</p>
                  <p className="text-[10px] text-[#a3aac4] uppercase tracking-widest">Locked</p>
                </div>
              </div>
              
              {/* Item 4 (Locked) */}
              <div className="flex items-center gap-4 p-4 rounded-md bg-[#091328]/30 opacity-60 transition-colors cursor-not-allowed">
                <div className="w-8 h-8 rounded-full bg-[#192540] flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>lock</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-[#dee5ff]">04 Final Masterclass</p>
                  <p className="text-[10px] text-[#a3aac4] uppercase tracking-widest">Locked</p>
                </div>
              </div>
            </div>
          </div>

          {/* Squad Chat Panel */}
          <div className="flex-1 bg-[#192540]/40 backdrop-blur-[20px] rounded-2xl border border-[#40485d]/20 shadow-xl flex flex-col overflow-hidden min-h-[400px]">
            <div className="p-6 border-b border-[#40485d]/20 flex items-center justify-between bg-[#141f38]/50">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full border-2 border-[#060e20] bg-[#94aaff] overflow-hidden">
                    <img className="w-full h-full object-cover" data-alt="User avatar portrait" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBFL1MYp-vKZf9Ub5SFMbkq5T3GtsNISyy7CFYsZpDhvcrx2wdLaMBeFvSdSi0k4i3W6FvldMPBON_au-rScIA38MWSQdYbGLMMS8rRXuga-FNUoMP3J-zVh0jiWvUc4tFaWPQctfVxnMlXKQhwTSJUed39564Ni17mQ6oHX8rLeMO2I6WKgx8MEv0ygVMBpA2PkpvmX5F5PIPdkYztOS6vKCDmwbdL6ACXURyfng1RBUnwQPlcpddyo_dpGDImbMPgka1tBncZPog" alt="" />
                  </div>
                  <div className="w-8 h-8 rounded-full border-2 border-[#060e20] bg-[#ff51fa] overflow-hidden">
                    <img className="w-full h-full object-cover" data-alt="User avatar portrait" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAngZ4vO0q_0wLSQUXoM00qolhAnBs3vUykd6IG9vEKgzPSditS1-SsbCu5i80-dk6PXBWqVRENks2swKEjiVvsbzerSu7lk7Z63i4MjU3-S4y5nf1BXqd574EMxc4WkPKEl4jY9RR4F7KOKyNwUGIk7FlKwbJIU8LlfdsdBhxsKbpj4BUW44wcI0eKqn9ZAnZE4q60oLuwRSDjEhDX4tor1LIkaQTKAQCFwOHeRb61InFWPum6xVhdQ1vsKqKnGUvhATA7-ObRsxw" alt="" />
                  </div>
                  <div className="w-8 h-8 rounded-full border-2 border-[#060e20] bg-[#8eff71] flex items-center justify-center text-[10px] font-bold text-[#0d6100]">+12</div>
                </div>
                <div>
                  <h3 className="font-bold text-sm text-[#dee5ff]">Squad Chat</h3>
                  <p className="text-[10px] text-[#8eff71] font-bold animate-pulse">LIVE ACTIVITY</p>
                </div>
              </div>
              <span className="material-symbols-outlined text-[#a3aac4] cursor-pointer" style={{ fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>settings</span>
            </div>
            
            {/* Chat Feed */}
            <div className="flex-1 p-6 flex flex-col gap-4 overflow-y-auto bg-[#091328]/20">
              <div className="flex flex-col gap-1 items-start">
                <span className="text-[10px] font-bold text-[#ff51fa] ml-1">@pixel_master</span>
                <div className="bg-[#141f38] p-3 rounded-2xl rounded-tl-none text-sm max-w-[85%] border border-[#40485d]/10 text-[#dee5ff]">
                  How are you handling the grid bleed in the mobile view?
                </div>
              </div>
              <div className="flex flex-col gap-1 items-end">
                <span className="text-[10px] font-bold text-[#94aaff] mr-1">You</span>
                <div className="bg-[#94aaff]/20 p-3 rounded-2xl rounded-tr-none text-sm max-w-[85%] border border-[#94aaff]/20 text-[#dee5ff]">
                  I'm using negative margins with absolute positioning for the background blobs.
                </div>
              </div>
              <div className="flex flex-col gap-1 items-start">
                <span className="text-[10px] font-bold text-[#8eff71] ml-1">@design_ninja</span>
                <div className="bg-[#141f38] p-3 rounded-2xl rounded-tl-none text-sm max-w-[85%] border border-[#40485d]/10 text-[#dee5ff]">
                  The kinetic effect is so smooth. Are you using GSAP or pure CSS? 🔥
                </div>
              </div>
            </div>
            
            {/* Chat Input */}
            <div className="p-4 bg-[#141f38]/80 border-t border-[#40485d]/20">
              <div className="relative flex items-center">
                <input 
                  className="w-full bg-[#000000] border-none rounded-full py-3 px-6 pr-12 text-sm text-[#dee5ff] focus:ring-2 focus:ring-[#94aaff] transition-all" 
                  placeholder="Type a message to your squad..." 
                  type="text" 
                />
                <button className="absolute right-2 p-2 rounded-full bg-[#94aaff] text-[#00257b] hover:scale-105 active:scale-95 transition-transform cursor-pointer">
                  <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>send</span>
                </button>
              </div>
            </div>
          </div>
        </aside>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}