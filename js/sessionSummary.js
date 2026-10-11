import { readSessionJson } from "./storage.js";
import { calculateStats } from "./calculations.js";

const SESSION_AVERAGE_WPM = document.querySelector("#session-average-wpm");
const SESSION_AVERAGE_ACCURACY = document.querySelector("#session-average-accuracy");
const SESSION_TEST_COUNT = document.querySelector("#session-test-count");

export function updateSessionSummary() {
    const TESTS = readSessionJson("tests", []);
    if (TESTS.length === 0) {
        return;
    };

    const STATS = calculateStats(TESTS);
    SESSION_AVERAGE_WPM.textContent = STATS.avgWpm;
    SESSION_AVERAGE_ACCURACY.textContent = STATS.avgAccuracy;
    SESSION_TEST_COUNT.textContent = `${STATS.count} completes tests`
};