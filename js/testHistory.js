import { TESTS_KEY, readSessionJson, readLocalJson } from "./storage.js";

const TEST_HISTORY_BODY = document.querySelector("#test-history-body");

export function updateHistory() {
    const TESTS = readSessionJson(TESTS_KEY, []);
    fillHistory(TESTS);
}

export function updateStatsHistory() {
    const TESTS = readLocalJson(TESTS_KEY, []);
    fillHistory(TESTS);
}

function fillHistory(tests) {
    TEST_HISTORY_BODY.innerHTML = "";

    const SORTED_TESTS = [...tests].sort(
        (a, b) => b.endTime - a.endTime
    );

    SORTED_TESTS.forEach((test) => {
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
}