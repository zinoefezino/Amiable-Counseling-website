// document.addEventListener("DOMContentLoaded", () => {
//   const menuIcon = document.getElementById("menu");
//   const closeIcon = document.getElementById("close");
//   const navList = document.querySelector(".nav-links ul");
//   const navLinks = navList.querySelectorAll("a");

//   const closeMobileMenu = () => {
//     navList.classList.remove("show");
//     closeIcon.style.display = "none";
//     menuIcon.style.display = "block";
//   };

//   menuIcon.addEventListener("click", () => {
//     navList.classList.add("show");
//     menuIcon.style.display = "none";
//     closeIcon.style.display = "block";
//   });

//   closeIcon.addEventListener("click", () => {
//     closeMobileMenu();
//   });

//   navLinks.forEach((link) => {
//     link.addEventListener("click", (e) => {
//       e.preventDefault();
//       const href = link.getAttribute("href");
//       closeMobileMenu();
//       setTimeout(() => {
//         window.location.href = href;
//       }, 100);
//     });
//   });
// });

document.addEventListener("DOMContentLoaded", () => {
  // Select the menu toggle container and the icons
  const menuToggle = document.querySelector(".menu-toggle");
  const openIcon = document.getElementById("menu");
  const closeIcon = document.getElementById("close");

  // Select the navigation menu itself and all the anchor links
  const navMenu = document.querySelector(".nav-links");
  const navLinks = document.querySelectorAll(".nav-link, .none a");

  // Function to open the mobile menu
  function openMenu() {
    navMenu.classList.add("active");
    openIcon.style.display = "none";
    closeIcon.style.display = "block";
  }

  // Function to close the mobile menu
  function closeMenu() {
    navMenu.classList.remove("active");
    openIcon.style.display = "block";
    closeIcon.style.display = "none";
  }

  // Add an event listener to the menu toggle button
  menuToggle.addEventListener("click", () => {
    if (navMenu.classList.contains("active")) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  // Loop through all the navigation links
  navLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      // Prevent the default jump action
      event.preventDefault();

      // Get the href of the link (e.g., "#about")
      const targetId = link.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      // Close the menu first
      closeMenu();

      // Now, scroll to the element with a small delay
      // The delay gives the browser time to finish its work
      // A value of 300ms is usually a safe bet.
      setTimeout(() => {
        if (targetElement) {
          // Use scrollIntoView with a smooth behavior
          targetElement.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }, 300);
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
