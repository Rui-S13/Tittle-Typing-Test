import { getSettings } from "./settings.js";
import { resetQuote, updateQuote } from "./quotes.js";
import { updateGuide, hideGuide } from "./guide.js";
import { calculateWPM, calculateAccuracy } from "./calculations.js";
import { updateState } from "./state.js";
import { updateTimer } from "./timer.js";
import { saveLocalTest, saveSessionTest } from "./storage.js";
import { playSound } from "./sound.js";
import { updateHistory } from "./history.js";
import { compareTest, hidePersonalMessage } from "./compareTest.js";


const TEST_QUOTE = document.querySelector("#test-quote");
const TEST_INPUT = document.querySelector("#test-input");
const TYPING_TEST = document.querySelector("#typing-test");
const STAT_VALUES = document.querySelectorAll(".stat-value");
const WPM_VALUE = document.querySelector("#wpm");
const ACCURACY_VALUE = document.querySelector("#accuracy");
const MISTAKES_VALUE = document.querySelector("#mistakes");


let testFailed = false;
export let testStarted = false;
let testFinished = false;
let idTestQuote = null;
let intervalId = null;
let timerCountdown = null;

const SETTINGS = {
    timer: false,
    sound: false
};
const TIME = {
    startTime: null,
    endTime: null,
}
const STATS = {
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
        const QUOTE = await updateQuote();
        idTestQuote = await QUOTE.idQuote;
        hideGuide();
    } catch (error) {
        console.error(error);
        testFailed = true;
        updateGuide("testError");
    };
};

function resetValues() {
    STAT_VALUES.forEach((stat) => stat.textContent = "---");
    hidePersonalMessage();

    clearInterval(intervalId);

    resetSettings();

    testFailed = false;
    testStarted = false;
    testFinished = false;
    idTestQuote = null;

    TIME.startTime = null;
    TIME.endTime = null;

    STATS.keystrokes = 0;
    STATS.mistakes = 0;
    STATS.wpm = 0;
    STATS.accuracy = 0;

    TYPING_TEST.className = "";
};

export function resetSettings() {
    const CURRENT_SETTINGS = getSettings();
    SETTINGS.timer = CURRENT_SETTINGS.timer;
    SETTINGS.sound = CURRENT_SETTINGS.sound;
    timerCountdown = SETTINGS.timer;
    updateTimer(timerCountdown);
};

function startTest() {
    TIME.startTime = Date.now();
    testStarted = true;

    updateState("ongoing");

    TYPING_TEST.className = "typing-test-ongoing";

    if (timerCountdown !== "false") {
        intervalId = setInterval(tick, 1000);
    };
};

function tick() {
    updateStats();

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

    STATS.wpm = calculateWPM(CORRECT_CHARS, TIME.startTime, Date.now());
    STATS.accuracy = calculateAccuracy(STATS.keystrokes, STATS.mistakes);
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
    displayStats();

    const QUOTE_LENGTH = TEST_QUOTE.querySelectorAll("span").length;
    if (input.length >= QUOTE_LENGTH) {
        finishTest();
    };
};

export function cancelTest() {
    if (!testStarted) return;
    testFinished = true;

    TYPING_TEST.className = "typing-test-cancelled";
    updateState("cancelled");

    clearInterval(intervalId);
};

function finishTest() {
    testFinished = true;

    TYPING_TEST.className = "typing-test-finished";
    TIME.endTime = Date.now();

    clearInterval(intervalId);
    if (timerCountdown === 0) {
        updateState("finished-timer");
    } else {
        updateState("finished");
    };

    window.scrollTo({
        top: 0
    });

    updateStats();
    displayStats();
    const END_TEST = { ...TIME, ...STATS, timer: SETTINGS.timer, idQuote: idTestQuote };

    compareTest(END_TEST);

    const SAVED_LOCAL = saveLocalTest(END_TEST);
    const SAVED_SESSION = saveSessionTest(END_TEST);
    if (!SAVED_LOCAL || !SAVED_SESSION) {
        updateGuide("failedSave");
    };

    updateHistory();
};