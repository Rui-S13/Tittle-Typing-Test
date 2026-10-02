import { readJson, writeJson } from "./storage.js";

const KEY = "darkMode"
const DEFAULT = "false";
const BODY = document.querySelector("body")

export function loadDarkMode() {
    const CURRENT_MODE = readJson(KEY, DEFAULT);

    if (CURRENT_MODE === "true") {
        document.body.classList.add("dark-mode");
    };
};

export function toggleDarkMode() {
    BODY.classList.toggle("dark-mode");

    const MODE = BODY.classList.contains("dark-mode")
        ? "true"
        : "false";

    writeJson(KEY, MODE);
};