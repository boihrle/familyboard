(function () {
  var FB = window.FamilyBoard;
  var MAX = FB.PRODUCTS["pack-custom"].maxTiles;
  var words = ["Mia", "Leo"];

  function render() {
    var list = document.getElementById("word-list");
    var preview = document.getElementById("custom-preview");
    var meta = document.getElementById("word-meta");
    var addBtn = document.getElementById("add-custom");
    var field = document.getElementById("word-input");
    if (!list || !meta || !addBtn || !field) return;

    list.innerHTML = words
      .map(function (word, index) {
        return (
          '<li class="chip">' +
          '<span class="mag-tile tile-name">' +
          word +
          "</span>" +
          '<button type="button" class="chip-x" data-remove="' +
          index +
          '" aria-label="Remove ' +
          word +
          '">×</button>' +
          "</li>"
        );
      })
      .join("");

    if (preview) {
      var slots = "";
      for (var i = 0; i < MAX; i += 1) {
        slots +=
          '<span class="mag-tile tile-name' +
          (words[i] ? "" : " is-empty") +
          '">' +
          (words[i] || "") +
          "</span>";
      }
      preview.innerHTML = slots;
    }

    meta.textContent = words.length + " of " + MAX + " tiles";
    field.disabled = words.length >= MAX;
    document.getElementById("word-add").disabled = words.length >= MAX;
    addBtn.disabled = words.length === 0;
  }

  function addWord() {
    var field = document.getElementById("word-input");
    var value = field.value.replace(/\s+/g, " ").trim();
    if (!value) return;
    if (value.length > 14) {
      window.FBSite.toast("Keep each word to 14 characters");
      return;
    }
    if (words.length >= MAX) return;
    words.push(value);
    field.value = "";
    render();
    field.focus();
  }

  document.addEventListener("DOMContentLoaded", function () {
    render();
    document.getElementById("word-form").addEventListener("submit", function (event) {
      event.preventDefault();
      addWord();
    });
    document.getElementById("word-list").addEventListener("click", function (event) {
      var btn = event.target.closest("[data-remove]");
      if (!btn) return;
      words.splice(Number(btn.getAttribute("data-remove")), 1);
      render();
    });
    document.getElementById("add-custom").addEventListener("click", function () {
      if (!words.length) return;
      FB.addItem({
        productId: "pack-custom",
        name: FB.PRODUCTS["pack-custom"].name,
        kind: "pack",
        words: words.slice(),
        price: FB.PRODUCTS["pack-custom"].price
      });
      window.FBSite.toast(FB.PRODUCTS["pack-custom"].name + " added to cart");
    });
  });
})();
