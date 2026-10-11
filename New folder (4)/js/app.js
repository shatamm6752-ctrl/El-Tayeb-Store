/* =========================================================
   El Tayeb Store — App Logic
   Bilingual (EN/AR) + RTL/LTR, product modal, cart, WhatsApp.
   ========================================================= */

/* ---------- Configuration ---------- */

// Business WhatsApp number (orders are sent here), international format, digits only.
const WHATSAPP_NUMBER = "201225506203";

// E-Wallet numbers shown for prepayment orders.
const WALLET_VODAFONE = "01066526729";
const WALLET_INSTAPAY = "01066526729";

// Payment method values.
const PAY_WALLET = "wallet";
const PAY_COD = "cod";

/* ---------- i18n dictionary ---------- */
const I18N = {
  en: {
    brandName: "El Tayeb Store",
    brandAr: "متجر الطيب",
    navHome: "Home",
    navProducts: "Products",
    navContact: "Contact",
    cart: "Cart",
    openCart: "Open cart",
    close: "Close",
    closeCart: "Close cart",
    heroTitle: "El Tayeb Store",
    heroSubtitle: "متجر الطيب",
    emptyProducts: "No products available yet.",
    yourCart: "Your Cart",
    cartEmpty: "Your cart is empty.",
    total: "Total",
    orderWhatsapp: "Order on WhatsApp",
    addToCart: "Add to Cart",
    remove: "Remove",
    quantity: "Quantity",
    material: "Material",
    details: "Details",
    decrease: "Decrease quantity",
    increase: "Increase quantity",
    footerNote: "Order easily via WhatsApp.",
    currency: "EGP",
    waIntro: "Hello El Tayeb Store, I'd like to place an order:",
    waTotal: "Total:",
    addedToast: "added to cart",
    emptyCartToast: "Your cart is empty",
    waNotSet: "WhatsApp number is not configured yet",
    item: "Item",
    /* Checkout */
    checkoutTitle: "Checkout",
    paymentMethod: "Payment Method",
    payWallet: "Prepayment / E-Wallet",
    payWalletDesc: "Transfer to one of the wallets below",
    payCod: "Cash on Delivery",
    walletVodafone: "Vodafone Cash",
    walletInstapay: "InstaPay",
    walletNote: "Send the total, then confirm your order.",
    fullName: "Full Name",
    phone: "Phone Number",
    address: "Detailed Delivery Address",
    namePlaceholder: "Enter your full name",
    phonePlaceholder: "Enter your phone number",
    addressPlaceholder: "Street, building, floor, landmarks…",
    confirmOrder: "Confirm Order",
    errName: "Please enter your full name",
    errPhone: "Please enter a valid phone number",
    errAddress: "Please enter your detailed address",
    errPayment: "Please select a payment method",
    /* WhatsApp message labels */
    waNewOrder: "New Order",
    waPayment: "Payment Method",
    waName: "Customer Name",
    waPhoneLabel: "Phone",
    waAddressLabel: "Address",
    waItems: "Order Items",
    waModel: "Model / Material",
    waImage: "Product Image",
    waDesc: "Description & Details",
    waQty: "Quantity",
    waSubtotal: "Subtotal",
    waGrandTotal: "Grand Total",
  },
  ar: {
    brandName: "El Tayeb Store",
    brandAr: "متجر الطيب",
    navHome: "الرئيسية",
    navProducts: "المنتجات",
    navContact: "تواصل",
    cart: "السلة",
    openCart: "فتح السلة",
    close: "إغلاق",
    closeCart: "إغلاق السلة",
    heroTitle: "متجر الطيب",
    heroSubtitle: "El Tayeb Store",
    emptyProducts: "لا توجد منتجات متاحة حالياً.",
    yourCart: "سلة التسوق",
    cartEmpty: "سلتك فارغة.",
    total: "الإجمالي",
    orderWhatsapp: "اطلب عبر واتساب",
    addToCart: "أضف إلى السلة",
    remove: "إزالة",
    quantity: "الكمية",
    material: "المادة",
    details: "التفاصيل",
    decrease: "تقليل الكمية",
    increase: "زيادة الكمية",
    footerNote: "اطلب بسهولة عبر واتساب.",
    currency: "ج.م",
    waIntro: "مرحباً متجر الطيب، أرغب في تقديم طلب:",
    waTotal: "الإجمالي:",
    addedToast: "تمت الإضافة إلى السلة",
    emptyCartToast: "سلتك فارغة",
    waNotSet: "رقم الواتساب غير مُعد بعد",
    item: "منتج",
    /* Checkout */
    checkoutTitle: "إتمام الطلب",
    paymentMethod: "طريقة الدفع",
    payWallet: "دفع مسبق / محفظة إلكترونية",
    payWalletDesc: "حوّل إلى أحد المحافظ التالية",
    payCod: "الدفع عند الاستلام",
    walletVodafone: "فودافون كاش",
    walletInstapay: "إنستاباي",
    walletNote: "حوّل الإجمالي ثم أكّد طلبك.",
    fullName: "اسم العميل",
    phone: "رقم الهاتف",
    address: "العنوان بالتفصيل",
    namePlaceholder: "أدخل اسم العميل بالكامل",
    phonePlaceholder: "أدخل رقم الهاتف",
    addressPlaceholder: "الشارع، المبنى، الدور، علامة مميزة…",
    confirmOrder: "تأكيد الطلب",
    errName: "من فضلك أدخل اسم العميل",
    errPhone: "من فضلك أدخل رقم هاتف صحيح",
    errAddress: "من فضلك أدخل العنوان بالتفصيل",
    errPayment: "من فضلك اختر طريقة الدفع",
    /* WhatsApp message labels */
    waNewOrder: "طلب جديد",
    waPayment: "طريقة الدفع",
    waName: "اسم العميل",
    waPhoneLabel: "رقم الهاتف",
    waAddressLabel: "العنوان",
    waItems: "أصناف الطلب",
    waModel: "الموديل / الخامة",
    waImage: "رابط صورة المنتج",
    waDesc: "تفاصيل المنتج",
    waQty: "الكمية المطلوبة",
    waSubtotal: "الإجمالي الفرعي",
    waGrandTotal: "إجمالي السعر",
  },
};

