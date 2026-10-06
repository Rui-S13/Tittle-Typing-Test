import { getSettings } from "./settings.js";
import { resetQuote, updateQuote } from "./quotes.js";
import { updateGuide, hideGuide } from "./guide.js";
import { calculateWPM, calculateAccuracy } from "./calculations.js";
import { updateState } from "./state.js";
import { updateTimer } from "./timer.js";
import { saveTest } from "./storage.js";
import { playSound } from "./sound.js";
import { updateHistory } from "./history.js";


const TEST_QUOTE = document.querySelector("#test-quote");
const TEST_INPUT = document.querySelector("#test-input");
const STAT_VALUES = document.querySelectorAll(".stat-value");
const WPM_VALUE = document.querySelector("#wpm");
const ACCURACY_VALUE = document.querySelector("#accuracy");
const MISTAKES_VALUE = document.querySelector("#mistakes");


let testFailed = false;
let testStarted = false;
let testFinished = false;
let intervalId = null;
let timerCountdown = null;
const SETTINGS = {
    timer: false,
    sound: false
};
const STATS = {
    startTime: null,
    endTime: null,
    keystrokes: 0,
    mistakes: 0,
    wpm: 0,
    accuracy: 0
};


export async function refreshTest() {
    resetQuote();
    updateState("awaiting");
    TEST_INPUT.value = "";

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

    clearInterval(intervalId);
    const CURRENT_SETTINGS = getSettings();
    SETTINGS.timer = CURRENT_SETTINGS.timer;
    SETTINGS.sound = CURRENT_SETTINGS.sound;
    timerCountdown = SETTINGS.timer;
    updateTimer(timerCountdown);

    testFailed = false;
    testStarted = false;
    testFinished = false;

    STATS.startTime = null;
    STATS.endTime = null;
    STATS.keystrokes = 0;
    STATS.mistakes = 0;
    STATS.wpm = 0;
    STATS.accuracy = 0;
};

function startTest() {
    STATS.startTime = Date.now();
    testStarted = true;

    updateState("ongoing");

    timerCountdown = SETTINGS.timer;
    updateTimer(timerCountdown);
    if (timerCountdown !== "false") {
        intervalId = setInterval(tick, 1000);
    };
};

function tick() {
    timerCountdown--
    updateTimer(timerCountdown);

    if (timerCountdown === 0) {
        finishTest();
    };
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
            const IS_NEXT = i === POSITION + 1;
            char.className = IS_NEXT ? "char char-idle char-current" : "char char-idle";
        };
    });
    return result;
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

export async function handleInput(input) {
    if (testFailed) return;
    if (!testStarted) startTest();
    if (testFinished) return;

    const RESULT = processInput(input);

    if (RESULT && getSettings().sound === "true") {
        await playSound(RESULT);
    };

    updateStats();

    const QUOTE_LENGTH = TEST_QUOTE.querySelectorAll("span").length;
    if (input.length >= QUOTE_LENGTH) {
        finishTest();
    };
};

function finishTest() {
    testFinished = true;
    STATS.endTime = Date.now();

    clearInterval(intervalId);
    if (timerCountdown === 0) {
        updateState("finished-timer");
    } else {
        updateState("finished");
    };

    const END_STATS = { ...STATS };
    const SAVE = saveTest(END_STATS);

    if (!SAVE) {
        updateGuide("failedSave");
    };

    updateHistory();
};