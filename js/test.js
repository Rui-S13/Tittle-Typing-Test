import { getSettings } from "./settings.js";
import { updateQuote } from "./quotes.js";

const STAT_VALUES = document.querySelectorAll(".stat-value");
const WPM_VALUE = document.querySelector("#wpm");
const ACCURACY_VALUE = document.querySelector("#accuracy");
const MISTAKES_VALUE = document.querySelector("#mistakes");

function resetValues () {
    STAT_VALUES.forEach((stat) => stat.textContent = "teste");
};