/* ---------- Language state ---------- */
let currentLang = "en";
try {
  const saved = localStorage.getItem("eltayeb_lang");
  if (saved === "ar" || saved === "en") currentLang = saved;
} catch (e) {
  currentLang = "en";
}

const t = (key) => (I18N[currentLang] && I18N[currentLang][key]) || key;

/* Helper to read a bilingual field for the active language. */
const loc = (field) =>
  field && typeof field === "object" ? field[currentLang] || field.en || "" : field || "";

/* ---------- Product data (bilingual) ----------
   title / material / description are { en, ar } objects.
   Prices in EGP, aligned with Egyptian market rates.
----------------------------------- */
const products = [
  {
    id: 1,
    image: "images/product-1.jpg",
    title: { en: "Classic Tote Bag", ar: "حقيبة كلاسيكية" },
    material: { en: "Water-resistant nylon with wide ribbon straps", ar: "نايلون مقاوم للماء مع أشرطة عريضة" },
    description: {
      en: "Spacious everyday tote with a soft, lightweight build. Comfortable wide shoulder straps and a roomy interior that fits a laptop, books, and daily essentials. Approx. 35 x 30 x 12 cm.",
      ar: "حقيبة يومية واسعة بتصميم ناعم وخفيف. أشرطة كتف عريضة مريحة وتصميم داخلي واسع يتسع للحاسوب المحمول والكتب وأساسياتك اليومية. الأبعاد تقريبًا 35 × 30 × 12 سم.",
    },
    price: 250,
  },
  {
    id: 2,
    image: "images/product-2.jpg",
    title: { en: "Classic Tote Bag", ar: "حقيبة كلاسيكية" },
    material: { en: "Water-resistant nylon with wide ribbon straps", ar: "نايلون مقاوم للماء مع أشرطة عريضة" },
    description: {
      en: "Everyday tote in a warm caramel tone. Lightweight, durable, and easy to carry with padded wide straps. Roomy main compartment for work, travel, or shopping. Approx. 35 x 30 x 12 cm.",
      ar: "حقيبة يومية بدرجة كراميل دافئة. خفيفة ومتينة وسهلة الحمل بأشرطة عريضة مبطنة. مقصورة رئيسية واسعة للعمل أو السفر أو التسوق. الأبعاد تقريبًا 35 × 30 × 12 سم.",
    },
    price: 250,
  },
  {
    id: 3,
    image: "images/product-3.jpg",
    title: { en: "Tote Bag with Mini Pouch", ar: "حقيبة توت مع محفظة صغيرة" },
    material: { en: "Nylon with metal hardware and detachable pouch", ar: "نايلون مع إكسسوارات معدنية ومحفظة قابلة للفصل" },
    description: {
      en: "Practical tote that includes a matching zip-round mini pouch attached by a clip. Multiple interior pockets and sturdy webbing handles. Approx. 33 x 29 x 13 cm.",
      ar: "حقيبة عملية تتضمن محفظة صغيرة دائرية مطابقة مثبتة بمشبك. جيوب داخلية متعددة ومقابض حزام متينة. الأبعاد تقريبًا 33 × 29 × 13 سم.",
    },
    price: 350,
  },
  {
    id: 4,
    image: "images/product-4.jpg",
    title: { en: "Tote Bag with Mini Pouch", ar: "حقيبة توت مع محفظة صغيرة" },
    material: { en: "Nylon with metal hardware and detachable pouch", ar: "نايلون مع إكسسوارات معدنية ومحفظة قابلة للفصل" },
    description: {
      en: "Neutral beige tote paired with a matching clip-on mini pouch. Lightweight, water-resistant, and roomy enough for daily use. Approx. 33 x 29 x 13 cm.",
      ar: "حقيبة بيج محايدة مع محفظة صغيرة مطابقة مثبتة بمشبك. خفيفة ومقاومة للماء وواسعة بما يكفي للاستخدام اليومي. الأبعاد تقريبًا 33 × 29 × 13 سم.",
    },
    price: 350,
  },
  {
    id: 5,
    image: "images/product-5.jpg",
    title: { en: "Cosmetic Pouch", ar: "حقيبة مستحضرات تجميل" },
    material: { en: "Faux leather with gold-tone print", ar: "جلد صناعي بطبعة ذهبية" },
    description: {
      en: "Compact zip-around cosmetic pouch for makeup, skincare, and travel essentials. Smooth lining with a durable gold-print finish. Approx. 19 x 12 x 8 cm.",
      ar: "حقيبة مستحضرات تجميل صغيرة بسحاب محيط للمكياج والعناية بالبشرة وأساسيات السفر. بطانة ناعمة مع تشطيب مطبوع ذهبي متين. الأبعاد تقريبًا 19 × 12 × 8 سم.",
    },
    price: 175,
  },
  {
    id: 6,
    image: "images/product-6.jpg",
    title: { en: "Tote Bag with Mini Pouch", ar: "حقيبة توت مع محفظة صغيرة" },
    material: { en: "Nylon with metal hardware and detachable pouch", ar: "نايلون مع إكسسوارات معدنية ومحفظة قابلة للفصل" },
    description: {
      en: "Navy tote with a matching clip-on mini pouch. Lightweight nylon, reinforced handles, and a spacious interior for work or travel. Approx. 33 x 29 x 13 cm.",
      ar: "حقيبة كحلية مع محفظة صغيرة مطابقة مثبتة بمشبك. نايلون خفيف ومقابض معززة وتصميم داخلي واسع للعمل أو السفر. الأبعاد تقريبًا 33 × 29 × 13 سم.",
    },
    price: 350,
  },
  {
    id: 7,
    image: "images/product-7.jpg",
    title: { en: "Tote Bag with Mini Pouch", ar: "حقيبة توت مع محفظة صغيرة" },
    material: { en: "Nylon with metal hardware and detachable pouch", ar: "نايلون مع إكسسوارات معدنية ومحفظة قابلة للفصل" },
    description: {
      en: "Sleek black tote with a matching mini pouch. Versatile, durable, and easy to pair with any outfit. Roomy main compartment with zip closure. Approx. 33 x 29 x 13 cm.",
      ar: "حقيبة سوداء أنيقة مع محفظة صغيرة مطابقة. متعددة الاستخدامات ومتينة وسهلة التنسيق مع أي إطلالة. مقصورة رئيسية واسعة بإغلاق سحاب. الأبعاد تقريبًا 33 × 29 × 13 سم.",
    },
    price: 350,
  },
  {
    id: 8,
    image: "images/product-8.jpg",
    title: { en: "Travel Cosmetic Bag", ar: "حقيبة سفر لمستحضرات التجميل" },
    material: { en: "Faux leather with top handle", ar: "جلد صناعي بمقبض علوي" },
    description: {
      en: "Structured cosmetic organizer with a top handle and full-length zip. Available in tan and black; ideal for toiletries and travel. Approx. 22 x 15 x 11 cm.",
      ar: "منظم لمستحضرات التجميل بمقبض علوي وسحاب بطول كامل. متوفر باللونين البني والأسود؛ مثالي لمستلزمات العناية والسفر. الأبعاد تقريبًا 22 × 15 × 11 سم.",
    },
    price: 299,
  },
  {
    id: 9,
    image: "images/product-9.jpg",
    title: { en: "Velvet Cosmetic Pouch", ar: "حقيبة مخملية لمستحضرات التجميل" },
    material: { en: "Soft velvet with embossed logo and gold zip", ar: "مخمل ناعم مع شعار بارز وسحاب ذهبي" },
    description: {
      en: "Elegant velvet pouch with an embossed emblem and gold-tone zipper. Soft-touch finish, perfect for makeup or as a gift. Approx. 20 x 13 x 8 cm.",
      ar: "حقيبة مخملية أنيقة بشعار بارز وسحاب ذهبي. تشطيب ناعم الملمس، مثالية للمكياج أو كهدية. الأبعاد تقريبًا 20 × 13 × 8 سم.",
    },
    price: 199,
  },
  {
    id: 10,
    image: "images/product-10.jpg",
    title: { en: "Velvet Cosmetic Pouch", ar: "حقيبة مخملية لمستحضرات التجميل" },
    material: { en: "Soft velvet with embossed logo and gold zip", ar: "مخمل ناعم مع شعار بارز وسحاب ذهبي" },
    description: {
      en: "Blush velvet pouch with an embossed emblem and gold-tone zipper. Compact, soft, and stylish for everyday carry. Approx. 18 x 12 x 7 cm.",
      ar: "حقيبة مخملية وردية بشعار بارز وسحاب ذهبي. صغيرة وناعمة وأنيقة للاستخدام اليومي. الأبعاد تقريبًا 18 × 12 × 7 سم.",
    },
    price: 199,
  },
];

