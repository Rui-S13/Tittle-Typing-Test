import { readLocalJson, readSessionJson } from "./storage.js";
import { TESTS_KEY } from "./storage.js";

const PERSONAL_MESSAGE = document.querySelector("#personal-best-message");

export function compareTest(test) {
    const TEST_LIST_LOCAL = readLocalJson(TESTS_KEY, []);
    const TEST_LIST_SESSION = readSessionJson(TESTS_KEY,[]);

    if (TEST_LIST_LOCAL.length === 0) {
        setPersonalMesssage("firstTest");
        return;
    };

    const MAX_WPM_LOCAL = TEST_LIST_LOCAL.reduce((acc, n) => n.wpm > acc ? n.wpm : acc, 0);
    const MAX_WPM_SESSION = TEST_LIST_SESSION.reduce((acc, n) => n.wpm > acc ? n.wpm : acc, 0);

    if (test.wpm > MAX_WPM_LOCAL) {
        setPersonalMesssage("bestLocal");
    } else if (test.wpm > MAX_WPM_SESSION && TEST_LIST_SESSION.length !== 0) {
        setPersonalMesssage("bestSession");
    } else if (TEST_LIST_SESSION.length === 0) {
        setPersonalMesssage("startSession");
    }
};

function setPersonalMesssage(type) {
    let inner_html = "";

    switch (type) {
        case ("firstTest"):
            inner_html = "Your first test! <span>\\(^o^)/</span>";
            break;
        case ("bestLocal"):
            inner_html = "A new personal record! <span>\\(^o^)/</span>";
            break;
        case ("bestSession"):
            inner_html = "Your best test of the session! <span>\\(^o^)/</span>";
            break;
        case ("startSession"):
            inner_html = "Let's start typing! <span>\\(^o^)/</span>";
            break;
        default:
            inner_html = "";
            break;
    };

    PERSONAL_MESSAGE.hidden = false;
    PERSONAL_MESSAGE.innerHTML = inner_html;
};

export function hidePersonalMessage() {
    PERSONAL_MESSAGE.innerHTML = "";
    PERSONAL_MESSAGE.hidden = true;
};