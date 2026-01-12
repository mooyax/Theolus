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

            // Fix: Force remove old item first to free space BEFORE allocation
            // This prevents "QuotaExceeded" when overwriting large keys due to temp buffers
            localStorage.removeItem(key);

            try {
                localStorage.setItem(key, compressed);
            } catch (innerE) {
                // If setItem fails, restore empty or handle?
                // The outer catch will handle it.
                // But specifically note that we cleared it.
                console.warn(`Failed to save to ${key}, slot is now empty.`);
                throw innerE;
            }

            console.log(`Saved to slot ${slotId} (Compressed). Size: ${compressed.length} chars (Original: ${jsonString.length})`);
            return true;
        } catch (e) {
            console.error('Save failed:', e);

            // Debug Storage Usage
            let total = 0;
            for (let key in localStorage) {
                if (localStorage.hasOwnProperty(key)) {
                    total += ((localStorage[key].length * 2) / 1024 / 1024); // MB
                    console.log(`[Storage] ${key}: ${(localStorage[key].length * 2 / 1024).toFixed(2)} KB`);
                }
            }
            console.warn(`Total LocalStorage Usage: ${total.toFixed(2)} MB`);

            if (e.name === 'QuotaExceededError' || e.name === 'NS_ERROR_DOM_QUOTA_REACHED') {
                const dataSize = (JSON.stringify(data).length * 2 / 1024 / 1024).toFixed(2);
                alert(`Save Failed: Storage Full!\nAttempted Size: ~${dataSize} MB\nCurrent Usage: ${total.toFixed(2)} MB\n\nPlease clear old saves or other site data.`);
            } else {
                alert(`Save Failed: ${e.message}`);
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

    delete(slotId) {
        try {
            const key = this.prefix + slotId;
            localStorage.removeItem(key);
            console.log(`Deleted slot ${slotId}`);
            return true;
        } catch (e) {
            console.error('Delete failed:', e);
            return false;
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
