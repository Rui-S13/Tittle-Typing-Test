export function calculateWPM(correctChars, startTime, currentTime) {
    const ELAPSED_MINUTES = (currentTime - startTime) / 60000;

    if (ELAPSED_MINUTES <= 0) return 0;

    return Math.round((correctChars / 5) / ELAPSED_MINUTES);
};

export function calculateAccuracy(keystrokes, mistakes) {
    if (keystrokes === 0) return 100;

    return Math.round(((keystrokes - mistakes) / keystrokes) * 1000) / 10;
};