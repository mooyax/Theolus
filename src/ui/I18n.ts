import { ja } from './translations/ja';
import { en } from './translations/en';

const translations = { ja, en };

export class I18n {
    private static currentLang = localStorage.getItem('theolus_lang') || 'ja';

    static getLanguage() {
        return this.currentLang;
    }

    static setLanguage(lang: 'ja' | 'en') {
        this.currentLang = lang;
        localStorage.setItem('theolus_lang', lang);
        // Trigger UI update through event
        window.dispatchEvent(new CustomEvent('languageChanged', { detail: lang }));
    }

    static t(path: string) {
        const keys = path.split('.');
        let result: any = translations[this.currentLang];

        for (const key of keys) {
            if (result && result[key] !== undefined) {
                result = result[key];
            } else {
                console.warn(`[I18n] Key not found: ${path} (lang: ${this.currentLang})`);
                return path;
            }
        }
        return result;
    }

    static getShowroomData(type: string) {
        return this.t(`showroom.${type}`);
    }
}
