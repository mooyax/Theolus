const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const outputPath = 'c:/Users/mooya/develop/test/tmp/test_out.txt';

try {
    const output = execSync('npx vitest run src/tests/JobCombatReassignment.test.js --no-color', { encoding: 'utf8' });
    fs.writeFileSync(outputPath, output);
    console.log("Test passed and output written to " + outputPath);
} catch (e) {
    fs.writeFileSync(outputPath, (e.stdout || '') + (e.stderr || '') + (e.message || ''));
    console.log("Test failed and output written to " + outputPath);
}
