import { calculateStats } from "./calculations.js";

const SESSION_AVERAGE_WPM = document.querySelector("#session-average-wpm");
const SESSION_AVERAGE_ACCURACY = document.querySelector("#session-average-accuracy");

export function updateSessionSummary() {
    const TESTS = readSessionJson(TESTS_KEY, []);
    if (TESTS.length === 0) {
        return;
    };

    const STATS = calculateStats(TESTS);
    SESSION_AVERAGE_WPM.textContent = STATS.avgWpm;
    SESSION_AVERAGE_ACCURACY.textContent = STATS.avgAccuracy;
    if (TESTS.length === 1) {
        SESSION_TEST_COUNT.textContent = `${STATS.count} completed test`
    } else {
        SESSION_TEST_COUNT.textContent = `${STATS.count} completed tests`
    };
};