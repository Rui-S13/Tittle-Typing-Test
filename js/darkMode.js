const DARK_MODE = {
    loadDarkMode() {
        const CURRENT_MODE = localStorage.getItem("darkMode");

        if (CURRENT_MODE === "on") {
            document.body.classList.add("dark-mode");
        }
    },

    toggleDarkMode() {
        document.body.classList.toggle("dark-mode");

        const MODE = document.body.classList.contains("dark-mode")
            ? "on"
            : "off";

        localStorage.setItem("darkMode", MODE);
    }
};

export default DARK_MODE;