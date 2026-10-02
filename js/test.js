import { getSettings } from "./settings.js";
import { updateQuote } from "./quotes.js";

const TEST_GUIDE = document.querySelector("#test-guide");
const STAT_VALUES = document.querySelectorAll(".stat-value");
const WPM_VALUE = document.querySelector("#wpm");
const ACCURACY_VALUE = document.querySelector("#accuracy");
const MISTAKES_VALUE = document.querySelector("#mistakes");

function resetValues () {
    STAT_VALUES.forEach((stat) => stat.textContent = "---");
};

export async function startTest () {
    resetValues();
    TEST_GUIDE.textContent = "Starting the test...";
    await updateQuote();
};