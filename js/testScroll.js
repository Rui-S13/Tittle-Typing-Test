let lastCharTop = null;
const TEST_AREA = document.querySelector("#test-area");

export function scrollTest() {
    const CURRENT_CHAR = document.querySelector(".char-current");
    if (!CURRENT_CHAR) return;

    if (CURRENT_CHAR.offsetTop !== lastCharTop) {
        lastCharTop = CURRENT_CHAR.offsetTop;

        const LINE_HEIGHT = parseFloat(getComputedStyle(TEST_AREA).lineHeight);

        TEST_AREA.scrollTo({
            top: CURRENT_CHAR.offsetTop - LINE_HEIGHT,
            behavior: "smooth"
        });
    };
};