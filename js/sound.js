const AUDIO_CONTEXT = new AudioContext();

const CORRECT_GAIN = AUDIO_CONTEXT.createGain();
const MISTAKE_GAIN = AUDIO_CONTEXT.createGain();

CORRECT_GAIN.gain.value = 0.7;
MISTAKE_GAIN.gain.value = 0.2;

CORRECT_GAIN.connect(AUDIO_CONTEXT.destination);
MISTAKE_GAIN.connect(AUDIO_CONTEXT.destination);

let correctBuffer;
let mistakeBuffer;

export async function loadSounds() {
    const correctResponse = await fetch(
        new URL("../assets/Correct_Char_Sound.mp3", import.meta.url).href
    );
    const correctData = await correctResponse.arrayBuffer();
    correctBuffer = await AUDIO_CONTEXT.decodeAudioData(correctData);

    const mistakeResponse = await fetch(
        new URL("../assets/Mistake_Char_Sound.mp3", import.meta.url).href
    );
    const mistakeData = await mistakeResponse.arrayBuffer();
    mistakeBuffer = await AUDIO_CONTEXT.decodeAudioData(mistakeData);
};

export async function playSound(type) {
    if (AUDIO_CONTEXT.state === "suspended") {
        await AUDIO_CONTEXT.resume();
    };

    const buffer = type === "correct"
        ? correctBuffer
        : mistakeBuffer;

    if (!buffer) return;

    const source = AUDIO_CONTEXT.createBufferSource();

    source.buffer = buffer;

    if (type === "correct") {
        source.connect(CORRECT_GAIN);
    };

    if (type === "mistake") {
        source.connect(MISTAKE_GAIN);
    };

    source.start();
};