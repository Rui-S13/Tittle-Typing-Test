const SETTINGS = {
    saveSettings() {
        const SETTINGS = {
            timer: document.querySelector('input[name="timer"]:checked').value,
            sound: document.querySelector('input[name="sound"]:checked').value
        };

        localStorage.setItem("settings", JSON.stringify(SETTINGS));
    },

    getSettings() {
        return JSON.parse(localStorage.getItem("settings"));
    },

    loadSettings() {
        const CURRENT_SETTINGS = this.getSettings();

        document.querySelector(
            `input[name="timer"][value="${CURRENT_SETTINGS.timer}"]`
        ).checked = true;

        document.querySelector(
            `input[name="sound"][value="${CURRENT_SETTINGS.sound}"]`
        ).checked = true;
    }
};

export default SETTINGS;