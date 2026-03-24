import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../utils/api';

export default function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', formData);
      localStorage.setItem('token', res.data.token);
      navigate('/dashboard');
    } catch (err) {
      console.error(err.response?.data?.msg || err.message);
      alert(err.response?.data?.msg || 'Login failed');
    }
  };
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
          .glass-card {
            background: rgba(20, 31, 56, 0.7);
            backdrop-filter: blur(30px);
            border: 1px solid rgba(255, 255, 255, 0.05);
          }
          .neon-glow-primary {
            box-shadow: 0 0 20px -5px rgba(148, 170, 255, 0.4);
          }
          .bg-mesh {
            background-color: #060e20;
            background-image: 
              radial-gradient(at 0% 0%, rgba(148, 170, 255, 0.15) 0px, transparent 50%),
              radial-gradient(at 100% 100%, rgba(255, 81, 250, 0.15) 0px, transparent 50%),
              radial-gradient(at 50% 50%, rgba(142, 255, 113, 0.05) 0px, transparent 50%);
          }
        `
      }} />

      {/* Main Wrapper matching body styles */}
      <div className="bg-mesh min-h-screen flex items-center justify-center overflow-hidden p-6 flex-col">
        
        {/* Top Bar Component (Suppressed nav but showing Brand Logo) */}
        <header className="fixed top-0 w-full z-50 flex justify-between items-center px-6 py-4 bg-transparent backdrop-blur-xl">
          <Link to="/" className="text-2xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-blue-500 to-fuchsia-500 font-['Spline_Sans'] cursor-pointer">
            Scholar Sync
          </Link>
        </header>

        {/* Main Content Canvas */}
        <main className="relative w-full max-w-lg mt-12">
          {/* Background Decorative Elements */}
          <div className="absolute -top-24 -left-24 w-64 h-64 bg-[#94aaff]/20 rounded-full blur-[80px]"></div>
          <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-[#ff51fa]/20 rounded-full blur-[80px]"></div>
          
          {/* Glassmorphic Login Card */}
          <div className="glass-card p-8 md:p-12 rounded-4xl relative overflow-hidden">
            
            {/* Content */}
            <div className="relative z-10">
              <div className="mb-10 text-center">
                <span className="inline-block px-4 py-1 rounded-full bg-[#a900a9]/30 text-[#ff51fa] text-xs font-bold tracking-widest uppercase mb-4">
                  Academic Portal
                </span>
                <h1 className="text-5xl font-extrabold font-['Spline_Sans'] tracking-tighter text-[#dee5ff] mb-2">
                  Welcome Back
                </h1>
                <p className="text-[#a3aac4] text-sm font-medium">
                  Sync your schedule and crush your goals.
                </p>
              </div>
              
              <form className="space-y-6" onSubmit={handleLogin}>
                {/* Email Field */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold tracking-widest text-[#94aaff] uppercase ml-1" htmlFor="email">
                    Campus Email
                  </label>
                  <div className="group relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <span className="material-symbols-outlined text-[#6d758c] group-focus-within:text-[#ff51fa] transition-colors" style={{ fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>alternate_email</span>
                    </div>
                    <input 
                      className="w-full bg-[#192540]/50 border-0 rounded-md py-4 pl-12 pr-4 text-[#dee5ff] placeholder:text-[#6d758c]/50 focus:ring-2 focus:ring-[#ff51fa] focus:bg-[#192540] transition-all duration-300 outline-none" 
                      id="email" 
                      placeholder="name@scholar.edu" 
                      type="email" 
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center px-1">
                    <label className="block text-xs font-bold tracking-widest text-[#94aaff] uppercase" htmlFor="password">
                      Security Key
                    </label>
                    <a className="text-[10px] font-bold text-[#40485d] hover:text-[#ff51fa] transition-colors uppercase tracking-wider cursor-pointer" href="#">Forgot?</a>
                  </div>
                  <div className="group relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <span className="material-symbols-outlined text-[#6d758c] group-focus-within:text-[#ff51fa] transition-colors" style={{ fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>lock</span>
                    </div>
                    <input 
                      className="w-full bg-[#192540]/50 border-0 rounded-md py-4 pl-12 pr-4 text-[#dee5ff] placeholder:text-[#6d758c]/50 focus:ring-2 focus:ring-[#ff51fa] focus:bg-[#192540] transition-all duration-300 outline-none" 
                      id="password" 
                      placeholder="••••••••" 
                      type="password" 
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    />
                  </div>
                </div>

                {/* Action Button */}
                <div className="pt-4">
                  <button 
                    className="w-full py-4 rounded-full bg-gradient-to-r from-[#94aaff] to-[#809bff] text-[#001b61] font-black text-lg tracking-tight hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 neon-glow-primary cursor-pointer" 
                    type="submit"
                  >
                    Login
                  </button>
                </div>


              </form>

              <div className="mt-10 text-center">
                <p className="text-[#a3aac4] text-sm font-medium">
                  Don't have an account? 
                  <Link className="text-[#ff51fa] font-bold hover:underline underline-offset-4 ml-1 cursor-pointer" to="/signup">Sign up</Link>
                </p>
              </div>
            </div>
            
            {/* Asymmetric Design Element */}
            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-[#8eff71]/10 rounded-full blur-2xl"></div>
          </div>
          
          {/* Footer Caption */}
          <p className="text-center mt-8 text-[10px] text-[#6d758c] font-bold tracking-[0.2em] uppercase opacity-50">
            Powered by Neon Scholar OS • v2.4.0
          </p>
        </main>
      </div>
    </div>
  );
}