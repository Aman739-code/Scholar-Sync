import { Link } from "react-router-dom";

const footerSections = [
  {
    title: "Resources",
    links: [
      { label: "Contact Support", to: "/contact" },
      { label: "Help Center", to: "/help" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", to: "/privacy" },
      { label: "Terms of Service", to: "/terms" },
    ],
  },
  {
    title: "Social",
    links: [
      { label: "Instagram", to: "https://instagram.com", external: true },
      { label: "LinkedIn", to: "https://linkedin.com", external: true },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-slate-50 dark:bg-slate-950 w-full py-12 px-8">
      <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-8 max-w-7xl mx-auto">
        <div className="space-y-2">
          <Link to="/" className="font-manrope font-bold text-slate-900 dark:text-slate-50 text-xl hover:opacity-80 transition-opacity">
            ScholarSync
          </Link>
          <p className="font-inter text-xs text-slate-500 dark:text-slate-400">
            © {new Date().getFullYear()} ScholarSync. All rights reserved.
          </p>
        </div>

        <nav aria-label="Footer links" className="w-full md:w-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 font-inter text-xs text-center md:text-left">
            {footerSections.map((section) => (
              <div key={section.title} className="space-y-3">
                <h2 className="font-manrope font-semibold text-sm text-slate-800 dark:text-slate-100">
                  {section.title}
                </h2>
                <ul className="space-y-2">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      {link.external ? (
                        <a
                          href={link.to}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-slate-500 hover:text-blue-500 transition-colors duration-200"
                        >
                          {link.label}
                        </a>
                      ) : (
                        <Link
                          to={link.to}
                          className="text-slate-500 hover:text-blue-500 transition-colors duration-200"
                        >
                          {link.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </nav>
      </div>
    </footer>
  );
}