/* ---------- Helpers ---------- */
const $ = (sel) => document.querySelector(sel);
const formatPrice = (value) => `${Number(value).toLocaleString("en-US")} ${t("currency")}`;

/* ---------- DOM references ---------- */
const grid = document.getElementById("product-grid");
const emptyState = document.getElementById("empty-state");
const cartCountEls = document.querySelectorAll("[data-cart-count]");
const cartItemsEl = document.getElementById("cart-items");
const cartEmptyEl = document.getElementById("cart-empty");
const cartTotalEl = document.getElementById("cart-total");
const cartFooterEl = document.getElementById("cart-footer");

const productModal = document.getElementById("product-modal");
const productModalBody = document.getElementById("product-modal-body");

const cartDrawer = document.getElementById("cart-drawer");
const cartOverlay = document.getElementById("cart-overlay");

const toastEl = document.getElementById("toast");
const navToggle = document.getElementById("nav-toggle");
const primaryNav = document.getElementById("primary-nav");

/* Checkout elements */
const walletDetails = document.getElementById("wallet-details");
const walletVodafoneEl = document.getElementById("wallet-vodafone");
const walletInstapayEl = document.getElementById("wallet-instapay");
const paymentErrorEl = document.getElementById("payment-error");
const custNameEl = document.getElementById("cust-name");
const custPhoneEl = document.getElementById("cust-phone");
const custAddressEl = document.getElementById("cust-address");
const nameErrorEl = document.getElementById("name-error");
const phoneErrorEl = document.getElementById("phone-error");
const addressErrorEl = document.getElementById("address-error");
const checkoutBtn = document.getElementById("checkout-btn");

