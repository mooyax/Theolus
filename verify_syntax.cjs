const fs = require('fs');
const path = require('path');
const vm = require('vm');

const dir = 'src/tests';
const files = fs.readdirSync(dir);

let failCount = 0;
files.forEach(file => {
    if (!file.endsWith('.test.js')) return;
    const filePath = path.join(dir, file);
    const code = fs.readFileSync(filePath, 'utf8');

    try {
        // Just try to parse it as a script (ignoring imports/exports for now by turning them to dummy)
        const dummy = code.replace(/^import.*$/gm, '// import').replace(/^export.*$/gm, '// export');
        new vm.Script(dummy);
    } catch (e) {
        console.error(`Syntax Error in ${file}: ${e.message}`);
        failCount++;
    }
});

console.log(`${failCount} files have syntax errors.`);
