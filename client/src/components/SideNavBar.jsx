import { NavLink, Link } from "react-router-dom";

const navItems = [
  { icon: "dashboard", label: "Dashboard", to: "/dashboard" },
  { icon: "auto_stories", label: "My Courses", to: "/courses" },
  { icon: "assignment", label: "Assignments", to: "/assignments" },
  { icon: "grade", label: "Grades", to: "/grades" },
  { icon: "local_library", label: "Library", to: "/library" },
];

export default function SideNavBar() {
  return (
    <aside className="h-screen w-64 fixed left-0 top-0 overflow-y-auto bg-slate-50 dark:bg-slate-950 flex flex-col p-6 space-y-8 z-40 border-r border-transparent">
      {/* Brand */}
      <Link to="/" className="mb-2 hover:opacity-80 transition-opacity">
        <span className="text-lg font-bold text-slate-900 dark:text-slate-50 font-manrope">ScholarSync</span>
      </Link>

      {/* Profile */}
      <div className="flex items-center space-x-3 p-3 bg-slate-100 dark:bg-slate-900 rounded-3xl">
        <img
          className="w-10 h-10 rounded-full object-cover"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDo8FbTKqGovG8wXdZ1OR7knTSAhfv4nlTpl_G5jVCqS_-6z0EgKZ5qzxxczr4xEoc9AlPfeP7ePntjUF-rwX7fnaL2hLd__eZaJuaZ5A0nFSlHFfMMGr0Pkw53KN-4YiXYsViaDwmrUneYGnQxbHIbFL799MPX7-6n7Oj9JBikPjCV9uP08OjcP1P5GbqMa2wcx2SXwu0wTKt29WLDrbALsHcW0K-9prF5Bp6LUkozLkzjn2TsiA-fyXk7QdetWA7pVsWb6Iwzb6zM"
          alt="Student"
        />
        <div>
          <p className="font-manrope font-bold text-sm text-slate-900 dark:text-slate-50">Julian Academic</p>
          <p className="text-xs text-slate-500 dark:text-slate-400">Computer Science • Year 3</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              isActive
                ? "flex items-center space-x-3 p-3 bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm rounded-3xl font-bold font-manrope text-sm translate-x-1 duration-200"
                : "flex items-center space-x-3 p-3 text-slate-500 dark:text-slate-400 hover:bg-slate-200/50 dark:hover:bg-slate-800/50 rounded-3xl transition-all font-manrope font-medium text-sm"
            }
          >
            {({ isActive }) => (
              <>
                <span
                  className="material-symbols-outlined"
                  style={isActive ? { fontVariationSettings: "'FILL' 1" } : undefined}
                >
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Bottom Actions */}
      <div className="pt-4 border-t border-slate-200/50 dark:border-slate-800/50 space-y-2">
        <Link to="/dashboard" className="w-full flex items-center justify-center space-x-2 py-3 linear-soul text-on-primary rounded-full font-manrope font-bold text-sm mb-4">
          <span className="material-symbols-outlined text-sm">add</span>
          <span>New Research</span>
        </Link>
        <a className="flex items-center space-x-3 p-3 text-slate-500 dark:text-slate-400 hover:bg-slate-200/50 dark:hover:bg-slate-800/50 rounded-3xl transition-all font-manrope font-medium text-sm" href="#">
          <span className="material-symbols-outlined">settings</span>
          <span>Settings</span>
        </a>
        <Link to="/login" className="flex items-center space-x-3 p-3 text-slate-500 dark:text-slate-400 hover:bg-slate-200/50 dark:hover:bg-slate-800/50 rounded-3xl transition-all font-manrope font-medium text-sm">
          <span className="material-symbols-outlined">logout</span>
          <span>Logout</span>
        </Link>
      </div>
    </aside>
  );
}
