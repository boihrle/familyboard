(function () {
  var FB = window.FamilyBoard;

  function render() {
    var items = FB.readCart();
    var list = document.getElementById("cart-list");
    var empty = document.getElementById("cart-empty");
    var summary = document.getElementById("cart-summary");
    var pay = document.getElementById("pay-btn");

    if (!items.length) {
      list.innerHTML = "";
      empty.hidden = false;
      summary.hidden = true;
      pay.disabled = true;
      return;
    }

    empty.hidden = true;
    summary.hidden = false;
    pay.disabled = false;

    list.innerHTML = items
      .map(function (item) {
        return (
          '<article class="cart-row">' +
          "<div>" +
          "<h3>" +
          item.name +
          "</h3>" +
          '<p class="muted">' +
          FB.itemLabel(item) +
          "</p>" +
          "</div>" +
          '<div class="cart-side">' +
          "<strong>" +
          FB.money(item.price) +
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
  }

  document.addEventListener("DOMContentLoaded", function () {
    render();
    document.getElementById("cart-list").addEventListener("click", function (event) {
      var btn = event.target.closest("[data-remove]");
      if (!btn) return;
      FB.removeItem(btn.getAttribute("data-remove"));
      render();
    });
    document.getElementById("pay-btn").addEventListener("click", function () {
      // Preview only. Stripe Checkout replaces this later.
      FB.payPreview();
    });
  });
})();
