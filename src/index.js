// ================================
// Page Navigation
// ================================
const nav = document.querySelector("nav");
const pages = [...document.querySelectorAll(".pages")];

// Create a fast lookup for pages by ID
const pageMap = new Map(
  pages.filter((page) => page.id).map((page) => [page.id, page])
);

// Reusable mobile menu elements
const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");
const menuIcon = menuBtn?.querySelector("i");

// ================================
// Mobile Menu
// ================================
function setMenuOpen(isOpen) {
  if (!menuBtn || !mobileMenu) return;

  mobileMenu.classList.toggle("hidden", !isOpen);
  mobileMenu.classList.toggle("flex", isOpen);

  menuBtn.setAttribute("aria-expanded", String(isOpen));

  if (menuIcon) {
    menuIcon.classList.toggle("fa-bars", !isOpen);
    menuIcon.classList.toggle("fa-xmark", isOpen);
  }
}

if (menuBtn && mobileMenu) {
  // Sync initial state
  setMenuOpen(!mobileMenu.classList.contains("hidden"));

  menuBtn.addEventListener("click", () => {
    const isOpen = !mobileMenu.classList.contains("hidden");
    setMenuOpen(!isOpen);
  });

  // Close the menu with Escape
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      setMenuOpen(false);
    }
  });
}

// ================================
// Navigation Event Delegation
// ================================
nav?.addEventListener("click", (event) => {
  const button =
    event.target instanceof Element
      ? event.target.closest("button[data-page]")
      : null;

  // Ignore clicks outside page buttons
  if (!button || !nav.contains(button)) return;

  const pageId = button.dataset.page;
  const targetPage = pageMap.get(pageId);

  if (!targetPage) {
    console.warn(`No page found for data-page="${pageId}"`);
    return;
  }

  // Show the selected page and hide the others
  pages.forEach((page) => {
    page.classList.toggle("hidden", page !== targetPage);
  });

  // Update all navigation buttons for this page
  nav.querySelectorAll("button[data-page]").forEach((navButton) => {
    const isActive = navButton.dataset.page === pageId;

    navButton.classList.toggle("text-blue-400", isActive);

    if (isActive) {
      navButton.setAttribute("aria-current", "page");
    } else {
      navButton.removeAttribute("aria-current");
    }
  });

  // Close the mobile menu after navigation
  setMenuOpen(false);
});