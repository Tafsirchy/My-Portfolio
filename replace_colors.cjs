const fs = require('fs');
const path = require('path');

function replaceInFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;
    
    // exact mappings
    content = content.replace(/neon-cyan/g, 'neon-navy');
    content = content.replace(/neon-purple/g, 'neon-olive');
    content = content.replace(/text-gradient-cyan/g, 'text-gradient-navy');
    content = content.replace(/text-gradient-purple/g, 'text-gradient-olive');
    
    // in index.css
    content = content.replace(/#0ea5e9/g, '#1e3a8a');
    content = content.replace(/#0284c7/g, '#1e40af');
    content = content.replace(/#8b5cf6/g, '#4d7c0f');
    content = content.replace(/#6d28d9/g, '#3f6212');
    content = content.replace(/rgba\(14, 165, 233,/g, 'rgba(30, 58, 138,'); // hover scrollbar

    // In tailwind.config.js
    content = content.replace(/cyan: '#0ea5e9'/g, "navy: '#1e3a8a'");
    content = content.replace(/purple: '#8b5cf6'/g, "olive: '#4d7c0f'");

    // In ImageWithLoader.jsx
    content = content.replace(/border-t-cyan-500/g, 'border-t-blue-900');
    content = content.replace(/border-r-indigo-500/g, 'border-r-lime-700');
    content = content.replace(/text-cyan-400/g, 'text-blue-800');

    // In SuccessModal.jsx (RGBA)
    content = content.replace(/rgba\(14,165,233/g, 'rgba(30,58,138');

    if (original !== content) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated ${filePath}`);
    }
}

function walk(dir) {
    fs.readdirSync(dir).forEach(file => {
        let fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            walk(fullPath);
        } else if (fullPath.endsWith('.jsx') || fullPath.endsWith('.css') || fullPath.endsWith('.js')) {
            replaceInFile(fullPath);
        }
    });
}

walk(path.join(__dirname, 'src'));
replaceInFile(path.join(__dirname, 'tailwind.config.js'));
