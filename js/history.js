import { readSessionJson } from "./storage.js";

const TEST_HISTORY_TABLE = document.querySelector("#test-history-table");

export function updateHistory() {
    while (TEST_HISTORY_TABLE.rows.length > 1) {
        TEST_HISTORY_TABLE.deleteRow(1);
    };

    const ARRAY_TESTS = readSessionJson("tests");
    ARRAY_TESTS.sort((a, b) => b.endTime - a.endTime);

    ARRAY_TESTS.forEach((test) => {
        const DATE = new Date(test.endTime);
        const MINUTES = DATE.getMinutes().toString().padStart(2, "0");

        const HISTORY_RECORD = document.createElement("tr");
        HISTORY_RECORD.classList.add("history-record");

        HISTORY_RECORD.innerHTML = `
            <td>
                ${DATE.getDate()}/${DATE.getMonth() + 1}/${DATE.getFullYear()}
                ${DATE.getHours()}:${MINUTES}
            </td>
            <td>${test.wpm}</td>
            <td>${test.accuracy}</td>
            <td>${test.mistakes}</td>
`;

        TEST_HISTORY_TABLE.appendChild(HISTORY_RECORD);
    });
};