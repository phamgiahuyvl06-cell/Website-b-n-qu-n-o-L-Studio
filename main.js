const products = [
  { id: 1, name: "Áo Linen Mây", gender: "Nữ", category: "Áo", price: 590000, oldPrice: 690000, badge: "Bán chạy", image: "https://images.unsplash.com/photo-1551163943-3f6a855d1153?auto=format&fit=crop&w=720&q=82", colors: ["#d9d2c3", "#9d8873", "#50564b"], description: "Linen tự nhiên" },
  { id: 2, name: "Váy Hoa Nắng", gender: "Nữ", category: "Váy", price: 890000, badge: "Mới", image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=720&q=82", colors: ["#e6d5c8", "#9a5c50"], description: "Cotton mềm mại" },
  { id: 3, name: "Quần Ống Rộng An", gender: "Nữ", category: "Quần", price: 750000, badge: "", image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=720&q=82", colors: ["#d8d0c0", "#41463e", "#8d7566"], description: "Tencel thoáng mát" },
  { id: 4, name: "Áo Khoác Chớm Thu", gender: "Nữ", category: "Áo", price: 1290000, badge: "Bộ sưu tập mới", image: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?auto=format&fit=crop&w=720&q=82", colors: ["#b2a693", "#55574e"], description: "Cotton twill" },
  { id: 5, name: "Váy Dài Thềm Nắng", gender: "Nữ", category: "Váy", price: 990000, oldPrice: 1150000, badge: "", image: "https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?auto=format&fit=crop&w=720&q=82", colors: ["#e2d8ca", "#77745d"], description: "Cotton hữu cơ" },
  { id: 6, name: "Sơ Mi Ngày Thảnh Thơi", gender: "Nữ", category: "Áo", price: 680000, badge: "", image: "https://images.unsplash.com/photo-1598554747436-c9293d6a588f?auto=format&fit=crop&w=720&q=82", colors: ["#e8e5db", "#a9b5ad", "#bd957f"], description: "Linen pha" },
  { id: 7, name: "Quần Linen Dịu Dàng", gender: "Nữ", category: "Quần", price: 790000, badge: "Bán chạy", image: "https://images.unsplash.com/photo-1509551388413-e18d0ac5d495?auto=format&fit=crop&w=720&q=82", colors: ["#ddd5c5", "#737669"], description: "Linen tự nhiên" },
  { id: 8, name: "Váy Suông Mộc", gender: "Nữ", category: "Váy", price: 850000, badge: "", image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=720&q=82", colors: ["#d2c5b5", "#41493d"], description: "Rayon thân thiện" },
  { id: 9, name: "Áo Thun Cotton Nam", gender: "Nam", category: "Áo", price: 390000, badge: "Mới", image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=720&q=82", colors: ["#e8e5db", "#343832", "#969a8d"], description: "Cotton hữu cơ" },
  { id: 10, name: "Sơ Mi Linen Nam", gender: "Nam", category: "Áo", price: 690000, badge: "Bán chạy", image: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=720&q=82", colors: ["#e4dfd2", "#718074"], description: "Linen thoáng mát" },
  { id: 11, name: "Quần Chino Mộc", gender: "Nam", category: "Quần", price: 790000, badge: "", image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=720&q=82", colors: ["#b7a88f", "#40443c"], description: "Cotton twill" },
  { id: 12, name: "Áo Khoác Nam Đường Phố", gender: "Nam", category: "Áo", price: 1190000, badge: "Bộ sưu tập mới", image: "https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&w=720&q=82", colors: ["#75766b", "#d0c7b5"], description: "Vải dệt bền nhẹ" }
];

const productGrid = document.querySelector("#product-grid");
const cartToggle = document.querySelector(".cart-toggle");
const cartDrawer = document.querySelector(".cart-drawer");
const overlay = document.querySelector(".overlay");
const cartItems = document.querySelector(".cart-items");
const cartEmpty = document.querySelector(".cart-empty");
const cartFooter = document.querySelector(".cart-footer");
const searchInput = document.querySelector("#search-input");
const emptyState = document.querySelector(".empty-state");
const resultsMessage = document.querySelector(".results-message");
const toast = document.querySelector(".toast");

let activeCategory = "Tất cả";
let activeGender = "Tất cả";
let searchTerm = "";
let wishlistOnly = false;
let cart = [];
const favorites = new Set();
let toastTimer;

function formatPrice(price) {
  return `${new Intl.NumberFormat("vi-VN").format(price)}đ`;
}

function renderProducts() {
  const filtered = products.filter((product) => {
    const matchesCategory = activeCategory === "Tất cả" || product.category === activeCategory;
    const matchesGender = activeGender === "Tất cả" || product.gender === activeGender;
    const matchesSearch = `${product.name} ${product.gender} ${product.category} ${product.description}`.toLocaleLowerCase("vi").includes(searchTerm.toLocaleLowerCase("vi"));
    const matchesWishlist = !wishlistOnly || favorites.has(product.id);
    return matchesCategory && matchesGender && matchesSearch && matchesWishlist;
  });

  productGrid.innerHTML = filtered.map((product) => {
    const badge = product.badge ? `<span class="product-badge">${product.badge}</span>` : "";
    const oldPrice = product.oldPrice ? `<del>${formatPrice(product.oldPrice)}</del>` : "";
    const swatches = product.colors.map((color) => `<span class="swatch" style="background:${color}" aria-label="Màu sản phẩm"></span>`).join("");
    return `
      <article class="product-card">
        <div class="product-image-wrap">
          <img class="product-image" src="${product.image}" alt="${product.name}" loading="lazy">
          ${badge}
          <button class="favorite-button${favorites.has(product.id) ? " is-favorite" : ""}" type="button" data-favorite-id="${product.id}" aria-label="Thêm ${product.name} vào yêu thích" aria-pressed="${favorites.has(product.id)}">
            <svg class="icon"><use href="#icon-heart"></use></svg>
          </button>
          <button class="quick-add" type="button" data-add-id="${product.id}">
            <svg class="icon"><use href="#icon-plus"></use></svg> Thêm vào giỏ
          </button>
        </div>
        <div class="product-info">
          <div class="product-meta"><h3 class="product-name">${product.name}</h3><p class="product-price">${formatPrice(product.price)} ${oldPrice}</p></div>
          <p class="product-category">${product.gender} · ${product.description}</p>
          <div class="swatches" aria-label="Các màu có sẵn">${swatches}<span class="swatch-more">+${product.colors.length}</span></div>
        </div>
      </article>`;
  }).join("");

  emptyState.hidden = filtered.length !== 0;
  resultsMessage.textContent = wishlistOnly
    ? `Sản phẩm yêu thích (${filtered.length})`
    : searchTerm
      ? `Tìm thấy ${filtered.length} sản phẩm cho “${searchTerm}”`
      : activeGender !== "Tất cả"
        ? `Bộ sưu tập ${activeGender} (${filtered.length} sản phẩm)`
        : "";
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("is-visible");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove("is-visible"), 2600);
}

function updateCart() {
  const count = cart.reduce((total, item) => total + item.quantity, 0);
  document.querySelector(".cart-count").textContent = count;
  document.querySelector(".drawer-count").textContent = `(${count})`;
  cartItems.innerHTML = cart.map((item) => `
    <div class="cart-line">
      <img src="${item.image}" alt="${item.name}">
      <div class="cart-line-info">
        <strong>${item.name}</strong>
        <span>${item.description}</span>
        <div class="quantity-control">
          <button type="button" data-quantity-id="${item.id}" data-change="-1" aria-label="Giảm số lượng"><svg class="icon"><use href="#icon-minus"></use></svg></button>
          <span>${item.quantity}</span>
          <button type="button" data-quantity-id="${item.id}" data-change="1" aria-label="Tăng số lượng"><svg class="icon"><use href="#icon-plus"></use></svg></button>
        </div>
      </div>
      <div class="cart-line-end"><strong>${formatPrice(item.price * item.quantity)}</strong><button class="remove-item" type="button" data-remove-id="${item.id}">Xóa</button></div>
    </div>`).join("");
  document.querySelector(".cart-subtotal strong").textContent = formatPrice(cart.reduce((total, item) => total + item.price * item.quantity, 0));
  const isEmpty = cart.length === 0;
  cartEmpty.classList.toggle("is-visible", isEmpty);
  cartFooter.classList.toggle("is-hidden", isEmpty);
}

function addToCart(id) {
  const product = products.find((item) => item.id === Number(id));
  if (!product) return;
  const existing = cart.find((item) => item.id === product.id);
  if (existing) existing.quantity += 1;
  else cart.push({ ...product, quantity: 1 });
  updateCart();
  showToast(`${product.name} đã được thêm vào giỏ hàng`);
}

function setCartOpen(isOpen) {
  cartDrawer.classList.toggle("is-open", isOpen);
  cartDrawer.setAttribute("aria-hidden", String(!isOpen));
  document.body.classList.toggle("drawer-open", isOpen);
  if (isOpen) {
    overlay.hidden = false;
    requestAnimationFrame(() => overlay.classList.add("is-visible"));
    document.querySelector(".close-cart").focus();
  } else {
    overlay.classList.remove("is-visible");
    window.setTimeout(() => { overlay.hidden = true; }, 250);
    cartToggle.focus();
  }
}

productGrid.addEventListener("click", (event) => {
  const addButton = event.target.closest("[data-add-id]");
  const favoriteButton = event.target.closest("[data-favorite-id]");
  if (addButton) addToCart(addButton.dataset.addId);
  if (favoriteButton) {
    const id = Number(favoriteButton.dataset.favoriteId);
    if (favorites.has(id)) favorites.delete(id);
    else favorites.add(id);
    const isFavorite = favorites.has(id);
    if (wishlistOnly) renderProducts();
    else {
      favoriteButton.classList.toggle("is-favorite", isFavorite);
      favoriteButton.setAttribute("aria-pressed", String(isFavorite));
    }
    showToast(isFavorite ? "Đã thêm vào danh sách yêu thích" : "Đã bỏ khỏi danh sách yêu thích");
  }
});

cartItems.addEventListener("click", (event) => {
  const quantityButton = event.target.closest("[data-quantity-id]");
  const removeButton = event.target.closest("[data-remove-id]");
  if (quantityButton) {
    const item = cart.find((entry) => entry.id === Number(quantityButton.dataset.quantityId));
    if (!item) return;
    item.quantity += Number(quantityButton.dataset.change);
    if (item.quantity <= 0) cart = cart.filter((entry) => entry.id !== item.id);
    updateCart();
  }
  if (removeButton) {
    cart = cart.filter((entry) => entry.id !== Number(removeButton.dataset.removeId));
    updateCart();
  }
});

document.querySelectorAll(".filter-chip").forEach((button) => {
  button.addEventListener("click", () => {
    activeCategory = button.dataset.filter;
    wishlistOnly = false;
    document.querySelectorAll(".filter-chip").forEach((chip) => chip.classList.toggle("is-active", chip === button));
    renderProducts();
  });
});

document.querySelectorAll(".gender-filter-chip").forEach((button) => {
  button.addEventListener("click", () => {
    activeGender = button.dataset.genderFilter;
    wishlistOnly = false;
    document.querySelectorAll(".gender-filter-chip").forEach((chip) => chip.classList.toggle("is-active", chip === button));
    renderProducts();
  });
});

document.querySelectorAll(".category-card").forEach((button) => {
  button.addEventListener("click", () => {
    activeGender = button.dataset.gender || "Tất cả";
    activeCategory = button.dataset.category || "Tất cả";
    wishlistOnly = false;
    searchTerm = "";
    searchInput.value = "";
    document.querySelectorAll(".gender-filter-chip").forEach((chip) => chip.classList.toggle("is-active", chip.dataset.genderFilter === activeGender));
    document.querySelectorAll(".filter-chip").forEach((chip) => chip.classList.toggle("is-active", chip.dataset.filter === activeCategory));
    renderProducts();
    document.querySelector("#san-pham").scrollIntoView({ behavior: "smooth" });
  });
});

document.querySelector(".all-products-link").addEventListener("click", () => {
  activeCategory = "Tất cả";
  activeGender = "Tất cả";
  wishlistOnly = false;
  document.querySelectorAll(".gender-filter-chip").forEach((chip) => chip.classList.toggle("is-active", chip.dataset.genderFilter === "Tất cả"));
  document.querySelectorAll(".filter-chip").forEach((chip) => chip.classList.toggle("is-active", chip.dataset.filter === "Tất cả"));
  renderProducts();
});

searchInput.addEventListener("input", () => {
  searchTerm = searchInput.value.trim();
  wishlistOnly = false;
  renderProducts();
});

document.querySelector(".search-form").addEventListener("submit", (event) => {
  event.preventDefault();
  document.querySelector("#san-pham").scrollIntoView({ behavior: "smooth" });
});

document.querySelector(".clear-search").addEventListener("click", () => {
  searchTerm = "";
  activeCategory = "Tất cả";
  activeGender = "Tất cả";
  wishlistOnly = false;
  searchInput.value = "";
  document.querySelectorAll(".gender-filter-chip").forEach((chip) => chip.classList.toggle("is-active", chip.dataset.genderFilter === "Tất cả"));
  document.querySelectorAll(".filter-chip").forEach((chip) => chip.classList.toggle("is-active", chip.dataset.filter === "Tất cả"));
  renderProducts();
});

document.querySelector(".wishlist-shortcut").addEventListener("click", () => {
  wishlistOnly = true;
  activeCategory = "Tất cả";
  activeGender = "Tất cả";
  document.querySelectorAll(".gender-filter-chip").forEach((chip) => chip.classList.toggle("is-active", chip.dataset.genderFilter === "Tất cả"));
  document.querySelectorAll(".filter-chip").forEach((chip) => chip.classList.toggle("is-active", chip.dataset.filter === "Tất cả"));
  renderProducts();
  document.querySelector("#san-pham").scrollIntoView({ behavior: "smooth" });
});

cartToggle.addEventListener("click", () => setCartOpen(true));
document.querySelector(".close-cart").addEventListener("click", () => setCartOpen(false));
document.querySelector(".continue-shopping").addEventListener("click", () => setCartOpen(false));
overlay.addEventListener("click", () => setCartOpen(false));
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && cartDrawer.classList.contains("is-open")) setCartOpen(false);
  if (event.key === "Escape" && document.querySelector(".main-nav").classList.contains("is-open")) {
    document.querySelector(".main-nav").classList.remove("is-open");
    document.querySelector(".mobile-menu-button").setAttribute("aria-expanded", "false");
  }
});

document.querySelector(".mobile-menu-button").addEventListener("click", (event) => {
  const menu = document.querySelector(".main-nav");
  const isOpen = menu.classList.toggle("is-open");
  event.currentTarget.setAttribute("aria-expanded", String(isOpen));
});
document.querySelectorAll(".main-nav a").forEach((link) => link.addEventListener("click", () => {
  document.querySelector(".main-nav").classList.remove("is-open");
  document.querySelector(".mobile-menu-button").setAttribute("aria-expanded", "false");
}));

document.querySelector(".newsletter-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const emailInput = document.querySelector("#newsletter-email");
  if (!emailInput.checkValidity()) {
    emailInput.reportValidity();
    return;
  }
  showToast("Cảm ơn bạn đã đăng ký nhận thư từ Lá!");
  event.currentTarget.reset();
});

document.querySelector(".checkout-button").addEventListener("click", () => {
  showToast("Cảm ơn bạn! Tính năng thanh toán sẽ sớm được cập nhật.");
});

renderProducts();
updateCart();
