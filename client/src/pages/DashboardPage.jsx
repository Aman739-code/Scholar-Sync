import { Link } from "react-router-dom";

export default function DashboardPage() {
  return (
    <div className="p-8 lg:p-12">
      {/* Dashboard Header */}
      <header className="mb-12">
        <h1 className="text-[3.5rem] font-extrabold tracking-tight leading-tight mb-2 text-on-background">
          Welcome back, Julian.
        </h1>
        <p className="text-on-surface-variant text-lg">You have 3 assignments due this week. Stay curious.</p>
      </header>

      {/* Dashboard Bento Grid */}
      <div className="grid grid-cols-12 gap-8">
        {/* Left Column */}
        <div className="col-span-12 lg:col-span-8 space-y-12">
          {/* Enrolled Courses */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold font-manrope">Enrolled Courses</h2>
              <Link to="/courses" className="text-primary font-semibold text-sm hover:underline">View All</Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Course Card 1 */}
              <Link to="/courses" className="group relative bg-surface-container-lowest rounded-3xl p-6 transition-all duration-300 hover:bg-surface-bright">
                <span className="absolute top-4 left-4 z-10 px-3 py-1 bg-tertiary-container text-on-tertiary-container text-[10px] font-bold uppercase rounded-full tracking-widest">In Progress</span>
                <div className="aspect-video w-full rounded-3xl overflow-hidden mb-6 bg-surface-container">
                  <img alt="Computer Science Course" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCUHaBHXlzHDEtyptu3DyJXlOc6j-ybndPrZWC0LI_VQKrD1n-MjXcvRrQTketSSNVGg44IA-PZebGLBzR6LausEkxPH9OAjiAGL-PUM5x7Gl-obhQwN6I0cnaZz7W3O_tCjwcIj9QZVXbxzdvUR4WQSTxlLNejW8B-joa1YBZLvtqXj7p0G4FjuhS0ZAVlTU0oiwuPD2zuIGB6te2E5M8Zh4HOXfwfkOoSpAfHi0rNKzbTWSyhJKZdOOtS_Hen56ZUG8Hbiloct88y" />
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">CS304 • Prof. Aris</span>
                  <h3 className="text-xl font-bold font-manrope group-hover:text-primary transition-colors">Advanced Algorithm Design</h3>
                  <div className="mt-4 flex items-center gap-3">
                    <div className="flex-1 h-1 bg-surface-container rounded-full overflow-hidden">
                      <div className="h-full bg-primary w-3/4 rounded-full"></div>
                    </div>
                    <span className="text-xs font-semibold text-on-surface-variant">75%</span>
                  </div>
                </div>
              </Link>
              {/* Course Card 2 */}
              <Link to="/courses" className="group relative bg-surface-container-lowest rounded-3xl p-6 transition-all duration-300 hover:bg-surface-bright">
                <span className="absolute top-4 left-4 z-10 px-3 py-1 bg-secondary-container text-on-secondary-container text-[10px] font-bold uppercase rounded-full tracking-widest">Next Up</span>
                <div className="aspect-video w-full rounded-3xl overflow-hidden mb-6 bg-surface-container">
                  <img alt="Mathematics Course" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB3g2nm1i5r0C6MO59z0JZmGZuOW9W2Rd1Y2z1TYBAz_ly60YwOxZQuuljEWgAjVtdbdgSjImWFU1Tl2Oo7ZPJIJOf49etOv9VORPwt1Sp4ZkzVkwfV7LxzTTP18m5PJAy9HucqqL8bulkZPHQH3Hzp6e01p-mBIxwMB2_tC69ltULEokC5UEpWj0SO9PtfanTfJuqv5zJ_adxjR7wX8lcRIyUKnsLakE1xQiN3A5lnJQBL6yqq6xUEq7sV3VasYxjC3HxuNCgzI0x5" />
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">MA210 • Dr. Lin</span>
                  <h3 className="text-xl font-bold font-manrope group-hover:text-primary transition-colors">Linear Algebra &amp; Logic</h3>
                  <div className="mt-4 flex items-center gap-3">
                    <div className="flex-1 h-1 bg-surface-container rounded-full overflow-hidden">
                      <div className="h-full bg-primary w-1/4 rounded-full"></div>
                    </div>
                    <span className="text-xs font-semibold text-on-surface-variant">25%</span>
                  </div>
                </div>
              </Link>
            </div>
          </section>

          {/* Weekly Schedule */}
          <section className="bg-surface-container-low rounded-3xl p-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold font-manrope">Weekly Schedule</h2>
              <div className="flex gap-2">
                <button className="w-8 h-8 flex items-center justify-center rounded-full bg-surface-container-lowest hover:bg-white transition-colors">
                  <span className="material-symbols-outlined text-sm">chevron_left</span>
                </button>
                <button className="w-8 h-8 flex items-center justify-center rounded-full bg-surface-container-lowest hover:bg-white transition-colors">
                  <span className="material-symbols-outlined text-sm">chevron_right</span>
                </button>
              </div>
            </div>
            <div className="grid grid-cols-7 gap-4">
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, i) => (
                <div key={day} className={`flex flex-col items-center gap-2 ${i >= 5 ? "opacity-40" : ""}`}>
                  <span className="text-[10px] font-bold text-on-surface-variant uppercase">{day}</span>
                  <div className={`w-full h-24 bg-surface-container-lowest rounded-3xl p-2 flex flex-col gap-1 ${i === 1 ? "ring-2 ring-primary" : ""}`}>
                    {i === 0 && (<><div className="w-full h-2 bg-primary rounded-full"></div><div className="w-full h-2 bg-tertiary-container rounded-full"></div></>)}
                    {i === 1 && (<><div className="w-full h-2 bg-primary rounded-full"></div><span className="text-[10px] font-bold text-center mt-2">TODAY</span></>)}
                    {i === 2 && <div className="w-full h-2 bg-secondary rounded-full"></div>}
                    {i === 4 && <div className="w-full h-2 bg-primary rounded-full"></div>}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right Column */}
        <div className="col-span-12 lg:col-span-4 space-y-8">
          {/* Upcoming Assignments */}
          <section className="bg-surface-container-lowest rounded-3xl p-8">
            <h2 className="text-xl font-bold font-manrope mb-6">Upcoming</h2>
            <div className="space-y-6">
              {[
                { month: "Oct", day: "24", title: "Dynamic Programming Lab", course: "Algorithm Design • 11:59 PM", highlight: true },
                { month: "Oct", day: "27", title: "Vector Spaces Quiz", course: "Linear Algebra • In Class", highlight: false },
                { month: "Nov", day: "02", title: "Neural Network Draft", course: "Machine Learning • Submission", highlight: false },
              ].map((item) => (
                <Link to="/assignments" key={item.title} className="flex gap-4 group cursor-pointer">
                  <div className={`flex-shrink-0 w-12 h-12 rounded-3xl flex flex-col items-center justify-center ${item.highlight ? "bg-primary-container text-on-primary-container" : "bg-surface-container text-on-surface-variant"}`}>
                    <span className="text-[10px] font-bold leading-none uppercase">{item.month}</span>
                    <span className="text-xl font-extrabold font-manrope leading-none">{item.day}</span>
                  </div>
                  <div className="flex flex-col overflow-hidden">
                    <h4 className="font-bold text-sm text-slate-900 group-hover:text-primary transition-colors truncate">{item.title}</h4>
                    <span className="text-xs text-on-surface-variant">{item.course}</span>
                  </div>
                </Link>
              ))}
            </div>
            <Link to="/assignments" className="block w-full mt-8 py-3 rounded-3xl bg-surface-container-low text-on-surface-variant font-bold text-xs hover:bg-surface-container transition-colors text-center">
              View Assignment Calendar
            </Link>
          </section>

          {/* Recent Grades */}
          <section className="bg-surface-container-lowest rounded-3xl p-8">
            <h2 className="text-xl font-bold font-manrope mb-6">Recent Grades</h2>
            <div className="space-y-4">
              {[
                { label: "Midterm Project", title: "System Architectures", grade: "94%" },
                { label: "Lab 04", title: "Database Indexing", grade: "88%" },
              ].map((item) => (
                <Link to="/grades" key={item.title} className="block p-4 rounded-3xl bg-surface-container-low hover:bg-surface-container transition-all flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-tighter">{item.label}</p>
                    <h4 className="font-bold text-sm">{item.title}</h4>
                  </div>
                  <div className="px-3 py-1 rounded-full bg-tertiary-container text-on-tertiary-container text-sm font-extrabold">{item.grade}</div>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-24 py-12 border-t border-surface-container">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 max-w-7xl mx-auto">
          <div className="flex flex-col gap-1 items-center md:items-start">
            <span className="font-manrope font-bold text-slate-900 text-lg tracking-tight">ScholarSync</span>
            <p className="font-inter text-xs text-slate-500">© 2024 ScholarSync. All rights reserved.</p>
          </div>
          <div className="flex gap-6">
            {["Privacy Policy", "Terms of Service", "Contact Support"].map((link) => (
              <a key={link} className="font-inter text-xs text-slate-500 hover:text-blue-500 transition-colors duration-200" href="#">{link}</a>
            ))}
          </div>
        </div>
      </footer>

      {/* FAB */}
      <button className="fixed bottom-8 right-8 w-14 h-14 rounded-full bg-primary text-on-primary shadow-2xl flex items-center justify-center hover:scale-110 transition-transform active:scale-95 z-50">
        <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>add</span>
      </button>
    </div>
  );
}
