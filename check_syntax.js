
const fs = require('fs');
const path = 'src/Unit.js';

try {
    const code = fs.readFileSync(path, 'utf8');
    // Using Function constructor to parse
    new Function(code);
    console.log("Syntax OK");
} catch (e) {
    console.log("Syntax Error:", e.message);
    // Try to find line number?
    // Node.js usually reports line number in stack or message
    console.log(e.stack);
}
