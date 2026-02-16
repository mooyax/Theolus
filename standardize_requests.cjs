const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'Game.ts');
let content = fs.readFileSync(filePath, 'utf8');

// Replace timeCreated with createdAt
// Use regex to avoid partial matches if necessary, but here they seem distinct.
content = content.replace(/timeCreated/g, 'createdAt');

fs.writeFileSync(filePath, content);
console.log('Successfully replaced timeCreated with createdAt in Game.ts');
