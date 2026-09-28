/**
 * FamilyBoard preview catalogue + cart.
 * Prices are placeholders for visualisation only.
 *
 * Checkout is fake: Stripe Checkout should replace pay() later.
 * Do not add Stripe secret keys to this static GitHub Pages site.
 */
(function (global) {
  const CART_KEY = "familyboard-cart-v1";

  const DAY_WORDS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const CHORES_WORDS = [
    "set table",
    "dishwasher",
    "fold washing",
    "dishes",
    "dry dishes",
    "sweep floor",
    "mow lawns",
    "make dinner",
    "rubbish",
    "recycling",
    "put out bins",
    "vacuum",
    "mop floor"
  ];
  const JOBS_WORDS = [
    "tidy room",
    "homework",
    "walk dog",
    "unpack bag",
    "lunch box",
    "make bed",
    "brush hair",
    "put away washing",
    "load dishwasher",
    "set table",
    "feed pets",
    "water plants",
    "sweep floor",
    "wipe bench",
    "put away toys",
    "pack bag",
    "fold clothes",
    "hang coat",
    "recycle",
    "clean windows",
    "help cook",
    "empty bin",
    "put away groceries",
    "wash dishes"
  ];

  const EMOJIS = ["⭐", "❤️", "🎉", "✅", "🌈", "🐶", "🌞", "🎵", "🏆", "🌸", "⚽", "📚"];

  const PRODUCTS = {
    "chores-board": {
      id: "chores-board",
      kind: "board",
      name: "Chores board",
      href: "chores.html"
    },
    "meal-plan-board": {
      id: "meal-plan-board",
      kind: "board",
      name: "Meal plan",
      href: "meal-plan.html",
      photo: "images/meal-plan-hero.png",
      people: false
    },
    "shopping-list-board": {
      id: "shopping-list-board",
      kind: "board",
      name: "Shopping list",
      href: "shopping-list.html",
      photo: "images/shopping-list-hero.png",
      people: false
    },
    "weekly-board": {
      id: "weekly-board",
      kind: "board",
      name: "Weekly",
      href: "weekly.html",
      photo: "images/weekly-hero.png",
      people: true
    },
    "routines-board": {
      id: "routines-board",
      kind: "board",
      name: "Routines",
      href: "routines.html",
      people: true,
      dayparts: {
        morning: {
          title: "Morning",
          photo: "images/morning-hero.png",
          alt: "Thin white magnetic Morning board on light wood. Title Morning at the top; columns for Georgia, Caleb, and Isaac with job tiles. No fridge.",
          blurb: "Title Morning at the top. One column per person — stack the job tiles underneath."
        },
        afternoon: {
          title: "Afternoon",
          photo: "images/afternoon-hero.png",
          alt: "Thin white magnetic Afternoon board on light wood. Title Afternoon at the top; columns for Georgia, Caleb, and Isaac with job tiles. No fridge.",
          blurb: "Title Afternoon at the top. One column per person — stack the job tiles underneath."
        },
        night: {
          title: "Night",
          photo: "images/night-hero.png",
          alt: "Thin white magnetic Night board on light wood. Title Night at the top; columns for Georgia, Caleb, and Isaac with job tiles. No fridge.",
          blurb: "Title Night at the top. One column per person — stack the job tiles underneath."
        }
      }
    },
    "house-rules-board": {
      id: "house-rules-board",
      kind: "board",
      name: "House Rules",
      href: "house-rules.html",
      photo: "images/house-rules-hero.png",
      people: false
    },
    "pack-chores": {
      id: "pack-chores",
      kind: "pack",
      name: "Chores word pack",
      href: "pack-chores.html",
      price: 18,
      tileCount: 13,
      magnetic: true
    },
    "pack-days": {
      id: "pack-days",
      kind: "pack",
      name: "Day tiles pack",
      href: "pack-days.html",
      price: 12,
      tileCount: 7,
      magnetic: true
    },
    "pen-holder": {
      id: "pen-holder",
      kind: "extra",
      name: "Pen holder",
      href: "pen-holder.html",
      price: 14
    },
    "pack-custom": {
      id: "pack-custom",
      kind: "pack",
      name: "Custom / names word pack",
      href: "pack-custom.html",
      price: 34,
      maxTiles: 8,
      magnetic: true
    },
    "pack-emoji": {
      id: "pack-emoji",
      kind: "pack",
      name: "Emoji pack",
      href: "pack-emoji.html",
      price: 15,
      tileCount: 12,
      magnetic: true
    },
    "pack-sticker": {
      id: "pack-sticker",
      kind: "pack",
      name: "Sticker pack",
      href: "pack-sticker.html",
      price: 12,
      tileCount: 13,
      magnetic: false
    }
  };

  const SIZE_PRICE = { A5: 49, A4: 69 };
  const MOUNT_PRICE = { magnetic: 12, stick: 6, nonstick: 0 };
  const LINE_COUNTS = [3, 4, 5, 6, 7];
  const PEOPLE_COUNTS = [2, 3, 4, 5];
  const SIZES = ["A4", "A5"];
  const MOUNTS = ["magnetic", "stick", "nonstick"];

  function boardPrice(size, mount) {
    return SIZE_PRICE[size] + MOUNT_PRICE[mount];
  }

  function money(n) {
    return "$" + Number(n).toFixed(0);
  }

  function uid() {
    return "fb-" + Math.random().toString(36).slice(2, 9);
  }

  function readCart() {
    try {
      const raw = localStorage.getItem(CART_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (err) {
      return [];
    }
  }

  function writeCart(items) {
    localStorage.setItem(CART_KEY, JSON.stringify(items));
    updateCartCount();
    return items;
  }

  function addItem(item) {
    const items = readCart();
    items.push(Object.assign({ cartId: uid(), qty: 1 }, item));
    return writeCart(items);
  }

  function removeItem(cartId) {
    return writeCart(readCart().filter(function (item) {
      return item.cartId !== cartId;
    }));
  }

  function clearCart() {
    return writeCart([]);
  }

  function cartCount() {
    return readCart().reduce(function (sum, item) {
      return sum + (item.qty || 1);
    }, 0);
  }

  function cartTotal() {
    return readCart().reduce(function (sum, item) {
      return sum + item.price * (item.qty || 1);
    }, 0);
  }

  function updateCartCount() {
    var n = cartCount();
    document.querySelectorAll("[data-cart-count]").forEach(function (el) {
      el.textContent = String(n);
      el.hidden = n === 0;
    });
  }

  function mountLabel(mount) {
    if (mount === "magnetic") return "Magnetic";
    if (mount === "stick") return "Stick";
    return "Nonstick";
  }

  function itemLabel(item) {
    if (item.productId === "chores-board") {
      return "Chores board · " + item.lines + " lines · " + item.size + " · " + mountLabel(item.mount);
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
      if (item.mount) parts.push(mountLabel(item.mount));
      return parts.join(" · ");
    }
    if (item.productId === "pack-custom" && item.words && item.words.length) {
      return item.name + " · " + item.words.join(", ");
    }
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
    EMOJIS: EMOJIS,
    LINE_COUNTS: LINE_COUNTS,
    PEOPLE_COUNTS: PEOPLE_COUNTS,
    SIZES: SIZES,
    MOUNTS: MOUNTS,
    boardPrice: boardPrice,
    money: money,
    readCart: readCart,
    addItem: addItem,
    removeItem: removeItem,
    clearCart: clearCart,
    cartCount: cartCount,
    cartTotal: cartTotal,
    updateCartCount: updateCartCount,
    mountLabel: mountLabel,
    itemLabel: itemLabel,
    payPreview: payPreview
  };
})(window);
