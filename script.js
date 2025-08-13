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
      e.preventDefault(); // stop immediate jump
      const href = link.getAttribute("href");
      closeMobileMenu();
      setTimeout(() => {
        window.location.href = href;
      }, 100); // tiny delay for Android
    });
  });
});

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
//     link.addEventListener("click", () => {
//       closeMobileMenu();
//     });
//   });
// });

// 1. Tell the browser not to restore scroll position automatically
if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}

document.addEventListener("DOMContentLoaded", () => {
  // 2. Intercept all in page nav links so the URL does not keep the hash
  const navLinks = document.querySelectorAll('a[href^="#"]');
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      const id = link.getAttribute("href").slice(1);
      const target = document.getElementById(id);
      if (!target) return;

      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });

      // Remove the hash so a refresh starts at the top
      history.replaceState(
        null,
        "",
        window.location.pathname + window.location.search
      );

      // If you open a mobile menu, close it here if needed
      // closeMobileMenu();
    });
  });

  // 3a. If user lands or reloads with a hash, jump to top and clear it
  if (location.hash) {
    // Run after the browser’s own hash jump
    setTimeout(() => {
      window.scrollTo(0, 0);
      history.replaceState(
        null,
        "",
        window.location.pathname + window.location.search
      );
    }, 0);
  }
});

// 3b. Handle back forward cache restores on mobile browsers
window.addEventListener("pageshow", () => {
  if (location.hash) {
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
