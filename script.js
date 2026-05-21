// ============================================================
// ⚙️  STORE CONFIG — كل ما تحتاجين تعديله هنا فقط
// ============================================================

const STORE_CONFIG = {
  // 📱 رقم واتساب المتجر (بدون + أو 00)
  whatsappNumber: "9660530436522",

  // 🏪 اسم المتجر
  storeName: "دار أمول",

  // 🗂️ الأقسام — لإضافة قسم جديد: انسخ السطر وعدّله
  // id يجب أن يكون فريداً بالإنجليزية
  categories: [
    { id: "all",         label: "🌟 الكل" },
    { id: "traditional", label: "🧕 تقليدي" },
    { id: "modern",      label: "✨ عصري" },
    { id: "wedding",     label: "💍 أعراس" },
    { id: "kids",        label: "👧 أطفال" },
    // أضيفي قسماً جديداً هنا — مثال:
    // { id: "cooking",  label: "🍲 طبخ" },
    // { id: "accessories", label: "👜 إكسسوارات" },
  ],

  // 📦 المنتجات — لإضافة منتج جديد: انسخ كتلة {} وعدّلها
  products: [
    {
      id: 1,
      name: "جلابة فاسية كلاسيك",
      category: "traditional",     // يجب أن يطابق id في categories
      price: 350,
      currency: "MAD",
      image: "images/1al_labsha.png",                   // رابط الصورة الحقيقية (اختياري)
      emoji: "🥻",                 // الأيقونة (بديل الصورة)
      description: "جلابة مغربية تقليدية من أجود أنواع الصوف، مطرزة يدوياً بنقوش فاسية أصيلة",
      badge: "new",                // new | sale | featured | ""
      oldPrice: null,              // السعر القديم (للخصم)
      sizes: ["S", "M", "L", "XL", "XXL"],
      colors: ["بيج", "كحلي", "بني"],
    },
    {
      id: 2,
      name: "قفطان عرائسي ملكي",
      category: "wedding",
      price: 1200,
      currency: "MAD",
      emoji: "👸",
      image: "",
      description: "قفطان ملكي فاخر مطرز بخيوط الذهب والفضة، مثالي لليلة الحناء والأعراس المغربية",
      badge: "featured",
      oldPrice: 1500,
      sizes: ["مقاس خاص"],
      colors: ["ذهبي", "أحمر", "أخضر"],
    },
    {
      id: 3,
      name: "تاكشيطة عصرية ملونة",
      category: "modern",
      price: 480,
      currency: "MAD",
      emoji: "🌸",
      image: "",
      description: "تاكشيطة بتصميم عصري يجمع بين الفن المغربي والأناقة الحديثة، مناسبة للمناسبات",
      badge: "",
      oldPrice: null,
      sizes: ["S", "M", "L", "XL"],
      colors: ["وردي", "أزرق سماوي", "أخضر نعناعي"],
    },
    {
      id: 4,
      name: "جلابة كاجوال يومية",
      category: "modern",
      price: 220,
      currency: "MAD",
      emoji: "🧶",
      image: "",
      description: "جلابة عصرية للاستخدام اليومي، خفيفة ومريحة بألوان متعددة وتصاميم مودرن",
      badge: "sale",
      oldPrice: 280,
      sizes: ["S", "M", "L", "XL", "XXL"],
      colors: ["أبيض", "رمادي", "بيج"],
    },
    {
      id: 5,
      name: "بلوزة مغربية بروكار",
      category: "traditional",
      price: 290,
      currency: "MAD",
      emoji: "🌺",
      image: "",
      description: "بلوزة مصنوعة من قماش البروكار المغربي بألوان زاهية وتطريز يدوي رفيع",
      badge: "new",
      oldPrice: null,
      sizes: ["S", "M", "L"],
      colors: ["أحمر عنبي", "ذهبي", "كحلي"],
    },
    {
      id: 6,
      name: "جلابة أطفال مطرزة",
      category: "kids",
      price: 180,
      currency: "MAD",
      emoji: "🌈",
      image: "",
      description: "جلابة تقليدية للأطفال بتصاميم بهجة وألوان مبهجة مناسبة للمناسبات والأعياد",
      badge: "",
      oldPrice: null,
      sizes: ["2-3", "4-5", "6-7", "8-9", "10-11"],
      colors: ["وردي", "أزرق", "أصفر"],
    },
    // ✏️ أضيفي منتجك هنا — انسخي الكتلة أعلاه وعدّليها
  ],
};

