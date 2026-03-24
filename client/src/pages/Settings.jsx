import React, { useState, useEffect } from 'react';
import api from '../utils/api';

export default function ScholarSyncSettings() {
  const [user, setUser] = useState({ name: '', email: '', bio: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get('/users/profile');
        setUser({
          name: res.data.name || '',
          email: res.data.email || '',
          bio: res.data.bio || ''
        });
      } catch (err) {
        console.error('Failed to load profile', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleSave = async () => {
    try {
      await api.put('/users/profile', { name: user.name, bio: user.bio });
      alert('Profile updated successfully!');
    } catch (err) {
      console.error(err);
      alert('Failed to update profile');
    }
  };

  if (loading) return <div className="text-[#dee5ff] p-8">Loading settings...</div>;

  return (
    <div className="w-full font-['Plus_Jakarta_Sans']">
      {/* Custom Styles */}
      <style dangerouslySetInnerHTML={{
        __html: `
          .glass-panel {
            background: rgba(25, 37, 64, 0.4);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
          }
          .neon-glow-primary {
            box-shadow: 0 0 20px -5px rgba(148, 170, 255, 0.3);
          }
        `
      }} />
      <div className="w-full">
        {/* Header Section */}
        <header className="mb-12">
          <h1 className="font-['Spline_Sans'] text-5xl font-black tracking-tighter text-[#dee5ff] mb-2">Account Settings</h1>
          <p className="text-[#a3aac4] text-lg">Manage your digital presence and academic environment.</p>
        </header>

        {/* Settings Grid (Bento Style) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Profile Section */}
          <section className="lg:col-span-7 bg-[#091328] rounded-4xl p-8 glass-panel border border-[#40485d]/10 neon-glow-primary">
            <div className="flex items-center gap-6 mb-8">
              <div className="relative group">
                <div className="h-24 w-24 rounded-full overflow-hidden border-4 border-[#94aaff]">
                  <img className="w-full h-full object-cover" data-alt="Student Portrait in Neon Light" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCq5AuGjv84scJu90ZO-9p2SYknlsLpFrOpp9UJtrbNFWVD-M2FLd6I0vsbwz2Y38BocWPNMzfRvQ8TYQFE0oVninl4CvAIhKdgMiCuPOkuyNWDFRFmejocRwbIXDvvaf6EEhkeCxp473DtTJz4xnpq9D-XlBCny5IKVkOMB9VYM-1ZtDad40ZlHdkiuMaxXNovEzhRGo5GfC3NkHr9DADSAxBfC4lIuFPudF86DOVkyEYQfZbzS30lEY2Uy6KV_xsEef810d9eZ3Y" alt="" />
                </div>
                <button className="absolute bottom-0 right-0 bg-[#94aaff] text-[#00257b] p-2 rounded-full shadow-lg active:scale-90 transition-transform">
                  <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>photo_camera</span>
                </button>
              </div>
              <div>
                <h2 className="text-2xl font-['Spline_Sans'] font-bold text-[#dee5ff]">{user.name || 'Scholar'}</h2>
                <p className="text-[#3367ff] font-medium">B.Sc Computer Science • Senior</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-widest text-[#94aaff]/70 px-1">Display Name</label>
                  <input 
                    className="w-full bg-[#192540] border-none rounded-md px-4 py-3 focus:ring-2 focus:ring-[#94aaff]/50 text-[#dee5ff] outline-none transition-all" 
                    type="text" 
                    value={user.name}
                    onChange={(e) => setUser({ ...user, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-widest text-[#94aaff]/70 px-1">Email Address</label>
                  <input 
                    className="w-full bg-[#192540] border-none rounded-md px-4 py-3 focus:ring-2 focus:ring-[#94aaff]/50 text-[#dee5ff] outline-none transition-all" 
                    type="email" 
                    value={user.email}
                    disabled
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-widest text-[#94aaff]/70 px-1">Bio</label>
                <textarea 
                  className="w-full bg-[#192540] border-none rounded-md px-4 py-3 focus:ring-2 focus:ring-[#94aaff]/50 text-[#dee5ff] resize-none outline-none transition-all" 
                  rows="3"
                  value={user.bio}
                  onChange={(e) => setUser({ ...user, bio: e.target.value })}
                  placeholder="Focusing on AI Ethics and Web3 Infrastructure..."
                ></textarea>
              </div>
              <button onClick={handleSave} className="bg-gradient-to-br from-[#94aaff] to-[#809bff] text-[#001b61] font-bold px-8 py-3 rounded-full hover:shadow-[0_0_15px_rgba(148,170,255,0.4)] transition-all active:scale-95 font-['Spline_Sans'] cursor-pointer">
                Save Profile Changes
              </button>
            </div>
          </section>

          {/* Notification Toggles */}
          <section className="lg:col-span-5 bg-[#091328] rounded-4xl p-8 glass-panel border border-[#40485d]/10">
            <h3 className="text-xl font-['Spline_Sans'] font-bold text-[#dee5ff] mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-[#ff51fa]" style={{ fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>notifications_active</span>
              Notifications
            </h3>
            <div className="space-y-6">
              <div className="flex items-center justify-between group">
                <div>
                  <p className="font-bold text-[#dee5ff]">Squad Alerts</p>
                  <p className="text-xs text-[#a3aac4]">Instant pings from your study group</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input defaultChecked className="sr-only peer" type="checkbox" />
                  <div className="w-12 h-6 bg-[#192540] rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-[#ff51fa] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between group">
                <div>
                  <p className="font-bold text-[#dee5ff]">Assignment Reminders</p>
                  <p className="text-xs text-[#a3aac4]">24h before submission deadlines</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input defaultChecked className="sr-only peer" type="checkbox" />
                  <div className="w-12 h-6 bg-[#192540] rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-[#ff51fa] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between group">
                <div>
                  <p className="font-bold text-[#dee5ff]">Achievement Unlocks</p>
                  <p className="text-xs text-[#a3aac4]">Celebrate milestones and badges</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input className="sr-only peer" type="checkbox" />
                  <div className="w-12 h-6 bg-[#192540] rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-[#ff51fa] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                </label>
              </div>
            </div>
          </section>

          {/* Security Section */}
          <section className="lg:col-span-5 bg-[#091328] rounded-4xl p-8 glass-panel border border-[#40485d]/10">
            <h3 className="text-xl font-['Spline_Sans'] font-bold text-[#dee5ff] mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-[#94aaff]" style={{ fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>security</span>
              Security
            </h3>
            <div className="space-y-4">
              <button className="w-full flex items-center justify-between p-4 bg-[#192540] rounded-md hover:bg-[#1f2b49] transition-colors text-[#dee5ff]">
                <span className="font-medium">Change Password</span>
                <span className="material-symbols-outlined text-[#a3aac4]" style={{ fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>chevron_right</span>
              </button>
              <button className="w-full flex items-center justify-between p-4 bg-[#192540] rounded-md hover:bg-[#1f2b49] transition-colors text-[#dee5ff]">
                <span className="font-medium">Two-Factor Auth</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] bg-[#2ff801]/20 text-[#8eff71] font-bold">ENABLED</span>
              </button>
              <button className="w-full flex items-center justify-between p-4 bg-[#192540] rounded-md hover:bg-[#1f2b49] transition-colors text-[#dee5ff]">
                <span className="font-medium">Connected Devices</span>
                <span className="text-xs text-[#a3aac4]">3 Active</span>
              </button>
            </div>
          </section>

          {/* Theme Presets (Visual Cards) */}
          <section className="lg:col-span-7 bg-[#091328] rounded-4xl p-8 glass-panel border border-[#40485d]/10">
            <h3 className="text-xl font-['Spline_Sans'] font-bold text-[#dee5ff] mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-[#8eff71]" style={{ fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>palette</span>
              Neon Presets
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              
              {/* Preset 1 */}
              <div className="relative group cursor-pointer border-2 border-[#94aaff] rounded-3xl overflow-hidden p-4 bg-[#94aaff]/5 transition-all">
                <div className="absolute top-2 right-2">
                  <span className="material-symbols-outlined text-[#94aaff]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                </div>
                <div className="h-12 w-full rounded bg-gradient-to-r from-[#94aaff] to-[#809bff] mb-3 shadow-[0_0_10px_rgba(148,170,255,0.4)]"></div>
                <p className="text-sm font-bold text-[#dee5ff]">Cyber Blue</p>
                <p className="text-[10px] text-[#a3aac4] uppercase tracking-tighter">Current Active</p>
              </div>
              
              {/* Preset 2 */}
              <div className="group cursor-pointer border-2 border-transparent hover:border-[#ff51fa]/30 rounded-3xl overflow-hidden p-4 bg-[#192540] transition-all">
                <div className="h-12 w-full rounded bg-gradient-to-r from-[#ff51fa] to-[#a900a9] mb-3 opacity-80 group-hover:opacity-100 group-hover:shadow-[0_0_10px_rgba(255,81,250,0.4)]"></div>
                <p className="text-sm font-bold text-[#dee5ff]">Retrowave Pink</p>
              </div>
              
              {/* Preset 3 */}
              <div className="group cursor-pointer border-2 border-transparent hover:border-[#8eff71]/30 rounded-3xl overflow-hidden p-4 bg-[#192540] transition-all">
                <div className="h-12 w-full rounded bg-gradient-to-r from-[#8eff71] to-[#2ff801] mb-3 opacity-80 group-hover:opacity-100 group-hover:shadow-[0_0_10px_rgba(142,255,113,0.4)]"></div>
                <p className="text-sm font-bold text-[#dee5ff]">Acid Green</p>
              </div>
              
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}