(function () {
  // Footer year
  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  // Pointer-following glow (skipped for reduced motion and touch devices)
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var touch = window.matchMedia("(hover: none)").matches;
  if (!reduce && !touch) {
    var root = document.documentElement;
    var raf = null;
    window.addEventListener("pointermove", function (e) {
      if (raf) return;
      raf = requestAnimationFrame(function () {
        root.style.setProperty("--mx", e.clientX + "px");
        root.style.setProperty("--my", e.clientY + "px");
        raf = null;
      });
    });
  }

  // ---------------------------------------------------------------
  // PROJECTS
  // To add a project, copy one block below into the PROJECTS list.
  // Clicking the card opens `url` (your live web app) in a new tab.
  //
  //   {
  //     title: "Project name",
  //     description: "One or two lines about what it does.",
  //     url: "https://your-app.netlify.app",
  //     tags: ["React", "Node.js"]
  //   },
  //
  // While the list is empty you will see the plus-sign placeholders.
  // ---------------------------------------------------------------
  var PROJECTS = [];

  // Show empty "+" slots so the grid always has at least this many cards.
  // Set SHOW_EMPTY_SLOTS to false once you are happy with your projects.
  var SHOW_EMPTY_SLOTS = true;
  var MIN_SLOTS = 3;

  var grid = document.getElementById("project-grid");
  if (grid) {
    PROJECTS.forEach(function (p) {
      var card = document.createElement("a");
      card.className = "project";
      card.href = p.url;
      card.target = "_blank";
      card.rel = "noopener";

      var open = document.createElement("span");
      open.className = "project-open";
      open.textContent = "Open live app";
      card.appendChild(open);

      var title = document.createElement("h3");
      title.textContent = p.title;
      card.appendChild(title);

      var desc = document.createElement("p");
      desc.textContent = p.description;
      card.appendChild(desc);

      if (p.tags && p.tags.length) {
        var tags = document.createElement("ul");
        tags.className = "project-tags";
        p.tags.forEach(function (t) {
          var li = document.createElement("li");
          li.textContent = t;
          tags.appendChild(li);
        });
        card.appendChild(tags);
      }

      grid.appendChild(card);
    });

    if (SHOW_EMPTY_SLOTS) {
      for (var i = PROJECTS.length; i < MIN_SLOTS; i++) {
        var slot = document.createElement("div");
        slot.className = "project project--empty";

        var plus = document.createElement("span");
        plus.className = "plus";
        plus.setAttribute("aria-hidden", "true");
        plus.textContent = "+";
        slot.appendChild(plus);

        var label = document.createElement("span");
        label.textContent = "Project coming soon";
        slot.appendChild(label);

        grid.appendChild(slot);
      }
    }
  }

  // Contact form: opens the visitor's email app with the message filled in.
  // Change EMAIL to your own address.
  var EMAIL = "akshitayeeshu2007@gmail.com";
  var form = document.getElementById("contact-form");
  var note = document.getElementById("form-note");

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = form.elements.name;
      var message = form.elements.message;
      var ok = true;

      [name, message].forEach(function (field) {
        var empty = !field.value.trim();
        field.setAttribute("aria-invalid", empty ? "true" : "false");
        if (empty) ok = false;
      });

      if (!ok) {
        note.textContent = "Please fill in your name and a message.";
        return;
      }

      var subject = encodeURIComponent(
        "Portfolio message from " + name.value.trim(),
      );
      var body = encodeURIComponent(message.value.trim());
      window.location.href =
        "mailto:" + EMAIL + "?subject=" + subject + "&body=" + body;
      note.textContent =
        "Opening your email app. If nothing happens, write to " + EMAIL + ".";
    });
  }
})();
