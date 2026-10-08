const TEST_GUIDE = document.querySelector("#test-guide");
const TEST_QUOTE = document.querySelector("#test-quote");

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