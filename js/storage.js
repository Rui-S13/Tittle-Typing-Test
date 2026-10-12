export const TESTS_KEY = "tests";

export function readLocalJsonStrict(key, fallback) {
    const RAW = localStorage.getItem(key);
    return RAW === null ? fallback : JSON.parse(RAW);
};

export function readLocalJson(key, fallback) {
    try {
        return readLocalJsonStrict(key, fallback);
    } catch {
        return fallback;
    };
};

export function writeLocalJson(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
    } catch (error) {
        console.error(`Failed to save "${key}":`, error);
        return false;
    };
};

export function readSessionJsonStrict(key, fallback) {
    const RAW = sessionStorage.getItem(key);
    return RAW === null ? fallback : JSON.parse(RAW);
};

export function readSessionJson(key, fallback) {
    try {
        return readSessionJsonStrict(key, fallback);
    } catch {
        return fallback;
    };
};

export function writeSessionJson(key, value) {
    try {
        sessionStorage.setItem(key, JSON.stringify(value));
        return true;
    } catch (error) {
        console.error(`Failed to save "${key}":`, error);
        return false;
    };
};



export function saveSessionTest(test) {
    let storedTests;

    try {
        storedTests = readSessionJsonStrict(TESTS_KEY, []);
    } catch (error) {
        console.error("Could not read the saved tests on SessionStorage, so nothing was saved:", error);
        return false;
    };

    if (!Array.isArray(storedTests)) {
        console.error("Saved tests are not a list, so nothing was saved.");
        return false;
    };

    return writeSessionJson(TESTS_KEY, [...storedTests, test]);
};

export function saveLocalTest(test) {
    let storedTests;

    try {
        storedTests = readLocalJsonStrict(TESTS_KEY, []);
    } catch (error) {
        console.error("Could not read the saved tests on LocalStorage, so nothing was saved:", error);
        return false;
    };

    if (!Array.isArray(storedTests)) {
        console.error("Saved tests are not a list, so nothing was saved.");
        return false;
    };

    return writeLocalJson(TESTS_KEY, [...storedTests, test]);
};