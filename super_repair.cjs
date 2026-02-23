const fs = require('fs');
const path = require('path');

const dir = 'src/tests';
const files = fs.readdirSync(dir);

function repairFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');

    // Step 1: Count total { and } to see if it's even worth a complex scan
    let openCount = 0;
    let closeCount = 0;
    for (const char of content) {
        if (char === '{') openCount++;
        if (char === '}') closeCount++;
    }

    if (openCount === closeCount) return; // Already balanced (roughly)

    console.log(`Repairing ${path.basename(filePath)}: {${openCount}, }${closeCount}`);

    // Step 2: Smarter line-by-line repair
    const lines = content.split('\n');
    let newLines = [];
    let nestLevel = 0;

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        let lineDelta = 0;

        // Count { and } in this line, but avoid strings/comments
        const cleanLine = line.replace(/\/\/.*$/, '').replace(/\/\*[\s\S]*?\*\//g, '').replace(/'[^']*'/g, "''").replace(/"[^"]*"/g, '""').replace(/`[^`]*`/g, "``");

        for (const char of cleanLine) {
            if (char === '{') lineDelta++;
            if (char === '}') lineDelta--;
        }

        if (nestLevel + lineDelta < 0) {
            // This line would drop us below zero! It has an orphan }.
            // Try to fix by stripping extra } from the end of the line
            let fixedLine = line;
            while (nestLevel + lineDelta < 0 && fixedLine.includes('}')) {
                fixedLine = fixedLine.replace(/\}([^}]*)$/, '$1'); // Remove last }
                lineDelta++; // One less closing brace
            }
            newLines.push(fixedLine);
            nestLevel += lineDelta;
        } else {
            newLines.push(line);
            nestLevel += lineDelta;
        }
    }

    // Append missing closes
    while (nestLevel > 0) {
        newLines.push('});');
        nestLevel--;
    }

    fs.writeFileSync(filePath, newLines.join('\n'));
}

files.forEach(file => {
    if (!file.endsWith('.test.js')) return;
    repairFile(path.join(dir, file));
});

console.log('Super repair complete.');
