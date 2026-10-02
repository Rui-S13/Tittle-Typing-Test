import {loadDarkMode, toggleDarkMode} from "./js/darkMode.js";
import {saveSettings, loadSettings} from "./js/settings.js";
import updateQuote from "./js/quotes.js";

loadDarkMode();
loadSettings();

const BTN_DARK_MODE = document.querySelector("#btn-dark-mode");
const TEST_AREA = document.querySelector("#test-area");
const TEST_INPUT = document.querySelector("#test-input");
const TEST_GUIDE = document.querySelector("#test-guide");
const SETTING_INPUTS = document.querySelectorAll(".setting-input");

SETTING_INPUTS.forEach((option) => {
    option.addEventListener("change", saveSettings);
});

BTN_DARK_MODE.addEventListener("click", toggleDarkMode);

TEST_AREA.addEventListener("click", () => {
    TEST_INPUT.focus();
});

TEST_AREA.addEventListener("pointerdown", (event) => {
    event.preventDefault();
});

TEST_INPUT.addEventListener("focus", () => {
    TEST_GUIDE.textContent = "Press ENTER to begin the test";
});

TEST_INPUT.addEventListener("blur", () => {
    TEST_QUOTE.style.display = "none";
    TEST_GUIDE.textContent = "CLICK on this area to focus on the test";
});