// ============================================================
// 🛒  CART STATE
// ============================================================
let cart = [];
let activeCategory = "all";
let currentProduct = null;
let selectedSize = "";

function getCartTotal() {
  return cart.reduce((sum, item) => sum + item.price * item.qty, 0);
}

function updateCartUI() {
  const count = cart.reduce((s, i) => s + i.qty, 0);
  document.getElementById("cartCount").textContent = count;

  const itemsEl = document.getElementById("cartItems");
  const footerEl = document.getElementById("cartFooter");
  const totalEl = document.getElementById("cartTotal");

  if (cart.length === 0) {
    itemsEl.innerHTML = `<div class="cart-empty"><div class="empty-icon">🛍️</div><p>سلتك فارغة حتى الآن</p><p style="font-size:0.82rem;margin-top:8px;color:var(--text-muted)">ابدئي التسوق وأضيفي منتجاتك المفضلة</p></div>`;
    footerEl.style.display = "none";
    return;
  }

  footerEl.style.display = "block";
  totalEl.textContent = getCartTotal() + " MAD";

  itemsEl.innerHTML = cart.map(item => `
    <div class="cart-item">
      <div class="cart-item-thumb">${item.emoji}</div>
      <div class="cart-item-info">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-price">${item.price} MAD ${item.size ? '— ' + item.size : ''}</div>
        <div class="cart-item-qty">
          <button class="qty-btn" onclick="changeQty(${item.id},'${item.size}',-1)">−</button>
          <span class="qty-num">${item.qty}</span>
          <button class="qty-btn" onclick="changeQty(${item.id},'${item.size}',1)">+</button>
        </div>
      </div>
      <button class="cart-item-remove" onclick="removeFromCart(${item.id},'${item.size}')">🗑️</button>
    </div>
  `).join("");
}

function addToCart(product, size) {
  const key = `${product.id}-${size}`;
  const existing = cart.find(i => `${i.id}-${i.size}` === key);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({ ...product, size, qty: 1 });
  }
  updateCartUI();
  showToast("✅", `"${product.name}" أُضيف للسلة!`);
}

function removeFromCart(id, size) {
  cart = cart.filter(i => !(i.id === id && i.size === size));
  updateCartUI();
}

function changeQty(id, size, delta) {
  const item = cart.find(i => i.id === id && i.size === size);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) removeFromCart(id, size);
  else updateCartUI();
}

// ============================================================
// 📦 PRODUCTS RENDER
// ============================================================
function renderCategories() {
  const nav = document.getElementById("categoriesNav");
  nav.innerHTML = STORE_CONFIG.categories.map(cat => `
    <button class="cat-btn ${cat.id === activeCategory ? 'active' : ''}"
      onclick="setCategory('${cat.id}')">${cat.label}</button>
  `).join("");
}

function filterProducts() {
  const search = document.getElementById("searchInput").value.toLowerCase();
  return STORE_CONFIG.products.filter(p => {
    const matchCat = activeCategory === "all" || p.category === activeCategory;
    const matchSearch = p.name.toLowerCase().includes(search) || p.description.toLowerCase().includes(search);
    return matchCat && matchSearch;
  });
}

