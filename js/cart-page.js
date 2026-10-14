(function () {
  var FB = window.FamilyBoard;

  function render() {
    var items = FB.readCart();
    var list = document.getElementById("cart-list");
    var empty = document.getElementById("cart-empty");
    var summary = document.getElementById("cart-summary");
    var pay = document.getElementById("checkout-btn");

    if (!items.length) {
      list.innerHTML = "";
      empty.hidden = false;
      summary.hidden = true;
      if (pay) pay.disabled = true;
      FB.updateCartCount();
      return;
    }

    empty.hidden = true;
    summary.hidden = false;
    if (pay) pay.disabled = false;

    list.innerHTML = items
      .map(function (item) {
        var href = FB.itemHref(item);
        var qty = item.qty && item.qty > 1 ? '<p class="muted">Qty ' + item.qty + "</p>" : "";
        return (
          '<article class="cart-row">' +
          '<a class="cart-item-link" href="' +
          href +
          '">' +
          "<h3>" +
          (item.name || "") +
          "</h3>" +
          '<p class="muted">' +
          FB.itemLabel(item) +
          "</p>" +
          qty +
          "</a>" +
          '<div class="cart-side">' +
          "<strong>" +
          FB.money(item.price * (item.qty || 1)) +
          "</strong>" +
          '<button type="button" class="text-btn" data-remove="' +
          item.cartId +
          '">Remove</button>' +
          "</div>" +
          "</article>"
        );
      })
      .join("");

    document.getElementById("cart-total").textContent = FB.money(FB.cartTotal());
    FB.updateCartCount();
  }

  document.addEventListener("DOMContentLoaded", function () {
    render();
    document.getElementById("cart-list").addEventListener("click", function (event) {
      var btn = event.target.closest("[data-remove]");
      if (!btn) return;
      event.preventDefault();
      FB.removeItem(btn.getAttribute("data-remove"));
      render();
    });
    document.getElementById("checkout-btn").addEventListener("click", function () {
      FB.payPreview();
    });
    window.addEventListener("familyboard-cart-change", render);
    window.addEventListener("pageshow", render);
  });
})();
