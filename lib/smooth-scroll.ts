/**
 * Smooth-scroll utility that centers a section in the viewport,
 * accounting for the fixed navbar height.
 */

const NAVBAR_HEIGHT = 100; // px — fixed navbar approx height + breathing room

export function scrollToSection(sectionId: string): void {
  if (typeof window === "undefined") return;

  const el = document.getElementById(sectionId);
  if (!el) return;

  const rect = el.getBoundingClientRect();
  const absTop = window.scrollY + rect.top;
  const sectionPadding = parseInt(getComputedStyle(el).paddingTop, 10) || 0;

  // Scroll so the section heading sits ~120px below viewport top
  const targetY = absTop + sectionPadding - NAVBAR_HEIGHT;

  window.scrollTo({
    top: Math.max(0, targetY),
    behavior: "smooth",
  });
}

export function initHashScroll(): () => void {
  const handleHashChange = () => {
    const hash = window.location.hash.replace("#", "");
    if (hash) {
      // Small delay to let DOM settle
      setTimeout(() => scrollToSection(hash), 100);
    }
  };

  // Handle initial URL hash on page load
  handleHashChange();

  window.addEventListener("hashchange", handleHashChange);
  return () => window.removeEventListener("hashchange", handleHashChange);
}
