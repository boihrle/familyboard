(function () {
  var FB = window.FamilyBoard;
  var PHOTO_BY_LINES = {
    3: "images/chores-hero-photo.png",
    4: "images/chores-hero-photo-4-lines.png",
    5: "images/chores-hero-photo-5-lines.png",
    6: "images/chores-hero-photo-6-lines.png",
    7: "images/chores-hero-photo-7-lines.png"
  };

  function photoSrc(lines) {
    return PHOTO_BY_LINES[lines] || PHOTO_BY_LINES[3];
  }

  function photoAlt(lines) {
    return (
      "White ferrous weekly chores board on light wood. Magnetic day words SUN through SAT; name tiles and chore tiles in capital letters."
    );
  }

  var state = {
    lines: 3,
    size: "A4",
    mount: "magnetic"
  };

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

  function renderBoard() {
    var stage = document.getElementById("hero-stage");
    var board = document.getElementById("board-hero");
    var caption = document.getElementById("hero-caption");
    if (!board) return;

    board.className =
      "hero-photo-frame board-" + state.size.toLowerCase() + " mount-" + state.mount;
    board.setAttribute("data-lines", String(state.lines));
    board.setAttribute(
      "aria-label",
      "Chores with " + state.lines + " name rows on light wood."
    );
    board.innerHTML =
      '<img src="' +
      photoSrc(state.lines) +
      '" width="1280" height="720" alt="' +
      photoAlt(state.lines) +
      '">';

    if (stage) {
      stage.className =
        "board-stage photo-stage mount-" + state.mount + " size-" + state.size.toLowerCase();
    }
    if (caption) {
      caption.textContent =
        state.lines +
        " name rows · " +
        state.size +
        " — days, names, and chores are magnetic tiles";
    }
  }

  function renderOptions() {
    document.getElementById("opt-lines").innerHTML = optionButtons(
      FB.LINE_COUNTS,
      state.lines,
      function (n) {
        return String(n);
      },
      "lines"
    );
    document.getElementById("opt-size").innerHTML = optionButtons(
      FB.SIZES,
      state.size,
      function (s) {
        return s;
      },
      "size"
    );
    document.getElementById("price-now").textContent = FB.money(FB.boardPrice("chores-board"));
    document.getElementById("config-now").textContent =
      state.lines + " name rows · " + state.size;
  }

  function bind() {
    document.getElementById("opt-lines").addEventListener("click", function (event) {
      var btn = event.target.closest("[data-lines]");
      if (!btn) return;
      state.lines = Number(btn.getAttribute("data-lines"));
      renderOptions();
      renderBoard();
    });
    document.getElementById("opt-size").addEventListener("click", function (event) {
      var btn = event.target.closest("[data-size]");
      if (!btn) return;
      state.size = btn.getAttribute("data-size");
      renderOptions();
      renderBoard();
    });
    document.getElementById("add-board").addEventListener("click", function () {
      FB.addItem({
        productId: "chores-board",
        name: FB.PRODUCTS["chores-board"].name,
        kind: "board",
        lines: state.lines,
        size: state.size,
        price: FB.boardPrice("chores-board")
      });
      window.FBSite.toast(FB.PRODUCTS["chores-board"].name + " added to cart");
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    renderOptions();
    renderBoard();
    bind();
  });
})();
