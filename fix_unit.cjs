const fs = require('fs');
const path = 'src/Unit.ts';

try {
    let content = fs.readFileSync(path, 'utf8');

    // Search for "attackGoblin(goblin: any) {"
    // The duplicate is the LAST one.
    const lastIdx = content.lastIndexOf('attackGoblin(goblin: any) {');
    const firstIdx = content.indexOf('attackGoblin(goblin: any) {');

    if (lastIdx === firstIdx && lastIdx !== -1) {
        console.log("Only one attackGoblin found. Maybe already fixed?");
    } else if (lastIdx !== -1 && lastIdx !== firstIdx) {
        console.log(`Found duplicate at index ${lastIdx} (First is at ${firstIdx})`);

        // We want to remove from lastIdx up to tryBuildStructure
        const endMarker = 'tryBuildStructure(time) {';
        const endIdx = content.indexOf(endMarker, lastIdx);

        if (endIdx !== -1) {
            console.log(`Found end marker at ${endIdx}`);

            const before = content.substring(0, lastIdx);
            const after = content.substring(endIdx);

            // Reconstruct
            const newContent = before + after;
            fs.writeFileSync(path, newContent, 'utf8');
            console.log("Successfully removed duplicate block.");
        } else {
            console.log("End marker not found after duplicate start.");
        }
    } else {
        console.log("attackGoblin not found or indexes match strangely.");
    }

} catch (e) {
    console.error(e);
}
