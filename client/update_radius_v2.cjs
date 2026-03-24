const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src', 'pages');
const files = fs.readdirSync(dir);

files.forEach(f => {
  if (f.endsWith('.jsx')) {
    const p = path.join(dir, f);
    let content = fs.readFileSync(p, 'utf8');
    let original = content;

    content = content.replace(/className=(["'])(.*?)\1/g, (match, quote, classes) => {
        if (!classes.includes('rounded-lg')) return match;
        
        // Large padding gets 4xl
        if (classes.match(/\bp-(8|10|12|16)\b/)) {
            return `className=${quote}${classes.replace('rounded-lg', 'rounded-4xl')}${quote}`;
        }
        // Medium padding gets 3xl
        else if (classes.match(/\bp-(6)\b/)) {
            return `className=${quote}${classes.replace('rounded-lg', 'rounded-3xl')}${quote}`;
        }
        // Small padding gets 2xl
        else if (classes.match(/\bp-(2|3|4|5)\b/)) {
            return `className=${quote}${classes.replace('rounded-lg', 'rounded-2xl')}${quote}`;
        }
        // Fallback for grids/containers with no explicit padding but have col-span or large structural classes
        else if (classes.match(/\bcol-span-/)) {
            return `className=${quote}${classes.replace('rounded-lg', 'rounded-4xl')}${quote}`;
        }
        else {
            // Default generic upgrade to 2xl
            return `className=${quote}${classes.replace('rounded-lg', 'rounded-2xl')}${quote}`;
        }
    });

    if (content !== original) {
      fs.writeFileSync(p, content, 'utf8');
      console.log('Updated border radius in', f);
    }
  }
});
