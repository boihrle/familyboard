(function () {
  var FB = window.FamilyBoard;
  var DAYS = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
  var SAMPLE_NAMES = ["Georgia", "Caleb", "Isaac", "Ella", "Noah", "Harper", "Theo"];
  var SAMPLE_GRID = [
    ["dishes", "dinner", "vacuum", "washing", "rubbish", "tidy", "bed"],
    ["vacuum", "dinner", "dishes", "vacuum", "dinner", "dishes", "vacuum"],
    ["dishes", "vacuum", "dinner", "dishes", "vacuum", "dinner", ""],
    ["laundry", "dishes", "vacuum", "", "dinner", "tidy", "bed"],
    ["dinner", "", "dishes", "vacuum", "rubbish", "dinner", ""],
    ["", "tidy", "dishes", "", "vacuum", "bed", "dinner"],
    ["dishes", "vacuum", "", "dinner", "", "tidy", ""]
  ];

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

  function tile(label, extraClass) {
    if (!label) {
      return '<span class="mag-tile is-empty" aria-hidden="true"></span>';
    }
    return (
      '<span class="mag-tile' +
      (extraClass ? " " + extraClass : "") +
      '">' +
      label +
      "</span>"
    );
  }

  function renderWeekBoard() {
    var html = '<div class="week-grid" style="--rows:' + state.lines + '">';
    html += '<div class="week-cell week-corner"></div>';
    DAYS.forEach(function (day) {
      html += '<div class="week-cell week-day">' + tile(day, "tile-day") + "</div>";
    });
    for (var r = 0; r < state.lines; r += 1) {
      html += '<div class="week-cell week-name">' + tile(SAMPLE_NAMES[r], "tile-name") + "</div>";
      SAMPLE_GRID[r].forEach(function (word) {
        html += '<div class="week-cell week-chore">' + tile(word) + "</div>";
      });
    }
    html += "</div>";
    return html;
  }

  function renderBoard() {
    var stage = document.getElementById("hero-stage");
    var board = document.getElementById("board-hero");
    var caption = document.getElementById("hero-caption");
    if (!board) return;

    board.className =
      "ferrous-board board-" + state.size.toLowerCase() + " mount-" + state.mount;
    board.setAttribute("data-lines", String(state.lines));
    board.setAttribute(
      "aria-label",
      "Chores weekly board with " +
        state.lines +
        " name rows, magnetic day tiles sun to sat"
    );
    board.innerHTML = renderWeekBoard();

    if (stage) {
      stage.className = "board-stage mount-" + state.mount + " size-" + state.size.toLowerCase();
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
