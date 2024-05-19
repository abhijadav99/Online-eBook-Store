// const booksContainer = document.getElementById("books-container");

// const addToCartBtn = document.getElementById("btnAddToCart");

document.addEventListener("DOMContentLoaded", () => {
    const booksList = document.getElementById("books-container");
    // Fetch data from API
    fetch('http://localhost/api/booksGet.php')
        .then(response => response.json())

        .then(jsonResponse => {
            jsonResponse.books.forEach(book => {
                const bookElement = document.createElement('div');
                const bookDetails = document.createElement('div');
                bookDetails.classList.add('col-4');
                const bookImage = document.createElement('img');
                bookImage.src = book.book_image;
                bookElement.appendChild(bookImage);
                bookDetails.innerHTML = `

                    <a><h4>${book.book_name}</h4> </a>
                    <p class="test">Rs.${book.price}</p>
                    <button id="btnAddToCart" class="btn_pink margin_top" herf="../html/book-detail.html">Add to Cart</button>
                `;
                // <p><h3>Details:</h3> ${book.description}</p>
                bookElement.appendChild(bookDetails);
                // const addToCart = document.createElement('button');
                // addToCart.classList.add('btn_pink');
                // addToCart.classList.add('margin_top');
                // addToCart.innerHTML = 'Add To Cart';
                // bookElement.appendChild(addToCart);
                booksList.appendChild(bookElement);
                //click on div and redirect to course details
                bookElement.addEventListener("click", (e) => {
                    //Redirect To Course Content Page
                    window.location.href = `bookDetail.html?${new URLSearchParams(book).toString()}`;
                });
            });
        })

});

// addToCartBtn.addEventListener("click", (e) => {
//     window.location.href = '../html/book-details.html';
// });