const fs = require('fs');
const path = require('path');

const dir = 'src/tests';
const files = fs.readdirSync(dir);

const patterns = [
    /global\.window\s*=\s*\{[\s\S]*?\};/g,
    /global\.document\s*=\s*\{[\s\S]*?\};/g,
    /global\.localStorage\s*=\s*\{[\s\S]*?\};/g,
    /global\.alert\s*=\s*vi\.fn\(.*?\);/g,
    /global\.Image\s*=\s*class\s*\{[\s\S]*?\};/g,
    /global\.Worker\s*=\s*class\s*\{[\s\S]*?\};/g,
    /global\.window\.game\s*=\s*null;/g,
    /window\.innerWidth\s*=\s*.*?;/g,
    /window\.innerHeight\s*=\s*.*?;/g
];

console.log(`Scanning ${files.length} files in ${dir}...`);

files.forEach(file => {
    if (!file.endsWith('.test.js')) return;
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;

    patterns.forEach(p => {
        content = content.replace(p, '');
    });

    if (content !== original) {
        console.log(`Cleaned global overrides in ${file}`);
        fs.writeFileSync(filePath, content);
    }
});

console.log('Cleanup complete.');
