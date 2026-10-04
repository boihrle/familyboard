/**
 * FamilyBoard preview catalogue + cart.
 * Prices are placeholders for visualisation only.
 *
 * Checkout is fake: Stripe Checkout should replace pay() later.
 * Do not add Stripe secret keys to this static GitHub Pages site.
 */
(function (global) {
  const CART_KEY = "familyboard-cart-v1";

  const DAY_WORDS = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const CHORES_WORDS = [
    "MOP FLOOR",
    "CLEAN ROOM",
    "CLEAR TABLE",
    "PUT AWAY WASHING",
    "WASHING"
  ];
  const JOBS_WORDS = [
    "TIDY ROOM",
    "HOMEWORK",
    "WALK DOG",
    "UNPACK BAG",
    "LUNCH BOX",
    "MAKE BED",
    "BRUSH HAIR",
    "PUT AWAY WASHING",
    "LOAD DISHWASHER",
    "SET TABLE",
    "FEED PETS",
    "WATER PLANTS",
    "SWEEP FLOOR",
    "WIPE BENCH",
    "PUT AWAY TOYS",
    "PACK BAG",
    "FOLD CLOTHES",
    "HANG COAT",
    "RECYCLE",
    "CLEAN WINDOWS",
    "HELP COOK",
    "EMPTY BIN",
    "PUT AWAY GROCERIES",
    "WASH DISHES"
  ];

  const EMOJIS = ["🐱", "🐼"];

  const PRODUCTS = {
    "chores-board": {
      id: "chores-board",
      kind: "board",
      name: "Chores",
      href: "chores.html",
      price: 29
    },
    "routines-board": {
      id: "routines-board",
      kind: "board",
      name: "Routines",
      href: "routines.html",
      price: 29,
      people: true,
      dayparts: {
        morning: {
          title: "Morning",
          photo: "images/morning-hero.png",
          alt: "Thin white magnetic Morning board on light wood. Title MORNING at the top; name columns and job tiles in capital letters.",
          blurb: "Title MORNING at the top. One column per person — stack the job tiles underneath."
        },
        afternoon: {
          title: "Afternoon",
          photo: "images/afternoon-hero.png",
          alt: "Thin white magnetic Afternoon board on light wood. Title AFTERNOON at the top; name columns and job tiles in capital letters.",
          blurb: "Title AFTERNOON at the top. One column per person — stack the job tiles underneath."
        },
        night: {
          title: "Night",
          photo: "images/night-hero.png",
          alt: "Thin white magnetic Night board on light wood. Title NIGHT at the top; name columns and job tiles in capital letters.",
          blurb: "Title NIGHT at the top. One column per person — stack the job tiles underneath."
        }
      }
    },
    "weekly-board": {
      id: "weekly-board",
      kind: "board",
      name: "Weekly",
      href: "weekly.html",
      photo: "images/weekly-hero.png",
      price: 29,
      people: true
    },
    "meal-plan-board": {
      id: "meal-plan-board",
      kind: "board",
      name: "Meal Plan",
      href: "meal-plan.html",
      photo: "images/meal-plan-hero.svg",
      price: 19,
      people: false,
      sizes: ["A5"]
    },
    "shopping-list-board": {
      id: "shopping-list-board",
      kind: "board",
      name: "Shopping List",
      href: "shopping-list.html",
      photo: "images/shopping-list-hero.png",
      price: 19,
      people: false,
      sizes: ["A5"]
    },
    "house-rules-board": {
      id: "house-rules-board",
      kind: "board",
      name: "House Rules",
      href: "house-rules.html",
      photo: "images/house-rules-hero.png",
      price: 19,
      people: false,
      sizes: ["A5"]
    },
    "pack-chores": {
      id: "pack-chores",
      kind: "pack",
      name: "Chores Word Pack",
      href: "pack-chores.html",
      price: 12,
      tileCount: 5,
      magnetic: true
    },
    "pack-days": {
      id: "pack-days",
      kind: "pack",
      name: "Day Word Pack",
      href: "pack-days.html",
      price: 8,
      tileCount: 7,
      magnetic: true
    },
    "pen-holder": {
      id: "pen-holder",
      kind: "extra",
      name: "Pen & Pen Holder",
      href: "pen-holder.html",
      price: 12
    },
    "pack-custom": {
      id: "pack-custom",
      kind: "pack",
      name: "Custom Words",
      href: "pack-custom.html",
      price: 12,
      maxTiles: 8,
      magnetic: true
    },
    "pack-emoji": {
      id: "pack-emoji",
      kind: "pack",
      name: "Emoji Pack",
      href: "pack-emoji.html",
      price: 10,
      tileCount: 2,
      magnetic: true
    },
    "pack-sticker": {
      id: "pack-sticker",
      kind: "pack",
      name: "Sticker Pack",
      href: "pack-sticker.html",
      price: 8,
      magnetic: false
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

  function itemLabel(item) {
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
    payPreview: payPreview
  };
})(window);
