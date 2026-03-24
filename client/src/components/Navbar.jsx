import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar({ activePage }) {
  const links = [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Courses', href: '/courses' },
    { name: 'Community', href: '/community' },
    { name: 'Resources', href: '#' },
  ];

  return (
    <nav className="sticky top-6 z-50 flex justify-between items-center px-8 py-3 bg-[#060e20]/60 backdrop-blur-2xl rounded-full mt-6 mx-auto max-w-7xl w-[95%] shadow-[0_8px_32px_0_rgba(31,38,135,0.3)] font-['Spline_Sans'] tracking-tight font-bold text-sm border border-white/10 transition-all duration-300">
      <div className="flex items-center gap-8">
        <Link to="/" className="text-2xl font-black italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-[#2962FF] to-[#ff51fa] cursor-pointer">Scholar Sync</Link>
      </div>
      
      {/* Centered Links */}
      <div className={`hidden md:flex gap-6 items-center ${['Community', 'Courses'].includes(activePage) ? 'flex-1 justify-center' : 'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'}`}>
        {links.map(link => (
          <Link 
            key={link.name}
            to={link.href}
            className={`${activePage === link.name ? 'text-[#ff51fa] border-b-2 border-[#ff51fa] pb-1' : 'text-slate-400 hover:text-white'} transition-all hover:scale-105 duration-300`}
          >
            {link.name}
          </Link>
        ))}
      </div>

      <div className="flex items-center gap-4 cursor-pointer">
        {/* Optional Search for pages like SquadHub/CourseLibrary */}
        {['Community', 'Courses'].includes(activePage) && (
          <div className="hidden lg:flex items-center bg-[#192540] px-3 py-1.5 rounded-full border border-white/5">
            <span className="material-symbols-outlined text-[#a3aac4] text-sm mr-2" style={{ fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24", verticalAlign: "middle" }}>search</span>
            <input 
              className="bg-transparent border-none focus:ring-0 text-xs text-[#dee5ff] placeholder-[#a3aac4] w-32 outline-none" 
              placeholder="Search..." 
              type="text" 
            />
          </div>
        )}
        
        <div className="flex items-center gap-2">
          <button className="material-symbols-outlined text-slate-400 hover:text-white transition-colors p-2 cursor-pointer" style={{ fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24", verticalAlign: "middle" }}>notifications</button>
          
          {activePage === 'Profile' ? (
            <Link to="/profile" className="flex items-center gap-2 px-1 py-1 rounded-full bg-[#141f38] border border-[#40485d]/20 pr-4 ml-2 cursor-pointer">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#94aaff] to-[#ff51fa] flex items-center justify-center overflow-hidden">
                <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC7fKjNE3ZmDENLqc0xABvZhBHKwxXM5u7cXzj8w6fRWdaJcaW2lIzwaXYG9ojN80y1jBxCvK8V9G64pXVLFrnFQtiJKhzKZnN0vtCBuG8M3JMBF_hk_C2_jQ66dY16ROUYJK6Dlmvyh0velg7pzNLbpSDYmAnKzAiTfXCA1XTiU9FWDRf-pr8vprG9_gev9dpE6MP-91Rx-ZfjCIkTgNnZns1-31kljq4MuZAJUFyNAEw97ifqD2u5ftN0zC98vxxB2WUYOl1fbAg" alt="" />
              </div>
              <span className="text-[#ff51fa] border-b-2 border-[#ff51fa] pb-1">Profile</span>
            </Link>
          ) : (
            <Link to="/profile" className="material-symbols-outlined text-slate-400 hover:text-white transition-colors p-2 cursor-pointer" style={{ fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24", verticalAlign: "middle" }}>account_circle</Link>
          )}
        </div>
        
        {activePage !== 'Profile' && (
          <Link to="/login" className="bg-gradient-to-r from-[#94aaff] to-[#809bff] text-[#001b61] px-6 py-2 rounded-full font-bold text-sm hover:scale-105 transition-transform duration-300 active:scale-95 cursor-pointer shadow-lg shadow-[#94aaff]/10">Get Started</Link>
        )}
      </div>
    </nav>
  );
}
