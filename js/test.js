import { getSettings } from "./settings.js";
import { resetQuote, updateQuote } from "./quotes.js";
import { updateGuide, hideGuide } from "./guide.js";


const STAT_VALUES = document.querySelectorAll(".stat-value");
const WPM_VALUE = document.querySelector("#wpm");
const ACCURACY_VALUE = document.querySelector("#accuracy");
const MISTAKES_VALUE = document.querySelector("#mistakes");


export let testFailed = false;
export let testStarted = false;
const stats = {
    keystrokes: 0,
    mistakes: 0,
    wpm: 0,
    accuracy: 0
};


export function resetValues() {
    resetQuote();
    STAT_VALUES.forEach((stat) => stat.textContent = "---");
    
    testFailed = false;
    testStarted = false;
    
    stats.keystrokes = 0;
    stats.mistakes = 0;
    stats.wpm = 0;
    stats.accuracy = 0;
};

export async function refreshTest() {
    testFailed = false;

    try {
        resetValues();
        updateGuide("loading");
        await updateQuote();
        hideGuide();
    } catch (error) {
        console.error(error);
        testFailed = true;
        updateGuide("testError");
    };
};