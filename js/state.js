const TEST_STATE = document.querySelector("#test-state");
const TYPING_TEST = document.querySelector("#typing-test");

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
            break;
    };

    TEST_STATE.textContent = message;
    TEST_STATE.className = classNameState;
    TYPING_TEST.className = classNameTypingTest;
};