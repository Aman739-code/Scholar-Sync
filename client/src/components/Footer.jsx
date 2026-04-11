import { Link } from "react-router-dom";

const footerSections = [
  {
    title: "Explore",
    links: [
      { label: "Home", to: "/" },
      { label: "Student Login", to: "/login" },
      { label: "Student Signup", to: "/signup" },
    ],
  },
  {
    title: "Instructors",
    links: [
      { label: "Instructor Login", to: "/instructor/login" },
      { label: "Instructor Signup", to: "/instructor/signup" },
      { label: "Contact Team", href: "mailto:support@scholarsync.app" },
    ],
  },
  {
    title: "Connect",
    links: [
      { label: "LinkedIn", href: "https://www.linkedin.com" },
      { label: "Instagram", href: "https://www.instagram.com" },
      { label: "Help Center", href: "mailto:help@scholarsync.app" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden w-full border-t border-slate-200/80 bg-linear-to-b from-slate-50 via-white to-slate-100 px-6 py-14 sm:px-8">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-sky-500 to-transparent" />
      <div className="mx-auto flex max-w-7xl flex-col gap-10">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:items-start">
          <div className="space-y-5">
            <span className="inline-flex items-center rounded-full border border-sky-200 bg-sky-50 px-3 py-1 font-inter text-[11px] font-semibold tracking-wide text-sky-700">
              Built for Focused Learning
            </span>
            <div className="space-y-3">
              <Link to="/" className="inline-flex font-manrope text-3xl font-extrabold tracking-tight text-slate-900 transition-opacity hover:opacity-80">
                ScholarSync
              </Link>
              <p className="max-w-xl font-inter text-sm leading-6 text-slate-600">
                Stay organized across classes, assignments, and resources with one streamlined academic workspace.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Link to="/signup" className="inline-flex items-center rounded-full bg-slate-900 px-4 py-2 font-inter text-xs font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-800">
                Get Started Free
              </Link>
              <Link to="/login" className="inline-flex items-center rounded-full border border-slate-300 bg-white px-4 py-2 font-inter text-xs font-semibold text-slate-700 transition-colors duration-200 hover:border-slate-400 hover:text-slate-900">
                Sign In
              </Link>
            </div>
          </div>

          <nav aria-label="Footer links" className="w-full">
            <div className="grid grid-cols-1 gap-7 sm:grid-cols-3">
              {footerSections.map((section) => (
                <div key={section.title} className="space-y-3">
                  <h2 className="font-manrope text-sm font-bold uppercase tracking-wide text-slate-900">
                    {section.title}
                  </h2>
                  <ul className="space-y-2.5">
                    {section.links.map((link) => (
                      <li key={link.label}>
                        {link.to ? (
                          <Link
                            to={link.to}
                            className="font-inter text-sm text-slate-600 transition-colors duration-200 hover:text-slate-900"
                          >
                            {link.label}
                          </Link>
                        ) : (
                          <a
                            href={link.href}
                            target={link.href?.startsWith("http") ? "_blank" : undefined}
                            rel={link.href?.startsWith("http") ? "noreferrer" : undefined}
                            className="font-inter text-sm text-slate-600 transition-colors duration-200 hover:text-slate-900"
                          >
                            {link.label}
                          </a>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </nav>
        </div>

        <div className="flex flex-col gap-3 border-t border-slate-200/80 pt-5 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-inter">© {new Date().getFullYear()} ScholarSync. All rights reserved.</p>
          <p className="font-inter">Made for students, instructors, and focused academic teams.</p>
        </div>
      </div>
    </footer>
  );
}