/* ---------- Cart state ---------- */
let cart = [];
try {
  const saved = localStorage.getItem("eltayeb_cart");
  if (saved) cart = JSON.parse(saved) || [];
} catch (e) {
  cart = [];
}

function saveCart() {
  try {
    localStorage.setItem("eltayeb_cart", JSON.stringify(cart));
  } catch (e) {
    /* ignore storage errors */
  }
}

function cartCount() {
  return cart.reduce((sum, item) => sum + item.qty, 0);
}

function cartTotal() {
  return cart.reduce((sum, item) => {
    const product = products.find((p) => p.id === item.id);
    return sum + (product ? product.price * item.qty : 0);
  }, 0);
}

/* ---------- Toast ---------- */
let toastTimer = null;
function showToast(message) {
  if (!toastEl) return;
  toastEl.textContent = message;
  toastEl.classList.add("is-visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toastEl.classList.remove("is-visible"), 2200);
}

/* ---------- Cart actions ---------- */
function addToCart(id, qty = 1) {
  const existing = cart.find((item) => item.id === id);
  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({ id, qty });
  }
  saveCart();
  renderCart();
  const product = products.find((p) => p.id === id);
  showToast(`${loc(product ? product.title : "") || t("item")} — ${t("addedToast")}`);
}

function setQty(id, qty) {
  const item = cart.find((i) => i.id === id);
  if (!item) return;
  item.qty = qty;
  if (item.qty <= 0) {
    cart = cart.filter((i) => i.id !== id);
  }
  saveCart();
  renderCart();
}

