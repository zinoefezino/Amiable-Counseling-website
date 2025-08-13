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
  const navLinks = navList.querySelectorAll("a");

  let touchHandled = false;

  const openMenu = (e) => {
    if (touchHandled && e.type === "click") return;
    if (e.type === "touchstart") touchHandled = true;

    navList.classList.add("show");
    menuIcon.style.display = "none";
    closeIcon.style.display = "block";
  };

  const closeMenu = (e) => {
    if (touchHandled && e.type === "click") return;
    if (e.type === "touchstart") touchHandled = true;

    navList.classList.remove("show");
    closeIcon.style.display = "none";
    menuIcon.style.display = "block";
  };

  const handleNavClick = (e) => {
    if (touchHandled && e.type === "click") return;
    if (e.type === "touchstart") touchHandled = true;

    e.preventDefault();
    const targetId = e.currentTarget.getAttribute("href");
    const targetElement = document.querySelector(targetId);

    closeMenu(e);

    setTimeout(() => {
      targetElement.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 300);
  };

  menuIcon.addEventListener("click", openMenu);
  menuIcon.addEventListener("touchstart", openMenu, { passive: true });

  closeIcon.addEventListener("click", closeMenu);
  closeIcon.addEventListener("touchstart", closeMenu, { passive: true });

  navLinks.forEach((link) => {
    link.addEventListener("click", handleNavClick);
    link.addEventListener("touchstart", handleNavClick, { passive: false });
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
