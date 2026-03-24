import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function CampusLeaderboard() {
  return (
    <div 
      className="dark min-h-screen flex flex-col selection:bg-[#ff51fa]/30 selection:text-white"
      style={{ 
        backgroundColor: '#060e20', 
        color: '#dee5ff', 
        fontFamily: '"Plus Jakarta Sans", sans-serif'
      }}
    >
      {/* Font Links - Kept inline so it works standalone */}
      <link href="https://fonts.googleapis.com/css2?family=Spline+Sans:wght@300;400;500;600;700;800;900&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
      <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />

      {/* Custom Styles */}
      <style dangerouslySetInnerHTML={{
        __html: `
          .neon-glow-primary {
            text-shadow: 0 0 10px rgba(148, 170, 255, 0.5), 0 0 20px rgba(148, 170, 255, 0.3);
          }
          .neon-glow-secondary {
            text-shadow: 0 0 10px rgba(255, 81, 250, 0.5), 0 0 20px rgba(255, 81, 250, 0.3);
          }
          .asymmetric-podium {
            clip-path: polygon(0% 15%, 100% 0%, 100% 100%, 0% 100%);
          }
        `
      }} />

      {/* Top Navigation Bar */}
      {/* TopNavBar */}
      <Navbar activePage="Community" />

      <main className="max-w-7xl mx-auto px-6 pt-16 pb-24 w-full">
        {/* Header Section */}
        <header className="mb-16">
          <div className="flex items-baseline gap-4 mb-2">
            <span className="font-['Plus_Jakarta_Sans'] text-xs uppercase tracking-[0.2em] text-[#ff51fa] font-bold">Hall of Fame</span>
            <div className="h-[1px] flex-grow bg-[#40485d]/30"></div>
          </div>
          <h1 className="font-['Spline_Sans'] text-7xl font-black tracking-tighter mb-4">
            Campus <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#94aaff] via-[#ff51fa] to-[#8eff71]">Leaderboard</span>
          </h1>
          <p className="text-[#a3aac4] max-w-2xl text-lg">The elite echelon of Scholar Sync. Forge your legacy through relentless learning and earn monthly legendary rewards.</p>
        </header>

        {/* Top 3 Podium: The High-Energy Visual */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 items-end mb-24 relative">
          <div className="absolute inset-0 bg-[#94aaff]/5 blur-[120px] rounded-full -z-10"></div>
          
          {/* Rank 2 */}
          <div className="flex flex-col items-center group">
            <div className="relative mb-6">
              <div className="w-24 h-24 rounded-full p-1 bg-gradient-to-tr from-[#94aaff] to-[#192540]">
                <img className="w-full h-full rounded-full object-cover" data-alt="Student profile avatar for second place" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAJ7gn3p4noh6ycjzIvuwD56eYz1Vm0xH-It8VPPii_Ug69QziNxuYLXoxDLh4_i_JDYxB0jSf7KDrGSD6Tuv92aFP6kFrDqa0enosLfQqsL_XL3AesMZardQDrYlqZk7il8iU-ZNwI0OAR9cCZYtJixRVGCOoDAAjsIi6Es_5MiEkgZXCJYyyPb5DcbFhpJWvtn6_P_TXwd2q6IRAarrLhUBnTp2pROU39g0sCYTEU5Vchui-yClN9AZW6JrdukFaoJgHyPc-7llA" alt="" />
              </div>
              <div className="absolute -bottom-2 -right-2 bg-[#060e20] border-2 border-[#94aaff] w-10 h-10 rounded-full flex items-center justify-center font-black text-[#94aaff]">2</div>
            </div>
            <div className="w-full h-48 bg-[#141f38] rounded-t-xl asymmetric-podium flex flex-col items-center justify-center p-6 border-x border-t border-[#40485d]/20">
              <h3 className="font-['Spline_Sans'] text-xl font-bold mb-1">Aria Vance</h3>
              <p className="text-[#94aaff] font-bold">18,420 pts</p>
              <div className="mt-4 flex gap-2">
                <span className="material-symbols-outlined text-[#8eff71] text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>local_fire_department</span>
                <span className="text-xs font-bold text-[#8eff71]">42 DAY STREAK</span>
              </div>
            </div>
          </div>
          
          {/* Rank 1 (Centerpiece) */}
          <div className="flex flex-col items-center group -translate-y-8">
            <div className="relative mb-8 scale-110">
              <div className="absolute -top-10 left-1/2 -translate-x-1/2">
                <span className="material-symbols-outlined text-[#8eff71] text-5xl neon-glow-primary" style={{ fontVariationSettings: "'FILL' 1" }}>workspace_premium</span>
              </div>
              <div className="w-32 h-32 rounded-full p-1.5 bg-gradient-to-tr from-[#ff51fa] via-[#8eff71] to-[#94aaff] animate-pulse">
                <img className="w-full h-full rounded-full object-cover" data-alt="Student profile avatar for first place" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDKFsqjQxcc0on1ZRolTbgd14yJpGqo8gUD_2adHLhAI_YW0Lvbo34E1RfiNZ2EbQO67z9vSxmLAq5n8yoFZ8up3RicRMh7XwGBQvRDDI0e2-YludAS698mTmDszGGFtiqqQWWoIDmP0YhUg_sqTdVpSgBjqQCDPOKzhPtHLKhJ7zoOrdySoDjagmKSZs8lDRGQ6BELhxdetk7DnN6iXPgFrIJqGwNa8omdXcd1FBhsJE3EFoZQQxIdPjXgre3RZ8vTkRiiB0kIAXI" alt="" />
              </div>
              <div className="absolute -bottom-2 -right-2 bg-gradient-to-br from-[#ff51fa] to-[#a900a9] w-12 h-12 rounded-full flex items-center justify-center font-black text-white shadow-lg">1</div>
            </div>
            <div className="w-full h-64 bg-[#192540] rounded-t-2xl flex flex-col items-center justify-center p-8 border-x border-t border-[#ff51fa]/30 relative overflow-hidden shadow-[0_0_50px_-10px_rgba(255,81,250,0.2)]">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#ff51fa] via-[#94aaff] to-[#8eff71]"></div>
              <h3 className="font-['Spline_Sans'] text-2xl font-black mb-1 neon-glow-secondary">Xavier Storm</h3>
              <p className="text-[#ff51fa] font-black text-xl">24,900 pts</p>
              <div className="mt-6 flex flex-col items-center gap-1">
                <span className="text-[10px] uppercase tracking-widest text-[#a3aac4] font-bold">Current Reward</span>
                <span className="text-sm font-bold text-[#8eff71] flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>redeem</span>
                  NEON TITAN ACCESS
                </span>
              </div>
            </div>
          </div>
          
          {/* Rank 3 */}
          <div className="flex flex-col items-center group">
            <div className="relative mb-6">
              <div className="w-24 h-24 rounded-full p-1 bg-gradient-to-tr from-[#6d758c] to-[#192540]">
                <img className="w-full h-full rounded-full object-cover" data-alt="Student profile avatar for third place" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBM0YCF0jRz4bKjzpSdbUjR79CXWap8B1XcvCKFMdg6qeiaxsn_SXVW0JQAzWSM03CTdeNoQ4cIua_Msv2ieEjKUTN8h_la1zBaNDTqEX1h1H7eBo28bDdGTFXeOvrQ40K7RWCUcVlg1_tuHXJtBFHTPU9B-Gp_KMY5dS3shme7FOK2pCTJnnSaYmHFJAZjksDnn_KbD73rI1WdDibBQHkx7un8_PZ2kWTUlHSObDisZYqX7jwrEVbP-HXKJMMl9LezJxbp-_tF-B4" alt="" />
              </div>
              <div className="absolute -bottom-2 -right-2 bg-[#060e20] border-2 border-[#6d758c] w-10 h-10 rounded-full flex items-center justify-center font-black text-[#6d758c]">3</div>
            </div>
            <div className="w-full h-40 bg-[#141f38] rounded-t-xl asymmetric-podium flex flex-col items-center justify-center p-6 border-x border-t border-[#40485d]/20" style={{ transform: "scaleX(-1)" }}>
              <div className="flex flex-col items-center" style={{ transform: "scaleX(-1)" }}>
                <h3 className="font-['Spline_Sans'] text-xl font-bold mb-1">Kai Nova</h3>
                <p className="text-[#40485d] font-bold">15,100 pts</p>
                <div className="mt-4 flex gap-2">
                  <span className="material-symbols-outlined text-[#94aaff] text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>local_fire_department</span>
                  <span className="text-xs font-bold text-[#94aaff]">28 DAY STREAK</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Leaderboard List (Desktop Optimized) */}
        <div className="bg-[#091328] rounded-2xl p-1">
          {/* Table Header */}
          <div className="grid grid-cols-12 gap-4 px-8 py-6 text-[#a3aac4] font-['Plus_Jakarta_Sans'] text-xs uppercase tracking-widest border-b border-[#40485d]/10">
            <div className="col-span-1">Rank</div>
            <div className="col-span-5">Scholar</div>
            <div className="col-span-2 text-center">Scholar Points</div>
            <div className="col-span-2 text-center">Current Streak</div>
            <div className="col-span-2 text-right">Status</div>
          </div>
          
          {/* List Items */}
          <div className="flex flex-col gap-2 mt-4">
            {/* Row 4 */}
            <div className="grid grid-cols-12 gap-4 px-8 py-5 items-center bg-[#0f1930] rounded-md hover:bg-[#141f38] transition-colors group cursor-pointer">
              <div className="col-span-1 font-['Spline_Sans'] font-bold text-lg text-[#a3aac4] group-hover:text-[#94aaff] transition-colors">04</div>
              <div className="col-span-5 flex items-center gap-4">
                <img className="w-10 h-10 rounded-full bg-[#192540]" data-alt="Portrait of student rank 4" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBO-7huYBLqHQeD7SobEBqy7FSO8yXdRL8qj9MxAOfrlCDC11aW-8YNGdZ0aMmuvjgElHIeIop4kUzxK4JILiO9ogyzuavKvv3OaGaX7kh3M6gYEZ9jVMqp7QnhQFoDQMIhsZpJNgpCJroa415C0H7cuT9GHDT6u5PwbYxwQlwhjOAK02760iBgdw3Rh3aM8h4U9oUI0jYkCfh4IJisyPolpuSMTZMy1uybQU9VLZ6wC03v59DQdJsZk81bTDydqWIp4skn_wEwI_4" alt="" />
                <div>
                  <div className="font-bold">Lyla Chen</div>
                  <div className="text-xs text-[#a3aac4]">Cybersecurity Engineering</div>
                </div>
              </div>
              <div className="col-span-2 text-center font-black text-[#6c8cff]">14,280</div>
              <div className="col-span-2 text-center">
                <span className="bg-[#192540] px-3 py-1 rounded-full text-xs font-bold border border-[#94aaff]/20">15 DAYS</span>
              </div>
              <div className="col-span-2 text-right">
                <span className="text-[10px] font-bold px-2 py-1 rounded bg-[#8eff71]/10 text-[#8eff71] uppercase">Eligible</span>
              </div>
            </div>

            {/* Row 5 */}
            <div className="grid grid-cols-12 gap-4 px-8 py-5 items-center bg-[#0f1930] rounded-md hover:bg-[#141f38] transition-colors group cursor-pointer">
              <div className="col-span-1 font-['Spline_Sans'] font-bold text-lg text-[#a3aac4] group-hover:text-[#94aaff] transition-colors">05</div>
              <div className="col-span-5 flex items-center gap-4">
                <img className="w-10 h-10 rounded-full bg-[#192540]" data-alt="Portrait of student rank 5" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA97SFGV-f4DVARyOFo8CtA8ZrBcb8lwkrEdwb4Iz-B3oqVBePLEYF60SS50prikHas1W1dlabk0o4tWS5f7jEKBW_IPz7cN1ZsxvTol5oifXbBoaOqj1_ct4YE69s7mVHfAfKFMglJHUXEqZSFXL8O7-yfadqIU59vLxsUeVsiPUCn126QPRxVbkqSWCUfRugpqOoWaEtzZX5u2ev-TGXHAN_XY5yWeu8VfsCq3uf84Ldqx0uI2SWAbmS82iv35hm1FOunl-bmkxc" alt="" />
                <div>
                  <div className="font-bold">Marcus Thorne</div>
                  <div className="text-xs text-[#a3aac4]">Quantum Computing</div>
                </div>
              </div>
              <div className="col-span-2 text-center font-black text-[#6c8cff]">12,940</div>
              <div className="col-span-2 text-center">
                <span className="bg-[#192540] px-3 py-1 rounded-full text-xs font-bold border border-[#94aaff]/20">12 DAYS</span>
              </div>
              <div className="col-span-2 text-right">
                <span className="text-[10px] font-bold px-2 py-1 rounded bg-[#8eff71]/10 text-[#8eff71] uppercase">Eligible</span>
              </div>
            </div>

            {/* Row 6 */}
            <div className="grid grid-cols-12 gap-4 px-8 py-5 items-center bg-[#0f1930] rounded-md hover:bg-[#141f38] transition-colors group cursor-pointer">
              <div className="col-span-1 font-['Spline_Sans'] font-bold text-lg text-[#a3aac4] group-hover:text-[#94aaff] transition-colors">06</div>
              <div className="col-span-5 flex items-center gap-4">
                <img className="w-10 h-10 rounded-full bg-[#192540]" data-alt="Portrait of student rank 6" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBzLUnI__Z1ihuc2Y3sZOwJCxkwCCdLimCvBq6nAQRLcDZq3Q_lWmcPJW3nOvc7j0mbroK_gY7mzojNCwNbPzeB16dXJGdBpHGYwppJRWemPZUtEUspamm4PlkVgbKuxr_fZOU2iVsL6Wk6vmj-ek3M8wYUzUX4KpUfqS2bIiqzgnw_qPQA4tREHSPtofKkBBNx3032P8BZG0ZBHEzZL9Hh6Jur1CTdq0LRGFXw0QYHPUUNxRo2mnt09oFGx6HrEauP74lURMhOyNs" alt="" />
                <div>
                  <div className="font-bold">Elena Rossi</div>
                  <div className="text-xs text-[#a3aac4]">Visual Design</div>
                </div>
              </div>
              <div className="col-span-2 text-center font-black text-[#6c8cff]">11,100</div>
              <div className="col-span-2 text-center">
                <span className="bg-[#192540] px-3 py-1 rounded-full text-xs font-bold border border-[#ff51fa]/20">8 DAYS</span>
              </div>
              <div className="col-span-2 text-right">
                <span className="text-[10px] font-bold px-2 py-1 rounded bg-[#40485d]/20 text-[#a3aac4] uppercase">Pending</span>
              </div>
            </div>

            {/* My Rank (Sticky/Highlighted) */}
            <div className="grid grid-cols-12 gap-4 px-8 py-6 items-center bg-[#94aaff]/10 border border-[#94aaff]/20 rounded-2xl mt-8 shadow-[0_0_30px_-10px_rgba(148,170,255,0.2)]">
              <div className="col-span-1 font-['Spline_Sans'] font-black text-xl text-[#94aaff]">142</div>
              <div className="col-span-5 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full ring-2 ring-[#94aaff] ring-offset-4 ring-offset-[#060e20] overflow-hidden">
                  <img className="w-full h-full object-cover" data-alt="Your student profile avatar" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB0q03CoUdCA6M7pDNDdg5LWvwgCfKpTkry8fDp6c0pphQuXZApayk7od73HeQSo4P_LM3coJGaaEPkK1vFW3IsNhWNpoNsyBxbz4e3MVURU9pFSmuNhp5RpUxZI80WIeATiSq0O8fbEouTd4o0r8nKEzycW5uD6_RT2aKYOXDm1OH_ZGKt2SNi8ibA1Yzt1uI6WTFFLgNvUnfwT-kbs5yswQyGtJZQRSR1RvJETvWzsGlOPrPSUuFQNW2kMg6Q1BhUDp9MbHB2vnE" alt="" />
                </div>
                <div>
                  <div className="font-bold text-[#94aaff]">You (Jordan Smith)</div>
                  <div className="text-xs text-[#a3aac4]">Biotechnology</div>
                </div>
              </div>
              <div className="col-span-2 text-center font-black text-[#dee5ff] text-xl">4,205</div>
              <div className="col-span-2 text-center">
                <span className="bg-[#94aaff] text-[#00257b] px-4 py-1 rounded-full text-sm font-bold">5 DAY STREAK</span>
              </div>
              <div className="col-span-2 text-right">
                <div className="flex flex-col items-end">
                  <span className="text-[10px] font-bold text-[#94aaff] uppercase">Next Reward:</span>
                  <span className="text-xs font-bold">800 pts to Bronze Gear</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Reward Showcase Grid */}
        <section className="mt-32">
          <h2 className="font-['Spline_Sans'] text-4xl font-black mb-12">Monthly <span className="text-[#ff51fa]">Legendary</span> Rewards</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Reward 1 */}
            <div className="bg-[#091328] p-8 rounded-4xl border border-[#40485d]/10 hover:border-[#94aaff]/40 transition-all group">
              <span className="material-symbols-outlined text-[#94aaff] text-4xl mb-6" style={{ fontVariationSettings: "'FILL' 1" }}>token</span>
              <h4 className="font-['Spline_Sans'] text-xl font-bold mb-2">Scholar Sync NFT</h4>
              <p className="text-sm text-[#a3aac4] leading-relaxed">Exclusive digital collectible for the top 10 finishers of the month. Permanent profile prestige.</p>
            </div>
            
            {/* Reward 2 */}
            <div className="bg-[#091328] p-8 rounded-4xl border border-[#40485d]/10 hover:border-[#ff51fa]/40 transition-all group">
              <span className="material-symbols-outlined text-[#ff51fa] text-4xl mb-6" style={{ fontVariationSettings: "'FILL' 1" }}>verified_user</span>
              <h4 className="font-['Spline_Sans'] text-xl font-bold mb-2">Course Architect Access</h4>
              <p className="text-sm text-[#a3aac4] leading-relaxed">Direct input into the next semester's curriculum for the overall champion of the leaderboard.</p>
            </div>
            
            {/* Reward 3 */}
            <div className="bg-[#091328] p-8 rounded-4xl border border-[#40485d]/10 hover:border-[#8eff71]/40 transition-all group">
              <span className="material-symbols-outlined text-[#8eff71] text-4xl mb-6" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
              <h4 className="font-['Spline_Sans'] text-xl font-bold mb-2">Kinetic Boost Pack</h4>
              <p className="text-sm text-[#a3aac4] leading-relaxed">A physical care package containing limited edition Scholar Sync tech gear for the top 3 students.</p>
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}