function renderProducts() {
  const grid = document.getElementById("productsGrid");
  const filtered = filterProducts();

  if (filtered.length === 0) {
    grid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:60px;color:var(--text-muted)">
      <div style="font-size:3rem;margin-bottom:12px">🔍</div>
      <p>لم يتم العثور على منتجات مطابقة</p>
    </div>`;
    return;
  }

  grid.innerHTML = filtered.map(p => `
    <div class="product-card" onclick="openModal(${p.id})">
      ${p.badge ? `<div class="badge-${p.badge}">${p.badge === 'new' ? 'جديد' : p.badge === 'sale' ? 'تخفيض' : 'مميز'}</div>` : ''}
      <button class="product-wishlist" onclick="wishlist(event,${p.id})">🤍</button>
      ${p.image
        ? `<img src="${p.image}" class="product-img" alt="${p.name}" loading="lazy"/>`
        : `<div class="product-img-placeholder"><span style="position:relative;z-index:1">${p.emoji}</span></div>`
      }
      <div class="product-info">
        <div class="product-cat">${STORE_CONFIG.categories.find(c => c.id === p.category)?.label || p.category}</div>
        <div class="product-name">${p.name}</div>
        <div class="product-desc">${p.description}</div>
        <div class="product-footer">
          <div class="product-price">
            ${p.price} <span>${p.currency}</span>
            ${p.oldPrice ? `<span class="old-price">${p.oldPrice} MAD</span>` : ''}
          </div>
          <button class="add-to-cart" onclick="quickAdd(event,${p.id})">
            🛒 أضف
          </button>
        </div>
      </div>
    </div>
  `).join("");
}

function setCategory(id) {
  activeCategory = id;
  renderCategories();
  renderProducts();
}

// ============================================================
// 🪟 MODAL
// ============================================================
function openModal(id) {
  currentProduct = STORE_CONFIG.products.find(p => p.id === id);
  if (!currentProduct) return;
  selectedSize = currentProduct.sizes[0] || "";

  const modalImg = document.getElementById("modalImg");
  if (currentProduct.image && currentProduct.image.trim() !== "") {
    modalImg.innerHTML = `<img src="${currentProduct.image}" alt="${currentProduct.name}" style="width:100%; height:100%; object-fit:cover; border-radius:inherit;">`;
  } else {
    modalImg.innerHTML = `<span style="font-size: 3rem;">${currentProduct.emoji}</span>`;
  }

  document.getElementById("modalCat").textContent = STORE_CONFIG.categories.find(c => c.id === currentProduct.category)?.label || "";
  document.getElementById("modalName").textContent = currentProduct.name;
  document.getElementById("modalDesc").textContent = currentProduct.description;
  document.getElementById("modalPrice").innerHTML = `${currentProduct.price} ${currentProduct.currency}${currentProduct.oldPrice ? ` <span style="font-size:1rem;color:var(--text-muted);text-decoration:line-through;font-weight:400">${currentProduct.oldPrice}</span>` : ''}`;

  document.getElementById("sizeOptions").innerHTML = currentProduct.sizes.map(s => `
    <button class="size-btn ${s === selectedSize ? 'active' : ''}" onclick="selectSize('${s}',this)">${s}</button>
  `).join("");

  document.getElementById("modalAddCart").onclick = () => {
    addToCart(currentProduct, selectedSize);
    closeModalDirect();
  };
  document.getElementById("modalWA").onclick = () => {
    openWhatsApp(`أريد طلب: ${currentProduct.name} - المقاس: ${selectedSize} - السعر: ${currentProduct.price} MAD`);
  };

  document.getElementById("modalOverlay").classList.add("open");
  document.body.style.overflow = "hidden";
}

function selectSize(size, btn) {
  selectedSize = size;
  document.querySelectorAll(".size-btn").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
}

function closeModal(e) {
  if (e.target === document.getElementById("modalOverlay")) closeModalDirect();
}
function closeModalDirect() {
  document.getElementById("modalOverlay").classList.remove("open");
  document.body.style.overflow = "";
}

// ============================================================
// 🛒 QUICK ADD (without opening modal)
// ============================================================
function quickAdd(e, id) {
  e.stopPropagation();
  const p = STORE_CONFIG.products.find(x => x.id === id);
  addToCart(p, p.sizes[0] || "");
}

// ============================================================
// 💬 WHATSAPP
// ============================================================
function openWhatsApp(message) {
  const num = STORE_CONFIG.whatsappNumber;
  const url = `https://wa.me/${num}?text=${encodeURIComponent(message)}`;
  window.location.href = url;
}

function buildOrderMessage() {
  const lines = cart.map(i => `• ${i.name} (${i.size}) × ${i.qty} = ${i.price * i.qty} MAD`);
  return `مرحباً! أريد طلب المنتجات التالية:\n\n${lines.join("\n")}\n\nالإجمالي: ${getCartTotal()} MAD\n\nشكراً 🙏`;
}

document.getElementById("checkoutBtn").addEventListener("click", () => {
  if (cart.length === 0) return;
  openWhatsApp(buildOrderMessage());
});

document.getElementById("waFloat").addEventListener("click", (e) => {
  e.preventDefault();
  openWhatsApp("مرحباً! أريد الاستفسار عن منتجاتكم 😊");
});
document.getElementById("waMainBtn").addEventListener("click", (e) => {
  e.preventDefault();
  openWhatsApp("مرحباً! أريد الاستفسار عن منتجاتكم 😊");
});

// ============================================================
// ❤️ WISHLIST (Local)
// ============================================================
function wishlist(e, id) {
  e.stopPropagation();
  const btn = e.currentTarget;
  btn.classList.toggle("active");
  btn.textContent = btn.classList.contains("active") ? "❤️" : "🤍";
  showToast("❤️", btn.classList.contains("active") ? "أُضيف للمفضلة" : "حُذف من المفضلة");
}

// ============================================================
// 🌙 THEME TOGGLE
// ============================================================
function toggleTheme() {
  const isDark = document.documentElement.getAttribute("data-theme") === "dark";
  if (isDark) {
    document.documentElement.removeAttribute("data-theme");
    document.getElementById("themeBtn").querySelector(".icon").textContent = "🌙";
    document.getElementById("themeLabel").textContent = "الوضع الداكن";
    localStorage.setItem("theme", "light");
  } else {
    document.documentElement.setAttribute("data-theme", "dark");
    document.getElementById("themeBtn").querySelector(".icon").textContent = "☀️";
    document.getElementById("themeLabel").textContent = "الوضع الفاتح";
    localStorage.setItem("theme", "dark");
  }
}

// ============================================================
// 📣 TOAST
// ============================================================
function showToast(icon, msg) {
  const t = document.getElementById("toast");
  document.getElementById("toastIcon").textContent = icon;
  document.getElementById("toastMsg").textContent = msg;
  t.classList.add("show");
  setTimeout(() => t.classList.remove("show"), 2800);
}

// ============================================================
// 📱 MOBILE MENU
// ============================================================
function toggleMobile() {
  document.getElementById("mobileMenu").classList.toggle("open");
}
function closeMobile() {
  document.getElementById("mobileMenu").classList.remove("open");
}

// ============================================================
// 🛒 CART DRAWER
// ============================================================
function toggleCart() {
  document.getElementById("cartDrawer").classList.toggle("open");
  document.getElementById("cartOverlay").classList.toggle("open");
  document.body.style.overflow = document.getElementById("cartDrawer").classList.contains("open") ? "hidden" : "";
}

// ============================================================
// 🚀 INIT
// ============================================================
window.addEventListener("DOMContentLoaded", () => {
  // Restore theme
  const saved = localStorage.getItem("theme");
  if (saved === "dark") {
    document.documentElement.setAttribute("data-theme", "dark");
    document.getElementById("themeBtn").querySelector(".icon").textContent = "☀️";
    document.getElementById("themeLabel").textContent = "الوضع الفاتح";
  }

  renderCategories();
  renderProducts();

  // Navbar scroll effect
  window.addEventListener("scroll", () => {
    const nav = document.getElementById("navbar");
    nav.style.boxShadow = window.scrollY > 50
      ? "0 4px 20px rgba(0,0,0,0.15)"
      : "none";
  });
});
