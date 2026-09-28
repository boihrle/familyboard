(function () {
  var FB = window.FamilyBoard;
  var PHOTO_BY_LINES = {
    3: "images/chores-hero-photo.png",
    4: "images/chores-hero-photo-4-lines.png",
    5: "images/chores-hero-photo-5-lines.png",
    6: "images/chores-hero-photo-6-lines.png",
    7: "images/chores-hero-photo-7-lines.png"
  };
  var NAMES_BY_LINES = {
    3: "Georgia, Caleb, and Isaac",
    4: "Georgia, Caleb, Isaac, and Ella",
    5: "Georgia, Caleb, Isaac, Ella, and Noah",
    6: "Georgia, Caleb, Isaac, Ella, Noah, and Harper",
    7: "Georgia, Caleb, Isaac, Ella, Noah, Harper, and Theo"
  };

  function photoSrc(lines) {
    return PHOTO_BY_LINES[lines] || PHOTO_BY_LINES[3];
  }

  function photoAlt(lines) {
    return (
      "White ferrous weekly chores board on light wood. Magnetic day tiles Sun through Sat; name tiles " +
      (NAMES_BY_LINES[lines] || NAMES_BY_LINES[3]) +
      "; chore tiles in the grid. No fridge."
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
      "Chores weekly board with " + state.lines + " name rows on light wood. No fridge."
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
        " · " +
        FB.mountLabel(state.mount) +
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
    document.getElementById("opt-mount").innerHTML = optionButtons(
      FB.MOUNTS,
      state.mount,
      function (m) {
        return FB.mountLabel(m);
      },
      "mount"
    );
    document.getElementById("price-now").textContent = FB.money(FB.boardPrice(state.size, state.mount));
    document.getElementById("config-now").textContent =
      state.lines + " name rows · " + state.size + " · " + FB.mountLabel(state.mount);
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
    document.getElementById("opt-mount").addEventListener("click", function (event) {
      var btn = event.target.closest("[data-mount]");
      if (!btn) return;
      state.mount = btn.getAttribute("data-mount");
      renderOptions();
      renderBoard();
    });
    document.getElementById("add-board").addEventListener("click", function () {
      FB.addItem({
        productId: "chores-board",
        name: "Chores board",
        kind: "board",
        lines: state.lines,
        size: state.size,
        mount: state.mount,
        price: FB.boardPrice(state.size, state.mount)
      });
      window.FBSite.toast("Chores board added to cart");
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    renderOptions();
    renderBoard();
    bind();
  });
})();
