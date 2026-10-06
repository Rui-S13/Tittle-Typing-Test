const TEST_GUIDE = document.querySelector("#test-guide");

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
        default:
            message = "";
            break;
    };

    TEST_GUIDE.textContent = message
    TEST_GUIDE.hidden = false;
};

export function hideGuide() {
    TEST_GUIDE.textContent = "";
    TEST_GUIDE.hidden = true;
};