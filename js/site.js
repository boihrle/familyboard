(function () {
  var FB = window.FamilyBoard;

  var PACK_LINKS = [
    { href: "pack-chores.html", label: "Chores words" },
    { href: "pack-custom.html", label: "Custom / names" },
    { href: "pack-emoji.html", label: "Emoji" },
    { href: "pack-sticker.html", label: "Stickers" }
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
        '<span class="preview-pill">Shop preview</span>' +
        '<nav class="nav" aria-label="Primary">' +
        navLink("chores.html", "Chores board", file) +
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
        "<p>Preview catalogue for deciding board layouts and packs. Payments are simulated — Stripe Checkout replaces the pay step later. No real charges.</p>" +
        '<p class="fine">Chores is the first board type. More boards come later. Name magnets match word magnets in size; empty rows are expected.</p>' +
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
    }, 1800);
  }

  window.FBSite = { renderChrome: renderChrome, toast: toast, currentFile: currentFile };

  document.addEventListener("DOMContentLoaded", renderChrome);
})();
