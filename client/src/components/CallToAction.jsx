import React from 'react';

export default function CallToAction() {
    return (
        <div className="max-w-7xl py-16 px-6 mx-auto">
            <div className="relative overflow-hidden w-full flex flex-col md:flex-row items-center justify-between text-center md:text-left bg-gradient-to-br from-[#141f38] to-[#091328] border border-[#94aaff]/20 rounded-4xl p-12 md:p-16 text-[#dee5ff] shadow-[0_0_60px_-15px_rgba(148,170,255,0.2)]">
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#ff51fa]/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#94aaff]/10 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2"></div>

                <div className="relative z-10 md:pr-10">
                    <span className="inline-block px-4 py-1 rounded-full bg-[#8eff71]/10 text-[#8eff71] text-xs font-bold tracking-widest uppercase mb-4 border border-[#8eff71]/20">
                        Next-Gen Learning
                    </span>
                    <h2 className="text-4xl md:text-5xl font-black font-['Spline_Sans'] tracking-tighter mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white to-[#a3aac4]">
                        Ready to elevate your <br className="hidden md:block" /> academic velocity?
                    </h2>
                    <p className="text-[#a3aac4] text-lg max-w-xl">
                        Your optimized workflow and elite squad are waiting. Join Scholar Sync and dominate your semester.
                    </p>
                </div>
                
                <div className="relative z-10 mt-8 md:mt-0 flex-shrink-0">
                    <button className="px-10 py-4 bg-gradient-to-r from-[#ff51fa] to-[#a900a9] rounded-full font-black text-white text-lg hover:scale-105 active:scale-95 transition-all duration-300 shadow-[0_0_30px_rgba(255,81,250,0.4)] cursor-pointer">
                        Initialize Sync
                    </button>
                </div>
            </div>
        </div>
    );
}