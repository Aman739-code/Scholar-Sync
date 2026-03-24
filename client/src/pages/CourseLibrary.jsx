import React from 'react';

export default function CourseLibrary() {
  return (
    <div className="w-full">
        {/* Hero Section & Filters */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <span className="inline-block px-3 py-1 rounded-full border border-[#ff51fa]/30 text-[#ff51fa] text-[10px] font-bold uppercase tracking-[0.2em] mb-4">Course Library</span>
            <h1 className="font-['Spline_Sans'] text-5xl md:text-7xl font-extrabold tracking-tighter leading-none mb-6">
              Master the <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#94aaff] via-[#ff51fa] to-[#8eff71]">Kinetic Frontier.</span>
            </h1>
            <p className="text-[#a3aac4] text-lg max-w-lg">Hyper-kinetic learning environments designed for the digital vanguard. Choose your quest and evolve.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button className="px-6 py-3 rounded-full bg-[#94aaff] text-[#00257b] font-bold text-sm hover:scale-105 transition-all shadow-lg shadow-[#94aaff]/20 cursor-pointer">All Quests</button>
            <button className="px-6 py-3 rounded-full bg-[#141f38] border border-[#40485d]/20 hover:border-[#94aaff]/50 text-[#dee5ff] font-bold text-sm hover:scale-105 transition-all cursor-pointer">STEM Quests</button>
            <button className="px-6 py-3 rounded-full bg-[#141f38] border border-[#40485d]/20 hover:border-[#ff51fa]/50 text-[#dee5ff] font-bold text-sm hover:scale-105 transition-all cursor-pointer">Digital Arts</button>
            <button className="px-6 py-3 rounded-full bg-[#141f38] border border-[#40485d]/20 hover:border-[#8eff71]/50 text-[#dee5ff] font-bold text-sm hover:scale-105 transition-all cursor-pointer">Humanities</button>
          </div>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* Card 1: STEM */}
          <div className="group relative bg-[#091328] rounded-4xl overflow-hidden border border-[#40485d]/10 hover:border-[#94aaff]/40 transition-all duration-500 hover:-translate-y-2">
            <div className="relative h-64 overflow-hidden">
              <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" data-alt="Abstract neon blue 3D mathematical structures" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAXnpcukqFvRES0Ln2nUenW99HtQhrpmbHibPX1vx2GcIpF9OA9NkdewNNmEMZWhEPSDzBUr0RFsGs1-xM0PJPc8krkckMKp9Xfj_Vut0CIea_AbK9tFdm_TzNpNbGstS1oZlmKoDuu3ayI8EtOxE1C5Jiexmc91M3ymq0C90qwea-d824K8JTqksid-73LCglP8wHPhRafWKWnKD-zhUM8lCHzzHVjLdlDZEw_ZENLWx8Mu5f_g0mSnhTqWsdkv3cDi8kGB7dOFiU" alt="" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#091328] via-transparent to-transparent"></div>
              <div className="absolute top-4 right-4 bg-[#94aaff]/20 backdrop-blur-md border border-[#94aaff]/30 px-3 py-1 rounded-full">
                <span className="text-[#94aaff] text-[10px] font-black uppercase tracking-widest">Level: Advanced</span>
              </div>
            </div>
            <div className="p-8">
              <div className="flex items-center gap-2 mb-3">
                <span className="material-symbols-outlined text-[#94aaff] text-sm" style={{ fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>rocket_launch</span>
                <span className="text-[#94aaff] text-xs font-bold uppercase tracking-widest">STEM Quests</span>
              </div>
              <h3 className="font-['Spline_Sans'] text-2xl font-bold mb-4 group-hover:text-[#94aaff] transition-colors">Quantum Computing Foundations</h3>
              <p className="text-[#a3aac4] text-sm mb-8 line-clamp-2">Dive into the realm of qubits and superposition. Master the algorithms defining the next century of tech.</p>
              <div className="space-y-4">
                <div className="flex justify-between items-end mb-1">
                  <span className="text-xs font-bold text-[#dee5ff]">Mission Progress</span>
                  <span className="text-xs font-bold text-[#8eff71]">74%</span>
                </div>
                <div className="w-full h-2 bg-[#192540]/20 rounded-full overflow-hidden">
                  <div className="h-full bg-[#8eff71] rounded-full w-[74%] shadow-[0_0_20px_-5px_rgba(142,255,113,0.4)]"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Digital Arts */}
          <div className="group relative bg-[#091328] rounded-4xl overflow-hidden border border-[#40485d]/10 hover:border-[#ff51fa]/40 transition-all duration-500 hover:-translate-y-2">
            <div className="relative h-64 overflow-hidden">
              <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" data-alt="Liquid neon pink and purple abstract waves" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBnbamGHd4THgT40vCNmLz4yHuzSc6La3WjaE1qKTuH6Poo7WH4eIJsCTy8n0acXzXENJI_Xi46jUi9o8MUeFQCj6OCLiuigZJ5aeud-4YFkBsLdv6NOoELI5e_L2mVaCLtgzIJpHWf6FxwH3xIuLQhf9Oa3UpcNWdLnRl9VYw6olm8T3bwOOQXzrix6hbjqwn4b5OEsZuy0uPGnB8KSqzpKR5WJsrwLRfnenn8IafCk1gqkcv5fVvhiACvo9m428eKxXwvJSmhVmU" alt="" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#091328] via-transparent to-transparent"></div>
              <div className="absolute top-4 right-4 bg-[#ff51fa]/20 backdrop-blur-md border border-[#ff51fa]/30 px-3 py-1 rounded-full">
                <span className="text-[#ff51fa] text-[10px] font-black uppercase tracking-widest">Level: Elite</span>
              </div>
            </div>
            <div className="p-8">
              <div className="flex items-center gap-2 mb-3">
                <span className="material-symbols-outlined text-[#ff51fa] text-sm" style={{ fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>palette</span>
                <span className="text-[#ff51fa] text-xs font-bold uppercase tracking-widest">Digital Arts</span>
              </div>
              <h3 className="font-['Spline_Sans'] text-2xl font-bold mb-4 group-hover:text-[#ff51fa] transition-colors">Neo-Vandalism Art Theory</h3>
              <p className="text-[#a3aac4] text-sm mb-8 line-clamp-2">Exploring the intersection of digital street art and algorithmic generative aesthetics.</p>
              <div className="space-y-4">
                <div className="flex justify-between items-end mb-1">
                  <span className="text-xs font-bold text-[#dee5ff]">Mission Progress</span>
                  <span className="text-xs font-bold text-[#8eff71]">12%</span>
                </div>
                <div className="w-full h-2 bg-[#192540]/20 rounded-full overflow-hidden">
                  <div className="h-full bg-[#8eff71] rounded-full w-[12%] shadow-[0_0_20px_-5px_rgba(142,255,113,0.4)]"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: Humanities */}
          <div className="group relative bg-[#091328] rounded-4xl overflow-hidden border border-[#40485d]/10 hover:border-[#8eff71]/40 transition-all duration-500 hover:-translate-y-2">
            <div className="relative h-64 overflow-hidden">
              <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" data-alt="Earth from space with digital glowing connections" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBT5fjXTNboW4YhJzeqEkKsXIYiJJQuBwVOTBTPaB0DOSeGTSOpFUI42jfQHVlZyELDvqkgc_vgR45x9iCPjy7xwpgmYfPuKUdLnu12wNNiPnt4WMVLU2pI4pz1ezoCqsNFinc35LfIuNusZQcLgYH94w8Yq9pJMbdx_Kug7Yuy9NfOJfdjNY7SR8lXpu8jwocDM99vkAz26g2c0D3Y7IIunV7dTraxjPt06RhYMf82ZlKcmoArFJOmHaeCnWiZPMb_198Gxt2aprw" alt="" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#091328] via-transparent to-transparent"></div>
              <div className="absolute top-4 right-4 bg-[#8eff71]/20 backdrop-blur-md border border-[#8eff71]/30 px-3 py-1 rounded-full">
                <span className="text-[#8eff71] text-[10px] font-black uppercase tracking-widest">Level: Beginner</span>
              </div>
            </div>
            <div className="p-8">
              <div className="flex items-center gap-2 mb-3">
                <span className="material-symbols-outlined text-[#8eff71] text-sm" style={{ fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>public</span>
                <span className="text-[#8eff71] text-xs font-bold uppercase tracking-widest">Humanities</span>
              </div>
              <h3 className="font-['Spline_Sans'] text-2xl font-bold mb-4 group-hover:text-[#8eff71] transition-colors">Global Cyber-Sociology</h3>
              <p className="text-[#a3aac4] text-sm mb-8 line-clamp-2">How digital networks are rewriting the social contracts of the 21st century.</p>
              <div className="space-y-4">
                <div className="flex justify-between items-end mb-1">
                  <span className="text-xs font-bold text-[#dee5ff]">Mission Progress</span>
                  <span className="text-xs font-bold text-[#8eff71]">45%</span>
                </div>
                <div className="w-full h-2 bg-[#192540]/20 rounded-full overflow-hidden">
                  <div className="h-full bg-[#8eff71] rounded-full w-[45%] shadow-[0_0_20px_-5px_rgba(142,255,113,0.4)]"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 4: STEM */}
          <div className="group relative bg-[#091328] rounded-4xl overflow-hidden border border-[#40485d]/10 hover:border-[#94aaff]/40 transition-all duration-500 hover:-translate-y-2">
            <div className="relative h-64 overflow-hidden">
              <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" data-alt="Blue glowing computer server motherboard" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAqTbtW4ni1ndZLOMcO5zL8DCjZsseGrQmYU-adSXOcCVzalXtWCypAFwZFDq1bvZxcwVJ5kWDkr9bIBV2BHJWQlGMFo6WGNAnYbIEK-76Yiwpvcu9E_2EiAmgaJ0UD7lSIG9Y8iS5n4noQXfLlw9aGG_HZ271AKetCkXdKHV-Nnb4QNzQo4kaEdGih7HCWftjIwxE1I42cWNHLkIPe2zcpeXTSSMVSMaPBjECsU44bOwsqGcD_InvHeuwirjlV5SdthOr6Ca8zBYk" alt="" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#091328] via-transparent to-transparent"></div>
              <div className="absolute top-4 right-4 bg-[#94aaff]/20 backdrop-blur-md border border-[#94aaff]/30 px-3 py-1 rounded-full">
                <span className="text-[#94aaff] text-[10px] font-black uppercase tracking-widest">Level: Mid</span>
              </div>
            </div>
            <div className="p-8">
              <div className="flex items-center gap-2 mb-3">
                <span className="material-symbols-outlined text-[#94aaff] text-sm" style={{ fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>biotech</span>
                <span className="text-[#94aaff] text-xs font-bold uppercase tracking-widest">STEM Quests</span>
              </div>
              <h3 className="font-['Spline_Sans'] text-2xl font-bold mb-4 group-hover:text-[#94aaff] transition-colors">Bio-Digital Interfaces</h3>
              <p className="text-[#a3aac4] text-sm mb-8 line-clamp-2">Understanding the fusion between neural pathways and silicon processors.</p>
              <div className="space-y-4">
                <div className="flex justify-between items-end mb-1">
                  <span className="text-xs font-bold text-[#dee5ff]">Mission Progress</span>
                  <span className="text-xs font-bold text-[#8eff71]">0%</span>
                </div>
                <div className="w-full h-2 bg-[#192540]/20 rounded-full overflow-hidden">
                  <div className="h-full bg-[#8eff71] rounded-full w-[0%] shadow-[0_0_20px_-5px_rgba(142,255,113,0.4)]"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 5: Digital Arts */}
          <div className="group relative bg-[#091328] rounded-4xl overflow-hidden border border-[#40485d]/10 hover:border-[#ff51fa]/40 transition-all duration-500 hover:-translate-y-2">
            <div className="relative h-64 overflow-hidden">
              <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" data-alt="Neon magenta and blue geometric abstract shapes" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAQCYVfUE5Zz12s9oHBihHuDWMDSZ0r1nhEbMGQOgZh0Kx7NgJowkt20QMmJiAQq-402OTdlucBnsYNAaphVBXNsNP5DKQ6EGsYVH7e0Q4WKe8VEdMmYmwPbOAIgApwWmfLfDqUGa7R0Y8swArlaC4zdAp7piHDtqgX6EHFHskktNRYLdXX7f2FmWe1XOgqDAeGRrcpd3WGvk1qdweNcSr78Jdn-UbaDpveHp1ZP_NNu7rbiOyADxYcwp3q-uo8BpEVQdu6iHpnHCk" alt="" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#091328] via-transparent to-transparent"></div>
              <div className="absolute top-4 right-4 bg-[#ff51fa]/20 backdrop-blur-md border border-[#ff51fa]/30 px-3 py-1 rounded-full">
                <span className="text-[#ff51fa] text-[10px] font-black uppercase tracking-widest">Level: Advanced</span>
              </div>
            </div>
            <div className="p-8">
              <div className="flex items-center gap-2 mb-3">
                <span className="material-symbols-outlined text-[#ff51fa] text-sm" style={{ fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>movie_filter</span>
                <span className="text-[#ff51fa] text-xs font-bold uppercase tracking-widest">Digital Arts</span>
              </div>
              <h3 className="font-['Spline_Sans'] text-2xl font-bold mb-4 group-hover:text-[#ff51fa] transition-colors">Cinematic Motion Design</h3>
              <p className="text-[#a3aac4] text-sm mb-8 line-clamp-2">Crafting high-impact motion graphics for the meta-theatrical experience.</p>
              <div className="space-y-4">
                <div className="flex justify-between items-end mb-1">
                  <span className="text-xs font-bold text-[#dee5ff]">Mission Progress</span>
                  <span className="text-xs font-bold text-[#8eff71]">92%</span>
                </div>
                <div className="w-full h-2 bg-[#192540]/20 rounded-full overflow-hidden">
                  <div className="h-full bg-[#8eff71] rounded-full w-[92%] shadow-[0_0_20px_-5px_rgba(142,255,113,0.4)]"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 6: STEM */}
          <div className="group relative bg-[#091328] rounded-4xl overflow-hidden border border-[#40485d]/10 hover:border-[#94aaff]/40 transition-all duration-500 hover:-translate-y-2">
            <div className="relative h-64 overflow-hidden">
              <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" data-alt="High tech circuit board with white glowing lights" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB0fGZPfyLCAP15xHgJpi1grIQReZ5MwYRrmkXsZAV72revRm6hPU0WVhpyi4QsoxS_6g221KZIr694HdhWhGWCig2EIeGnx0JS5-vlacE9TjCRfsbUxnUb_7LoddETD5jX9U5APp4-M3UkH7dqcu4j32f7Lyo0P4zdIOXODseEOQBncf5ArZt0BkhUrn7XGTwgfFjCcPG5McPxE72KgpEGUBuQfXylAiIVKZpc3aF3sVFL3b4QkDLWRxrJFGzsLTC48S-cHURB8qc" alt="" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#091328] via-transparent to-transparent"></div>
              <div className="absolute top-4 right-4 bg-[#94aaff]/20 backdrop-blur-md border border-[#94aaff]/30 px-3 py-1 rounded-full">
                <span className="text-[#94aaff] text-[10px] font-black uppercase tracking-widest">Level: Elite</span>
              </div>
            </div>
            <div className="p-8">
              <div className="flex items-center gap-2 mb-3">
                <span className="material-symbols-outlined text-[#94aaff] text-sm" style={{ fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>terminal</span>
                <span className="text-[#94aaff] text-xs font-bold uppercase tracking-widest">STEM Quests</span>
              </div>
              <h3 className="font-['Spline_Sans'] text-2xl font-bold mb-4 group-hover:text-[#94aaff] transition-colors">Advanced Cyber-Defense</h3>
              <p className="text-[#a3aac4] text-sm mb-8 line-clamp-2">Protecting decentralized infrastructures against quantum-level attacks.</p>
              <div className="space-y-4">
                <div className="flex justify-between items-end mb-1">
                  <span className="text-xs font-bold text-[#dee5ff]">Mission Progress</span>
                  <span className="text-xs font-bold text-[#8eff71]">38%</span>
                </div>
                <div className="w-full h-2 bg-[#192540]/20 rounded-full overflow-hidden">
                  <div className="h-full bg-[#8eff71] rounded-full w-[38%] shadow-[0_0_20px_-5px_rgba(142,255,113,0.4)]"></div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Pagination / Load More */}
        <div className="mt-20 flex flex-col items-center">
          <button className="group relative flex items-center gap-4 bg-[#192540] px-8 py-4 rounded-full border border-[#40485d]/20 hover:border-[#ff51fa]/50 transition-all text-[#dee5ff] cursor-pointer">
            <span className="font-bold text-sm tracking-widest uppercase">Load More Archives</span>
            <span className="material-symbols-outlined group-hover:translate-y-1 transition-transform" style={{ fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>keyboard_double_arrow_down</span>
          </button>
        </div>
    </div>
  );
}