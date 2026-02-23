(function () {
  var root = document.documentElement;
  root.classList.add("js");
  var toggle = document.getElementById("theme-toggle");
  var year = document.getElementById("year");

  var savedTheme = localStorage.getItem("theme");
  if (savedTheme === "light" || savedTheme === "dark") {
    root.setAttribute("data-theme", savedTheme);
  } else {
    root.setAttribute("data-theme", "dark");
  }

  function syncThemeLabel() {
    var active = root.getAttribute("data-theme") === "light" ? "Light" : "Dark";
    toggle.textContent = "Theme: " + active;
  }

  if (toggle) {
    syncThemeLabel();
    toggle.addEventListener("click", function () {
      var next = root.getAttribute("data-theme") === "light" ? "dark" : "light";
      root.setAttribute("data-theme", next);
      localStorage.setItem("theme", next);
      syncThemeLabel();
    });
  }

  if (year) {
    year.textContent = new Date().getFullYear();
  }

  var sections = Array.prototype.slice.call(document.querySelectorAll(".reveal"));
  if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    sections.forEach(function (section, index) {
      section.style.transitionDelay = Math.min(index * 80, 400) + "ms";
      observer.observe(section);
    });
  } else {
    sections.forEach(function (section) {
      section.classList.add("show");
    });
  }
})();
