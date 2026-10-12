import { readLocalJson, writeLocalJson } from "./storage.js";

const SETTINGS_KEY = "settings";
const DEFAULTS = {
    timer: "30",
    sound: "true"
};

export function saveSettings() {
    const SETTINGS = {
        timer: document.querySelector('input[name="timer"]:checked').value,
        sound: document.querySelector('input[name="sound"]:checked').value
    };

    writeLocalJson(SETTINGS_KEY, SETTINGS);
}

export function getSettings() {
    return readLocalJson(SETTINGS_KEY, DEFAULTS)
};

export function loadSettings() {
    const CURRENT_SETTINGS = getSettings();

    document.querySelector(
        `input[name="timer"][value="${CURRENT_SETTINGS.timer}"]`
    ).checked = true;

    document.querySelector(
        `input[name="sound"][value="${CURRENT_SETTINGS.sound}"]`
    ).checked = true;
};