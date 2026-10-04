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

  function queryPart() {
    var params = new URLSearchParams(window.location.search);
    var fromQuery = params.get("part");
    if (fromQuery) return fromQuery;
    return (window.location.hash || "").replace("#", "");
  }

  document.addEventListener("DOMContentLoaded", function () {
    var main = document.querySelector("main[data-sku]");
    if (!main) return;
    var sku = main.getAttribute("data-sku");
    var product = FB.PRODUCTS[sku];
    if (!product || product.kind !== "board") return;

    var dayparts = product.dayparts;
    var requested = queryPart();
    var sizes = product.sizes && product.sizes.length ? product.sizes : FB.SIZES;
    var state = {
      daypart: dayparts && dayparts[requested] ? requested : dayparts ? "morning" : null,
      people: product.people ? 3 : null,
      size: sizes.length === 1 ? sizes[0] : sizes.indexOf("A4") >= 0 ? "A4" : sizes[0],
      mount: "magnetic"
    };

    var optDaypart = document.getElementById("opt-daypart");
    var peopleField = document.getElementById("people-field");
    var optPeople = document.getElementById("opt-people");
    var optSize = document.getElementById("opt-size");
    var stage = document.getElementById("hero-stage");
    var board = document.getElementById("board-hero");
    var caption = document.getElementById("hero-caption");
    var configNow = document.getElementById("config-now");
    var priceNow = document.getElementById("price-now");
    var titleEl = document.querySelector(".buy-panel h1");
    var blurbEl = document.querySelector(".buy-panel p.muted");

    function part() {
      return dayparts && state.daypart ? dayparts[state.daypart] : null;
    }

    function displayName() {
      var current = part();
      return current ? current.title : product.name;
    }

    function configText() {
      var parts = [];
      var current = part();
      if (current) parts.push(current.title);
      if (state.people) parts.push(state.people + " people");
      parts.push(state.size);
      return parts.join(" · ");
    }

    function renderBoard() {
      if (!board) return;
      board.className =
        "hero-photo-frame board-" + state.size.toLowerCase() + " mount-" + state.mount;
      if (state.people) board.setAttribute("data-people", String(state.people));
      if (state.daypart) board.setAttribute("data-daypart", state.daypart);
      var current = part();
      var img = board.querySelector("img");
      if (current && img) {
        img.src = current.photo;
        img.alt = current.alt;
      }
      if (titleEl) titleEl.textContent = displayName();
      if (blurbEl && current && current.blurb) blurbEl.textContent = current.blurb;
      if (current) document.title = current.title + " — FamilyBoards";
      if (stage) {
        stage.className =
          "board-stage photo-stage mount-" + state.mount + " size-" + state.size.toLowerCase();
      }
      if (caption) caption.textContent = configText();
    }

    function renderOptions() {
      if (dayparts && optDaypart) {
        optDaypart.innerHTML = optionButtons(
          Object.keys(dayparts),
          state.daypart,
          function (key) {
            return dayparts[key].title;
          },
          "daypart"
        );
      }
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
      var sizeField = optSize && optSize.closest("fieldset");
      if (sizes.length < 2) {
        if (sizeField) sizeField.hidden = true;
      } else if (optSize) {
        if (sizeField) sizeField.hidden = false;
        optSize.innerHTML = optionButtons(sizes, state.size, function (s) {
          return s;
        }, "size");
      }
      if (priceNow) priceNow.textContent = FB.money(FB.boardPrice(sku));
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

    bindGroup("opt-daypart", "data-daypart", function (value) {
      state.daypart = value;
      if (window.history && window.history.replaceState) {
        window.history.replaceState(null, "", "routines.html?part=" + value);
      }
    });
    bindGroup("opt-people", "data-people", function (value) {
      state.people = Number(value);
    });
    bindGroup("opt-size", "data-size", function (value) {
      state.size = value;
    });

    var add = document.getElementById("add-board");
    if (add) {
      add.addEventListener("click", function () {
        var item = {
          productId: sku,
          name: displayName(),
          kind: "board",
          size: state.size,
          price: FB.boardPrice(sku)
        };
        if (state.people) item.people = state.people;
        if (state.daypart) item.daypart = state.daypart;
        FB.addItem(item);
        window.FBSite.toast(displayName() + " added to cart");
      });
    }

    renderOptions();
    renderBoard();
  });
})();
