(function () {
  var FB = window.FamilyBoard;

  function optionButtons(values, selected, renderLabel, dataKey) {
    return values
      .map(function (value) {
        var on = String(value) === String(selected);
        return (
          '<button type="button" class="opt' +
          (on ? " is-on" : "") +
          '" data-' +
          dataKey +
          '="' +
          value +
          '" aria-pressed="' +
          on +
          '">' +
          renderLabel(value) +
          "</button>"
        );
      })
      .join("");
  }

  document.addEventListener("DOMContentLoaded", function () {
    var btn = document.getElementById("add-pack");
    if (!btn) return;
    var sku = btn.getAttribute("data-sku");
    var product = sku && FB.PRODUCTS[sku];
    if (!product) return;

    var qtyOptions = product.qtyOptions;
    var qtyState = qtyOptions && qtyOptions.length ? qtyOptions[0].qty : null;
    var optQty = document.getElementById("opt-qty");
    var priceNow = document.getElementById("price-now");
    var configNow = document.getElementById("config-now");

    function currentOption() {
      if (!qtyOptions) return { qty: 1, price: product.price, label: "" };
      var found = null;
      qtyOptions.forEach(function (opt) {
        if (opt.qty === qtyState) found = opt;
      });
      return found || qtyOptions[0];
    }

    function cartName() {
      var opt = currentOption();
      if (!qtyOptions) return product.name;
      return product.name + " (" + opt.label + ")";
    }

    function renderQty() {
      if (!optQty || !qtyOptions) return;
      optQty.innerHTML = optionButtons(
        qtyOptions.map(function (opt) {
          return opt.qty;
        }),
        qtyState,
        function (qty) {
          var label = String(qty);
          qtyOptions.forEach(function (opt) {
            if (opt.qty === Number(qty)) label = opt.label;
          });
          return label;
        },
        "qty"
      );
      var opt = currentOption();
      if (priceNow) priceNow.textContent = FB.money(opt.price);
      if (configNow) configNow.textContent = opt.label;
    }

    if (optQty && qtyOptions) {
      optQty.addEventListener("click", function (event) {
        var choice = event.target.closest("[data-qty]");
        if (!choice) return;
        qtyState = Number(choice.getAttribute("data-qty"));
        renderQty();
      });
      renderQty();
    }

    btn.addEventListener("click", function () {
      var opt = currentOption();
      var item = {
        productId: sku,
        name: cartName(),
        kind: product.kind,
        price: opt.price
      };
      if (qtyOptions) item.penQty = opt.qty;
      FB.addItem(item);
      window.FBSite.toast(cartName() + " added to cart");
    });
  });
})();
