(function () {
  var FB = window.FamilyBoard;

  function currentFile() {
    var parts = window.location.pathname.split("/");
    return parts[parts.length - 1] || "index.html";
  }

  function isHome(file) {
    return file === "index.html" || file === "";
  }

  function sectionHref(file, id) {
    return (isHome(file) ? "#" : "index.html#") + id;
  }

  function pageHref(file, href) {
    var active = file === href;
    return (
      '<a href="' +
      href +
      '"' +
      (active ? ' aria-current="page"' : "") +
      ">"
    );
  }

  function bindMenu(header) {
    var toggle = header.querySelector(".menu-toggle");
    var menu = header.querySelector("#site-menu");
    if (!toggle || !menu) return;

    function setOpen(open) {
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      menu.hidden = !open;
      header.classList.toggle("menu-open", open);
    }

    toggle.addEventListener("click", function (event) {
      event.stopPropagation();
      setOpen(menu.hidden);
    });

    menu.addEventListener("click", function (event) {
      if (event.target.closest("a")) setOpen(false);
    });

    document.addEventListener("click", function (event) {
      if (menu.hidden) return;
      if (!header.contains(event.target)) setOpen(false);
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") setOpen(false);
    });
  }

  function renderChrome() {
    var file = currentFile();
    var header = document.getElementById("site-header");
    var footer = document.getElementById("site-footer");

    if (header) {
      header.innerHTML =
        '<div class="bar">' +
        '<div class="bar-brand">' +
        '<a class="brand" href="index.html">FamilyBoards</a>' +
        '<button type="button" class="menu-toggle" aria-label="Menu" aria-expanded="false" aria-controls="site-menu">' +
        '<svg width="22" height="16" viewBox="0 0 22 16" aria-hidden="true" focusable="false">' +
        '<path d="M1 1h20M1 8h20M1 15h20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>' +
        "</svg>" +
        "</button>" +
        '<a class="cart-link" href="cart.html">Cart <span data-cart-count hidden>0</span></a>' +
        "</div>" +
        '<nav id="site-menu" class="menu" aria-label="Primary" hidden>' +
        '<a href="' + sectionHref(file, "boards") + '">Boards</a>' +
        '<a href="' + sectionHref(file, "packs") + '">Packs</a>' +
        '<a href="' + sectionHref(file, "extras") + '">Extras</a>' +
        pageHref(file, "faqs.html") + "FAQs</a>" +
        pageHref(file, "our-story.html") + "Our Story</a>" +
        "</nav>" +
        "</div>";
      bindMenu(header);
    }

    if (footer) {
      footer.innerHTML = "";
      footer.hidden = true;
    }

    FB.updateCartCount();
  }

  function toast(message) {
    var el = document.createElement("div");
    el.className = "toast";
    el.textContent = message;
    document.body.appendChild(el);
    requestAnimationFrame(function () {
      el.classList.add("show");
    });
    setTimeout(function () {
      el.classList.remove("show");
      setTimeout(function () {
        el.remove();
      }, 280);
    }, 2600);
  }

  window.FBSite = { renderChrome: renderChrome, toast: toast, currentFile: currentFile };

  document.addEventListener("DOMContentLoaded", renderChrome);
})();
