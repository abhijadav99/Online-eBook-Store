let bookHandler = {};

bookHandler.bookImage = document.getElementById("BOOK_IMG");
bookHandler.bookName = document.getElementById("BOOK_NAME");
bookHandler.bookDescription = document.getElementById("BOOK_DESCRIPTION");
bookHandler.bookPrice = document.getElementById("BOOK_PRICE");
bookHandler.btnAddToCart = document.getElementById("BTN_ADD_TO_CART");
//extract and generate get object passed from dashboard
bookHandler.book = Object.fromEntries(new URLSearchParams(window.location.search));



//Set Image For Course
bookHandler.bookImage.src = bookHandler.book.book_image;
bookHandler.bookName.innerHTML = bookHandler.book.book_name;
bookHandler.bookDescription.innerHTML = bookHandler.book.description;
bookHandler.bookPrice.innerHTML = bookHandler.book.price;

bookHandler.btnAddToCart.addEventListener("click",(e)=>{
    //Redirect To Course Content Page
    window.location.href = `cart.html?${new URLSearchParams(bookHandler.book).toString()}`;
});