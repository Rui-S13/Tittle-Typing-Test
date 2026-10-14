let lastCharTop = null;
const TEST_INPUT = document.querySelector("#test-input");
const TYPING_TEST = document.querySelector("#typing-test");
const TEST_AREA = document.querySelector("#test-area");
const TEST_STATUS = document.querySelector("#test-status");

export function scrollTest() {
    const CURRENT_CHAR = document.querySelector(".char-current");
    if (!CURRENT_CHAR) return;

    const CHAR_RECT = CURRENT_CHAR.getBoundingClientRect();
    const AREA_RECT = TEST_AREA.getBoundingClientRect();

    const LINE_HEIGHT = parseFloat(
        getComputedStyle(TEST_AREA).lineHeight
    );

    if (CHAR_RECT.bottom > AREA_RECT.bottom - LINE_HEIGHT) {
        TEST_AREA.scrollBy({
            top: LINE_HEIGHT,
            behavior: "smooth"
        });
    }
}

export function focusTest() {
    TEST_INPUT.focus({ preventScroll: true });
    TYPING_TEST.scrollIntoView({ behavior: "smooth", block: "start" });
};

export function scrollToStatus() {
    TEST_STATUS.scrollIntoView({ behavior: "smooth", block: "start" });
};