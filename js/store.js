/**
 * FamilyBoard preview catalogue + cart.
 * Prices are placeholders for visualisation only.
 *
 * Checkout is fake: Stripe Checkout should replace pay() later.
 * Do not add Stripe secret keys to this static GitHub Pages site.
 */
(function (global) {
  const CART_KEY = "familyboard-cart-v1";

  const DAY_WORDS = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
  const CHORES_WORDS = DAY_WORDS.concat([
    "dishes",
    "dinner",
    "vacuum",
    "washing",
    "rubbish",
    "tidy",
    "bed",
    "laundry",
    "bins",
    "pets",
    "homework",
    "garden"
  ]);

  const EMOJIS = ["⭐", "❤️", "🎉", "✅", "🌈", "🐶", "🌞", "🎵", "🏆", "🌸", "⚽", "📚"];

  const PRODUCTS = {
    "chores-board": {
      id: "chores-board",
      kind: "board",
      name: "Chores board",
      href: "chores.html"
    },
    "pack-chores": {
      id: "pack-chores",
      kind: "pack",
      name: "Chores word pack",
      href: "pack-chores.html",
      price: 18,
      tileCount: 19,
      magnetic: true
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
      tileCount: 19,
      magnetic: false
    }
  };

  const SIZE_PRICE = { A5: 49, A4: 69 };
  const MOUNT_PRICE = { magnetic: 12, stick: 6, nonstick: 0 };
  const LINE_COUNTS = [3, 4, 5, 6, 7];
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
    EMOJIS: EMOJIS,
    LINE_COUNTS: LINE_COUNTS,
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
