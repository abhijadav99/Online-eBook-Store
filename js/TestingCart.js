function addToCart() {
  // Get book details
  var bookTitle = "Book Title";
  var author = "John Doe";
  var price = 19.99;

  // Create a cart item object
  var cartItem = {
    title: bookTitle,
    author: author,
    price: price,
    quantity: 1,
  };

  // Retrieve the cart from localStorage
  var cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Check if the book is already in the cart
  var existingCartItemIndex = cart.findIndex(item => item.title === bookTitle);

  if (existingCartItemIndex !== -1) {
    // If the book is already in the cart, increment the quantity
    cart[existingCartItemIndex].quantity++;
  } else {
    // If the book is not in the cart, add it to the cart
    cart.push(cartItem);
  }

  // Update the cart in localStorage
  localStorage.setItem("cart", JSON.stringify(cart));

  // Redirect to the cart page
  window.location.href = "cart.html";
}

function displayCartItems() {
  // Retrieve the cart from localStorage
  var cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Get the container to display cart items
  var cartContainer = document.getElementById("cartItems");

  // Clear previous content
  cartContainer.innerHTML = "";

  // Display each item in the cart
  cart.forEach(function(item) {
    var itemDiv = document.createElement("div");
    itemDiv.innerHTML = `<p>${item.title} - Quantity: ${item.quantity} - Price: $${item.price.toFixed(2)}</p>`;
    cartContainer.appendChild(itemDiv);
  });
}

// Call the function to display cart items when the cart page is loaded
if (window.location.href.includes("cart.html")) {
  displayCartItems();
}
