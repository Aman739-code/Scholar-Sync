const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src', 'pages');
const files = fs.readdirSync(dir);

files.forEach(f => {
  if (f.endsWith('.jsx')) {
    const p = path.join(dir, f);
    let content = fs.readFileSync(p, 'utf8');
    let original = content;

    // Sidebar Links active
    content = content.replace(/(<a[^>]+?bg-\[#141f38\][^>]+?)rounded-lg/g, '$1rounded-2xl');
    
    // Sidebar Links inactive
    content = content.replace(/(<a[^>]+?hover:bg-\[#091328\][^>]+?)rounded-lg/g, '$1rounded-2xl');

    // Big Bento Cards
    const bentoRegex = /className=(["'])([^"']*?(?:p-6|p-8|p-10|p-12)[^"']*?(?:bg-\[#192540\]\/40|bg-\[#091328\]|bg-\[#141f38\]|bg-gradient-to-br)[^"']*?)rounded-(?:lg|xl|2xl|3xl)/g;
    content = content.replace(bentoRegex, 'className=$1$2rounded-4xl');

    // Medium/Small Bento Cards (e.g. p-4 or p-5)
    const smallCardRegex = /className=(["'])([^"']*?(?:p-4|p-5)[^"']*?(?:bg-\[#141f38\]|bg-\[#091328\]|bg-\[#192540\]\/40)[^"']*?)rounded-(?:lg|xl)/g;
    content = content.replace(smallCardRegex, 'className=$1$2rounded-2xl');

    // Course Library Cards
    const courseLibRegex = /className=(["'])(group relative bg-\[#091328\] )rounded-lg( overflow-hidden)/g;
    content = content.replace(courseLibRegex, 'className=$1$2rounded-4xl$3');

    // Video Player Course Module
    const videoRegex = /className=(["'])(relative aspect-video w-full )rounded-lg( overflow-hidden bg-\[#000000\])/g;
    content = content.replace(videoRegex, 'className=$1$2rounded-3xl$3');

    if (content !== original) {
      fs.writeFileSync(p, content, 'utf8');
      console.log('Updated border radius in', f);
    }
  }
});
