const fs = require('fs');
const path = require('path');

const dir = 'src/tests';
const files = fs.readdirSync(dir);

files.forEach(file => {
    if (!file.endsWith('.test.js')) return;
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    // Preliminary check: if it ends with many });, it might be broken
    const lines = content.split('\n');
    let newLines = [];
    let stack = [];
    let fixed = false;

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const trimmed = line.trim();

        // Very simple heuristic: 
        // 1. describe({ or it({
        // 2. });

        const isOpen = /(describe|it|beforeEach|afterEach|test)\s*\(.*\{\s*$/.test(trimmed);
        const isClose = /^\s*\}\);/.test(trimmed);

        if (isOpen) {
            stack.push('block');
            newLines.push(line);
        } else if (isClose) {
            if (stack.length > 0) {
                stack.pop();
                newLines.push(line);
            } else {
                // Orphan close! Remove it.
                fixed = true;
                console.log(`Removing orphan close in ${file} at line ${i + 1}`);
            }
        } else {
            newLines.push(line);
        }
    }

    // If still something in stack, close it
    while (stack.length > 0) {
        fixed = true;
        stack.pop();
        newLines.push('});');
        console.log(`Adding missing close in ${file}`);
    }

    if (fixed) {
        fs.writeFileSync(filePath, newLines.join('\n'));
    }
});

console.log('Structural repair complete.');
