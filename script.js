const BTN_DARK_MODE = document.querySelector("#btn_dark_mode");
const BODY = document.querySelector("body");
BTN_DARK_MODE.addEventListener("click", () => {
    BODY.classList.toggle("dark_mode");
});