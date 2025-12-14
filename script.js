const root = document.documentElement;
const themeToggle = document.querySelector(".theme-toggle");
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelectorAll(".nav-links a");

const THEME_KEY = "ia-curso-theme";

const prefersDark = () =>
  window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;

const currentStored = () => localStorage.getItem(THEME_KEY);

const computeTheme = () => {
  const saved = currentStored();
  if (saved === "light" || saved === "dark") return saved;
  return prefersDark() ? "dark" : "light";
};

const setTheme = (theme) => {
  root.setAttribute("data-theme", theme);
  root.classList.add("theme-transition");
  window.setTimeout(() => root.classList.remove("theme-transition"), 250);
};

const initTheme = () => {
  setTheme(computeTheme());
};

const toggleTheme = () => {
  const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
  localStorage.setItem(THEME_KEY, next);
  setTheme(next);
};

const handleSystemChange = (event) => {
  if (!currentStored()) {
    setTheme(event.matches ? "dark" : "light");
  }
};

const toggleMenu = () => {
  const isOpen = document.body.classList.toggle("nav-open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
};

initTheme();

if (themeToggle) {
  themeToggle.addEventListener("click", toggleTheme);
}

if (window.matchMedia) {
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", handleSystemChange);
}

if (menuToggle) {
  menuToggle.addEventListener("click", toggleMenu);
}

navLinks.forEach((link) =>
  link.addEventListener("click", () => {
    if (document.body.classList.contains("nav-open")) {
      document.body.classList.remove("nav-open");
      menuToggle.setAttribute("aria-expanded", "false");
    }
  })
);
