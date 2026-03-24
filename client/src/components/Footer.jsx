import React from 'react';

export default function Footer() {
  return (
    <footer className="w-full py-12 px-10 flex flex-col md:flex-row justify-between items-center gap-6 bg-slate-900/20 font-['Plus_Jakarta_Sans'] text-xs uppercase tracking-widest border-t border-[#40485d]/20 relative z-10 mt-auto">
      <div className="flex flex-col items-center md:items-start gap-2 text-center md:text-left">
        <span className="text-xl font-black text-slate-200 font-['Spline_Sans'] tracking-tighter normal-case">Scholar Sync</span>
        <span className="text-slate-500">© 2024 Scholar Sync. Kinetic Fluidity.</span>
      </div>
      <div className="flex flex-wrap justify-center gap-8 font-bold">
        <a className="text-slate-500 hover:text-[#ff51fa] transition-colors cursor-pointer" href="#">Privacy</a>
        <a className="text-slate-500 hover:text-[#ff51fa] transition-colors cursor-pointer" href="#">Terms</a>
        <a className="text-slate-500 hover:text-[#ff51fa] transition-colors cursor-pointer" href="#">Support</a>
        <a className="text-slate-500 hover:text-[#ff51fa] transition-colors cursor-pointer" href="#">Careers</a>
        <a className="text-slate-500 hover:text-[#ff51fa] transition-colors cursor-pointer" href="#">Press</a>
        <a className="text-slate-500 hover:text-[#ff51fa] transition-colors cursor-pointer" href="#">API</a>
      </div>
      <div className="flex gap-4">
        <button className="w-10 h-10 rounded-full bg-[#141f38] border border-[#40485d]/20 flex items-center justify-center text-slate-400 hover:text-[#94aaff] hover:border-[#94aaff]/50 transition-all cursor-pointer">
          <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>share</span>
        </button>
        <button className="w-10 h-10 rounded-full bg-[#141f38] border border-[#40485d]/20 flex items-center justify-center text-slate-400 hover:text-[#ff51fa] hover:border-[#ff51fa]/50 transition-all cursor-pointer">
          <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>hub</span>
        </button>
      </div>
    </footer>
  );
}
