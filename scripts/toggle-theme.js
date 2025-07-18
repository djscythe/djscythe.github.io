document
  .getElementById("header-right")
  .prepend(document.getElementById("theme-toggle-button-template").content);

const themeQuery = window.matchMedia("(prefers-color-scheme: dark)");
let currentTheme =
  localStorage.getItem("theme") ?? (themeQuery.matches ? "dark" : "light");
const html = document.querySelector("html");
const themeToggleButton = document.getElementById("theme-toggle-button");
const invertTheme = (theme) => (theme === "dark" ? "light" : "dark");

function setTheme(theme) {
  currentTheme = theme;

  html.dataset.theme = theme;

  localStorage.setItem("theme", theme);

  themeToggleButton.ariaLabel = `set theme to ${invertTheme(theme)}`;
}

setTheme(currentTheme);

let spareIcon = null;

themeToggleButton.prepend(
  document.getElementById(`theme-toggle-button-icon-${currentTheme}-template`)
    .content
);

spareIcon = document.getElementById(
  `theme-toggle-button-icon-${invertTheme(currentTheme)}-template`
).content;

function switchTheme() {
  setTheme(invertTheme(currentTheme));

  themeToggleButton.prepend(spareIcon);

  spareIcon = themeToggleButton.removeChild(
    themeToggleButton.lastElementChild
  );
}

themeToggleButton.addEventListener("click", switchTheme);

themeQuery.addEventListener("change", function (query) {
  if (query.matches !== (currentTheme === "dark")) {
    switchTheme();
  }
});
