const menu_items = [
    {id: 1, name: 'Espresso', price: 2.50, category: 'Hot Drinks'},
    {id: 2, name: 'Americano', price: 3.00, category: 'Hot Drinks'},
    {id: 3, name: 'Cappuccino', price: 3.50, category: 'Hot Drinks'},
    {id: 4, name: 'Latte', price: 3.50, category: 'Hot Drinks'},
    {id: 5, name: 'Mocha', price: 4.00, category: 'Hot Drinks'},
    {id: 6, name: 'Hot Chocolate', price: 3.50, category: 'Hot Drinks'},
    {id: 7, name: 'Tea', price: 2.50, category: 'Hot Drinks'},
    {id: 8, name: 'Iced Coffee', price: 3.50, category: 'Cold Drinks'},
    {id: 9, name: 'Iced Latte', price: 4.00, category: 'Cold Drinks'},
    {id: 10, name: 'Frappuccino', price: 4.50, category: 'Cold Drinks'},
    {id: 11, name: 'Iced Tea', price: 3.00, category: 'Cold Drinks'},
    {id: 12, name: 'Lemonade', price: 3.00, category: 'Cold Drinks'},
    {id: 13, name: 'Croissant', price: 2.50, category: 'Pastries'},
    {id: 14, name: 'Muffin', price: 2.50, category: 'Pastries'},
    {id: 15, name: 'Danish Pastry', price: 3.00, category: 'Pastries'},
    {id: 16, name: 'Cinnamon Roll', price: 3.50, category: 'Pastries'},
    {id: 17, name: 'Ham & Cheese Sandwich', price: 5.50, category: 'Sandwiches'},
    {id: 18, name: 'Veggie Sandwich', price: 5.00, category: 'Sandwiches'},
    {id: 19, name: 'Turkey Club Sandwich', price: 6.00, category: 'Sandwiches'},
    {id: 20, name:'Grilled Chicken Panini',price :6.50 ,category:'Sandwiches'}
  ];
  
  function loadMenu() {
      showCategory('All');
  }
  

  function getCart() {
    return JSON.parse(localStorage.getItem('cart')) || [];
}

  function getItemQuantity(itemId) {
    const cart = getCart();
    const item = cart.find(i => i.id === itemId);
    return item ? item.quantity : 0;
}

  