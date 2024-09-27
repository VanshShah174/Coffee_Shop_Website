function getCart() {
  const cartData = localStorage.getItem("cart");
  return cartData ? JSON.parse(cartData) : [];
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function initializeCartCount() {
  const cart = getCart();
  const count = cart.reduce((total, item) => total + item.quantity, 0);
  updateCartCountDisplay(count);
}

function updateCartCountDisplay(count) {
  const cartCountElement = document.getElementById("cartCount");
  if (cartCountElement) {
    cartCountElement.textContent = count;
  }
}

function addToCart(item) {
  const cart = getCart();
  const existingItem = cart.find((cartItem) => cartItem.name === item.name);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...item, quantity: 1 });
  }
  saveCart(cart);
  const newCount = cart.reduce((total, item) => total + item.quantity, 0);
  updateCartCountDisplay(newCount);
}

function updateCart() {
  const cart = getCart();
  const cartItemsContainer = document.getElementById("cartItems");
  cartItemsContainer.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price * item.quantity;
    const cartItem = document.createElement("div");
    cartItem.classList.add("cart-item");
    cartItem.innerHTML = `
            <div class='item-details'>
                <span class='item-name'>${item.name}</span>
                <span class='item-price'>$${(
                  item.price * item.quantity
                ).toFixed(2)}</span>
            </div>
            <div class='item-quantity'>
                <button class='quantity-btn decrease' data-index="${index}">-</button>
                <span>${item.quantity}</span>
                <button class='quantity-btn increase' data-index="${index}">+</button>
            </div>
            <button class='remove-btn' data-index="${index}">Remove</button>
        `;
    cartItemsContainer.appendChild(cartItem);
  });

  document.getElementById("cartTotal").textContent = `Total: $${total.toFixed(
    2
  )}`;
  const newCount = cart.reduce((total, item) => total + item.quantity, 0);
  updateCartCountDisplay(newCount);
}

function updateItemQuantity(index, change) {
  const cart = getCart();
  cart[index].quantity += change;
  if (cart[index].quantity < 1) {
    cart.splice(index, 1);
  }
  saveCart(cart);
  updateCart();
}

function removeItem(index) {
  const cart = getCart();
  cart.splice(index, 1);
  saveCart(cart);
  updateCart();
}

document.addEventListener("DOMContentLoaded", function () {
  initializeCartCount();
  updateCart();

  document.getElementById("cartItems").addEventListener("click", function (e) {
    if (e.target.classList.contains("decrease")) {
      updateItemQuantity(parseInt(e.target.dataset.index), -1);
    } else if (e.target.classList.contains("increase")) {
      updateItemQuantity(parseInt(e.target.dataset.index), 1);
    } else if (e.target.classList.contains("remove-btn")) {
      removeItem(parseInt(e.target.dataset.index));
    }
  });
});
