import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

export default function DashboardLayout() {
  const location = useLocation();
  const path = location.pathname;

  let activePage = "Dashboard";
  if (path.includes("/curriculum")) activePage = "Curriculum";
  else if (path.includes("/achievements")) activePage = "Achievements";
  else if (path.includes("/community")) activePage = "Community";
  else if (path.includes("/leaderboard")) activePage = "Leaderboard";
  else if (path.includes("/settings")) activePage = "Settings";
  else if (path.includes("/support")) activePage = "Support Hub";
  else if (path.includes("/courses")) activePage = "Courses";
  else if (path.includes("/profile")) activePage = "Profile";
  else if (path.includes("/assignments")) activePage = "Assignments";

  return (
    <div 
      className="dark min-h-screen flex flex-col"
      style={{ 
        backgroundColor: '#060e20', 
        color: '#dee5ff', 
        fontFamily: '"Plus Jakarta Sans", sans-serif'
      }}
    >
      {/* Font Links - Kept inline so it works standalone */}
      <link href="https://fonts.googleapis.com/css2?family=Spline+Sans:wght@300;400;500;600;700;800;900&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
      <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />

      {/* TopNavBar */}
      <Navbar activePage={activePage} />

      <main className="flex-grow max-w-7xl mx-auto w-full px-6 py-12 flex flex-col lg:flex-row gap-8">
        {/* Side Navigation */}
        <aside className="hidden lg:flex flex-col gap-8 w-64 shrink-0 cursor-pointer">
          <div className="flex flex-col gap-2">
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#ff51fa] mb-4">Core Modules</h3>
            <Link to="/dashboard" className={`flex items-center gap-3 p-3 rounded-2xl cursor-pointer transition-colors ${activePage === 'Dashboard' ? 'bg-[#141f38] text-[#94aaff]' : 'text-[#a3aac4] hover:bg-[#091328]'}`}>
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>dashboard</span>
              <span className="font-bold">Mission Control</span>
            </Link>
            <Link to="/curriculum" className={`flex items-center gap-3 p-3 rounded-2xl cursor-pointer transition-colors ${activePage === 'Curriculum' ? 'bg-[#141f38] text-[#94aaff]' : 'text-[#a3aac4] hover:bg-[#091328]'}`}>
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>auto_stories</span>
              <span className="font-medium">Curriculum</span>
            </Link>
            <Link to="/achievements" className={`flex items-center gap-3 p-3 rounded-2xl cursor-pointer transition-colors ${activePage === 'Achievements' ? 'bg-[#141f38] text-[#94aaff]' : 'text-[#a3aac4] hover:bg-[#091328]'}`}>
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>military_tech</span>
              <span className="font-medium">Achievements</span>
            </Link>
            <Link to="/community" className={`flex items-center gap-3 p-3 rounded-2xl cursor-pointer transition-colors ${activePage === 'Community' ? 'bg-[#141f38] text-[#94aaff]' : 'text-[#a3aac4] hover:bg-[#091328]'}`}>
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>groups</span>
              <span className="font-medium">The Squad</span>
            </Link>
            <Link to="/leaderboard" className={`flex items-center gap-3 p-3 rounded-2xl cursor-pointer transition-colors ${activePage === 'Leaderboard' ? 'bg-[#141f38] text-[#94aaff]' : 'text-[#a3aac4] hover:bg-[#091328]'}`}>
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>leaderboard</span>
              <span className="font-medium">Leaderboard</span>
            </Link>
            <Link to="/assignments" className={`flex items-center gap-3 p-3 rounded-2xl cursor-pointer transition-colors ${activePage === 'Assignments' ? 'bg-[#141f38] text-[#94aaff]' : 'text-[#a3aac4] hover:bg-[#091328]'}`}>
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>assignment_turned_in</span>
              <span className="font-medium">Assignments</span>
            </Link>
            <Link to="/profile" className={`flex items-center gap-3 p-3 rounded-2xl cursor-pointer transition-colors ${activePage === 'Profile' ? 'bg-[#141f38] text-[#94aaff]' : 'text-[#a3aac4] hover:bg-[#091328]'}`}>
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>account_circle</span>
              <span className="font-medium">My Profile</span>
            </Link>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#ff51fa] mb-4">System</h3>
            <Link to="/settings" className={`flex items-center gap-3 p-3 rounded-2xl cursor-pointer transition-colors ${activePage === 'Settings' ? 'bg-[#141f38] text-[#94aaff]' : 'text-[#a3aac4] hover:bg-[#091328]'}`}>
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>settings</span>
              <span className="font-medium">Settings</span>
            </Link>
            <Link to="/support" className={`flex items-center gap-3 p-3 rounded-2xl cursor-pointer transition-colors ${activePage === 'Support Hub' ? 'bg-[#141f38] text-[#94aaff]' : 'text-[#a3aac4] hover:bg-[#091328]'}`}>
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>help_center</span>
              <span className="font-medium">Support Hub</span>
            </Link>
          </div>

          {/* Ad-hoc Banner */}
          <div className="mt-auto p-6 bg-gradient-to-br from-[#a900a9] to-[#192540] rounded-4xl relative overflow-hidden">
            <div className="relative z-10">
              <p className="text-xs font-bold text-[#fff5f9] opacity-80 mb-1">Scholar Tier</p>
              <p className="text-lg font-black text-white leading-tight mb-4">Upgrade to Pro Neon</p>
              <button className="w-full bg-white text-[#060e20] py-2 rounded-full text-xs font-bold cursor-pointer">Unleash Potential</button>
            </div>
            <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-[#ff51fa]/20 blur-2xl rounded-full"></div>
          </div>
        </aside>

        {/* Content Canvas */}
        <section className="flex-grow flex flex-col max-w-full lg:max-w-[calc(100%-280px)]">
          <Outlet />
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
