import React, { useState, useEffect } from 'react';
import api from '../utils/api';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [enrollments, setEnrollments] = useState([]);
  const [quests, setQuests] = useState([]);
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userRes, enrollRes, questRes, newsRes] = await Promise.all([
          api.get('/users/profile').catch(() => ({ data: null })),
          api.get('/courses/my-enrollments').catch(() => ({ data: [] })),
          api.get('/quests').catch(() => ({ data: [] })),
          api.get('/community/news').catch(() => ({ data: [] }))
        ]);
        if (userRes.data) setUser(userRes.data);
        if (enrollRes.data) setEnrollments(enrollRes.data.slice(0, 3));
        if (questRes.data) setQuests(questRes.data.slice(0, 3));
        if (newsRes.data) setNews(newsRes.data.slice(0, 3));
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="flex flex-col gap-10 w-full">
          {/* Header Section */}
          <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div>
              <h1 className="font-['Spline_Sans'] text-5xl font-black tracking-tighter text-[#dee5ff] leading-none">Welcome back, {user?.name ? user.name.split(' ')[0] : 'Scholar'}.</h1>
              <p className="text-[#a3aac4] mt-2 text-lg">Your trajectory is optimal. {quests.length} active quests remain.</p>
            </div>
            <div className="flex gap-4">
              <div className="bg-[#141f38] p-4 rounded-3xl flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#8eff71]/10 flex items-center justify-center">
                  <span className="material-symbols-outlined text-[#8eff71]" style={{ fontVariationSettings: "'FILL' 1" }}>local_fire_department</span>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-[#a3aac4] font-bold">Streak</p>
                  <p className="text-2xl font-black text-white">{user?.streak || 0} Days</p>
                </div>
              </div>
            </div>
          </header>

          {/* Bento Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            
            {/* Main Course Progress (Large Bento) */}
            <div className="md:col-span-8 bg-[#192540]/40 backdrop-blur-xl border border-white/5 p-8 rounded-4xl flex flex-col gap-8 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#94aaff]/5 blur-[100px] pointer-events-none"></div>
              
              <div className="flex justify-between items-center">
                <h2 className="font-['Spline_Sans'] text-2xl font-bold tracking-tight">Active Curriculum</h2>
                <span className="text-[#94aaff] text-sm font-bold flex items-center gap-1 cursor-pointer">View All <span className="material-symbols-outlined text-xs">arrow_forward</span></span>
              </div>

              <div className="flex flex-col gap-6">
                {enrollments.length > 0 ? enrollments.map((enr, i) => {
                  const colors = ['#8eff71', '#ff51fa', '#94aaff'];
                  const color = colors[i % colors.length];
                  return (
                    <div key={enr._id} className="flex flex-col gap-3">
                      <div className="flex justify-between items-end">
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#94aaff] mb-1 block" style={{color: color}}>{enr.course?.category || 'COURSE'}</span>
                          <h3 className="text-lg font-bold">{enr.course?.title || 'Unknown Course'}</h3>
                        </div>
                        <span className="font-black text-sm" style={{color: color}}>{enr.progressPercentage}% Complete</span>
                      </div>
                      <div className="h-2 w-full bg-[#192540]/20 rounded-full overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: `${enr.progressPercentage}%`, backgroundColor: color, boxShadow: `0 0 15px ${color}80` }}></div>
                      </div>
                    </div>
                  );
                }) : (
                  <p className="text-[#a3aac4] text-sm">No active curriculum found. Enroll in a course to start your journey.</p>
                )}
              </div>
            </div>

            {/* Upcoming Quests (Small Bento) */}
            <div className="md:col-span-4 bg-[#141f38] p-8 rounded-4xl flex flex-col gap-6">
              <h2 className="font-['Spline_Sans'] text-2xl font-bold tracking-tight">Active Quests</h2>
              
              <div className="flex flex-col gap-4">
                {quests.length > 0 ? quests.map((quest, i) => {
                  const icons = ['bolt', 'assignment', 'science'];
                  const colors = ['#ff51fa', '#94aaff', '#8eff71'];
                  const icon = icons[i % icons.length];
                  const color = colors[i % colors.length];
                  
                  return (
                    <div key={quest._id} className="bg-[#091328] p-4 rounded-2xl flex gap-4 items-center group cursor-pointer hover:bg-[#0f1930] transition-colors">
                      <div className="w-10 h-10 rounded-2xl bg-[#192540] flex items-center justify-center" style={{ color: color }}>
                        <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>{icon}</span>
                      </div>
                      <div>
                        <h4 className="text-sm font-bold">{quest.title}</h4>
                        <p className="text-xs text-[#a3aac4]">{quest.type} • {quest.dueDate ? new Date(quest.dueDate).toLocaleDateString() : 'No due date'}</p>
                      </div>
                    </div>
                  );
                }) : (
                  <p className="text-[#a3aac4] text-sm">No active quests. You are all caught up!</p>
                )}
              </div>

              <button className="mt-auto py-3 rounded-full border border-[#40485d] text-sm font-bold text-[#dee5ff] hover:bg-white/5 transition-colors cursor-pointer">Open Quest Log</button>
            </div>

            {/* Recent Activity / Squad (Medium Bento) */}
            <div className="md:col-span-7 bg-[#192540]/40 backdrop-blur-xl border border-white/5 p-8 rounded-4xl">
              <div className="flex justify-between items-center mb-8">
                <h2 className="font-['Spline_Sans'] text-2xl font-bold tracking-tight">Squad Activity</h2>
                <div className="flex -space-x-3">
                  <img className="w-10 h-10 rounded-full border-4 border-[#141f38] object-cover" data-alt="Profile photo of a young student" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCNH1LALgLHuE9e4JwrdvdLYOYN1aQ05VerB_ajslnlYcJVuwEL_JKVfuj5151VX6OoQuAMhMP9w8_-nZ3VuECR-0-QSoZEXMLQOvahM9HXtJ8M79sfq4kcV8Sf3ZiJXUsCEQr4QOhS03Rr5uEVlrCZ3HveXYP-1jFrx204zM8YRLHJU0EJFpAYOP8wJQHFMQJc0_N3CusNoo41lQW8IQgmMnMqb0VJ47fB-yHswAFRkE75kVjhrlGiMuUSKho-SDukuNI-AWW6Mrw" />
                  <img className="w-10 h-10 rounded-full border-4 border-[#141f38] object-cover" data-alt="Profile photo of a male student" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDn1yN2SmoW2Alpz86WsthOsE07GrScnGenSHuBmJUhnlvZ59z8PDBzzjEtQIuyEw2oQjq4Xt7U4M4-KFKipC6rPAEgP0XTPPs2qOZmAYizT431V0ipcEPJ1pmBNUk6zndhY1bdkvWPMMDPP2F1VPvZbywinqhHy6XkZ0DUGyfCwAAJazael21Cfn94Uj46TwXoeWR9yJ4ie2KVQ8V6xrG_3DT9i1-WspEn4i1UaYLkh28gZJpTMFCGqucaNkDq7qoz0ytsMFgyoyU" />
                  <img className="w-10 h-10 rounded-full border-4 border-[#141f38] object-cover" data-alt="Profile photo of a female student" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCmWt3ZmfkrDY0ziJyRaCtSrYW-JKcjkJAKzFosiQj2_MbGvvel4F-s71EjHdzYkf8gwjTcbA8-IP6S_L0JaxsxXCl0E3cfSysXex8JM-I6lX7hYyso4qs-MbbvwW7k7b65O80r6FKEl19b3n8kLAwKsVMAOZ_VmawcsKNnYqh5DNkfG-4oRz2l-_4lQ-95AW7viA2UHdmYlPP35bRBd2UZL07CcUDTC0vMPKiWBtqFkVYS9J5yxzqnsez0QFzSzYu03WET8yuwkHU" />
                  <div className="w-10 h-10 rounded-full border-4 border-[#141f38] bg-[#192540] flex items-center justify-center text-[10px] font-bold">+12</div>
                </div>
              </div>
              
              <div className="space-y-6">
                {news.length > 0 ? news.map((item, i) => {
                  const colors = ['#94aaff', '#ff51fa', '#6d758c'];
                  const color = colors[i % colors.length];
                  return (
                    <div key={item._id} className="flex gap-4 items-start">
                      <div className="w-2 h-2 rounded-full mt-2" style={{ backgroundColor: color }}></div>
                      <div className="flex-grow">
                        <p className="text-sm">
                          <span className="font-bold text-white">{item.category}</span> - {item.title}
                        </p>
                        <span className="text-xs text-[#a3aac4]">{new Date(item.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  );
                }) : (
                  <p className="text-[#a3aac4] text-sm">No recent activity.</p>
                )}
              </div>
            </div>

            {/* Learning Analytics (Medium Bento) */}
            <div className="md:col-span-5 bg-[#091328] p-8 rounded-4xl flex flex-col">
              <h2 className="font-['Spline_Sans'] text-2xl font-bold tracking-tight mb-6">Velocity</h2>
              
              <div className="flex-grow flex items-end justify-between gap-2 h-48">
                <div className="flex flex-col items-center gap-2 w-full">
                  <div className="w-full bg-[#192540] rounded-full h-24 relative overflow-hidden">
                    <div className="absolute bottom-0 w-full bg-[#94aaff] h-[60%]"></div>
                  </div>
                  <span className="text-[10px] font-bold text-[#a3aac4]">MON</span>
                </div>
                
                <div className="flex flex-col items-center gap-2 w-full">
                  <div className="w-full bg-[#192540] rounded-full h-32 relative overflow-hidden">
                    <div className="absolute bottom-0 w-full bg-[#94aaff] h-[85%]"></div>
                  </div>
                  <span className="text-[10px] font-bold text-[#a3aac4]">TUE</span>
                </div>
                
                <div className="flex flex-col items-center gap-2 w-full">
                  <div className="w-full bg-[#192540] rounded-full h-20 relative overflow-hidden">
                    <div className="absolute bottom-0 w-full bg-[#94aaff] h-[40%]"></div>
                  </div>
                  <span className="text-[10px] font-bold text-[#a3aac4]">WED</span>
                </div>
                
                <div className="flex flex-col items-center gap-2 w-full">
                  <div className="w-full bg-[#192540] rounded-full h-40 relative overflow-hidden">
                    <div className="absolute bottom-0 w-full bg-[#8eff71] h-[100%]"></div>
                  </div>
                  <span className="text-[10px] font-bold text-[#a3aac4] text-[#8eff71]">THU</span>
                </div>
                
                <div className="flex flex-col items-center gap-2 w-full">
                  <div className="w-full bg-[#192540] rounded-full h-28 relative overflow-hidden">
                    <div className="absolute bottom-0 w-full bg-[#94aaff] h-[0%]"></div>
                  </div>
                  <span className="text-[10px] font-bold text-[#a3aac4]">FRI</span>
                </div>
              </div>

              <div className="mt-6 p-4 bg-[#192540] rounded-2xl">
                <p className="text-xs font-medium text-[#a3aac4]">Study hours increased by <span className="text-[#8eff71] font-bold">+24%</span> compared to last week.</p>
              </div>
            </div>

          </div>
    </div>
  );
}