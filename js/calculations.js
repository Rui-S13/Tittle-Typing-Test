export function calculateWPM(correctChars, startTime, currentTime) {
    const ELAPSED_MINUTES = (currentTime - startTime) / 60000;

    if (ELAPSED_MINUTES <= 0) return 0;

    return Math.round((correctChars / 5) / ELAPSED_MINUTES);
};

export function calculateAccuracy(keystrokes, mistakes) {
    if (keystrokes === 0) return 100;

    return Math.round(((keystrokes - mistakes) / keystrokes) * 1000) / 10;
};

export function calculateStats(tests) {
    if (tests.length === 0) return null;

    const TOTALS = tests.reduce((acc, test) => ({
        wpm: acc.wpm + test.wpm,
        accuracy: acc.accuracy + test.accuracy,
        best: (acc.best === null || test.wpm > acc.best.wpm) ? test : acc.best,
        time: acc.time + (test.endTime - test.startTime)
    }), { wpm: 0, accuracy: 0, best: null, time: 0 });

    return {
        count: tests.length,
        avgWpm: Math.round(TOTALS.wpm / tests.length),
        avgAccuracy: Math.round(TOTALS.accuracy / tests.length),
        bestWpm: TOTALS.best.wpm,
        bestDate: TOTALS.best.endTime,
        totalSeconds: Math.round(TOTALS.time / 1000)
    };
};