const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'src', 'pages');

const pages = [
  { file: 'LandingPage.jsx', name: '' },
  { file: 'Dashboard.jsx', name: 'Dashboard' },
  { file: 'CourseLibrary.jsx', name: 'Courses' },
  { file: 'CourseModule.jsx', name: 'Courses' },
  { file: 'Assignments.jsx', name: 'Dashboard' },
  { file: 'SquadHub.jsx', name: 'Community' },
  { file: 'ProfilePage.jsx', name: 'Profile' },
  { file: 'CampusLeaderboard.jsx', name: 'Community' },
];

pages.forEach(page => {
  const filePath = path.join(directoryPath, page.file);
  if (!fs.existsSync(filePath)) return;
  
  let content = fs.readFileSync(filePath, 'utf8');
  
  let importsAdded = false;
  if (!content.includes('import Navbar')) {
    content = content.replace(/import React from 'react';/, "import React from 'react';\nimport Navbar from '../components/Navbar';\nimport Footer from '../components/Footer';");
    importsAdded = true;
  }

  const navRegex = /(?:\{\/\* TopNavBar \*\/\}\s*)?(?:<nav[\s\S]*?<\/nav>|<header[\s\S]*?<\/header>)/;
  if (navRegex.test(content)) {
    content = content.replace(navRegex, `{/* TopNavBar */}\n      <Navbar activePage="${page.name}" />`);
  }

  const footerRegex = /(?:\{\/\* Footer \*\/\}\s*)?<footer[\s\S]*?<\/footer>/;
  if (footerRegex.test(content)) {
    content = content.replace(footerRegex, `{/* Footer */}\n      <Footer />`);
  }

  // Master streak update in LandingPage.jsx
  if (page.file === 'LandingPage.jsx') {
    const oldStreak = `<div className="hidden md:block w-48 h-48 rounded-full border-[16px] border-[#8eff71]/10 border-t-[#8eff71] animate-pulse"></div>`;
    const newStreak = `<div className="hidden md:block w-48 h-48 flex items-center justify-center rounded-full border-[16px] border-[#8eff71]/10 border-t-[#8eff71] animate-pulse relative">
                  <span className="absolute inset-0 flex items-center justify-center text-4xl font-black font-['Spline_Sans'] text-[#8eff71]">75%</span>
                </div>`;
    content = content.replace(oldStreak, newStreak);
  }

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Updated ${page.file}`);
});
