import { hidePersonalMessage } from "./compareTest.js";

const TEST_GUIDE = document.querySelector("#test-guide");
const TEST_QUOTE = document.querySelector("#test-quote");
const TEST_STATE = document.querySelector("#test-state");
const TYPING_TEST = document.querySelector("#typing-test");
const TIMER = document.querySelector("#timer");
const STAT_VALUES = document.querySelectorAll(".stat-value");
const WPM_VALUE = document.querySelector("#wpm");
const ACCURACY_VALUE = document.querySelector("#accuracy");
const MISTAKES_VALUE = document.querySelector("#mistakes");

export function updateGuide(option) {
    let message;

    switch (option) {
        case ("lostFocus"):
            message = "CLICK on this area to focus";
            break;
        case ("testError"):
            message = "Failed to get the test. Press ESC to try again.";
            break;
        case ("loading"):
            message = "Starting the test...";
            break;
        case ("failedSave"):
            message = "Failed to save test"
            break;
        default:
            message = "";
            break;
    };

    TEST_QUOTE.classList.add("quote-blurred");
    TEST_GUIDE.textContent = message
    TEST_GUIDE.hidden = false;
};

export function hideGuide() {
    TEST_GUIDE.textContent = "";
    TEST_GUIDE.hidden = true;
    TEST_QUOTE.classList.remove("quote-blurred");
};

export function updateState(option) {
    let message, classNameState, classNameTypingTest;

    switch (option) {
        case ("awaiting"):
            message = "Awaiting";
            classNameState = "state-awaiting";
            classNameTypingTest = ""
            break;
        case ("ongoing"):
            message = "Ongoing";
            classNameState = "state-ongoing";
            classNameTypingTest = "typing-test-ongoing";
            break;
        case ("cancelled"):
            message = "Cancelled";
            classNameState = "state-cancelled";
            classNameTypingTest = "typing-test-cancelled";
            break;
        case ("finished"):
            message = "Finished";
            classNameState = "state-finished";
            classNameTypingTest = "typing-test-finished";
            break;
        case ("finished-timer"):
            message = "Finished (Timer's up)";
            classNameState = "state-finished"
            classNameTypingTest = "typing-test-finished";
            break;
        default:
            message = "";
            classNameState = ""
            classNameTypingTest = "";
            break;
    };

    TEST_STATE.textContent = message;
    TEST_STATE.className = classNameState;
    TYPING_TEST.className = classNameTypingTest;
};

export function displayStats(stats) {
    WPM_VALUE.textContent = `${stats.wpm}`;
    ACCURACY_VALUE.textContent = `${stats.accuracy}`;
    MISTAKES_VALUE.textContent = `${stats.mistakes}`;
};

export function updateTimer(timerValue) {
    if (timerValue !== "false") {
        TIMER.textContent = `${timerValue}`;
    } else {
        TIMER.textContent = "Off";
    };
};

export function refreshDisplay() {
        STAT_VALUES.forEach((stat) => stat.textContent = "---");
        hidePersonalMessage();
        updateState("awaiting");
};