function removeFromCart(id) {
  cart = cart.filter((i) => i.id !== id);
  saveCart();
  renderCart();
}

/* ---------- Product card ---------- */
function createCard(product) {
  const card = document.createElement("article");
  card.className = "card reveal";

  // Media
  const media = document.createElement("div");
  media.className = "card__media";
  if (product.image) {
    const img = document.createElement("img");
    img.src = product.image;
    img.alt = loc(product.title);
    img.loading = "lazy";
    media.appendChild(img);
  }

  // Body
  const body = document.createElement("div");
  body.className = "card__body";

  const title = document.createElement("h3");
  title.className = "card__title";
  title.textContent = loc(product.title);

  const desc = document.createElement("p");
  desc.className = "card__desc";
  desc.textContent = loc(product.material);

  const price = document.createElement("p");
  price.className = "card__price";
  price.textContent = product.price ? formatPrice(product.price) : "";

  body.append(title, desc, price);

  // Actions
  const actions = document.createElement("div");
  actions.className = "card__actions";

  const addBtn = document.createElement("button");
  addBtn.type = "button";
  addBtn.className = "btn btn--dark";
  addBtn.textContent = t("addToCart");
  addBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    addToCart(product.id, 1);
  });

  actions.appendChild(addBtn);
  card.append(media, body, actions);

  // Open detail modal on click
  card.addEventListener("click", () => openProductModal(product.id));

  return card;
}

/* ---------- Product modal ---------- */
let modalQty = 1;
let modalProductId = null;

function openProductModal(id) {
  const product = products.find((p) => p.id === id);
  if (!product) return;

  modalProductId = id;
  modalQty = 1;
  productModalBody.innerHTML = "";

  // Image
  const media = document.createElement("div");
  media.className = "pmodal__media";
  if (product.image) {
    const img = document.createElement("img");
    img.src = product.image;
    img.alt = loc(product.title);
    media.appendChild(img);
  }

  // Info
  const info = document.createElement("div");
  info.className = "pmodal__info";

  const title = document.createElement("h2");
  title.className = "pmodal__title";
  title.textContent = loc(product.title);

  const price = document.createElement("p");
  price.className = "pmodal__price";
  price.textContent = product.price ? formatPrice(product.price) : "";

  const material = document.createElement("p");
  material.className = "pmodal__material";
  const materialLabel = document.createElement("span");
  materialLabel.className = "pmodal__label";
  materialLabel.textContent = t("material");
  material.append(materialLabel, document.createTextNode(loc(product.material)));

  const desc = document.createElement("p");
  desc.className = "pmodal__desc";
  const descLabel = document.createElement("span");
  descLabel.className = "pmodal__label";
  descLabel.textContent = t("details");
  desc.append(descLabel, document.createTextNode(loc(product.description)));

  // Quantity selector
  const qtyRow = document.createElement("div");
  qtyRow.className = "qty";

  const qtyLabel = document.createElement("span");
  qtyLabel.className = "qty__label";
  qtyLabel.textContent = t("quantity");

  const qtyControls = document.createElement("div");
  qtyControls.className = "qty__controls";

  const minusBtn = document.createElement("button");
  minusBtn.type = "button";
  minusBtn.className = "qty__btn";
  minusBtn.textContent = "−";
  minusBtn.setAttribute("aria-label", t("decrease"));

  const qtyValue = document.createElement("span");
  qtyValue.className = "qty__value";
  qtyValue.textContent = "1";

  const plusBtn = document.createElement("button");
  plusBtn.type = "button";
  plusBtn.className = "qty__btn";
  plusBtn.textContent = "+";
  plusBtn.setAttribute("aria-label", t("increase"));

  const syncQty = (value) => {
    modalQty = Math.max(1, value);
    qtyValue.textContent = String(modalQty);
  };
  minusBtn.addEventListener("click", () => syncQty(modalQty - 1));
  plusBtn.addEventListener("click", () => syncQty(modalQty + 1));

  qtyControls.append(minusBtn, qtyValue, plusBtn);
  qtyRow.append(qtyLabel, qtyControls);

  // Add to cart
  const addBtn = document.createElement("button");
  addBtn.type = "button";
  addBtn.className = "btn btn--whatsapp btn--block";
  addBtn.textContent = t("addToCart");
  addBtn.addEventListener("click", () => {
    addToCart(modalProductId, modalQty);
    closeProductModal();
    openCart();
  });

  info.append(title, price, material, desc, qtyRow, addBtn);
  productModalBody.append(media, info);

  productModal.classList.add("is-open");
  productModal.setAttribute("aria-hidden", "false");
  document.body.classList.add("no-scroll");
}

