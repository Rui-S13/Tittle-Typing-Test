import { TEST_STATE, FINISH_REASON, GUIDE } from "./constants.js";
import { getSettings } from "./settings.js";
import { resetQuote, updateQuote } from "./quotes.js";
import { updateGuide, hideGuide, updateState, displayStats, updateTimer, refreshDisplay } from "./testDisplay.js";
import { calculateWPM, calculateAccuracy } from "./calculations.js";
import { saveLocalTest, saveSessionTest } from "./storage.js";
import { playSound } from "./sound.js";
import { updateHistory, updateSessionSummary } from "./sessionInfo.js";
import { compareTest } from "./compareTest.js";
import { scrollToStatus } from "./testScroll.js";


const TEST_QUOTE = document.querySelector("#test-quote");
const TEST_INPUT = document.querySelector("#test-input");

let testState = TEST_STATE.IDLE;
let idTestQuote = null;
let intervalId = null;
let timerCountdown = null;
const SETTINGS = {
    timer: "false",
    sound: "false"
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
    resetValues();
    refreshDisplay();
    TEST_INPUT.value = "";
    resetQuote();

    try {
        updateGuide(GUIDE.LOADING);
        const QUOTE = await updateQuote();
        idTestQuote = QUOTE.idQuote;
        TEST_INPUT.value = "";
        testState = TEST_STATE.IDLE;
        hideGuide();
    } catch (error) {
        console.error(error);
        testState = TEST_STATE.FAILED;
        updateGuide(GUIDE.TEST_ERROR);
    };
};

function resetValues() {
    clearInterval(intervalId);

    resetSettings();

    testState = TEST_STATE.LOADING;

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
    timerCountdown = SETTINGS.timer === "false" ? null : Number(SETTINGS.timer);
    updateTimer(SETTINGS.timer);
};

function startTest() {
    TIME.startTime = Date.now();
    testState = TEST_STATE.RUNNING;

    updateState(TEST_STATE.RUNNING);

    if (timerCountdown !== null) {
        intervalId = setInterval(tick, 1000);
    };
};

function tick() {
    updateStats();
    displayStats(STATS);

    timerCountdown--
    updateTimer(timerCountdown);

    if (timerCountdown === 0) {
        finishTest(FINISH_REASON.TIMER);
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

export function handleInput(input) {
    if (testState === TEST_STATE.FAILED) return;

    if (testState === TEST_STATE.LOADING) {
        TEST_INPUT.value = "";
        return;
    };

    if (testState === TEST_STATE.FINISHED || testState === TEST_STATE.CANCELLED) return;

    if (testState === TEST_STATE.IDLE) {
        if (input === "") return;
        startTest();
    };

    const RESULT = processInput(input);

    if (RESULT && SETTINGS.sound === "true") {
        playSound(RESULT);
    };

    updateStats();
    displayStats(STATS);

    if (input.length >= TEST_QUOTE.querySelectorAll("span").length) {
        finishTest(FINISH_REASON.QUOTE);
    };
};

export function cancelTest() {
    if (testState !== TEST_STATE.RUNNING) return;
    testState = TEST_STATE.CANCELLED;

    updateState(TEST_STATE.CANCELLED);

    clearInterval(intervalId);
};

export function hasTestStarted() {
    return [TEST_STATE.RUNNING, TEST_STATE.FINISHED, TEST_STATE.CANCELLED].includes(testState);
};

function finishTest(reason) {
    if (testState !== TEST_STATE.RUNNING) return;
    testState = TEST_STATE.FINISHED;

    stopTest(reason);
    saveResult();
};

function stopTest(reason) {
    TIME.endTime = Date.now();
    clearInterval(intervalId);

    updateState(TEST_STATE.FINISHED, reason);
    updateStats();
    displayStats(STATS);
    scrollToStatus();
};

function saveResult() {
    const END_TEST = { ...TIME, ...STATS, timer: SETTINGS.timer, idQuote: idTestQuote };

    compareTest(END_TEST);

    const SAVED_LOCAL = saveLocalTest(END_TEST);
    const SAVED_SESSION = saveSessionTest(END_TEST);
    if (!SAVED_LOCAL || !SAVED_SESSION) {
        updateGuide(GUIDE.FAILED_SAVE);
    };

    updateSessionSummary();
    updateHistory();
};