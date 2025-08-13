document.addEventListener("DOMContentLoaded", () => {
  const menuIcon = document.getElementById("menu");
  const closeIcon = document.getElementById("close");
  const navList = document.querySelector(".nav-links ul");
  const navLinks = navList.querySelectorAll("a");

  const closeMobileMenu = () => {
    navList.classList.remove("show");
    closeIcon.style.display = "none";
    menuIcon.style.display = "block";
  };

  menuIcon.addEventListener("click", () => {
    navList.classList.add("show");
    menuIcon.style.display = "none";
    closeIcon.style.display = "block";
  });

  closeIcon.addEventListener("click", () => {
    closeMobileMenu();
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const href = link.getAttribute("href");
      closeMobileMenu();
      setTimeout(() => {
        window.location.href = href;
      }, 100);
    });
  });
});

(function () {
  const marquee = document.getElementById("reviews-marquee");
  const track = document.getElementById("reviews-track");
  if (!marquee || !track) return;

  const ensureLoopWidth = () => {
    const containerWidth = marquee.clientWidth;
    let trackWidth = track.scrollWidth;
    const items = Array.from(track.children);
    let safety = 20;
    while (trackWidth < containerWidth * 2 && safety-- > 0) {
      items.forEach((el) => track.appendChild(el.cloneNode(true)));
      trackWidth = track.scrollWidth;
    }
  };

  ensureLoopWidth();
  window.addEventListener("resize", () => {});

  marquee.addEventListener("mouseenter", () => marquee.classList.add("paused"));
  marquee.addEventListener("mouseleave", () =>
    marquee.classList.remove("paused")
  );
})();

// Prevent browser from restoring scroll position automatically
if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}

// Handle back-forward cache restores on mobile browsers
window.addEventListener("pageshow", (event) => {
  if (event.persisted) {
    // Force a full reload if restored from cache
    window.location.reload();
  } else if (location.hash) {
    window.scrollTo(0, 0);
    history.replaceState(
      null,
      "",
      window.location.pathname + window.location.search
    );
  }
});
