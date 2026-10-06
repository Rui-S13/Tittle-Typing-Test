const TEST_STATE = document.querySelector("#test-state");

export function updateState(option) {
    let message, className;

    switch (option) {
        case ("awaiting"):
            message = "Awaiting";
            className = "state-awaiting";
            break;
        case ("ongoing"):
            message = "Ongoing";
            className = "state-ongoing"
            break;
        case ("finished"):
            message = "Finished";
            className = "state-finished"
            break;
        case ("finished-timer"):
            message = "Finished (Timer's up)";
            className = "state-finished"
            break;
        default:
            message = "";
            break;
    };

    TEST_STATE.textContent = message;
    TEST_STATE.className = className;
};