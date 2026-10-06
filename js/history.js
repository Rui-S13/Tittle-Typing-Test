import { readSessionJson } from "./storage.js";

const TEST_HISTORY_BODY = document.querySelector("#test-history-body");

export function updateHistory() {
    TEST_HISTORY_BODY.innerHTML = "";

    const ARRAY_TESTS = readSessionJson("tests", []);
    ARRAY_TESTS.sort((a, b) => b.endTime - a.endTime);

    ARRAY_TESTS.forEach((test) => {
        const DATE = new Date(test.endTime);
        const MINUTES = DATE.getMinutes().toString().padStart(2, "0");

        const HISTORY_RECORD = document.createElement("tr");
        HISTORY_RECORD.classList.add("history-record");

        HISTORY_RECORD.innerHTML = `
            <td>
                ${DATE.getDate()}/${DATE.getMonth() + 1}/${DATE.getFullYear()} - 
                ${DATE.getHours()}:${MINUTES }
            </td>
            <td>${test.wpm}</td>
            <td>${test.accuracy}</td>
            <td>${test.mistakes}</td>
`;

        TEST_HISTORY_BODY.appendChild(HISTORY_RECORD);
    });
};