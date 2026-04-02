import { useEffect } from "react";

export default function GlobalStyles() {
  useEffect(() => {
    // Google Fonts
    const fontLink = document.createElement("link");
    fontLink.rel = "stylesheet";
    fontLink.href =
      "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Manrope:wght@500;600;700;800&display=swap";
    document.head.appendChild(fontLink);

    // Material Symbols
    const iconLink = document.createElement("link");
    iconLink.rel = "stylesheet";
    iconLink.href =
      "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap";
    document.head.appendChild(iconLink);

    // Tailwind CDN
    const twScript = document.createElement("script");
    twScript.src = "https://cdn.tailwindcss.com?plugins=forms,container-queries";
    twScript.onload = () => {
      if (window.tailwind) {
        window.tailwind.config = {
          darkMode: "class",
          theme: {
            extend: {
              colors: {
                background: "#f8f9fa",
                "tertiary-fixed": "#d8d3f4",
                "surface-container-low": "#f1f4f6",
                "on-primary-fixed-variant": "#0058ba",
                "on-surface": "#2b3437",
                "surface-container": "#eaeff1",
                "surface-variant": "#dbe4e7",
                "primary-container": "#d8e2ff",
                "primary-fixed": "#d8e2ff",
                "on-tertiary-fixed": "#37354f",
                outline: "#737c7f",
                "on-primary-container": "#004fa8",
                "on-secondary-fixed-variant": "#5a5b61",
                "primary-dim": "#004fa9",
                "on-surface-variant": "#586064",
                secondary: "#5d5f65",
                "surface-container-highest": "#dbe4e7",
                "tertiary-container": "#d8d3f4",
                "surface-dim": "#d1dce0",
                "inverse-surface": "#0c0f10",
                "on-secondary": "#f9f8ff",
                "on-background": "#2b3437",
                tertiary: "#5f5c78",
                "surface-container-high": "#e3e9ec",
                "secondary-fixed": "#e2e2e9",
                "tertiary-fixed-dim": "#cac6e6",
                "inverse-on-surface": "#9b9d9e",
                "on-secondary-container": "#505157",
                "on-primary-fixed": "#003d85",
                "on-error-container": "#752121",
                "on-secondary-fixed": "#3e3f45",
                "on-tertiary-fixed-variant": "#54516d",
                "outline-variant": "#abb3b7",
                "primary-fixed-dim": "#c2d4ff",
                error: "#9f403d",
                surface: "#f8f9fa",
                "inverse-primary": "#4a8eff",
                "secondary-fixed-dim": "#d4d4db",
                "tertiary-dim": "#53506b",
                "surface-bright": "#f8f9fa",
                "on-tertiary-container": "#4a4863",
                "error-dim": "#4e0309",
                "on-tertiary": "#fcf7ff",
                primary: "#005bc0",
                "secondary-dim": "#515359",
                "on-primary": "#f7f7ff",
                "on-error": "#fff7f6",
                "error-container": "#fe8983",
                "secondary-container": "#e2e2e9",
                "surface-tint": "#005bc0",
                "surface-container-lowest": "#ffffff",
              },
              fontFamily: {
                headline: ["Manrope"],
                body: ["Inter"],
                label: ["Inter"],
              },
              borderRadius: {
                DEFAULT: "0.125rem",
                lg: "0.25rem",
                xl: "0.5rem",
                "2xl": "1rem",
                "3xl": "1.5rem",
                "4xl": "2rem",
                full: "9999px",
              },
            },
          },
        };
      }
    };
    document.head.appendChild(twScript);

    // Custom styles
    const style = document.createElement("style");
    style.textContent = `
      .material-symbols-outlined {
        font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        vertical-align: middle;
      }
      .linear-soul {
        background: linear-gradient(135deg, #005bc0 0%, #004fa9 100%);
      }
      .glass-nav {
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
      }
      body {
        font-family: 'Inter', sans-serif;
        background-color: #f8f9fa;
        color: #2b3437;
      }
      h1, h2, h3, .font-manrope {
        font-family: 'Manrope', sans-serif;
      }
      .hide-scrollbar::-webkit-scrollbar { display: none; }
      .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(fontLink);
      document.head.removeChild(iconLink);
      document.head.removeChild(twScript);
      document.head.removeChild(style);
    };
  }, []);

  return null;
}
