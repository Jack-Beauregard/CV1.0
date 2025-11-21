// =======================
//  STABLE THEME SYSTEM
// =======================

// Feature detection
var hasLocalStorage = (function () {
    try {
        return typeof Storage !== "undefined" && window.localStorage !== null;
    } catch (e) {
        return false;
    }
})();

var safeLocalStorage = {
    getItem: function (key) {
        if (!hasLocalStorage) return null;
        try {
            return localStorage.getItem(key);
        } catch (e) {
            return null;
        }
    },
    setItem: function (key, value) {
        if (!hasLocalStorage) return;
        try {
            localStorage.setItem(key, value);
        } catch (e) {}
    }
};

// Elements
var themeToggle = document.getElementById("theme-toggle");
var themeDark = document.getElementById("theme-dark");
var themeLight = document.getElementById("theme-light");
var lightcycle = document.getElementById("lightcycle");
var trail = document.getElementById("lightcycle-trail");

// Flags
var isThemeChanging = false;
var themeTransitionTimeout = null;

// Detect system theme (fallback: dark)
function getSystemTheme() {
    try {
        if (window.matchMedia("(prefers-color-scheme: light)").matches)
            return "light";
    } catch (e) {}
    return "dark";
}

// Move motor instantly at load
function applyInitialMotorPosition(theme) {
    if (!lightcycle || !trail) return;

    lightcycle.style.transition = "none";
    trail.style.transition = "none";

    if (theme === "light") {
        lightcycle.style.left = "85px";
        trail.style.width = "100px";
    } else {
        lightcycle.style.left = "5px";
        trail.style.width = "0";
    }

    setTimeout(() => {
        lightcycle.style.transition = "";
        trail.style.transition = "";
    }, 10);
}

// Load theme on start
function loadTheme() {
    var savedTheme = safeLocalStorage.getItem("theme");
    var theme = savedTheme || getSystemTheme();

    // HTML state
    if (theme === "light") {
        document.documentElement.setAttribute("data-theme", "light");
        document.documentElement.classList.add("light-theme");

        if (themeDark) themeDark.disabled = true;
        if (themeLight) themeLight.disabled = false;
    } else {
        document.documentElement.removeAttribute("data-theme");
        document.documentElement.classList.remove("light-theme");

        if (themeDark) themeDark.disabled = false;
        if (themeLight) themeLight.disabled = true;
    }

    applyInitialMotorPosition(theme);
}

// Animate motor
function animateLightcycle(goRight) {
    if (!lightcycle || !trail) return;

    lightcycle.style.transition = "left 0.8s ease";
    trail.style.transition = "width 0.8s ease";

    if (goRight) {
        lightcycle.style.left = "85px";
        trail.style.width = "100px";
    } else {
        lightcycle.style.left = "5px";
        trail.style.width = "0";
    }
}

// Set theme
function setTheme(theme, animated) {
    if (isThemeChanging) return;

    isThemeChanging = true;
    document.body.style.transition = "none";

    // Clear previous timeouts
    if (themeTransitionTimeout) {
        clearTimeout(themeTransitionTimeout);
        themeTransitionTimeout = null;
    }

    // =============== LIGHT MODE ===============
    if (theme === "light") {
        if (themeDark) themeDark.disabled = true;
        if (themeLight) themeLight.disabled = false;

        // Instant background override → prevents flicker
        document.body.style.background =
            "linear-gradient(135deg, #e8f4f8 0%, #f0f8ff 100%)";

        setTimeout(() => {
            document.documentElement.setAttribute("data-theme", "light");
            document.documentElement.classList.add("light-theme");
        }, 10);

        safeLocalStorage.setItem("theme", "light");

        if (animated) animateLightcycle(true);
        else applyInitialMotorPosition("light");

        themeTransitionTimeout = setTimeout(() => {
            document.body.style.background = "";
            document.body.style.transition = "";
            isThemeChanging = false;
        }, animated ? 500 : 0);

        return;
    }

    // =============== DARK MODE ===============
    if (themeDark) themeDark.disabled = false;
    if (themeLight) themeLight.disabled = true;

    document.body.style.background =
        "linear-gradient(135deg, #0a0e1a 0%, #1a1f3a 100%)";

    document.documentElement.removeAttribute("data-theme");
    document.documentElement.classList.remove("light-theme");

    safeLocalStorage.setItem("theme", "dark");

    if (animated) animateLightcycle(false);
    else applyInitialMotorPosition("dark");

    themeTransitionTimeout = setTimeout(() => {
        document.body.style.background = "";
        document.body.style.transition = "";
        isThemeChanging = false;
    }, animated ? 500 : 0);
}

// =============== CLICK HANDLER (debounced) ===============
var lastThemeClick = 0;
var themeClickDelay = 300;

if (themeToggle) {
    themeToggle.addEventListener("click", function () {
        var now = Date.now();
        if (now - lastThemeClick < themeClickDelay) return;
        if (isThemeChanging) return;

        lastThemeClick = now;

        var isLight = document.documentElement.classList.contains("light-theme");
        setTheme(isLight ? "dark" : "light", true);
    });
}

// Load on DOM ready
document.addEventListener("DOMContentLoaded", loadTheme);
