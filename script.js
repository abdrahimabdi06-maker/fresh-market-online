let cart = [];
let totalItems = 0;
let totalPrice = 0;

window.addEventListener("load", () => {
  const chat = document.getElementById("chat");
  chat.innerHTML += `
    <p><b>Bot:</b> 👋 Hello! Welcome to Fresh Market Online.<br>
    I am your virtual assistant. You can ask about products, prices, or delivery.</p>
  `;
});


const prices = {
  "Mujair": 20000,
  "Mackerel": 30000,
  "Tuna": 22000,
  "Cockles": 25000,
  "Tilapia": 40000,
  "Beef": 120000,
  "Chicken": 30000,
  "Shrimp": 30000
};

function addToCart(product) {
  let item = cart.find(p => p.name === product);

  if (item) {
    item.qty++;
  } else {
    cart.push({ name: product, qty: 1, price: prices[product] });
  }

  updateCart();
}

function updateCart() {
  let cartList = document.getElementById("cartItems");
  let totalItemEl = document.getElementById("totalItems");
  let totalPriceEl = document.getElementById("totalPrice");

  cartList.innerHTML = "";
  totalItems = 0;
  totalPrice = 0;

  cart.forEach((item, index) => {
    totalItems += item.qty;
    totalPrice += item.qty * item.price;

    let li = document.createElement("li");
    li.innerHTML = `
      ${item.name} (Rp${formatRupiah(item.price)})
      <div>
        <button class="qty-btn" onclick="changeQty(${index}, -1)">−</button>
        ${item.qty}
        <button class="qty-btn" onclick="changeQty(${index}, 1)">+</button>
        <button class="remove-btn" onclick="removeItem(${index})">x</button>
      </div>
    `;
    cartList.appendChild(li);
  });

  totalItemEl.textContent = totalItems;
  totalPriceEl.textContent = formatRupiah(totalPrice);
}

function changeQty(index, amount) {
  cart[index].qty += amount;
  if (cart.length === 0) {
  cartList.innerHTML = "<p>Your cart is currently empty.</p>";
}

  if (cart[index].qty <= 0) {
    cart.splice(index, 1);
  }
  updateCart();
}

function removeItem(index) {
  cart.splice(index, 1);
  updateCart();
}

function clearCart() {
  if (confirm("Are you sure you want to clear your cart?")) {
    cart = [];
    updateCart();
  }
}


/* SEARCH */
function searchProduct() {
  let input = document.getElementById("searchInput").value.toLowerCase();
  let products = document.getElementsByClassName("product");

  for (let i = 0; i < products.length; i++) {
    let text = products[i].innerText.toLowerCase();
    products[i].style.display = text.includes(input) ? "" : "none";
  }
}

function formatRupiah(number) {
  return number.toLocaleString("id-ID");
}

/* CHATBOT */
function sendMessage() {
  let input = document.getElementById("userInput");
  let chat = document.getElementById("chat");
  let userText = input.value.trim();

  if (userText === "") return;

  chat.innerHTML += `<p><b>You:</b> ${userText}</p>`;

  let text = userText.toLowerCase();
  let reply = "";

  // GREETING
  if (text.includes("hello") || text.includes("hi")) {
    reply = "Hello! 😊 How can I help you today?";
  }

  // RECOMMENDATION
  else if (text.includes("recommend")) {
    reply = "I recommend Fresh Fish and Shrimp. They are popular and delivered fresh today.";
  }

  // PRODUCT QUESTIONS
  else if (
    text.includes("fish") ||
    text.includes("tuna") ||
    text.includes("mackerel") ||
    text.includes("tilapia")
  ) {
    reply = "We offer fresh fish such as tuna, mackerel, mujair, and tilapia, delivered daily from local markets.";
  }

  else if (text.includes("meat") || text.includes("beef") || text.includes("chicken")) {
    reply = "Our beef and chicken products are fresh, hygienic, and sourced from trusted local suppliers.";
  }

  else if (text.includes("shrimp") || text.includes("cockles")) {
    reply = "Seafood products like shrimp and cockles are delivered on the same day to ensure freshness.";
  }

  // PRICE
  else if (text.includes("price") || text.includes("cost")) {
    reply = "All product prices are listed on the product cards. Prices are calculated automatically in the cart.";
  }

  // DELIVERY
  else if (text.includes("delivery") || text.includes("shipping")) {
    reply = "We provide same-day delivery to maintain the freshness of all products.";
  }

  // PAYMENT
  else if (text.includes("payment")) {
    reply = "We support cash on delivery and digital payment methods.";
  }

  // THANK YOU
  else if (text.includes("thank")) {
    reply = "You're welcome! 😊 If you need anything else, feel free to ask.";
  }

  // DEFAULT
  else {
    reply = "I'm sorry, I didn't quite understand that. You can ask about products, prices, or delivery.";
  }

  // BOT TYPING EFFECT
  chat.innerHTML += `<p><b>Bot:</b> typing...</p>`;

  setTimeout(() => {
    chat.lastElementChild.innerHTML = `<b>Bot:</b> ${reply}`;
    chat.scrollTop = chat.scrollHeight;
  }, 600);

  input.value = "";
}


