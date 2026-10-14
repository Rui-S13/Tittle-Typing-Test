import { readLocalJson, readSessionJson } from "./storage.js";
import { TESTS_KEY } from "./storage.js";

const PERSONAL_MESSAGE_BOX = document.querySelector("#personal-best-message");
const PERSONAL_MESSAGE = {
    FIRST_TEST: "firstTest",
    BEST_LOCAL: "bestLocal",
    BEST_SESSION: "bestSession",
    START_SESSION: "startSession"
};

export function compareTest(test) {
    const TEST_LIST_LOCAL = readLocalJson(TESTS_KEY, []);
    const TEST_LIST_SESSION = readSessionJson(TESTS_KEY,[]);

    if (TEST_LIST_LOCAL.length === 0) {
        setPersonalMesssage(PERSONAL_MESSAGE.FIRST_TEST);
        return;
    };

    const MAX_WPM_LOCAL = TEST_LIST_LOCAL.reduce((acc, n) => n.wpm > acc ? n.wpm : acc, 0);
    const MAX_WPM_SESSION = TEST_LIST_SESSION.reduce((acc, n) => n.wpm > acc ? n.wpm : acc, 0);

    if (test.wpm > MAX_WPM_LOCAL) {
        setPersonalMesssage(PERSONAL_MESSAGE.BEST_LOCAL);
    } else if (test.wpm > MAX_WPM_SESSION && TEST_LIST_SESSION.length !== 0) {
        setPersonalMesssage(PERSONAL_MESSAGE.BEST_SESSION);
    } else if (TEST_LIST_SESSION.length === 0) {
        setPersonalMesssage(PERSONAL_MESSAGE.START_SESSION);
    };
};

function setPersonalMesssage(type) {
    let inner_html = "";

    switch (type) {
        case (PERSONAL_MESSAGE.FIRST_TEST):
            inner_html = "Your first test! <span>\\(^o^)/</span>";
            break;
        case (PERSONAL_MESSAGE.BEST_LOCAL):
            inner_html = "A new personal record! <span>\\(^o^)/</span>";
            break;
        case (PERSONAL_MESSAGE.BEST_SESSION):
            inner_html = "Your best test of the session! <span>\\(^o^)/</span>";
            break;
        case (PERSONAL_MESSAGE.START_SESSION):
            inner_html = "Let's start typing! <span>\\(^o^)/</span>";
            break;
        default:
            inner_html = "";
            break;
    };

    PERSONAL_MESSAGE_BOX.hidden = false;
    PERSONAL_MESSAGE_BOX.innerHTML = inner_html;
};

export function hidePersonalMessage() {
    PERSONAL_MESSAGE_BOX.innerHTML = "";
    PERSONAL_MESSAGE_BOX.hidden = true;
};