import { readLocalJson, writeLocalJson } from "./storage.js";

const KEY = "darkMode"
const DEFAULT = "false";
const BODY = document.querySelector("body")
const BTN_DARK_MODE = document.querySelector("#btn-dark-mode");

function applyMode(isDark) {
    BODY.classList.toggle("dark-mode", isDark);
    BTN_DARK_MODE.setAttribute("aria-pressed", String(isDark));
};

export function loadDarkMode() {
    const CURRENT_MODE = readLocalJson(KEY, DEFAULT);
    applyMode(CURRENT_MODE === "true");
};

export function toggleDarkMode() {
    const IS_DARK = !BODY.classList.contains("dark-mode");
    applyMode(IS_DARK);
    writeLocalJson(KEY, String(IS_DARK));
};