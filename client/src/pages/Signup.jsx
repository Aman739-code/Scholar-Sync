import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../utils/api';

export default function Signup() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/signup', formData);
      localStorage.setItem('token', res.data.token);
      navigate('/dashboard');
    } catch (err) {
      console.error(err.response?.data?.msg || err.message);
      alert(err.response?.data?.msg || 'Signup failed');
    }
  };
  return (
    <div 
      className="dark min-h-screen font-['Plus_Jakarta_Sans'] text-[#dee5ff] selection:bg-[#ff51fa]/30 selection:text-white flex flex-col items-center justify-center p-6 bg-mesh overflow-hidden relative"
      style={{ backgroundColor: '#060e20' }}
    >
      {/* Font Links - Kept inline so it works standalone */}
      <link href="https://fonts.googleapis.com/css2?family=Spline+Sans:wght@300;400;500;600;700;800;900&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
      <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />

      {/* Custom Styles */}
      <style dangerouslySetInnerHTML={{
        __html: `
          .glass-card {
            background: rgba(25, 37, 64, 0.4);
            backdrop-filter: blur(24px);
            -webkit-backdrop-filter: blur(24px);
          }
          .neon-glow-primary:focus-within {
            box-shadow: 0 0 20px -2px rgba(148, 170, 255, 0.3);
          }
          .neon-glow-fuchsia:hover {
            box-shadow: 0 0 25px -5px rgba(255, 81, 250, 0.5);
          }
          .bg-mesh {
            background-color: #060e20;
            background-image: 
              radial-gradient(circle at 10% 20%, rgba(148, 170, 255, 0.05) 0%, transparent 40%),
              radial-gradient(circle at 90% 80%, rgba(255, 81, 250, 0.05) 0%, transparent 40%);
          }
        `
      }} />

      {/* Brand Header */}
      <header className="fixed top-0 w-full z-50 flex justify-between items-center px-6 py-4 bg-transparent backdrop-blur-xl">
        <Link to="/" className="text-2xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-blue-500 to-fuchsia-500 font-['Spline_Sans'] cursor-pointer">
          Scholar Sync
        </Link>
      </header>

      <main className="w-full max-w-[1200px] grid grid-cols-1 lg:grid-cols-12 gap-12 items-center z-10 relative mt-12">
        
        {/* Left Column: Kinetic Visuals */}
        <div className="hidden lg:flex lg:col-span-7 flex-col gap-8 relative">
          <div className="absolute -top-20 -left-20 w-64 h-64 bg-[#94aaff] opacity-10 blur-[100px] rounded-full"></div>
          <div className="absolute -bottom-20 right-0 w-80 h-80 bg-[#ff51fa] opacity-10 blur-[120px] rounded-full"></div>
          
          <h1 className="font-['Spline_Sans'] text-7xl font-black leading-[0.9] tracking-tighter">
            ELEVATE <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#94aaff] via-[#ff51fa] to-[#8eff71]">ACADEMIC</span> <br />
            VELOCITY.
          </h1>
          <p className="text-[#a3aac4] text-xl max-w-md leading-relaxed">
            The ecosystem designed for the next generation of digital scholars. Real-time collaboration meets hyper-focused productivity.
          </p>
          
          <div className="grid grid-cols-2 gap-4 mt-8">
            <div className="p-6 rounded-3xl bg-[#141f38] flex flex-col gap-2">
              <span className="material-symbols-outlined text-[#8eff71] text-3xl">bolt</span>
              <h3 className="font-['Spline_Sans'] font-bold">Fast Sync</h3>
              <p className="text-sm text-[#a3aac4]">Low-latency data synchronization across all devices.</p>
            </div>
            <div className="p-6 rounded-3xl bg-[#141f38] flex flex-col gap-2">
              <span className="material-symbols-outlined text-[#ff51fa] text-3xl">group</span>
              <h3 className="font-['Spline_Sans'] font-bold">Vanguard Network</h3>
              <p className="text-sm text-[#a3aac4]">Connect with 10k+ elite students worldwide.</p>
            </div>
          </div>
        </div>

        {/* Right Column: Sign Up Card */}
        <div className="lg:col-span-5 w-full relative">
          <div className="glass-card p-8 md:p-12 rounded-xl border border-[#40485d]/15 flex flex-col gap-8 relative overflow-hidden">
            
            {/* Decorative Abstract Blob */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#ff51fa] opacity-20 blur-3xl"></div>
            
            <div className="space-y-2 relative z-10">
              <h2 className="font-['Spline_Sans'] text-4xl font-extrabold tracking-tight">Join the Vanguard</h2>
              <p className="text-[#a3aac4]">Start your journey into the sync.</p>
            </div>

            <form className="space-y-6 relative z-10" onSubmit={handleSignup}>
              {/* Name Field */}
              <div className="space-y-2 group">
                <label className="block text-xs font-bold uppercase tracking-widest text-[#94aaff] opacity-80 px-1">Full Name</label>
                <div className="relative flex items-center">
                  <span className="material-symbols-outlined absolute left-4 text-[#6d758c] group-focus-within:text-[#94aaff] transition-colors">person</span>
                  <input 
                    className="w-full h-14 pl-12 pr-4 bg-[#192540] rounded-md border-none ring-1 ring-[#40485d]/30 focus:ring-2 focus:ring-[#94aaff] outline-none transition-all placeholder:text-[#6d758c] font-medium text-[#dee5ff]" 
                    placeholder="Hideo Kojima" 
                    type="text" 
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
              </div>

              {/* Email Field */}
              <div className="space-y-2 group">
                <label className="block text-xs font-bold uppercase tracking-widest text-[#94aaff] opacity-80 px-1">Academic Email</label>
                <div className="relative flex items-center">
                  <span className="material-symbols-outlined absolute left-4 text-[#6d758c] group-focus-within:text-[#94aaff] transition-colors">alternate_email</span>
                  <input 
                    className="w-full h-14 pl-12 pr-4 bg-[#192540] rounded-md border-none ring-1 ring-[#40485d]/30 focus:ring-2 focus:ring-[#94aaff] outline-none transition-all placeholder:text-[#6d758c] font-medium text-[#dee5ff]" 
                    placeholder="scholar@sync.edu" 
                    type="email" 
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2 group">
                <label className="block text-xs font-bold uppercase tracking-widest text-[#94aaff] opacity-80 px-1">Secure Password</label>
                <div className="relative flex items-center">
                  <span className="material-symbols-outlined absolute left-4 text-[#6d758c] group-focus-within:text-[#94aaff] transition-colors">lock</span>
                  <input 
                    className="w-full h-14 pl-12 pr-12 bg-[#192540] rounded-md border-none ring-1 ring-[#40485d]/30 focus:ring-2 focus:ring-[#94aaff] outline-none transition-all placeholder:text-[#6d758c] font-medium text-[#dee5ff]" 
                    placeholder="••••••••••••" 
                    type="password" 
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  />
                  <span className="material-symbols-outlined absolute right-4 text-[#6d758c] cursor-pointer hover:text-[#dee5ff]">visibility</span>
                </div>
              </div>

              <div className="flex items-center gap-3 py-2">
                <input 
                  className="w-5 h-5 rounded border-[#40485d] bg-[#192540] text-[#ff51fa] focus:ring-[#ff51fa] focus:ring-offset-[#060e20]" 
                  id="terms" 
                  type="checkbox" 
                />
                <label className="text-sm text-[#a3aac4]" htmlFor="terms">
                  I agree to the <span className="text-[#ff51fa] font-semibold cursor-pointer hover:underline">Protocol Terms</span>
                </label>
              </div>

              {/* CTA Button */}
              <button 
                className="w-full h-16 bg-gradient-to-br from-[#ff51fa] to-[#a900a9] text-white font-black text-lg rounded-full shadow-lg shadow-[#ff51fa]/20 active:scale-[0.98] transition-all neon-glow-fuchsia cursor-pointer" 
                type="submit"
              >
                Create Account
              </button>
            </form>



            <div className="text-center pt-4 z-10 relative">
              <p className="text-[#a3aac4]">
                Already have an account? 
                <Link className="text-[#ff51fa] font-bold hover:underline transition-all underline-offset-4 ml-1 cursor-pointer" to="/login">Login</Link>
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Visual Accents Background */}
      <div className="fixed top-1/4 -right-20 w-[400px] h-[400px] bg-[#8eff71] opacity-[0.03] blur-[100px] pointer-events-none rounded-full"></div>
      <div className="fixed -bottom-40 -left-20 w-[500px] h-[500px] bg-[#94aaff] opacity-[0.03] blur-[120px] pointer-events-none rounded-full"></div>
    </div>
  );
}