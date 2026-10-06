import { readSessionJson } from "./storage.js";

const TEST_HISTORY_LIST = document.querySelector("#test-history-list");

export function updateHistory() {
    TEST_HISTORY_LIST.innerHTML = "";

    const ARRAY_TESTS = readSessionJson("tests");
    ARRAY_TESTS.sort((a, b) => b.endTime - a.endTime);

    ARRAY_TESTS.forEach((test) => {
        const DATE = new Date(test.endTime);

        const HISTORY_RECORD = document.createElement("li");
        HISTORY_RECORD.classList.add("history-record");
        HISTORY_RECORD.innerHTML = `
            <div class="history-field">
                <span class="history-date">${DATE.getDate()}/${DATE.getMonth() + 1}/${DATE.getFullYear()}</span>
                <span class="history-time">${DATE.getHours()}:${DATE.getMinutes()}</span>
            </div>

            <div class="history-field">
                <span class="history-stat-label">WPM</span>
                <span class="history-wpm">${test.wpm}</span>
            </div>

            <div class="history-field">
                <span class="history-stat-label">Accuracy</span>
                <span class="history-accuracy">${test.accuracy}</span>
            </div>

            <div class="history-field">
                <span class="history-stat-label">Mistakes</span>
                <span class="history-mistake">${test.mistakes}</span>
            </div>
        `

        TEST_HISTORY_LIST.appendChild(HISTORY_RECORD);
    });
};