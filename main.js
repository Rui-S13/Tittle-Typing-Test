import DARK_MODE from "./js/darkMode.js";
import getQuote from "./js/getQuote.js";


const BTN_DARK_MODE = document.querySelector("#btn-dark-mode");
const TEST_AREA = document.querySelector("#test-area");
const TEST_INPUT = document.querySelector("#test-input");
const TEST_GUIDE = document.querySelector("#test-guide");
const TEST_QUOTE = document.querySelector("#test-quote");
const QUOTE_AUTHOR = document.querySelector("#quote-author");
const QUOTE_BOOK = document.querySelector("#quote-book");

const SETTING_INPUTS = document.querySelectorAll(".setting-input");

SETTING_INPUTS.forEach((option) => {
    option.addEventListener("change", saveSettings);
});

function saveSettings() {
    const SETTINGS = {
        timer: document.querySelector('input[name="timer"]:checked').value,
        sound: document.querySelector('input[name="sound"]:checked').value
    };

    localStorage.setItem("settings", JSON.stringify(SETTINGS));
}

async function updateQuote() {
    TEST_QUOTE.textContent = "";
    const QUOTE = await getQuote();

    QUOTE.text.split('').forEach((char) => {
        const charSpan = document.createElement('span');
        charSpan.classList.add("char", "char-idle");
        charSpan.innerText = char;
        TEST_QUOTE.appendChild(charSpan);
    });

    QUOTE_AUTHOR.textContent = QUOTE.authors;
    QUOTE_BOOK.textContent = QUOTE.bookTitle;
};

DARK_MODE.loadDarkMode();
BTN_DARK_MODE.addEventListener("click", DARK_MODE.toggleDarkMode);

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