import DARK_MODE from "./js/darkMode.js";
import getQuote from "./js/quote.js";

DARK_MODE.loadDarkMode();

const BTN_DARK_MODE = document.querySelector("#btn-dark-mode");
BTN_DARK_MODE.addEventListener("click", DARK_MODE.toggleDarkMode);

getQuote();
