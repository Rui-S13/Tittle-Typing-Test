import { loadDarkMode, toggleDarkMode } from "./js/darkMode.js";

loadDarkMode();

const BTN_DARK_MODE = document.querySelector("#btn-dark-mode");
const BTN_BACK_TO_TOP = document.querySelector("#btn-back-to-top");

BTN_DARK_MODE.addEventListener("click", toggleDarkMode);

BTN_BACK_TO_TOP.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});