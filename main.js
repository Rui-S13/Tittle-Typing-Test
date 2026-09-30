import DARK_MODE from "./js/darkMode.js";

DARK_MODE.loadDarkMode();

const BTN_DARK_MODE = document.querySelector("#btn_dark_mode");
BTN_DARK_MODE.addEventListener("click", DARK_MODE.toggleDarkMode);