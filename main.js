import { loadDarkMode, toggleDarkMode } from "./js/darkMode.js";
import { saveSettings, loadSettings } from "./js/settings.js";
import { refreshTest, resetValues } from "./js/test.js";

loadDarkMode();
loadSettings();

const BODY = document.querySelector("body");
const BTN_DARK_MODE = document.querySelector("#btn-dark-mode");
const TEST_AREA = document.querySelector("#test-area");
const TEST_QUOTE = document.querySelector("#test-quote");
const TEST_GUIDE = document.querySelector("#test-guide");
const TEST_INPUT = document.querySelector("#test-input");
const BTN_REFRESH = document.querySelector("#btn-refresh");
const SETTING_INPUTS = document.querySelectorAll(".setting-input");

let failedTest = false;
try {
    refreshTest();
} catch (error) {
    failedTest = true;
    TEST_GUIDE
};

SETTING_INPUTS.forEach((option) => {
    option.addEventListener("change", saveSettings);
});

BTN_DARK_MODE.addEventListener("click", toggleDarkMode);

TEST_AREA.addEventListener("click", () => {
    TEST_INPUT.focus();
});

TEST_INPUT.addEventListener("blur", () => {
    resetValues();
    TEST_GUIDE.textContent = "CLICK on this area to start the test";
});

BODY.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        refreshTest();
    };
});

BTN_REFRESH.addEventListener(("click"), () => {
    failedTest = false;
    refreshTest();
});