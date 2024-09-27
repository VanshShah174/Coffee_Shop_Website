const menu_items = [
  { id: 1, name: "Espresso", price: 2.5, category: "Hot Drinks" },
  { id: 2, name: "Americano", price: 3.0, category: "Hot Drinks" },
  { id: 3, name: "Cappuccino", price: 3.5, category: "Hot Drinks" },
  { id: 4, name: "Latte", price: 3.5, category: "Hot Drinks" },
  { id: 5, name: "Mocha", price: 4.0, category: "Hot Drinks" },
  { id: 6, name: "Hot Chocolate", price: 3.5, category: "Hot Drinks" },
  { id: 7, name: "Tea", price: 2.5, category: "Hot Drinks" },
  { id: 8, name: "Iced Coffee", price: 3.5, category: "Cold Drinks" },
  { id: 9, name: "Iced Latte", price: 4.0, category: "Cold Drinks" },
  { id: 10, name: "Frappuccino", price: 4.5, category: "Cold Drinks" },
  { id: 11, name: "Iced Tea", price: 3.0, category: "Cold Drinks" },
  { id: 12, name: "Lemonade", price: 3.0, category: "Cold Drinks" },
  { id: 13, name: "Croissant", price: 2.5, category: "Pastries" },
  { id: 14, name: "Muffin", price: 2.5, category: "Pastries" },
  { id: 15, name: "Danish Pastry", price: 3.0, category: "Pastries" },
  { id: 16, name: "Cinnamon Roll", price: 3.5, category: "Pastries" },
  { id: 17, name: "Ham & Cheese Sandwich", price: 5.5, category: "Sandwiches" },
  { id: 18, name: "Veggie Sandwich", price: 5.0, category: "Sandwiches" },
  { id: 19, name: "Turkey Club Sandwich", price: 6.0, category: "Sandwiches" },
  {
    id: 20,
    name: "Grilled Chicken Panini",
    price: 6.5,
    category: "Sandwiches",
  },
];

function loadMenu() {
  showCategory("All");
}

function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

// Function to save the cart to local storage
function saveCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
}

// Function to update the cart count in the UI
function updateCartCount() {
  const cart = getCart();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  document.getElementById('cartCount').textContent = totalItems;
}

function getItemQuantity(itemId) {
  const cart = getCart();
  const item = cart.find((i) => i.id === itemId);
  return item ? item.quantity : 0;
}

 // Function to check if a user is logged in
 function isUserLoggedIn() {
  return JSON.parse(localStorage.getItem('currentUser')) !== null;
}

function showCategory(category) {
  const menuContainer = document.getElementById("menuItems");
  menuContainer.innerHTML = "";

  // Filter items by category or show all if 'All' is selected
  const items =
    category === "All"
      ? menu_items
      : menu_items.filter((item) => item.category === category);

  // Create and append menu item elements
  items.forEach((item) => {
    const menuItem = document.createElement("div");
    menuItem.className = "menu-item";
    menuItem.innerHTML = `
          <h4>${item.name}</h4>
          <p>$${item.price.toFixed(2)}</p>
          <div class="item-controls">
              <button onclick="attemptModifyCart(${
                item.id
              }, 'decrement')">-</button>
              <span id="quantity-${item.id}">${getItemQuantity(item.id)}</span>
              <button onclick="attemptModifyCart(${
                item.id
              }, 'increment')">+</button>
          </div>
      `;
    menuContainer.appendChild(menuItem);
  });
}

document.addEventListener("DOMContentLoaded", function () {
  loadMenu();
  updateCartCount();
});
