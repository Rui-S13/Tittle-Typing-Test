import { loadDarkMode, toggleDarkMode } from "./js/darkMode.js";
import { saveSettings, loadSettings } from "./js/settings.js";
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
const TYPING_TEST = document.querySelector("#typing-test");
const TEST_AREA = document.querySelector("#test-area");
const TEST_QUOTE = document.querySelector("#test-quote");
const TEST_INPUT = document.querySelector("#test-input");
const BTN_REFRESH = document.querySelector("#btn-refresh");
const SETTING_INPUTS = document.querySelectorAll(".setting-input");
const BTN_BACK_TO_TOP = document.querySelector("#btn-back-to-top");

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
        TYPING_TEST.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
        TEST_INPUT.focus();
        refreshTest();
    };
});

BTN_REFRESH.addEventListener("mousedown", (event) => {
    event.preventDefault();
});

BTN_REFRESH.addEventListener("click", () => {
    TYPING_TEST.scrollIntoView({
        behavior: "smooth",
        block: "start",
    });
    refreshTest();
    TEST_INPUT.focus();
});

TEST_INPUT.addEventListener("input", () => {
    TYPING_TEST.scrollIntoView({
        block: "start",
    });
    handleInput(TEST_INPUT.value);
});

SETTING_INPUTS.forEach((option) => {
    option.addEventListener("change", () => {
        saveSettings();
        TYPING_TEST.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
        refreshTest();
        TEST_INPUT.focus();
    });
});

BTN_BACK_TO_TOP.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});