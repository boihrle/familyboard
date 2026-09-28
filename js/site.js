(function () {
  var FB = window.FamilyBoard;

  var PACK_LINKS = [
    { href: "pack-chores.html", label: "Chores Word Pack" },
    { href: "pack-days.html", label: "Day Word Pack" },
    { href: "pack-custom.html", label: "Custom Words" },
    { href: "pack-emoji.html", label: "Emoji Pack" },
    { href: "pack-sticker.html", label: "Sticker Pack" },
    { href: "pen-holder.html", label: "Pen & Pen Holder" }
  ];

  function currentFile() {
    var parts = window.location.pathname.split("/");
    return parts[parts.length - 1] || "index.html";
  }

  function navLink(href, label, file) {
    var active = file === href || (href === "index.html" && file === "");
    return (
      '<a href="' +
      href +
      '"' +
      (active ? ' aria-current="page"' : "") +
      ">" +
      label +
      "</a>"
    );
  }

  function renderChrome() {
    var file = currentFile();
    var header = document.getElementById("site-header");
    var footer = document.getElementById("site-footer");

    if (header) {
      header.innerHTML =
        '<div class="bar">' +
        '<a class="brand" href="index.html">FamilyBoard</a>' +
        '<nav class="nav" aria-label="Primary">' +
        navLink("index.html#boards", "Boards", file === "index.html" ? "index.html#boards" : file) +
        navLink("chores.html", "Chores board", file) +
        navLink("routines.html", "Routines", file) +
        '<span class="nav-split" aria-hidden="true">Packs</span>' +
        PACK_LINKS.map(function (link) {
          return navLink(link.href, link.label, file);
        }).join("") +
        '<a class="cart-link" href="cart.html">Cart <span data-cart-count hidden>0</span></a>' +
        "</nav>" +
        "</div>";
    }

    if (footer) {
      footer.innerHTML =
        '<div class="footer-inner">' +
        '<p class="fine">Thin magnetic sheets on light wood. Mount on the fridge or a wall — Magnetic, Stick, or Nonstick. Name magnets match word magnets in size; empty cells are expected.</p>' +
        "</div>";
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
