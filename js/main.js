// ===== 1) Год в футере =====
const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// ===== 2) Мобильное меню =====
const burger = document.getElementById("burger");
const navwrap = document.getElementById("navwrap");
const nav = document.getElementById("nav");

function setMenuOpen(isOpen) {
  if (!burger || !navwrap) return;

  navwrap.classList.toggle("navwrap--open", isOpen);
  burger.setAttribute("aria-expanded", String(isOpen));

  // чуть улучшаем UX: блокируем прокрутку страницы, когда меню открыто
  document.body.style.overflow = isOpen ? "hidden" : "";
}

function isMenuOpen() {
  return navwrap ? navwrap.classList.contains("navwrap--open") : false;
}

if (burger && navwrap && nav) {
  // Клик по бургеру: открыть/закрыть
  burger.addEventListener("click", () => {
    setMenuOpen(!isMenuOpen());
  });

  // Клик по пункту меню: закрыть
  nav.addEventListener("click", (e) => {
    const target = e.target;
    if (target && target.tagName === "A") {
      setMenuOpen(false);
    }
  });

  // Escape: закрыть
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      setMenuOpen(false);
    }
  });

  // Клик вне меню: закрыть
  document.addEventListener("click", (e) => {
    if (!isMenuOpen()) return;

    const clickInsideMenu =
      navwrap.contains(e.target) || burger.contains(e.target);

    if (!clickInsideMenu) {
      setMenuOpen(false);
    }
  });
}