import { getSettings } from "./settings.js";
import { resetQuote, updateQuote } from "./quotes.js";


const TEST_GUIDE = document.querySelector("#test-guide");
const STAT_VALUES = document.querySelectorAll(".stat-value");
const WPM_VALUE = document.querySelector("#wpm");
const ACCURACY_VALUE = document.querySelector("#accuracy");
const MISTAKES_VALUE = document.querySelector("#mistakes");


export let failedTest = false;


export function resetValues() {
    resetQuote();
    STAT_VALUES.forEach((stat) => stat.textContent = "---");
};

export async function refreshTest() {
    failedTest = false;
    TEST_GUIDE.classList.remove("guide-error");

    try {
        resetValues();
        TEST_GUIDE.textContent = "Starting the test...";
        await updateQuote();
        TEST_GUIDE.textContent = "";
    } catch (error) {
        console.error(error);
        failedTest = true;
        TEST_GUIDE.classList.add("guide-error");
        TEST_GUIDE.textContent = "Failed to get the test. Press ESC to try again.";
    }
}