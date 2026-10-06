import { readJson, writeJson } from "./storage.js";
import { updateTimer } from "./timer.js";

const KEY = "settings";
const DEFAULTS = {
    timer: "30",
    sound: "true"
};

export function saveSettings() {
    const SETTINGS = {
        timer: document.querySelector('input[name="timer"]:checked').value,
        sound: document.querySelector('input[name="sound"]:checked').value
    };

    writeJson(KEY, SETTINGS);
}

export function getSettings() {
    return readJson(KEY, DEFAULTS)
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