const products = document.querySelectorAll(".product");
const carts = document.querySelectorAll(".cart");

function handleScrollAnimation() {
  products.forEach((el, index) => {
    const rect = el.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    if (rect.top < windowHeight - 100 && rect.bottom > 100) {
      el.style.transitionDelay = `${index * 0.15}s`;
      el.classList.add("show");
    } else {
      el.classList.remove("show");
      el.style.transitionDelay = "0s";
    }
  });

  carts.forEach(el => {
    const rect = el.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    if (rect.top < windowHeight - 100) {
      el.classList.add("show");
    } else {
      el.classList.remove("show");
    }
  });
}

products.forEach(el => el.classList.add("fade-up"));
carts.forEach(el => el.classList.add("fade-up"));

window.addEventListener("scroll", handleScrollAnimation);
window.addEventListener("load", handleScrollAnimation);

const descriptions = {
  "Tuna": "Fresh tuna sourced directly from local fishermen. Rich in protein and omega-3, suitable for various cooking methods such as grilling and slicing.",

  "Mackerel": "High-quality mackerel delivered fresh from the local market. Known for its strong flavor and nutritional value, perfect for daily home cooking.",

  "Mujair": "Fresh mujair fish harvested from local freshwater farms. Clean, healthy, and ideal for frying or steaming.",

  "Cockles": "Fresh cockles carefully selected from coastal markets. Cleaned thoroughly and suitable for soups, stir-fry dishes, and traditional cuisine.",

  "Beef": "Premium beef cuts with guaranteed freshness. Sourced from trusted suppliers and suitable for various dishes such as steaks, soups, and stir-fries.",

  "Chicken": "Fresh whole chicken from local farms. Hygienically processed and rich in protein, suitable for daily cooking needs.",

  "Shrimp": "Fresh shrimp delivered on the same day to maintain taste and quality. Ideal for frying, grilling, or seafood dishes.",

  "Tilapia": "Fresh tilapia sourced from local fish farms. Mild in taste, nutritious, and suitable for grilling, frying, or steaming."
};

function openModal(product) {
  document.getElementById("modalTitle").textContent = product;
  document.getElementById("modalDesc").textContent = descriptions[product];
  document.getElementById("productModal").style.display = "flex";
}

function closeModal() {
  document.getElementById("productModal").style.display = "none";
}

function quickReply(type) {
  const chat = document.getElementById("chat");
  let reply = "";

  if (type === "products") {
    reply = "We offer fresh products such as tuna, mackerel, mujair, tilapia, beef, chicken, shrimp, and cockles.";
  } 
  else if (type === "delivery") {
    reply = "We provide same-day delivery to ensure all products remain fresh.";
  } 
  else if (type === "payment") {
    reply = "We support cash on delivery and digital payment methods.";
  } 
  else if (type === "support") {
    reply = "Our customer support is available to assist you anytime through this chat.";
  }

  chat.innerHTML += `<p><b>You:</b> ${type}</p>`;
  chat.innerHTML += `<p><b>Bot:</b> ${reply}</p>`;
  chat.scrollTop = chat.scrollHeight;
}
function checkout() {
  if (cart.length === 0) {
    alert("Your cart is empty.");
    return;
  }

  let summary = cart.map(
    item => `${item.name} x${item.qty}`
  ).join("\n");

  alert(
    "Order Summary:\n\n" +
    summary +
    "\n\nTotal: Rp " + formatRupiah(totalPrice) +
    "\n\n(This is a demo checkout)"
  );
}
function filterCategory(category) {
  const products = document.querySelectorAll(".product");

  products.forEach(p => {
    p.style.display =
      category === "all" || p.dataset.category === category
        ? ""
        : "none";
  });
}
