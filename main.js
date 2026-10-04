import { loadDarkMode, toggleDarkMode } from "./js/darkMode.js";
import { saveSettings, updateTimerStart, loadSettings } from "./js/settings.js";
import { refreshTest, resetValues } from "./js/test.js";

loadDarkMode();
loadSettings();
refreshTest();

const BODY = document.querySelector("body");
const BTN_DARK_MODE = document.querySelector("#btn-dark-mode");
const TEST_AREA = document.querySelector("#test-area");
const TEST_INPUT = document.querySelector("#test-input");
const BTN_REFRESH = document.querySelector("#btn-refresh");
const SETTING_INPUTS = document.querySelectorAll(".setting-input");

SETTING_INPUTS.forEach((option) => {
    option.addEventListener("change", () => {
        saveSettings();
        updateTimerStart();
    });
});

BTN_DARK_MODE.addEventListener("click", toggleDarkMode);

TEST_AREA.addEventListener("click", () => {
    TEST_INPUT.focus();
});

BODY.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        TEST_INPUT.focus();
        refreshTest();
    };
});

BTN_REFRESH.addEventListener(("click"), () => {
    refreshTest();
});