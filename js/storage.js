export function readJson(key, fallback) {
    try {
        const RAW = localStorage.getItem(key);
        return RAW === null ? fallback : JSON.parse(RAW);
    } catch {
        return fallback;
    }
}

export function writeJson(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
    } catch (error) {
        console.error(`Failed to save "${key}":`, error);
        return false;
    }
}