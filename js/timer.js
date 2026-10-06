const TIMER = document.querySelector("#timer");

export function updateTimer(timerValue) {

    if (timerValue !== "false") {
        TIMER.textContent = `${timerValue}`;
    } else {
        TIMER.textContent = "Off";
    };
};