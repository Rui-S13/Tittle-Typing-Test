export function readJsonStrict(key, fallback) {
    const RAW = localStorage.getItem(key);
    return RAW === null ? fallback : JSON.parse(RAW);
};

export function readJson(key, fallback) {
    try {
        return readJsonStrict(key, fallback);
    } catch {
        return fallback;
    };
};

export function writeJson(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
    } catch (error) {
        console.error(`Failed to save "${key}":`, error);
        return false;
    };
};

export function saveTest(test) {
    let storedTests;

    try {
        storedTests = readJsonStrict("tests", []);
    } catch (error) {
        console.error("Could not read the saved tests, so nothing was saved:", error);
        return false;
    };

    if (!Array.isArray(storedTests)) {
        console.error("Saved tests are not a list, so nothing was saved.");
        return false;
    };

    return writeJson("tests", [...storedTests, test]);
};