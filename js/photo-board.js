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

  function photoFor(current, people) {
    if (people && current.photosByPeople && current.photosByPeople[people]) {
      return current.photosByPeople[people];
    }
    return current.photo;
  }

  function altFor(current, people) {
    if (people && current.altsByPeople && current.altsByPeople[people]) {
      return current.altsByPeople[people];
    }
    return current.alt;
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
    var requestedPeople = Number(new URLSearchParams(window.location.search).get("people"));
    var state = {
      daypart: dayparts && dayparts[requested] ? requested : dayparts ? "morning" : null,
      people: product.people
        ? (FB.PEOPLE_COUNTS.indexOf(requestedPeople) >= 0 ? requestedPeople : 3)
        : null,
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
    var blurbEl = document.getElementById("board-blurb");

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
        img.src = photoFor(current, state.people);
        img.alt = altFor(current, state.people);
      }
      if (!current && product.photosByPeople && img && state.people) {
        img.src = product.photosByPeople[state.people] || product.photo;
        var names = ["Mia", "Leo", "Ava", "Sam", "Zoe"].slice(0, state.people);
        var named =
          names.length === 2
            ? names[0] + " and " + names[1]
            : names.slice(0, -1).join(", ") + " and " + names[names.length - 1];
        img.alt =
          "White magnetic weekly sheet on light wood, same width as the Routines picture. Mon–Sun day tiles as rows; name tiles " +
          named +
          " across the top; empty cells for writing in with the pen.";
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
      if (peopleField) {
        peopleField.hidden = !product.people;
      }
      if (product.people && peopleField && optPeople) {
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

    function syncUrl() {
      if (!(window.history && window.history.replaceState)) return;
      if (!state.daypart) return;
      var q = "routines.html?part=" + state.daypart;
      if (state.people) q += "&people=" + state.people;
      window.history.replaceState(null, "", q);
    }

    bindGroup("opt-daypart", "data-daypart", function (value) {
      state.daypart = value;
      syncUrl();
    });
    bindGroup("opt-people", "data-people", function (value) {
      state.people = Number(value);
      syncUrl();
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
