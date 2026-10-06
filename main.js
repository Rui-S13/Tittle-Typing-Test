import { loadDarkMode, toggleDarkMode } from "./js/darkMode.js";
import { saveSettings,  loadSettings } from "./js/settings.js";
import { refreshTest, handleInput } from "./js/test.js";
import { hideGuide, updateGuide } from "./js/guide.js";
import { loadSounds } from "./js/sound.js";
import { updateHistory } from "./js/history.js";

loadDarkMode();
loadSettings();
await loadSounds();
refreshTest();
updateHistory();

const BODY = document.querySelector("body");
const BTN_DARK_MODE = document.querySelector("#btn-dark-mode");
const TEST_AREA = document.querySelector("#test-area");
const TEST_QUOTE = document.querySelector("#test-quote");
const TEST_INPUT = document.querySelector("#test-input");
const BTN_REFRESH = document.querySelector("#btn-refresh");
const SETTING_INPUTS = document.querySelectorAll(".setting-input");

TEST_INPUT.focus();

BTN_DARK_MODE.addEventListener("click", toggleDarkMode);

TEST_AREA.addEventListener("click", () => {
    TEST_INPUT.focus();
});

TEST_AREA.addEventListener("mousedown", (event) => {
    event.preventDefault();
});

TEST_INPUT.addEventListener("focus", () => {
    hideGuide();
});

TEST_INPUT.addEventListener("blur", () => {
    updateGuide("lostFocus");
});

BODY.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        TEST_INPUT.focus();
        refreshTest();
    };
});

BTN_REFRESH.addEventListener("mousedown", (event) => {
    event.preventDefault();
});

BTN_REFRESH.addEventListener("click", () => {
    refreshTest();
    TEST_INPUT.focus();
});

TEST_INPUT.addEventListener("input", () => {
    handleInput(TEST_INPUT.value);
});

SETTING_INPUTS.forEach((option) => {
    option.addEventListener("change", () => {
        saveSettings();
        refreshTest();
        TEST_INPUT.focus();
    });
});