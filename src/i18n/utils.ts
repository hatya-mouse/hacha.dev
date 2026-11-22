import { defaultLang } from "./ui";

export function useLanguage(preferred: string | undefined) {
    if (preferred) {
        return preferred;
    } else {
        return defaultLang;
    }
}
