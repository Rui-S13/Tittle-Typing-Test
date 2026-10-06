const TEST_STATE = document.querySelector("#test-state");

export function updateState(option) {
    let message;

    switch (option) {
        case ("awaiting"):
            message = "Awaiting";
            break;
        case ("ongoing"):
            message = "Ongoing";
            break;
        case ("finished"):
            message = "Finished";
            break;
        case ("finisehd-timer"):
            message = "Finished (Timer's up)"
        default:
            message = "";
            break;
    };

    TEST_STATE.textContent = message
};