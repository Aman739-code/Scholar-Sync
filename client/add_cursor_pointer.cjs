const fs = require('fs');
const path = require('path');

function processDir(dir) {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);
  files.forEach(f => {
    const p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) {
      processDir(p);
    } else if (p.endsWith('.jsx')) {
      let content = fs.readFileSync(p, 'utf8');
      
      const regex = /<(button|Link|a)([\s\S]*?)className=(["'])([\s\S]*?)\3([\s\S]*?)>/g;
      let changed = false;
      const newContent = content.replace(regex, (match, tag, beforeClass, quote, classes, afterClass) => {
        if (!classes.includes('cursor-pointer')) {
          changed = true;
          return `<${tag}${beforeClass}className=${quote}${classes} cursor-pointer${quote}${afterClass}>`;
        }
        return match;
      });

      // Also add cursor-pointer to interactive divs/spans
      const divRegex = /<(div|span)([\s\S]*?onClick=[\s\S]*?)className=(["'])([\s\S]*?)\3([\s\S]*?)>/g;
      const newerContent = newContent.replace(divRegex, (match, tag, beforeClass, quote, classes, afterClass) => {
         if (!classes.includes('cursor-pointer')) {
            changed = true;
            return `<${tag}${beforeClass}className=${quote}${classes} cursor-pointer${quote}${afterClass}>`;
         }
         return match;
      });

      if (changed) {
        fs.writeFileSync(p, newerContent, 'utf8');
        console.log('Added cursor-pointer in', f);
      }
    }
  });
}

processDir(path.join(__dirname, 'src', 'pages'));
processDir(path.join(__dirname, 'src', 'components'));
