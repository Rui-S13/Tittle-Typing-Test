import DARK_MODE from "./js/darkMode.js";
import getQuote from "./js/quote.js";

DARK_MODE.loadDarkMode();

const BTN_DARK_MODE = document.querySelector("#btn-dark-mode");
BTN_DARK_MODE.addEventListener("click", DARK_MODE.toggleDarkMode);

getQuote();

const TEST_AREA = document.querySelector("#test-area");
const TEST_INPUT = document.querySelector("#test-input")
const TEST_GUIDE = document.querySelector("#test-guide")
TEST_AREA.addEventListener("click", () => {
    TEST_INPUT.focus()
});