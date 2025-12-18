import LZString from 'lz-string';

export class SaveManager {
    constructor() {
        this.prefix = 'god_game_save_';
    }

    save(slotId, data) {
        try {
            const key = this.prefix + slotId;
            const saveData = {
                timestamp: Date.now(),
                data: data
            };
            const jsonString = JSON.stringify(saveData);
            // Compression
            const compressed = LZString.compressToUTF16(jsonString);
            localStorage.setItem(key, compressed);

            console.log(`Saved to slot ${slotId} (Compressed). Size: ${compressed.length} chars (Original: ${jsonString.length})`);
            return true;
        } catch (e) {
            console.error('Save failed:', e);
            if (e.name === 'QuotaExceededError' || e.name === 'NS_ERROR_DOM_QUOTA_REACHED') {
                console.warn("LocalStorage Quota Exceeded!");
                alert("Save Failed: Storage Quota Exceeded. Try deleting old saves.");
            }
            return false;
        }
    }

    load(slotId) {
        try {
            const key = this.prefix + slotId;
            const item = localStorage.getItem(key);
            if (!item) return null;

            console.log(`Loading slot ${slotId}, Raw length: ${item.length}`);

            let json = null;
            // 1. Try Decompressing
            const decompressed = LZString.decompressFromUTF16(item);
            if (decompressed && decompressed.startsWith('{')) {
                json = decompressed;
                console.log("Load: Decompressed successfully.");
            } else {
                // 2. Fallback to raw JSON (Legacy saves)
                console.log("Load: Decompression failed or legacy format. Trying raw JSON...");
                json = item;
            }

            const parsed = JSON.parse(json);
            console.log(`Parsed Data for slot ${slotId}:`, parsed);
            return parsed.data;
        } catch (e) {
            console.error('Load failed:', e);
            return null;
        }
    }

    getSlots() {
        const slots = [];
        for (let i = 1; i <= 5; i++) {
            const key = this.prefix + i;
            const item = localStorage.getItem(key);
            if (item) {
                try {
                    let json = null;
                    const decompressed = LZString.decompressFromUTF16(item);
                    if (decompressed && decompressed.startsWith('{')) {
                        json = decompressed;
                    } else {
                        json = item;
                    }
                    const parsed = JSON.parse(json);
                    slots.push({ id: i, timestamp: parsed.timestamp, empty: false });
                } catch (e) {
                    // Try parsing as raw just in case (partial compression failure?)
                    // If fails, assume corrupted or empty-ish
                    console.warn(`Slot ${i} check failed:`, e);
                    slots.push({ id: i, empty: true });
                }
            } else {
                slots.push({ id: i, empty: true });
            }
        }
        return slots;
    }
}
