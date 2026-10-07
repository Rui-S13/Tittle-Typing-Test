let lastCharTop = null;
const TEST_AREA = document.querySelector("#test-area");

export function scrollTest() {
    const CURRENT_CHAR = document.querySelector(".char-current");

    if (CURRENT_CHAR.offsetTop !== lastCharTop) {
        lastCharTop = CURRENT_CHAR.offsetTop;

        const targetTop =
            CURRENT_CHAR.offsetTop
            - TEST_AREA.clientHeight / 2
            + CURRENT_CHAR.offsetHeight / 2;

        TEST_AREA.scrollTo({
            top: targetTop,
            behavior: "smooth"
        });
    };
};