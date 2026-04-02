import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-slate-50 dark:bg-slate-950 w-full py-12 px-8">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 max-w-7xl mx-auto">
        <div className="space-y-2">
          <Link to="/" className="font-manrope font-bold text-slate-900 dark:text-slate-50 text-xl hover:opacity-80 transition-opacity">
            ScholarSync
          </Link>
          <p className="font-inter text-xs text-slate-500 dark:text-slate-400">
            © 2024 ScholarSync. All rights reserved.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-6 font-inter text-xs">
          {["Privacy Policy", "Terms of Service", "Contact Support", "Instagram", "LinkedIn"].map((link) => (
            <a key={link} className="text-slate-500 hover:text-blue-500 transition-colors duration-200" href="#">
              {link}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
