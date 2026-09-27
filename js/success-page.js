(function () {
  var FB = window.FamilyBoard;

  document.addEventListener("DOMContentLoaded", function () {
    var raw = sessionStorage.getItem("familyboard-last-order");
    var box = document.getElementById("order-box");
    if (!raw) {
      box.innerHTML = "<p>No preview order in this tab. Add something to the cart first.</p>";
      return;
    }
    var order = JSON.parse(raw);
    box.innerHTML =
      "<ul>" +
      order.items
        .map(function (item) {
          return "<li>" + FB.itemLabel(item) + " — " + FB.money(item.price) + "</li>";
        })
        .join("") +
      "</ul>" +
      "<p><strong>Total " +
      FB.money(order.total) +
      "</strong> · not charged</p>";
  });
})();
