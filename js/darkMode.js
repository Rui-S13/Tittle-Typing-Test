const DARK_MODE = {
    loadDarkMode() {
        const CURRENT_MODE = localStorage.getItem("darkMode");

        if (CURRENT_MODE === "on") {
            document.body.classList.add("dark_mode");
        }
    },

    toggleDarkMode() {
        document.body.classList.toggle("dark_mode");

        const MODE = document.body.classList.contains("dark_mode")
            ? "on"
            : "off";

        localStorage.setItem("darkMode", MODE);
    }
};

export default DARK_MODE;