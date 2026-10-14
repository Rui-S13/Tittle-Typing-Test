import { TESTS_KEY, readSessionJson } from "./storage.js";
import { calculateStats } from "./calculations.js";

const SESSION_AVERAGE_WPM = document.querySelector("#session-average-wpm");
const SESSION_AVERAGE_ACCURACY = document.querySelector("#session-average-accuracy");
const SESSION_TEST_COUNT = document.querySelector("#session-test-count");
const TEST_HISTORY_BODY = document.querySelector("#test-history-body");

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

export function updateHistory() {
    TEST_HISTORY_BODY.innerHTML = "";

    const ARRAY_TESTS = readSessionJson(TESTS_KEY, []);
    ARRAY_TESTS.sort((a, b) => b.endTime - a.endTime);

    ARRAY_TESTS.forEach((test) => {
        const DATE = new Date(test.endTime);
        const MINUTES = DATE.getMinutes().toString().padStart(2, "0");

        const HISTORY_RECORD = document.createElement("tr");
        HISTORY_RECORD.classList.add("history-record");

        HISTORY_RECORD.innerHTML = `
            <td>
                ${DATE.getDate()}/${DATE.getMonth() + 1}/${DATE.getFullYear()} - 
                ${DATE.getHours()}:${MINUTES}
            </td>
            <td>${test.wpm}</td>
            <td>${test.accuracy}</td>
            <td>${test.mistakes}</td>
            `;
        TEST_HISTORY_BODY.appendChild(HISTORY_RECORD);
    });
};