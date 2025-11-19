/**
 * Theme Switcher Logic
 * Handles toggling between light and dark modes and persisting preference.
 */

const ThemeSwitcher = {
    init() {
        this.toggleBtn = document.getElementById('theme-toggle');
        this.icon = this.toggleBtn ? this.toggleBtn.querySelector('i') : null;

        // Check saved preference or system preference
        const savedTheme = localStorage.getItem('theme');
        const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        if (savedTheme === 'light') {
            this.setLightMode();
        } else if (savedTheme === 'dark') {
            this.setDarkMode();
        } else {
            // Default to dark mode for this app as it's the primary design
            this.setDarkMode();
        }

        // Bind click event
        if (this.toggleBtn) {
            this.toggleBtn.addEventListener('click', () => this.toggle());
        }
    },

    toggle() {
        const isDark = document.documentElement.classList.contains('dark');
        if (isDark) {
            this.setLightMode();
        } else {
            this.setDarkMode();
        }
    },

    setDarkMode() {
        document.documentElement.classList.add('dark');
        document.documentElement.classList.remove('light');
        localStorage.setItem('theme', 'dark');
        this.updateIcon(true);
    },

    setLightMode() {
        document.documentElement.classList.remove('dark');
        document.documentElement.classList.add('light');
        localStorage.setItem('theme', 'light');
        this.updateIcon(false);
    },

    updateIcon(isDark) {
        if (!this.icon) return;

        if (isDark) {
            this.icon.className = 'fas fa-sun text-yellow-400'; // Icon to switch TO light mode (or show current state?)
            // Usually a toggle shows what it WILL do, or current state. 
            // Let's make the icon represent the CURRENT state for clarity, or the target.
            // Let's go with: Sun icon = "Click to switch to Light", Moon icon = "Click to switch to Dark"
            // If currently Dark, show Sun.
            this.icon.className = 'fas fa-sun text-yellow-300';
        } else {
            this.icon.className = 'fas fa-moon text-blue-600';
        }
    }
};

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
    ThemeSwitcher.init();
});
