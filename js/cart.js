let cartHandler = {};

cartHandler.btnProceedCheckout = document.getElementById("BTN_PROCEED_TO_CHECKOUT");
cartHandler.bookImage = document.getElementById("BOOK_IMG");
cartHandler.bookName = document.getElementById("BOOK_NAME");
cartHandler.bookPrice = document.getElementById("BOOK_PRICE");
cartHandler.btnAddToCart = document.getElementById("BTN_ADD_TO_CART");
cartHandler.bookPriceColumn = document.getElementById("BOOK_PRICE_COLOUMN");
cartHandler.subTotal = document.getElementById("subTotal");
cartHandler.total = document.getElementById("total");

//extract and generate get object passed from dashboard
cartHandler.book = Object.fromEntries(new URLSearchParams(window.location.search));

cartHandler.bookImage.src = cartHandler.book.book_image;
cartHandler.bookName.innerHTML = cartHandler.book.book_name;
cartHandler.bookPrice.innerHTML = "Rs." + cartHandler.book.price;
cartHandler.bookPriceColumn.innerHTML = cartHandler.book.price;
cartHandler.subTotal.innerHTML = "Rs." + cartHandler.book.price;
cartHandler.total.innerHTML = "Rs." + (Number(cartHandler.book.price) + 100);

// document.addEventListener('DOMContentLoaded', function() {
//     var quantityInput = document.querySelector('input[type="number"]');
//     quantityInput.addEventListener('change', function() {
//       calculateSubtotal(this);
//     });
//   });

function calculateSubtotal(input) {
    var quantity = parseInt(input.value);
    var perBookPrice = cartHandler.book.price;
    var subtotal = perBookPrice * quantity;
    cartHandler.bookPriceColumn.innerHTML = subtotal;
    updateTotal(subtotal);
  }
  
  function updateTotal(subtotal) {
    var tax = 100; // Tax amount
    var total = subtotal + tax;
    cartHandler.subTotal.innerHTML = "Rs." + subtotal;
    cartHandler.total.innerHTML = "Rs." + total;
  }

cartHandler.btnProceedCheckout.addEventListener("click", (e) => {
    window.location.href = '../html/checkout.html';
});





