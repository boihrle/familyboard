/**
 * FamilyBoard preview catalogue + cart.
 * Prices are placeholders for visualisation only.
 *
 * Checkout is fake: Stripe Checkout should replace pay() later.
 * Do not add Stripe secret keys to this static GitHub Pages site.
 */
(function (global) {
  const CART_KEY = "familyboard-cart-v1";
  const LEGACY_CART_KEYS = ["familyboard-cart", "familyboard-cart-v0"];

  const DAY_WORDS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const CHORES_WORDS = [
    "Set Table",
    "Dishwasher",
    "Fold Washing",
    "Dishes",
    "Dry Dishes",
    "Sweep Floor",
    "Mow Lawns",
    "Make Dinner",
    "Rubbish",
    "Recycling",
    "Put Out Bins",
    "Vacuum",
    "Mop Floor",
    "Clean Room",
    "Clear Table",
    "Put Away Washing",
    "Washing"
  ];
  const JOBS_WORDS = [
    "Tidy Room",
    "Homework",
    "Walk Dog",
    "Unpack Bag",
    "Lunch Box",
    "Make Bed",
    "Brush Hair",
    "Put Away Washing",
    "Load Dishwasher",
    "Set Table",
    "Feed Pets",
    "Water Plants",
    "Sweep Floor",
    "Wipe Bench",
    "Put Away Toys",
    "Pack Bag",
    "Fold Clothes",
    "Hang Coat",
    "Recycle",
    "Clean Windows",
    "Help Cook",
    "Empty Bin",
    "Put Away Groceries",
    "Wash Dishes"
  ];

  const PRODUCTS = {
    "chores-board": {
      id: "chores-board",
      kind: "board",
      name: "Chores",
      href: "chores.html",
      price: 15,
      sizes: ["A4"]
    },
    "routines-board": {
      id: "routines-board",
      kind: "board",
      name: "Routines",
      href: "routines.html",
      price: 15,
      people: true,
      sizes: ["A4"],
      dayparts: {
        morning: {
          title: "Morning",
          photo: "images/morning-hero.png?v=2.89",
          photosByPeople: {
            2: "images/morning-hero-2.png?v=2.89",
            3: "images/morning-hero.png?v=2.89",
            4: "images/morning-hero-4.png?v=2.89",
            5: "images/morning-hero-5.png?v=2.89"
          },
          alt: "White magnetic Morning board on light wood. Title Morning at the top; name tiles Mia, Leo and Ava above the three columns; job tiles in title case.",
          altsByPeople: {
            2: "White magnetic Morning board on light wood. Title Morning at the top; name tiles Mia and Leo above the two columns; job tiles in title case.",
            3: "White magnetic Morning board on light wood. Title Morning at the top; name tiles Mia, Leo and Ava above the three columns; job tiles in title case.",
            4: "White magnetic Morning board on light wood. Title Morning at the top; name tiles Mia, Leo, Ava and Sam above the four columns; job tiles in title case.",
            5: "White magnetic Morning board on light wood. Title Morning at the top; name tiles Mia, Leo, Ava, Sam and Zoe above the five columns; job tiles in title case."
          },
          blurb: "Title Morning at the top. One column per person — stack the job tiles underneath."
        },
        afternoon: {
          title: "Afternoon",
          photo: "images/afternoon-hero.png?v=2.89",
          photosByPeople: {
            2: "images/afternoon-hero-2.png?v=2.89",
            3: "images/afternoon-hero.png?v=2.89",
            4: "images/afternoon-hero-4.png?v=2.89",
            5: "images/afternoon-hero-5.png?v=2.89"
          },
          alt: "White magnetic Afternoon board on light wood. Title Afternoon at the top; name tiles Mia, Leo and Ava above the three columns; job tiles in title case.",
          altsByPeople: {
            2: "White magnetic Afternoon board on light wood. Title Afternoon at the top; name tiles Mia and Leo above the two columns; job tiles in title case.",
            3: "White magnetic Afternoon board on light wood. Title Afternoon at the top; name tiles Mia, Leo and Ava above the three columns; job tiles in title case.",
            4: "White magnetic Afternoon board on light wood. Title Afternoon at the top; name tiles Mia, Leo, Ava and Sam above the four columns; job tiles in title case.",
            5: "White magnetic Afternoon board on light wood. Title Afternoon at the top; name tiles Mia, Leo, Ava, Sam and Zoe above the five columns; job tiles in title case."
          },
          blurb: "Title Afternoon at the top. One column per person — stack the job tiles underneath."
        },
        night: {
          title: "Night",
          photo: "images/night-hero.png?v=2.89",
          photosByPeople: {
            2: "images/night-hero-2.png?v=2.89",
            3: "images/night-hero.png?v=2.89",
            4: "images/night-hero-4.png?v=2.89",
            5: "images/night-hero-5.png?v=2.89"
          },
          alt: "White magnetic Night board on light wood. Title Night at the top; name tiles Mia, Leo and Ava above the three columns; job tiles in title case.",
          altsByPeople: {
            2: "White magnetic Night board on light wood. Title Night at the top; name tiles Mia and Leo above the two columns; job tiles in title case.",
            3: "White magnetic Night board on light wood. Title Night at the top; name tiles Mia, Leo and Ava above the three columns; job tiles in title case.",
            4: "White magnetic Night board on light wood. Title Night at the top; name tiles Mia, Leo, Ava and Sam above the four columns; job tiles in title case.",
            5: "White magnetic Night board on light wood. Title Night at the top; name tiles Mia, Leo, Ava, Sam and Zoe above the five columns; job tiles in title case."
          },
          blurb: "Title Night at the top. One column per person — stack the job tiles underneath."
        },
        blank: {
          title: "Blank",
          photo: "images/blank-hero.png?v=2.89",
          photosByPeople: {
            2: "images/blank-hero-2.png?v=2.89",
            3: "images/blank-hero.png?v=2.89",
            4: "images/blank-hero-4.png?v=2.89",
            5: "images/blank-hero-5.png?v=2.89"
          },
          alt: "White magnetic routine board on light wood. No title; name tiles Mia, Leo and Ava above the three columns; printed grid lines and empty task rows.",
          altsByPeople: {
            2: "White magnetic routine board on light wood. No title; name tiles Mia and Leo above the two columns; printed grid lines and empty task rows.",
            3: "White magnetic routine board on light wood. No title; name tiles Mia, Leo and Ava above the three columns; printed grid lines and empty task rows.",
            4: "White magnetic routine board on light wood. No title; name tiles Mia, Leo, Ava and Sam above the four columns; printed grid lines and empty task rows.",
            5: "White magnetic routine board on light wood. No title; name tiles Mia, Leo, Ava, Sam and Zoe above the five columns; printed grid lines and empty task rows."
          },
          blurb: "No title. Name tiles along the top. Empty rows for writing in with the pen."
        }
      }
    },
    "weekly-board": {
      id: "weekly-board",
      kind: "board",
      name: "Weekly",
      href: "weekly.html",
      photo: "images/weekly-hero.png?v=2.89",
      photosByPeople: {
        2: "images/weekly-hero-2.png?v=2.89",
        3: "images/weekly-hero.png?v=2.89",
        4: "images/weekly-hero-4.png?v=2.89",
        5: "images/weekly-hero-5.png?v=2.89"
      },
      price: 15,
      people: true,
      sizes: ["A4"]
    },
    "meal-plan-board": {
      id: "meal-plan-board",
      kind: "board",
      name: "Meal Plan",
      href: "meal-plan.html",
      photo: "images/meal-plan-hero.png",
      price: 10,
      people: false,
      sizes: ["A5"]
    },
    "shopping-list-board": {
      id: "shopping-list-board",
      kind: "board",
      name: "Shopping",
      href: "shopping-list.html",
      photo: "images/shopping-list-hero.png",
      price: 10,
      people: false,
      sizes: ["A5"]
    },
    "house-rules-board": {
      id: "house-rules-board",
      kind: "board",
      name: "House Rules",
      href: "house-rules.html",
      photo: "images/house-rules-hero.png",
      price: 10,
      people: false,
      sizes: ["A5"]
    },
    "pack-chores": {
      id: "pack-chores",
      kind: "pack",
      name: "Chores Word Pack",
      href: "pack-chores.html",
      price: 10,
      tileCount: 17,
      magnetic: true
    },
    "pack-days": {
      id: "pack-days",
      kind: "pack",
      name: "Days Word Pack",
      href: "pack-days.html",
      price: 5,
      tileCount: 7,
      magnetic: true
    },
    "black-pen-pack": {
      id: "black-pen-pack",
      kind: "extra",
      name: "Black Pen",
      href: "black-pen-pack.html",
      price: 1,
      cartLabel: "Black Pen (3 pens)"
    },
    "coloured-pen-pack": {
      id: "coloured-pen-pack",
      kind: "extra",
      name: "Coloured Pen 8 Pack",
      href: "coloured-pen-pack.html",
      price: 5
    },
    "fridge-holder": {
      id: "fridge-holder",
      kind: "extra",
      name: "Fridge Holder",
      href: "fridge-holder.html",
      price: 5
    },
    "pack-sticker": {
      id: "pack-sticker",
      kind: "extra",
      name: "Stickers",
      href: "pack-sticker.html",
      price: 8,
      magnetic: false
    },
    "pack-custom": {
      id: "pack-custom",
      kind: "pack",
      name: "Custom Words",
      href: "pack-custom.html",
      price: 15,
      maxTiles: 16,
      magnetic: true
    }
  };

  const LINE_COUNTS = [3, 4, 5, 6, 7];
  const PEOPLE_COUNTS = [2, 3, 4, 5];
  const SIZES = ["A4", "A5"];

  function boardPrice(sku) {
    var product = PRODUCTS[sku];
    return product && product.price != null ? product.price : 29;
  }

  function money(n) {
    return "$" + Number(n).toFixed(0);
  }

  function uid() {
    return "fb-" + Math.random().toString(36).slice(2, 9);
  }

  function knownProduct(item) {
    return !!(item && item.productId && PRODUCTS[item.productId]);
  }

  function isEmojiPack(item) {
    if (!item) return true;
    if (item.productId === "pack-emoji") return true;
    return /emoji pack/i.test(String(item.name || ""));
  }

  function migrateItem(item) {
    if (!item || isEmojiPack(item)) return null;
    var next = Object.assign({}, item);
    if (
      next.productId === "pack-sticker" ||
      /sticker pack/i.test(String(next.name || ""))
    ) {
      next.productId = "pack-sticker";
      next.name = PRODUCTS["pack-sticker"].name;
      next.kind = "extra";
    }
    if (!knownProduct(next)) return null;
    var product = PRODUCTS[next.productId];
    if (!next.cartId) next.cartId = uid();
    if (!next.qty || next.qty < 1) next.qty = 1;
    if (!product.cartLabel && next.name !== product.name) next.name = product.name;
    return next;
  }

  function parseCartRaw(raw) {
    if (!raw) return [];
    try {
      var parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch (err) {
      return [];
    }
  }

  function writeRaw(items) {
    var kept = (items || []).filter(knownProduct);
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(kept));
      LEGACY_CART_KEYS.forEach(function (key) {
        try {
          localStorage.removeItem(key);
        } catch (err) {}
      });
    } catch (err) {}
    return kept;
  }

  function readCart() {
    try {
      var incoming = parseCartRaw(localStorage.getItem(CART_KEY));
      var usedLegacy = false;
      LEGACY_CART_KEYS.forEach(function (key) {
        var extra = parseCartRaw(localStorage.getItem(key));
        if (!extra.length) return;
        usedLegacy = true;
        incoming = incoming.concat(extra);
      });
      var kept = [];
      var seen = {};
      var changed = usedLegacy;
      incoming.forEach(function (item) {
        var next = migrateItem(item);
        if (!next) {
          changed = true;
          return;
        }
        if (JSON.stringify(next) !== JSON.stringify(item)) changed = true;
        if (seen[next.cartId]) {
          next = Object.assign({}, next, { cartId: uid() });
          changed = true;
        }
        seen[next.cartId] = true;
        kept.push(next);
      });
      if (changed) writeRaw(kept);
      return kept;
    } catch (err) {
      return [];
    }
  }

  function notifyCart() {
    updateCartCount();
    try {
      window.dispatchEvent(new CustomEvent("familyboard-cart-change"));
    } catch (err) {}
  }

  function writeCart(items) {
    var kept = writeRaw(items);
    notifyCart();
    return kept;
  }

  function addItem(item) {
    const items = readCart();
    items.push(Object.assign({ cartId: uid(), qty: 1 }, item));
    return writeCart(items);
  }

  function removeItem(cartId) {
    var items = readCart();
    var id = String(cartId == null ? "" : cartId);
    var idx = -1;
    for (var i = 0; i < items.length; i += 1) {
      if (String(items[i].cartId) === id) {
        idx = i;
        break;
      }
    }
    if (idx < 0) return items;
    var current = items[idx];
    if ((current.qty || 1) > 1) {
      items[idx] = Object.assign({}, current, { qty: (current.qty || 1) - 1 });
    } else {
      items.splice(idx, 1);
    }
    return writeCart(items);
  }

  function clearCart() {
    return writeCart([]);
  }

  function itemHref(item) {
    var product = item && PRODUCTS[item.productId];
    if (!product) return "index.html";
    var params = [];
    if (item.lines) params.push("lines=" + encodeURIComponent(item.lines));
    if (item.daypart) params.push("part=" + encodeURIComponent(item.daypart));
    if (item.people) params.push("people=" + encodeURIComponent(item.people));
    if (item.size && product.kind === "board") {
      params.push("size=" + encodeURIComponent(item.size));
    }
    if (item.productId === "pack-custom" && item.words && item.words.length) {
      params.push("words=" + encodeURIComponent(item.words.join(",")));
    }
    return params.length ? product.href + "?" + params.join("&") : product.href;
  }

  function cartCount() {
    return readCart().reduce(function (sum, item) {
      if (!knownProduct(item)) return sum;
      return sum + (item.qty || 1);
    }, 0);
  }

  function cartTotal() {
    return readCart().reduce(function (sum, item) {
      if (!knownProduct(item)) return sum;
      var n = Number(item.price);
      if (!isFinite(n)) n = 0;
      return sum + n * (item.qty || 1);
    }, 0);
  }

  function updateCartCount() {
    var n = cartCount();
    document.querySelectorAll("[data-cart-count]").forEach(function (el) {
      el.textContent = String(n);
      el.hidden = n === 0;
    });
  }

  function itemLabel(item) {
    if (!item) return "";
    if (item.productId === "chores-board") {
      return "Chores · " + item.lines + " lines · " + item.size;
    }
    if (item.kind === "board") {
      var parts = [item.name];
      if (item.daypart) {
        var board = PRODUCTS[item.productId];
        var label =
          (board && board.dayparts && board.dayparts[item.daypart] && board.dayparts[item.daypart].title) ||
          item.daypart;
        if (parts[0] !== label) parts.push(label);
      }
      if (item.people) parts.push(item.people + " people");
      if (item.size) parts.push(item.size);
      return parts.join(" · ");
    }
    if (item.productId === "pack-custom" && item.words && item.words.length) {
      return item.name + " · " + item.words.join(", ");
    }
    var product = PRODUCTS[item.productId];
    if (product && product.name && !product.cartLabel) return product.name;
    return item.name;
  }

  /**
   * Preview pay step. Replace with Stripe Checkout (redirect or embedded
   * Payment Element) when this catalogue is production-ready.
   */
  function payPreview() {
    var items = readCart();
    if (!items.length) return false;
    sessionStorage.setItem("familyboard-last-order", JSON.stringify({
      items: items,
      total: cartTotal(),
      placedAt: new Date().toISOString()
    }));
    clearCart();
    window.location.href = "success.html";
    return true;
  }

  global.FamilyBoard = {
    PRODUCTS: PRODUCTS,
    DAY_WORDS: DAY_WORDS,
    CHORES_WORDS: CHORES_WORDS,
    JOBS_WORDS: JOBS_WORDS,
    LINE_COUNTS: LINE_COUNTS,
    PEOPLE_COUNTS: PEOPLE_COUNTS,
    SIZES: SIZES,
    boardPrice: boardPrice,
    money: money,
    readCart: readCart,
    addItem: addItem,
    removeItem: removeItem,
    clearCart: clearCart,
    cartCount: cartCount,
    cartTotal: cartTotal,
    updateCartCount: updateCartCount,
    itemLabel: itemLabel,
    itemHref: itemHref,
    payPreview: payPreview,
    CART_KEY: CART_KEY
  };

  window.addEventListener("storage", function (event) {
    if (event.key && event.key !== CART_KEY && LEGACY_CART_KEYS.indexOf(event.key) < 0) {
      return;
    }
    notifyCart();
  });

  window.addEventListener("pageshow", function () {
    updateCartCount();
  });
})(window);
