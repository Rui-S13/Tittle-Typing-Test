import DARK_MODE from "./js/darkMode.js";
import getQuote from "./js/quote.js";

DARK_MODE.loadDarkMode();

const BTN_DARK_MODE = document.querySelector("#btn-dark-mode");
BTN_DARK_MODE.addEventListener("click", DARK_MODE.toggleDarkMode);

const TEST_AREA = document.querySelector("#test-area");
const TEST_INPUT = document.querySelector("#test-input");
const TEST_GUIDE = document.querySelector("#test-guide");
const TEST_QUOTE = document.querySelector("#test-quote");

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