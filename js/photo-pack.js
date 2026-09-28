(function () {
  var FB = window.FamilyBoard;

  document.addEventListener("DOMContentLoaded", function () {
    var btn = document.getElementById("add-pack");
    if (!btn) return;
    var sku = btn.getAttribute("data-sku");
    var product = sku && FB.PRODUCTS[sku];
    if (!product) return;
    btn.addEventListener("click", function () {
      FB.addItem({
        productId: sku,
        name: product.name,
        kind: product.kind,
        price: product.price
      });
      window.FBSite.toast(product.name + " added to cart");
    });
  });
})();
