// (function () {
//   const marquee = document.getElementById("reviews-marquee");
//   const track = document.getElementById("reviews-track");
//   if (!marquee || !track) return;

//   const ensureLoopWidth = () => {
//     const containerWidth = marquee.clientWidth;
//     let trackWidth = track.scrollWidth;
//     const items = Array.from(track.children);
//     let safety = 20;
//     while (trackWidth < containerWidth * 2 && safety-- > 0) {
//       items.forEach((el) => track.appendChild(el.cloneNode(true)));
//       trackWidth = track.scrollWidth;
//     }
//   };

//   ensureLoopWidth();
//   window.addEventListener("resize", () => {});

//   marquee.addEventListener("mouseenter", () => marquee.classList.add("paused"));
//   marquee.addEventListener("mouseleave", () =>
//     marquee.classList.remove("paused")
//   );
// })();

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

// if ("scrollRestoration" in history) {
//   history.scrollRestoration = "manual";
// }

// document.addEventListener("DOMContentLoaded", () => {
//   const navLinks = document.querySelectorAll('a[href^="#"]');
//   navLinks.forEach((link) => {
//     link.addEventListener("click", (e) => {
//       const id = link.getAttribute("href").slice(1);
//       const target = document.getElementById(id);
//       if (!target) return;

//       e.preventDefault();
//       target.scrollIntoView({ behavior: "smooth", block: "start" });

//       history.replaceState(
//         null,
//         "",
//         window.location.pathname + window.location.search
//       );
//     });
//   });

//   if (location.hash) {
//     setTimeout(() => {
//       window.scrollTo(0, 0);
//       history.replaceState(
//         null,
//         "",
//         window.location.pathname + window.location.search
//       );
//     }, 0);
//   }
// });

// window.addEventListener("pageshow", (event) => {
//   if (event.persisted) {
//     window.location.reload();
//   } else if (location.hash) {
//     window.scrollTo(0, 0);
//     history.replaceState(
//       null,
//       "",
//       window.location.pathname + window.location.search
//     );
//   }
// });

// document.addEventListener("DOMContentLoaded", () => {
//   const observer = new IntersectionObserver((entries) => {
//     entries.forEach((entry) => {
//       if (entry.isIntersecting) {
//         entry.target.classList.add("animate");
//         observer.unobserve(entry.target);
//       }
//     });
//   });

//   document
//     .querySelectorAll(".scroll-element")
//     .forEach((el) => observer.observe(el));
// });

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

document.addEventListener("DOMContentLoaded", () => {
  const menuIcon = document.getElementById("menu");
  const closeIcon = document.getElementById("close");
  const navList = document.querySelector(".nav-links ul");
  const backdrop = document.querySelector(".menu-backdrop");

  const closeMobileMenu = () => {
    navList.classList.remove("show");
    closeIcon.style.display = "none";
    menuIcon.style.display = "block";
    document.body.classList.remove("menu-open");
    backdrop.classList.remove("active");
  };

  menuIcon.addEventListener("click", () => {
    navList.classList.add("show");
    menuIcon.style.display = "none";
    closeIcon.style.display = "block";
    document.body.classList.add("menu-open");
    backdrop.classList.add("active");
  });

  closeIcon.addEventListener("click", () => {
    closeMobileMenu();
  });

  // Unified handler for all #anchor links (handles close and smooth scroll)
  const navLinks = document.querySelectorAll('a[href^="#"]');
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const id = link.getAttribute("href").slice(1);
      const target = document.getElementById(id);
      if (!target) return;

      const wasMenuOpen = navList.classList.contains("show");
      if (wasMenuOpen) {
        closeMobileMenu();
      }

      setTimeout(
        () => {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        },
        wasMenuOpen ? 350 : 0
      ); // Delay scroll if menu was closing

      // Remove hash from URL to prevent reload/jump issues
      history.replaceState(
        null,
        "",
        window.location.pathname + window.location.search
      );
    });
  });
});

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

document.addEventListener("DOMContentLoaded", () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate");
        observer.unobserve(entry.target); // animate once
      }
    });
  });

  document
    .querySelectorAll(".scroll-element")
    .forEach((el) => observer.observe(el));
});
