import {loadDarkMode, toggleDarkMode} from "./js/darkMode.js";
import {saveSettings, loadSettings} from "./js/settings.js";
import {resetValues, startTest} from "./js/test.js";

loadDarkMode();
loadSettings();

const BTN_DARK_MODE = document.querySelector("#btn-dark-mode");
const TEST_AREA = document.querySelector("#test-area");
const TEST_QUOTE = document.querySelector("#test-quote");
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

TEST_INPUT.addEventListener("focus", () => {
    startTest();
});

TEST_INPUT.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        startTest();
    };
});

TEST_INPUT.addEventListener("blur", () => {
    resetValues();
    TEST_GUIDE.textContent = "CLICK on this area to start the test";
});