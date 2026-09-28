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
    var main = document.querySelector("main[data-sku]");
    if (!main) return;
    var sku = main.getAttribute("data-sku");
    var product = FB.PRODUCTS[sku];
    if (!product || product.kind !== "board") return;

    var state = {
      people: product.people ? 3 : null,
      size: "A4",
      mount: "magnetic"
    };

    var peopleField = document.getElementById("people-field");
    var optPeople = document.getElementById("opt-people");
    var optSize = document.getElementById("opt-size");
    var optMount = document.getElementById("opt-mount");
    var stage = document.getElementById("hero-stage");
    var board = document.getElementById("board-hero");
    var caption = document.getElementById("hero-caption");
    var configNow = document.getElementById("config-now");
    var priceNow = document.getElementById("price-now");

    function configText() {
      var parts = [];
      if (state.people) parts.push(state.people + " people");
      parts.push(state.size);
      parts.push(FB.mountLabel(state.mount));
      return parts.join(" · ");
    }

    function renderBoard() {
      if (!board) return;
      board.className =
        "hero-photo-frame board-" + state.size.toLowerCase() + " mount-" + state.mount;
      if (state.people) board.setAttribute("data-people", String(state.people));
      if (stage) {
        stage.className =
          "board-stage photo-stage mount-" + state.mount + " size-" + state.size.toLowerCase();
      }
      if (caption) caption.textContent = configText();
    }

    function renderOptions() {
      if (product.people && peopleField && optPeople) {
        peopleField.hidden = false;
        optPeople.innerHTML = optionButtons(
          FB.PEOPLE_COUNTS,
          state.people,
          function (n) {
            return String(n);
          },
          "people"
        );
      }
      if (optSize) {
        optSize.innerHTML = optionButtons(FB.SIZES, state.size, function (s) {
          return s;
        }, "size");
      }
      if (optMount) {
        optMount.innerHTML = optionButtons(
          FB.MOUNTS,
          state.mount,
          function (m) {
            return FB.mountLabel(m);
          },
          "mount"
        );
      }
      if (priceNow) priceNow.textContent = FB.money(FB.boardPrice(state.size, state.mount));
      if (configNow) configNow.textContent = configText();
    }

    function bindGroup(id, attr, apply) {
      var el = document.getElementById(id);
      if (!el) return;
      el.addEventListener("click", function (event) {
        var btn = event.target.closest("[" + attr + "]");
        if (!btn) return;
        apply(btn.getAttribute(attr));
        renderOptions();
        renderBoard();
      });
    }

    bindGroup("opt-people", "data-people", function (value) {
      state.people = Number(value);
    });
    bindGroup("opt-size", "data-size", function (value) {
      state.size = value;
    });
    bindGroup("opt-mount", "data-mount", function (value) {
      state.mount = value;
    });

    var add = document.getElementById("add-board");
    if (add) {
      add.addEventListener("click", function () {
        var item = {
          productId: sku,
          name: product.name,
          kind: "board",
          size: state.size,
          mount: state.mount,
          price: FB.boardPrice(state.size, state.mount)
        };
        if (state.people) item.people = state.people;
        FB.addItem(item);
        window.FBSite.toast(product.name + " added to cart");
      });
    }

    renderOptions();
    renderBoard();
  });
})();