function closeProductModal() {
  productModal.classList.remove("is-open");
  productModal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("no-scroll");
}

/* ---------- Cart drawer ---------- */
let lastCartCount = null;

function renderCart() {
  const count = cartCount();

  cartCountEls.forEach((el) => {
    el.textContent = String(count);
    // Bump the badge when the count grows (skip the very first paint)
    if (lastCartCount !== null && count > lastCartCount) {
      el.classList.remove("is-bump");
      // force reflow so the animation can restart
      void el.offsetWidth;
      el.classList.add("is-bump");
    }
  });
  lastCartCount = count;

  cartItemsEl.innerHTML = "";

  if (cart.length === 0) {
    cartEmptyEl.hidden = false;
    cartFooterEl.hidden = true;
    return;
  }

  cartEmptyEl.hidden = true;
  cartFooterEl.hidden = false;

  cart.forEach((item) => {
    const product = products.find((p) => p.id === item.id);
    if (!product) return;

    const row = document.createElement("li");
    row.className = "cart-item";

    const thumb = document.createElement("div");
    thumb.className = "cart-item__media";
    if (product.image) {
      const img = document.createElement("img");
      img.src = product.image;
      img.alt = loc(product.title);
      thumb.appendChild(img);
    }

    const meta = document.createElement("div");
    meta.className = "cart-item__meta";

    const name = document.createElement("p");
    name.className = "cart-item__name";
    name.textContent = loc(product.title);

    const unit = document.createElement("p");
    unit.className = "cart-item__unit";
    unit.textContent = product.price ? formatPrice(product.price) : "";

    const controls = document.createElement("div");
    controls.className = "qty qty--sm";

    const minusBtn = document.createElement("button");
    minusBtn.type = "button";
    minusBtn.className = "qty__btn";
    minusBtn.textContent = "−";
    minusBtn.setAttribute("aria-label", t("decrease"));
    minusBtn.addEventListener("click", () => setQty(item.id, item.qty - 1));

    const value = document.createElement("span");
    value.className = "qty__value";
    value.textContent = String(item.qty);

    const plusBtn = document.createElement("button");
    plusBtn.type = "button";
    plusBtn.className = "qty__btn";
    plusBtn.textContent = "+";
    plusBtn.setAttribute("aria-label", t("increase"));
    plusBtn.addEventListener("click", () => setQty(item.id, item.qty + 1));

    controls.append(minusBtn, value, plusBtn);
    meta.append(name, unit, controls);

    const right = document.createElement("div");
    right.className = "cart-item__right";

    const lineTotal = document.createElement("p");
    lineTotal.className = "cart-item__total";
    lineTotal.textContent = formatPrice(product.price * item.qty);

    const removeBtn = document.createElement("button");
    removeBtn.type = "button";
    removeBtn.className = "cart-item__remove";
    removeBtn.textContent = t("remove");
    removeBtn.addEventListener("click", () => removeFromCart(item.id));

    right.append(lineTotal, removeBtn);
    row.append(thumb, meta, right);
    cartItemsEl.appendChild(row);
  });

  cartTotalEl.textContent = formatPrice(cartTotal());
}

function openCart() {
  cartDrawer.classList.add("is-open");
  cartOverlay.classList.add("is-visible");
  cartDrawer.setAttribute("aria-hidden", "false");
  document.body.classList.add("no-scroll");
}

function closeCart() {
  cartDrawer.classList.remove("is-open");
  cartOverlay.classList.remove("is-visible");
  cartDrawer.setAttribute("aria-hidden", "true");
  document.body.classList.remove("no-scroll");
}

/* ---------- WhatsApp order flow ---------- */

// Build an absolute URL for a product image (works when hosted; falls back to the raw path).
function absoluteImageUrl(path) {
  try {
    return new URL(path, window.location.href).href;
  } catch (e) {
    return path;
  }
}

function getSelectedPayment() {
  const checked = document.querySelector('input[name="payment"]:checked');
  return checked ? checked.value : "";
}

function paymentLabel() {
  const method = getSelectedPayment();
  if (method === PAY_WALLET) return t("payWallet");
  if (method === PAY_COD) return t("payCod");
  return "—";
}

