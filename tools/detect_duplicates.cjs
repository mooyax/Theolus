const fs = require('fs');
const path = require('path');

function getAllFiles(dirPath, arrayOfFiles) {
    const files = fs.readdirSync(dirPath);

    arrayOfFiles = arrayOfFiles || [];

    files.forEach(function (file) {
        if (fs.statSync(dirPath + "/" + file).isDirectory()) {
            arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
        } else {
            if (file.endsWith('.ts') || file.endsWith('.js')) {
                arrayOfFiles.push(path.join(dirPath, "/", file));
            }
        }
    });

    return arrayOfFiles;
}

const srcDir = path.join(__dirname, '../src');
if (!fs.existsSync(srcDir)) {
    console.error("src directory not found!");
    process.exit(1);
}

const files = getAllFiles(srcDir);
let totalDuplicates = 0;

console.log(`Scanning ${files.length} files for duplicate method definitions...`);

files.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    const lines = content.split('\n');
    const methodCounts = {};
    const methodLines = {};

    let inClass = false;
    let braceCount = 0;

    // Simple regex to catch method-like lines. 
    // Captures: update( arg ) {
    // Avoids: if ( cond ) {
    // Key trait of method: starts with whitespace, name, parens. 
    // Excludes generic keywords like if, for, while, switch, catch.
    const methodRegex = /^\s*(?:(?:public|private|protected|static|abstract|async|override)\s+)*([a-zA-Z0-9_$]+)\s*(?:<.*?>)?\s*\(/;
    const excludeKeywords = new Set(['if', 'for', 'while', 'switch', 'catch', 'constructor', 'files']);

    lines.forEach((line, index) => {
        // Very basic brace counting to guess if we are inside a class/object
        // This is not a parser, but good enough for top-level method overlap
        const open = (line.match(/\{/g) || []).length;
        const close = (line.match(/\}/g) || []).length;

        // Check for method definition
        // We only care if it looks like a method definition line
        if (line.includes('{') && !line.includes('=>') && !line.trim().startsWith('//')) {
            const match = line.match(methodRegex);
            if (match) {
                const name = match[1];
                if (!excludeKeywords.has(name) && name.length > 2) {
                    if (!methodCounts[name]) {
                        methodCounts[name] = 0;
                        methodLines[name] = [];
                    }
                    methodCounts[name]++;
                    methodLines[name].push(index + 1);
                }
            }
        }

        braceCount += open - close;
    });

    // Report duplicates
    let fileHasDupes = false;
    for (const [name, count] of Object.entries(methodCounts)) {
        if (count > 1) {
            // Filter out overloads (common in TS)
            // Heuristic: Overloads usually don't have a body block immediately, or they preserve exact signature?
            // Actually, in TS, overloads are definition-only (no body). 
            // My regex requires '{' on the line (implied by previous check line.includes('{')), 
            // so signature-only overloads (ending in ';') are skipped.
            // So if we found 2+ matches with '{', they are likely 2 implementations!

            if (!fileHasDupes) {
                console.log(`\n📄 ${file}`);
                fileHasDupes = true;
            }
            console.log(`   ⚠️  Duplicate method "${name}" found at lines: ${methodLines[name].join(', ')}`);
            totalDuplicates++;
        }
    }
});

console.log(`\n--------------------------------------------------`);
if (totalDuplicates === 0) {
    console.log("✅ No duplicate method definitions found.");
} else {
    console.log(`❌ Found ${totalDuplicates} potential duplicate definitions.`);
    console.log("Please review the files above. (Note: standard function overloads without body are ignored, so these are likely real/body duplicates)");
}
