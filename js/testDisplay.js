import { hidePersonalMessage } from "./compareTest.js";
import { TEST_STATE, FINISH_REASON, GUIDE } from "./constants.js";

const TEST_GUIDE = document.querySelector("#test-guide");
const TEST_QUOTE = document.querySelector("#test-quote");
const STATE_LABEL = document.querySelector("#test-state");
const TYPING_TEST = document.querySelector("#typing-test");
const TIMER = document.querySelector("#timer");
const STAT_VALUES = document.querySelectorAll(".stat-value");
const WPM_VALUE = document.querySelector("#wpm");
const ACCURACY_VALUE = document.querySelector("#accuracy");
const MISTAKES_VALUE = document.querySelector("#mistakes");

export function updateGuide(option) {
    let message;

    switch (option) {
        case (GUIDE.LOST_FOCUS):
            message = "CLICK on this area to focus";
            break;
        case (GUIDE.TEST_ERROR):
            message = "Failed to get the test. Press ESC to try again.";
            break;
        case (GUIDE.LOADING):
            message = "Starting the test...";
            break;
        case (GUIDE.FAILED_SAVE):
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

export function updateState(state, reason) {
    let message, classNameState, classNameTypingTest;

    switch (state) {
        case TEST_STATE.IDLE:
            message = "Awaiting";
            classNameState = "state-awaiting";
            classNameTypingTest = "";
            break;
        case TEST_STATE.RUNNING:
            message = "Ongoing";
            classNameState = "state-ongoing";
            classNameTypingTest = "typing-test-ongoing";
            break;
        case TEST_STATE.CANCELLED:
            message = "Cancelled";
            classNameState = "state-cancelled";
            classNameTypingTest = "typing-test-cancelled";
            break;
        case TEST_STATE.FINISHED:
            message = reason === FINISH_REASON.TIMER ? "Finished (Timer's up)" : "Finished";
            classNameState = "state-finished";
            classNameTypingTest = "typing-test-finished";
            break;
        default:
            message = "";
            classNameState = "";
            classNameTypingTest = "";
            break;
    };

    STATE_LABEL.textContent = message;
    STATE_LABEL.className = classNameState;
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
    updateState(TEST_STATE.IDLE);
};

export function scrollToTop() {
    window.scrollTo({ top: 0 });
};