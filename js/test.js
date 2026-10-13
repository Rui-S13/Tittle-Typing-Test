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
import { updateSessionSummary } from "./sessionSummary.js";


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
    STAT_VALUES.forEach((stat) => stat.textContent = "---");
    TEST_INPUT.value = "";
    hidePersonalMessage();

    resetQuote();
    updateState("awaiting");

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
    const INPUT_CHAR = input[POSITION];
    const QUOTE_CHARS = TEST_QUOTE.querySelectorAll("span");

    let result = null;

    QUOTE_CHARS.forEach((char, index) => {
        if (index < POSITION) return;

        if (index === POSITION) {
            if (!char.classList.contains("char-idle")) return;

            STATS.keystrokes++;

            const IS_CORRECT = INPUT_CHAR === char.textContent;

            if (!IS_CORRECT) STATS.mistakes++;

            result = IS_CORRECT ? "correct" : "mistake";
            updateChar(char, result);
            return;
        };

        if (index === POSITION + 1) {
            updateChar(char, "idle", true);
        } else {
            updateChar(char, "idle");
        };
    });

    return result;
};

function updateChar(char, result, current = false) {
    let classes = `char char-${result}`;

    if (current) {
        classes += " char-current"
    };

    char.className = classes;
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

    if (TEST_QUOTE.querySelectorAll("span").length === 0) {
        TEST_INPUT.value = "";
        return;
    };

    if (!testStarted && input === "") return;
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
    if (testFinished) return;
    testFinished = true;

    updateState("cancelled");

    clearInterval(intervalId);
};

function finishTest() {
    if (testFinished) return;
    testFinished = true;

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

    updateSessionSummary();
    updateHistory();
};