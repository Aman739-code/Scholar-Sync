import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function TopNavBar() {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const { user } = useAuth();

  return (
    <nav className="fixed top-0 w-full z-50 bg-surface/80 dark:bg-slate-900/80 backdrop-blur-md transition-all duration-300">
      <div className="flex justify-between items-center w-full px-8 py-4 max-w-full mx-auto">
        <Link to="/" className="text-xl font-bold font-manrope text-slate-900 dark:text-slate-50 hover:opacity-80 transition-opacity">
          ScholarSync
        </Link>
        <div className="hidden md:flex items-center space-x-8 font-manrope font-semibold text-sm tracking-tight">
          <Link
            to="/"
            className={isHome
              ? "text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400 pb-1"
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-all duration-300"
            }
          >
            Home
          </Link>
          {user && (
            <Link
              to={user.role === "instructor" ? "/instructor/dashboard" : "/dashboard"}
              className={location.pathname.includes("dashboard")
                ? "text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400 pb-1"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-all duration-300"
              }
            >
              Dashboard
            </Link>
          )}
        </div>
        <div className="flex items-center gap-4">
          {user ? (
            <Link
              to={user.role === "instructor" ? "/instructor/dashboard" : "/dashboard"}
              className="linear-soul text-on-primary px-6 py-2.5 rounded-full font-manrope font-bold text-sm hover:opacity-90 active:scale-95 transition-all"
            >
              Go to Dashboard
            </Link>
          ) : (
            <Link
              to="/login"
              className="linear-soul text-on-primary px-6 py-2.5 rounded-full font-manrope font-bold text-sm hover:opacity-90 active:scale-95 transition-all"
            >
              Get Started
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