function setFieldError(errorEl, inputEl, message) {
  if (message) {
    errorEl.textContent = message;
    errorEl.hidden = false;
    if (inputEl) inputEl.classList.add("has-error");
  } else {
    errorEl.textContent = "";
    errorEl.hidden = true;
    if (inputEl) inputEl.classList.remove("has-error");
  }
}

// Validates checkout inputs. Returns true if valid.
function validateCheckout() {
  let valid = true;

  const name = custNameEl.value.trim();
  const phone = custPhoneEl.value.trim();
  const address = custAddressEl.value.trim();
  const payment = getSelectedPayment();

  if (!name) {
    setFieldError(nameErrorEl, custNameEl, t("errName"));
    valid = false;
  } else {
    setFieldError(nameErrorEl, custNameEl, "");
  }

  // Accept 8–15 digits (ignoring spaces, +, -, parentheses)
  const phoneDigits = phone.replace(/[^\d]/g, "");
  if (!phone || phoneDigits.length < 8 || phoneDigits.length > 15) {
    setFieldError(phoneErrorEl, custPhoneEl, t("errPhone"));
    valid = false;
  } else {
    setFieldError(phoneErrorEl, custPhoneEl, "");
  }

  if (!address) {
    setFieldError(addressErrorEl, custAddressEl, t("errAddress"));
    valid = false;
  } else {
    setFieldError(addressErrorEl, custAddressEl, "");
  }

  if (!payment) {
    paymentErrorEl.textContent = t("errPayment");
    paymentErrorEl.hidden = false;
    valid = false;
  } else {
    paymentErrorEl.textContent = "";
    paymentErrorEl.hidden = true;
  }

  if (!valid) {
    showToast(currentLang === "ar" ? "يرجى إكمال البيانات المطلوبة" : "Please complete the required fields");
  }

  return valid;
}

function buildCartMessage() {
  const name = custNameEl.value.trim();
  const phone = custPhoneEl.value.trim();
  const address = custAddressEl.value.trim();
  const payment = paymentLabel();

  const lines = [];
  lines.push(`${t("waNewOrder")} — ${t("brandName")}`);
  lines.push("");
  lines.push(`${t("waPayment")}: ${payment}`);
  lines.push(`${t("waName")}: ${name}`);
  lines.push(`${t("waPhoneLabel")}: ${phone}`);
  lines.push(`${t("waAddressLabel")}: ${address}`);
  lines.push("");
  lines.push(`${t("waItems")}:`);

  cart.forEach((item, index) => {
    const product = products.find((p) => p.id === item.id);
    if (!product) return;
    const subtotal = formatPrice(product.price * item.qty);
    lines.push(`${index + 1}. ${loc(product.title)}`);
    lines.push(`   ${t("waModel")}: ${loc(product.material)}`);
    lines.push(`   ${t("waImage")}: ${absoluteImageUrl(product.image)}`);
    lines.push(`   ${t("waDesc")}: ${loc(product.description)}`);
    lines.push(`   ${t("waQty")}: ${item.qty}`);
    lines.push(`   ${t("waSubtotal")}: ${subtotal}`);
  });

  lines.push("");
  lines.push(`${t("waGrandTotal")}: ${formatPrice(cartTotal())}`);
  return lines.join("\n");
}

function orderOnWhatsApp() {
  if (cart.length === 0) {
    showToast(t("emptyCartToast"));
    return;
  }
  if (!validateCheckout()) {
    return;
  }
  if (!WHATSAPP_NUMBER) {
    showToast(t("waNotSet"));
    console.warn("Set WHATSAPP_NUMBER in js/app.js to enable ordering.");
    return;
  }
  const message = buildCartMessage();
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank", "noopener");
}

/* ---------- Render products ---------- */
function renderProducts() {
  grid.innerHTML = "";

  if (!Array.isArray(products) || products.length === 0) {
    emptyState.hidden = false;
    return;
  }

  emptyState.hidden = true;
  const fragment = document.createDocumentFragment();
  products.forEach((product) => fragment.appendChild(createCard(product)));
  grid.appendChild(fragment);

  // Kick off scroll-reveal for the freshly rendered cards
  observeReveals();
}

/* ---------- Scroll-reveal (IntersectionObserver) ---------- */
let revealObserver = null;

