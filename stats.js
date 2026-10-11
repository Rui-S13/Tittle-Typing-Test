import { loadDarkMode, toggleDarkMode } from "./js/darkMode.js";
import { readLocalJson } from "./js/storage.js";
import { calculateStats } from "./js/calculations.js";

loadDarkMode();

const BTN_DARK_MODE = document.querySelector("#btn-dark-mode");
const BTN_BACK_TO_TOP = document.querySelector("#btn-back-to-top");

BTN_DARK_MODE.addEventListener("click", toggleDarkMode);

BTN_BACK_TO_TOP.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});


const NO_TEST_WARNING = document.querySelector("#no-test-warning");
const MAIN = document.querySelector("main");
const BEST_WPM = document.querySelector("#best-wpm");
const BEST_WPM_DATE = document.querySelector("#best-wpm-date");
const AVERAGE_WPM = document.querySelector("#average-wpm");
const AVERAGE_ACCURACY = document.querySelector("#average-accuracy");
const NUMBER_OF_TESTS = document.querySelector("#number-of-tests");
const TOTAL_TIME_DAYS = document.querySelector("#total-time-days");
const TIME_UNIT_DAYS = document.querySelector(".time-unit-days");
const TOTAL_TIME_HOURS = document.querySelector("#total-time-hours");
const TIME_UNIT_HOURS = document.querySelector(".time-unit-hours");
const TOTAL_TIME_MINUTES = document.querySelector("#total-time-minutes");
const TIME_UNIT_MINUTES = document.querySelector(".time-unit-minutes");
const TOTAL_TIME_SECONDS = document.querySelector("#total-time-seconds");


function fillStatPage() {
    const ALL_TESTS = readLocalJson("tests", []);

    if (ALL_TESTS.length === 0) {
        NO_TEST_WARNING.hidden = false;
        MAIN.hidden = true;
        return;
    };

    const ALL_STATS = calculateStats(ALL_TESTS);

    BEST_WPM.textContent = ALL_STATS.bestWpm;
    const DATE_BEST = new Date (ALL_STATS.bestDate);
    BEST_WPM_DATE.textContent = `${DATE_BEST.getDate()}/${DATE_BEST.getMonth() + 1}/${DATE_BEST.getFullYear()}`
    AVERAGE_WPM.textContent = ALL_STATS.avgWpm;
    AVERAGE_ACCURACY.textContent = ALL_STATS.avgAccuracy;
    NUMBER_OF_TESTS.textContent = ALL_STATS.count;

    const SECONDS = ALL_STATS.totalSeconds;
    const DAYS = Math.floor(SECONDS / 86400);
    const HOURS = Math.floor((SECONDS % 86400) / 3600);
    const MINUTES = Math.floor((SECONDS % 3600) / 60);
    const REMAINING_SECONDS = SECONDS % 60;

    if (DAYS !== 0) {
        TIME_UNIT_DAYS.hidden = false;
        TOTAL_TIME_DAYS.textContent = DAYS;
    };

    if (HOURS !== 0) {
        TIME_UNIT_HOURS.hidden = false;
        TOTAL_TIME_HOURS.textContent = HOURS;
    };

    if (MINUTES !== 0) {
        TIME_UNIT_MINUTES.hidden = false;
        TOTAL_TIME_MINUTES.textContent = MINUTES;
    };

    TOTAL_TIME_SECONDS.textContent = REMAINING_SECONDS;
};

fillStatPage();