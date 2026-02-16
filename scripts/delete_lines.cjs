
const fs = require('fs');
const path = require('path');

const filePath = process.argv[2];
const startLine = parseInt(process.argv[3]);
const endLine = parseInt(process.argv[4]);

if (!filePath || isNaN(startLine) || isNaN(endLine)) {
    console.error('Usage: node delete_lines.cjs <file> <startLine> <endLine>');
    process.exit(1);
}

const fullPath = path.resolve(filePath);
const content = fs.readFileSync(fullPath, 'utf8');
const lines = content.split('\n');

// Arrays are 0-indexed, lines are 1-indexed
// We want to remove from startLine-1 to endLine-1 inclusive
if (startLine < 1 || endLine > lines.length || startLine > endLine) {
    console.error(`Invalid range: ${startLine}-${endLine} (File has ${lines.length} lines)`);
    process.exit(1);
}

// Remove lines
lines.splice(startLine - 1, endLine - startLine + 1);

fs.writeFileSync(fullPath, lines.join('\n'));
console.log(`Deleted lines ${startLine} to ${endLine} from ${filePath}`);