function prefersReducedMotion() {
  return window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function observeReveals() {
  const items = grid.querySelectorAll(".reveal:not(.is-visible)");
  if (!items.length) return;

  // Graceful fallback: no support or reduced motion -> show immediately
  if (!("IntersectionObserver" in window) || prefersReducedMotion()) {
    items.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  if (!revealObserver) {
    revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target); // animate once
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
  }

  // Stagger the entrance for a smooth cascade
  items.forEach((el, i) => {
    el.style.transitionDelay = `${Math.min(i, 8) * 60}ms`;
    revealObserver.observe(el);
  });
}

/* ---------- i18n application ---------- */
function applyI18n() {
  const html = document.documentElement;
  html.setAttribute("lang", currentLang);
  html.setAttribute("dir", currentLang === "ar" ? "rtl" : "ltr");

  // Update static text via data-i18n
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    el.textContent = t(key);
  });

  // Update aria-labels via data-i18n-aria
  document.querySelectorAll("[data-i18n-aria]").forEach((el) => {
    const key = el.getAttribute("data-i18n-aria");
    el.setAttribute("aria-label", t(key));
  });

  // Update placeholders via data-i18n-ph
  document.querySelectorAll("[data-i18n-ph]").forEach((el) => {
    const key = el.getAttribute("data-i18n-ph");
    el.setAttribute("placeholder", t(key));
  });

  // Update language toggle active state
  document.querySelectorAll(".lang-toggle__btn").forEach((btn) => {
    btn.classList.toggle("is-active", btn.getAttribute("data-lang") === currentLang);
  });

  // Re-render dynamic content
  renderProducts();
  renderCart();
}

function setLang(lang) {
  if (lang !== "en" && lang !== "ar") return;
  currentLang = lang;
  try {
    localStorage.setItem("eltayeb_lang", lang);
  } catch (e) {
    /* ignore storage errors */
  }
  applyI18n();
}

/* ---------- Wire up global controls ---------- */
function initControls() {
  // Language toggle
  document.querySelectorAll(".lang-toggle__btn").forEach((btn) => {
    btn.addEventListener("click", () => setLang(btn.getAttribute("data-lang")));
  });

  // Open cart
  document.querySelectorAll("[data-open-cart]").forEach((btn) => {
    btn.addEventListener("click", openCart);
  });

  // Close cart
  const cartClose = document.getElementById("cart-close");
  if (cartClose) cartClose.addEventListener("click", closeCart);
  if (cartOverlay) cartOverlay.addEventListener("click", closeCart);

  // Close modal
  const modalClose = document.getElementById("product-modal-close");
  if (modalClose) modalClose.addEventListener("click", closeProductModal);
  if (productModal) {
    productModal.addEventListener("click", (e) => {
      if (e.target === productModal) closeProductModal();
    });
  }

  // Checkout
  if (checkoutBtn) checkoutBtn.addEventListener("click", orderOnWhatsApp);

  // Inject wallet numbers from config
  if (walletVodafoneEl) walletVodafoneEl.textContent = WALLET_VODAFONE;
  if (walletInstapayEl) walletInstapayEl.textContent = WALLET_INSTAPAY;

  // Show/hide wallet details based on selected payment method
  document.querySelectorAll('input[name="payment"]').forEach((radio) => {
    radio.addEventListener("change", () => {
      if (walletDetails) walletDetails.hidden = getSelectedPayment() !== PAY_WALLET;
      if (paymentErrorEl) {
        paymentErrorEl.hidden = true;
        paymentErrorEl.textContent = "";
      }
    });
  });

  // Clear field errors as the user types
  if (custNameEl) custNameEl.addEventListener("input", () => setFieldError(nameErrorEl, custNameEl, ""));
  if (custPhoneEl) custPhoneEl.addEventListener("input", () => setFieldError(phoneErrorEl, custPhoneEl, ""));
  if (custAddressEl) custAddressEl.addEventListener("input", () => setFieldError(addressErrorEl, custAddressEl, ""));

  // Mobile nav toggle
  if (navToggle && primaryNav) {
    navToggle.addEventListener("click", () => {
      const isOpen = primaryNav.classList.toggle("is-open");
      navToggle.classList.toggle("is-active", isOpen);
      navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
    // Close mobile nav when a link is tapped
    primaryNav.querySelectorAll(".nav__link").forEach((link) => {
      link.addEventListener("click", () => {
        primaryNav.classList.remove("is-open");
        navToggle.classList.remove("is-active");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // ESC to close
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      if (productModal.classList.contains("is-open")) closeProductModal();
      else if (cartDrawer.classList.contains("is-open")) closeCart();
    }
  });
}

/* ---------- Init ---------- */
renderProducts();
renderCart();
initControls();
applyI18n();






