import React, { useState } from 'react';
import api from '../utils/api';

export default function ScholarSyncSupportHub() {
  const [ticket, setTicket] = useState({ subject: 'Technical Issue', urgency: 'Medium', description: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!ticket.description.trim()) {
      return alert('Please describe the issue.');
    }
    try {
      await api.post('/support/ticket', ticket);
      alert('Support ticket submitted successfully!');
      setTicket({ ...ticket, description: '' });
    } catch (err) {
      console.error(err);
      alert('Failed to submit ticket');
    }
  };

  return (
    <div className="w-full">
      {/* Custom Styles */}
      <style dangerouslySetInnerHTML={{
        __html: `
          .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
            display: inline-block;
            vertical-align: middle;
          }
          .neon-glow-primary {
            box-shadow: 0 0 20px -5px rgba(148, 170, 255, 0.3);
          }
          .glass-panel {
            backdrop-filter: blur(20px);
            background: rgba(25, 37, 64, 0.4);
          }
          ::-webkit-scrollbar { width: 8px; }
          ::-webkit-scrollbar-track { background: #060e20; }
          ::-webkit-scrollbar-thumb { background: #192540; border-radius: 10px; }
        `
      }} />
      <div className="w-full">
        
        {/* Hero Search Section */}
        <section className="max-w-5xl mx-auto mb-16 text-center">
          <span className="text-[#ff51fa] font-['Spline_Sans'] font-bold text-sm tracking-[0.2em] uppercase mb-4 block">Knowledge Base</span>
          <h1 className="text-5xl md:text-7xl font-black font-['Spline_Sans'] tracking-tighter mb-8 bg-gradient-to-r from-[#dee5ff] via-[#94aaff] to-[#ff51fa] bg-clip-text text-transparent">
            How can we sync up?
          </h1>
          <div className="relative max-w-2xl mx-auto group">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#94aaff] via-[#ff51fa] to-[#8eff71] rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative flex items-center bg-[#192540] rounded-full px-6 py-4 border border-[#40485d]/20 shadow-2xl">
              <span className="material-symbols-outlined text-[#94aaff] mr-4" data-icon="search">search</span>
              <input 
                className="bg-transparent border-none outline-none focus:ring-0 text-[#dee5ff] w-full font-['Plus_Jakarta_Sans'] placeholder:text-[#6d758c]" 
                placeholder="Search for technical issues, curriculum guides..." 
                type="text" 
              />
              <kbd className="hidden sm:inline-block px-2 py-1 bg-[#091328] text-xs text-[#6d758c] rounded-md font-sans">CMD + K</kbd>
            </div>
          </div>
        </section>

        {/* Bento Categories */}
        <section className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {/* Technical Issues */}
          <div className="group p-8 rounded-3xl bg-[#091328] hover:bg-[#141f38] transition-all duration-500 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#94aaff]/5 rounded-full -mr-16 -mt-16 blur-3xl group-hover:bg-[#94aaff]/20 transition-colors"></div>
            <div className="w-14 h-14 rounded-3xl bg-[#94aaff]/10 flex items-center justify-center mb-6 border border-[#94aaff]/20">
              <span className="material-symbols-outlined text-[#94aaff] text-3xl" data-icon="build">build</span>
            </div>
            <h3 className="text-2xl font-bold font-['Spline_Sans'] mb-3 text-[#dee5ff]">Technical Issues</h3>
            <p className="text-[#a3aac4] text-sm leading-relaxed mb-6">Troubleshoot login, performance lag, and mobile app syncing problems.</p>
            <a className="inline-flex items-center text-[#94aaff] font-bold text-sm group-hover:gap-2 transition-all" href="#">
              Explore Articles <span className="material-symbols-outlined text-xs ml-1" data-icon="arrow_forward">arrow_forward</span>
            </a>
          </div>

          {/* Curriculum Help */}
          <div className="group p-8 rounded-3xl bg-[#091328] hover:bg-[#141f38] transition-all duration-500 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#8eff71]/5 rounded-full -mr-16 -mt-16 blur-3xl group-hover:bg-[#8eff71]/20 transition-colors"></div>
            <div className="w-14 h-14 rounded-3xl bg-[#8eff71]/10 flex items-center justify-center mb-6 border border-[#8eff71]/20">
              <span className="material-symbols-outlined text-[#8eff71] text-3xl" data-icon="menu_book">menu_book</span>
            </div>
            <h3 className="text-2xl font-bold font-['Spline_Sans'] mb-3 text-[#dee5ff]">Curriculum Help</h3>
            <p className="text-[#a3aac4] text-sm leading-relaxed mb-6">Guides on module completion, credit recovery, and subject-specific resources.</p>
            <a className="inline-flex items-center text-[#8eff71] font-bold text-sm group-hover:gap-2 transition-all" href="#">
              View Guides <span className="material-symbols-outlined text-xs ml-1" data-icon="arrow_forward">arrow_forward</span>
            </a>
          </div>

          {/* Community Guidelines */}
          <div className="group p-8 rounded-3xl bg-[#091328] hover:bg-[#141f38] transition-all duration-500 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#ff51fa]/5 rounded-full -mr-16 -mt-16 blur-3xl group-hover:bg-[#ff51fa]/20 transition-colors"></div>
            <div className="w-14 h-14 rounded-3xl bg-[#ff51fa]/10 flex items-center justify-center mb-6 border border-[#ff51fa]/20">
              <span className="material-symbols-outlined text-[#ff51fa] text-3xl" data-icon="verified_user">verified_user</span>
            </div>
            <h3 className="text-2xl font-bold font-['Spline_Sans'] mb-3 text-[#dee5ff]">Community Guidelines</h3>
            <p className="text-[#a3aac4] text-sm leading-relaxed mb-6">Rules for Squad interactions, Leaderboard sportsmanship, and safety.</p>
            <a className="inline-flex items-center text-[#ff51fa] font-bold text-sm group-hover:gap-2 transition-all" href="#">
              Read Rules <span className="material-symbols-outlined text-xs ml-1" data-icon="arrow_forward">arrow_forward</span>
            </a>
          </div>
        </section>

        {/* FAQ & Ticket Form Split */}
        <section className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* FAQ Accordion */}
          <div>
            <h2 className="text-3xl font-black font-['Spline_Sans'] mb-8 flex items-center gap-3 text-[#dee5ff]">
              <span className="w-2 h-8 bg-[#94aaff] rounded-full"></span>
              Quick Answers
            </h2>
            <div className="space-y-4">
              <div className="bg-[#141f38] rounded-3xl p-6 cursor-pointer border-l-4 border-transparent hover:border-[#94aaff] transition-all text-[#dee5ff]">
                <div className="flex justify-between items-center">
                  <h4 className="font-bold text-lg">How do I reset my Study Pulse timer?</h4>
                  <span className="material-symbols-outlined" data-icon="expand_more">expand_more</span>
                </div>
              </div>
              
              <div className="bg-[#141f38] rounded-3xl p-6 cursor-pointer border-l-4 border-[#94aaff] transition-all text-[#dee5ff]">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-bold text-lg text-[#94aaff]">Can I sync credits with external apps?</h4>
                  <span className="material-symbols-outlined rotate-180" data-icon="expand_less">expand_less</span>
                </div>
                <p className="text-[#a3aac4] text-sm">Currently, Scholar Sync supports direct integration with Canvas and Google Classroom. Navigate to Settings &gt; Integrations to link your accounts and begin auto-syncing your study hours.</p>
              </div>
              
              <div className="bg-[#141f38] rounded-3xl p-6 cursor-pointer border-l-4 border-transparent hover:border-[#94aaff] transition-all text-[#dee5ff]">
                <div className="flex justify-between items-center">
                  <h4 className="font-bold text-lg">Why is my rank not updating?</h4>
                  <span className="material-symbols-outlined" data-icon="expand_more">expand_more</span>
                </div>
              </div>
              
              <div className="bg-[#141f38] rounded-3xl p-6 cursor-pointer border-l-4 border-transparent hover:border-[#94aaff] transition-all text-[#dee5ff]">
                <div className="flex justify-between items-center">
                  <h4 className="font-bold text-lg">How to join a private Squad?</h4>
                  <span className="material-symbols-outlined" data-icon="expand_more">expand_more</span>
                </div>
              </div>
            </div>
          </div>

          {/* Ticket Form */}
          <div className="bg-[#091328] p-10 rounded-4xl border border-[#40485d]/10 relative">
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-[#ff51fa]/10 blur-3xl -z-10"></div>
            <h2 className="text-3xl font-black font-['Spline_Sans'] mb-4 text-[#dee5ff]">Open a Ticket</h2>
            <p className="text-[#a3aac4] mb-8 text-sm">Can't find what you need? Our Academic Architects are here to help. Expect a reply within 24 hours.</p>
            
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-[#6d758c] uppercase tracking-wider ml-1">Subject Area</label>
                  <select 
                    className="w-full bg-[#192540] border-none rounded-lg p-3 text-[#dee5ff] outline-none focus:ring-2 focus:ring-[#94aaff]"
                    value={ticket.subject}
                    onChange={(e) => setTicket({ ...ticket, subject: e.target.value })}
                  >
                    <option value="Technical Issue">Technical Issue</option>
                    <option value="Curriculum Bug">Curriculum Bug</option>
                    <option value="Account Security">Account Security</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-[#6d758c] uppercase tracking-wider ml-1">Urgency</label>
                  <select 
                    className="w-full bg-[#192540] border-none rounded-lg p-3 text-[#dee5ff] outline-none focus:ring-2 focus:ring-[#ff51fa]"
                    value={ticket.urgency}
                    onChange={(e) => setTicket({ ...ticket, urgency: e.target.value })}
                  >
                    <option value="Low">Low - Normal</option>
                    <option value="Medium">Medium - Urgent</option>
                    <option value="Critical">High - Immediate</option>
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#6d758c] uppercase tracking-wider ml-1">Describe the Glitch</label>
                <textarea 
                  className="w-full bg-[#192540] border-none outline-none rounded-lg p-3 text-[#dee5ff] focus:ring-2 focus:ring-[#94aaff] resize-none" 
                  placeholder="Briefly explain what's happening..." 
                  rows="4"
                  value={ticket.description}
                  onChange={(e) => setTicket({ ...ticket, description: e.target.value })}
                ></textarea>
              </div>
              <button 
                className="w-full bg-gradient-to-r from-[#94aaff] to-[#809bff] text-[#00257b] font-bold py-4 rounded-full shadow-lg shadow-[#94aaff]/20 hover:scale-[1.02] active:scale-95 transition-all" 
                type="submit"
              >
                Submit Sync Request
              </button>
            </form>
          </div>
        </section>

        {/* Live Chat Floating Action */}
        <div className="fixed bottom-10 right-10 z-50">
          <button className="flex items-center gap-3 bg-[#ff51fa] text-white px-6 py-4 rounded-full font-bold shadow-2xl hover:-translate-y-2 transition-all group overflow-hidden relative">
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            <span className="material-symbols-outlined relative z-10" data-icon="forum">forum</span>
            <span className="relative z-10">Live Chat Pulse</span>
            <div className="w-3 h-3 bg-[#8eff71] rounded-full animate-pulse border-2 border-[#ff51fa] relative z-10"></div>
          </button>
        </div>

      </div>
    </div>
  );
}