const setLanguage = (lang) => {
  const copy = translations[lang] || translations.kz;
  document.documentElement.lang = lang;
  document.querySelectorAll("[data-i18n]").forEach((node) => {
    node.innerHTML = copy[node.dataset.i18n] || node.innerHTML;
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((node) => {
    const value = copy[node.dataset.i18nPlaceholder] || node.placeholder;
    node.placeholder = value;
    node.setAttribute("aria-label", value);
  });
  document
    .querySelectorAll("[data-lang]")
    .forEach((node) =>
      node.classList.toggle("active", node.dataset.lang === lang),
    );
  localStorage.setItem("ayu-language", lang);
};
document.querySelectorAll("[data-lang]").forEach((node) =>
  node.addEventListener("click", (event) => {
    event.preventDefault();
    setLanguage(node.dataset.lang);
  }),
);
setLanguage(localStorage.getItem("ayu-language") || "kz");
document.querySelectorAll("[data-filter]").forEach((button) =>
  button.addEventListener("click", () => {
    const category = button.dataset.filter;
    document
      .querySelectorAll("[data-filter]")
      .forEach((item) =>
        item.setAttribute("aria-pressed", String(item === button)),
      );
    document.querySelector(".news-cards").hidden = category !== "all";
    document.querySelector(".news-empty").hidden = category === "all";
    document.querySelector(".news-more").hidden = category !== "all";
  }),
);
const menu = document.getElementById("main-menu");
const toggle = document.querySelector(".hamburger");
toggle.addEventListener("click", () => {
  const open = menu.classList.toggle("open");
  toggle.setAttribute("aria-expanded", open);
  toggle.textContent = open ? "×" : "☰";
});
document
  .querySelectorAll("[data-message]")
  .forEach((btn) =>
    btn.addEventListener("click", () => alert(btn.dataset.message)),
  );
let slide = 0;
const change = (direction) => {
  slide = (slide + direction + 2) % 2;
  const lang = localStorage.getItem("ayu-language") || "kz";
  document.querySelector("h1").innerHTML = translations[lang].heroTitle;
};
document.getElementById("next").addEventListener("click", () => change(1));
document.getElementById("previous").addEventListener("click", () => change(-1));
