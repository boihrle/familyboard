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

  function renderChrome() {
    var file = currentFile();
    var header = document.getElementById("site-header");
    var footer = document.getElementById("site-footer");

    if (header) {
      header.innerHTML =
        '<div class="bar">' +
        '<a class="brand" href="index.html">FamilyBoard</a>' +
        '<nav class="nav" aria-label="Primary">' +
        '<a href="' + sectionHref(file, "boards") + '">Boards</a>' +
        '<span aria-hidden="true">/</span>' +
        '<a href="' + sectionHref(file, "packs") + '">Packs</a>' +
        '<span aria-hidden="true">/</span>' +
        '<a href="' + sectionHref(file, "extras") + '">Extras</a>' +
        "</nav>" +
        '<a class="cart-link" href="cart.html">Cart <span data-cart-count hidden>0</span></a>' +
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
