const fs = require('fs');
const path = require('path');
const componentsDir = 'e:/MyPortfolio/src/components';

const files = fs.readdirSync(componentsDir).filter(f => f.endsWith('.jsx') && f !== 'About.jsx');

for (const file of files) {
  const filePath = path.join(componentsDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Replace white backgrounds with transparent
  content = content.replace(/bg-white(?!\/)/g, 'bg-transparent');
  
  // Handle specific alpha bg-whites
  content = content.replace(/bg-white\/90/g, 'bg-[#F9F6F0]/90');
  content = content.replace(/bg-white\/95/g, 'bg-[#F9F6F0]/95');
  content = content.replace(/bg-white\/80/g, 'bg-[#F9F6F0]/80');
  content = content.replace(/bg-white\/60/g, 'bg-[#F9F6F0]/60');
  
  // Handle zinc-50 backgrounds
  content = content.replace(/bg-zinc-50\/50/g, 'bg-transparent');
  content = content.replace(/bg-zinc-50\/70/g, 'bg-transparent');
  content = content.replace(/bg-zinc-50\/80/g, 'bg-transparent');
  content = content.replace(/bg-zinc-50(?!\/)/g, 'bg-transparent');

  // Unify borders to match the new editorial style
  content = content.replace(/border-zinc-200\/80/g, 'border-zinc-300');
  content = content.replace(/border-zinc-200\/90/g, 'border-zinc-300');
  content = content.replace(/border-zinc-200\/60/g, 'border-zinc-300');
  content = content.replace(/border-zinc-200\/50/g, 'border-zinc-300');
  content = content.replace(/border-zinc-200/g, 'border-zinc-300');
  content = content.replace(/border-zinc-100/g, 'border-zinc-300');

  fs.writeFileSync(filePath, content);
}

// Also update Footer.jsx if it's there
console.log("Updated components");
