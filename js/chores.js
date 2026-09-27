(function () {
  var FB = window.FamilyBoard;
  var SAMPLE_NAMES = ["Mia", "Leo", "Sam", "Dad", "Mum", "Ava", "Ben"];
  var SAMPLE_WORDS = ["Dishes", "Laundry", "Bins", "Vacuum", "Pets", "Homework", "Garden"];

  var state = {
    lines: 5,
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

  function magnetSvg(x, y, w, h, fill, label, empty) {
    var rx = 5;
    if (empty) {
      return (
        '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h +
        '" rx="' + rx + '" fill="none" stroke="#1b241c" stroke-width="1.2" stroke-dasharray="4 3" opacity="0.35"/>'
      );
    }
    return (
      '<g>' +
      '<rect x="' + x + '" y="' + (y + 2) + '" width="' + w + '" height="' + h +
      '" rx="' + rx + '" fill="rgba(0,0,0,0.12)"/>' +
      '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h +
      '" rx="' + rx + '" fill="' + fill + '" stroke="rgba(255,255,255,0.7)"/>' +
      '<text x="' + (x + w / 2) + '" y="' + (y + h / 2 + 4) +
      '" text-anchor="middle" font-size="11" font-weight="800" font-family="Nunito Sans, sans-serif" fill="#1b241c">' +
      label +
      "</text>" +
      "</g>"
    );
  }

  function renderBoardSvg() {
    var isA5 = state.size === "A5";
    var width = isA5 ? 280 : 380;
    var rowH = 36;
    var padX = 18;
    var headH = 42;
    var height = headH + 16 + state.lines * rowH + 28;
    var magnetW = (width - padX * 2 - 16 - 8 * 2) / 3;
    var magnetH = 26;
    var nameFill = "#ffe7a1";
    var wordFill = "#d5efd2";
    var frame =
      state.mount === "magnetic" ? "#8fa0aa" : state.mount === "stick" ? "#c9ae7a" : "#8b6a3a";

    var rows = "";
    for (var i = 0; i < state.lines; i += 1) {
      var y = headH + 8 + i * rowH;
      var filled = i < Math.max(2, state.lines - 2) || (state.lines <= 3 && i === 0);
      var name = filled ? SAMPLE_NAMES[i % SAMPLE_NAMES.length] : "";
      var word = filled && i % 3 !== 2 ? SAMPLE_WORDS[i % SAMPLE_WORDS.length] : "";
      var extra = filled && i === 1 ? SAMPLE_WORDS[3] : "";
      var x0 = padX + 16;
      rows +=
        '<text x="' + padX + '" y="' + (y + 18) +
        '" font-size="10" font-weight="800" fill="#5d6758" font-family="Nunito Sans, sans-serif">' +
        (i + 1) +
        "</text>" +
        magnetSvg(x0, y + 4, magnetW, magnetH, nameFill, name, !name) +
        magnetSvg(x0 + magnetW + 8, y + 4, magnetW, magnetH, wordFill, word, !word) +
        magnetSvg(x0 + (magnetW + 8) * 2, y + 4, magnetW, magnetH, wordFill, extra, !extra) +
        '<line x1="' + padX + '" y1="' + (y + rowH - 4) + '" x2="' + (width - padX) +
        '" y2="' + (y + rowH - 4) + '" stroke="#1b241c" stroke-opacity="0.12" stroke-dasharray="3 4"/>';
    }

    var stand =
      state.mount === "nonstick"
        ? '<rect x="' + width * 0.18 + '" y="' + (height + 6) + '" width="' + width * 0.64 +
          '" height="10" rx="2" fill="#8b6a3a"/>'
        : "";
    var tape =
      state.mount === "stick"
        ? '<rect x="' + (width - 54) + '" y="18" width="58" height="18" rx="3" fill="#f3d9a0" transform="rotate(8 ' +
          (width - 20) + ' 27)"/><text x="' + (width - 25) + '" y="31" text-anchor="middle" font-size="8" font-weight="800" fill="#6a4b1a" transform="rotate(8 ' +
          (width - 20) + ' 27)">PEEL &amp; STICK</text>'
        : "";

    var svg =
      '<svg viewBox="0 0 ' + width + " " + (height + (state.mount === "nonstick" ? 18 : 4)) +
      '" width="' + width + '" role="img" aria-label="Chores board with ' +
      state.lines + ' name rows, ' + state.size + ", " + FB.mountLabel(state.mount) + '">' +
      '<rect x="0" y="0" width="' + width + '" height="' + height + '" rx="10" fill="#fffdf8" stroke="' +
      frame + '" stroke-width="' + (state.mount === "magnetic" ? 7 : 2) + '"/>' +
      '<text x="' + width / 2 + '" y="30" text-anchor="middle" font-size="22" font-family="Fraunces, Georgia, serif" fill="#1b241c">Chores</text>' +
      rows +
      '<text x="' + width / 2 + '" y="' + (height - 10) +
      '" text-anchor="middle" font-size="10" font-weight="800" letter-spacing="1.2" fill="#5d6758" font-family="Nunito Sans, sans-serif">' +
      state.lines +
      " NAME ROWS</text>" +
      tape +
      stand +
      "</svg>";

    return svg;
  }

  function renderBoard() {
    var stage = document.getElementById("hero-stage");
    var board = document.getElementById("board-hero");
    var caption = document.getElementById("hero-caption");
    if (!board) return;

    board.className = "board-svg-wrap board-" + state.size.toLowerCase();
    board.innerHTML = renderBoardSvg();

    if (stage) {
      stage.className = "hero-stage mount-" + state.mount + " size-" + state.size.toLowerCase();
    }
    if (caption) {
      caption.textContent =
        state.lines +
        " lines · " +
        state.size +
        " · " +
        FB.mountLabel(state.mount) +
        " — name and word magnets are the same size";
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
      state.lines + " lines · " + state.size + " · " + FB.mountLabel(state.mount);
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
