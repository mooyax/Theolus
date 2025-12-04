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
            localStorage.setItem(key, JSON.stringify(saveData));
            console.log(`Saved to slot ${slotId}`);
            return true;
        } catch (e) {
            console.error('Save failed:', e);
            return false;
        }
    }

    load(slotId) {
        try {
            const key = this.prefix + slotId;
            const json = localStorage.getItem(key);
            if (!json) return null;
            return JSON.parse(json);
        } catch (e) {
            console.error('Load failed:', e);
            return null;
        }
    }

    getSlots() {
        const slots = [];
        for (let i = 1; i <= 5; i++) {
            const key = this.prefix + i;
            const json = localStorage.getItem(key);
            if (json) {
                try {
                    const parsed = JSON.parse(json);
                    slots.push({ id: i, timestamp: parsed.timestamp, empty: false });
                } catch (e) {
                    slots.push({ id: i, empty: true });
                }
            } else {
                slots.push({ id: i, empty: true });
            }
        }
        return slots;
    }
}
