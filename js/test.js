import { getSettings } from "./settings.js";
import { resetQuote, updateQuote } from "./quotes.js";
import { updateGuide, hideGuide } from "./guide.js";
import { calculateWPM, calculateAccuracy } from "./calculations.js";


const TEST_QUOTE = document.querySelector("#test-quote");
const STAT_VALUES = document.querySelectorAll(".stat-value");
const WPM_VALUE = document.querySelector("#wpm");
const ACCURACY_VALUE = document.querySelector("#accuracy");
const MISTAKES_VALUE = document.querySelector("#mistakes");


export let testFailed = false;
export let testStarted = false;
let intervalId = null;
const SETTINGS = {
    timer: false,
    sound: false
};
const STATS = {
    startTime: null,
    keystrokes: 0,
    mistakes: 0,
    wpm: 0,
    accuracy: 0
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

function resetValues() {
    STAT_VALUES.forEach((stat) => stat.textContent = "---");

    testFailed = false;
    testStarted = false;

    STATS.startTime = null;
    STATS.keystrokes = 0;
    STATS.mistakes = 0;
    STATS.wpm = 0;
    STATS.accuracy = 0;

    clearInterval(intervalId);
};

function startTest() {
    const CURRENT_SETTINGS = getSettings();
    SETTINGS.timer = CURRENT_SETTINGS.timer;
    SETTINGS.sound = CURRENT_SETTINGS.sound;

    STATS.startTime = Date.now();
    testStarted = true;

    intervalId = setInterval(tick, 1000);
};

function tick() {
    updateStats();
    // the timer check goes here later
};

function processInput(input) {
    const POSITION = input.length - 1;
    const INPUTED_CHAR = input[POSITION];
    let result = null;

    const QUOTE = TEST_QUOTE.querySelectorAll("span");

    QUOTE.forEach((char, i) => {
        if (i < POSITION) {
            return;
        } else if (i === POSITION) {
            if (char.classList.contains("char-idle")) {
                STATS.keystrokes++;

                if (INPUTED_CHAR === char.textContent) {
                    char.className = "char char-correct";
                    result = "correct";
                } else {
                    STATS.mistakes++;
                    char.className = "char char-mistake";
                    result = "mistake";
                }
            }
        } else {
            char.className = "char char-idle";
        }
    });
    return result;
};

export function handleInput(input) {
    if (testFailed) return;
    if (!testStarted) startTest();

    const RESULT = processInput(input);

    /*     if (RESULT && getSettings().sound === "true") {
            playSound(RESULT);
        }; */

    updateStats();

    /*     const QUOTE_LENGTH = TEST_QUOTE.querySelectorAll("span").length;
        if (input.length >= QUOTE_LENGTH) {
            endTest();
        }; */
};

function updateStats() {
    const CORRECT_CHARS = TEST_QUOTE.querySelectorAll(".char-correct").length;

    STATS.wpm = calculateWPM(CORRECT_CHARS, STATS.startTime, Date.now());
    STATS.accuracy = calculateAccuracy(STATS.keystrokes, STATS.mistakes);

    displayStats();
};

function displayStats() {
    WPM_VALUE.textContent = `${STATS.wpm}`;
    ACCURACY_VALUE.textContent = `${STATS.accuracy}`;
    MISTAKES_VALUE.textContent = `${STATS.mistakes}`;
};