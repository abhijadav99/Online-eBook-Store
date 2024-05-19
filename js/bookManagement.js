let bookManageHandler = {};

bookManageHandler.bookName = document.getElementById("BOOKNAME");
bookManageHandler.authorName = document.getElementById("AUTHORNAME");
bookManageHandler.price = document.getElementById("PRICE");
bookManageHandler.description = document.getElementById("DETAILS");
bookManageHandler.bookImage = document.getElementById("IMAGE");
bookManageHandler.btnAddBook = document.getElementById("BTN_ADD_BOOK");
const booksList = document.getElementById("bookList");

document.addEventListener("DOMContentLoaded", function() {
  fetchBooks();
});

function fetchBooks() {
  fetch('http://localhost/api/fetch_book.php')
      .then(response => response.json())
      .then(data => {
          displayBooks(data);
      })
      .catch(error => console.error('Error fetching users:', error));
}

function displayBooks(books) {
  let booksList = document.getElementById('bookList');
  booksList.innerHTML = '';

  books.forEach(book => {
    const bookElement = document.createElement('div');
    bookElement.classList.add('abc');
    const bookDetails = document.createElement('div');
    bookDetails.classList.add('col-4');

    bookDetails.innerHTML = `

        <div id="books-container" class="small-container single-product">
        <div class="row">
            <div class="col-1">
                <img id="BOOK_IMG" src="${book.book_image}" alt="Book4" width="100%" />
            </div>
            <div class="col-2">
                <h1 id="BOOK_NAME">${book.book_name}</h1>
                <h1 id="AUTHOR_NAME">${book.author_name}</h1>
                <h4 id="BOOK_PRICE">Rs.${book.price}</h4>
                <p id="BOOK_DESCRIPTION"><b>Description</b>: ${book.description}</p>
            </div>
            <div style:="margin-left: 46px;">
            <button id="BTN_ADD_USER" class="btn_pink" onclick="editBook('${book.id}','${book.book_name}','${book.author_name}','${book.price}','${book.description}','${book.book_image}')">Edit</button>
            <button id="BTN_DELETE_USER" class="btn_pink" onclick="deleteBook('${book.book_name}')">Delete</button>
            </div>
        </div>
    </div>
    `;
    bookElement.appendChild(bookDetails);
    booksList.appendChild(bookElement);
});
}

function editBook(id,bookName,authorName,price,description,bookImage) {
  document.getElementById('editId').value = id;
  document.getElementById('editBookName').value = bookName;
    document.getElementById('editAuthorName').value = authorName;
    document.getElementById('editPrice').value = price;
    document.getElementById('editDescription').value = description;
    document.getElementById('editBookImage').value = bookImage;
    document.getElementById('editForm').style.display = 'block';
}
function cancelEdit() {
  document.getElementById('editForm').style.display = 'none';
}
function updateUser() {

  fetch('http://localhost/api/edit_book.php', {
      method: 'POST',
      headers: {"Content-type": "application/x-www-form-urlencoded; charset=UTF-8"},
      body: Object.entries({
        id: document.getElementById('editId').value,
        book_name: document.getElementById('editBookName').value,
        author_name: document.getElementById('editAuthorName').value,
        price: document.getElementById('editPrice').value,
        description: document.getElementById('editDescription').value,
        book_image: document.getElementById('editBookImage').value
    }).map(([k,v])=>{return k+'='+v}).join('&')
  })
  .then(response => response.text())
  .then(data => {
      console.log(data);
      fetchBooks(); // Refresh user list
      document.getElementById('editForm').style.display = 'none';
  })
  .catch(error => console.error('Error updating user:', error));
}

function deleteBook(bookName) {
  if (confirm('Are you sure you want to delete this user?')) {
    fetch('http://localhost/api/delete_book.php', {
      method: 'POST',
      headers: {"Content-type": "application/x-www-form-urlencoded; charset=UTF-8"},
      body: Object.entries({
          book_name : bookName         
      }).map(([k,v])=>{return k+'='+v}).join('&')
  
      
      }).then(response => response.json())
      .then(jsonResponse => {
          console.log(jsonResponse.books);
          fetchBooks(); // Refresh user list
      })
      .catch(error => console.error('Error deleting user:', error));
  }
}


bookManageHandler.validateInputs = () => {
  bookManageHandler.bookName.classList.remove('invalid_edittext');
  bookManageHandler.authorName.classList.remove('invalid_edittext');
  bookManageHandler.price.classList.remove('invalid_edittext');
  bookManageHandler.description.classList.remove('invalid_edittext');
  bookManageHandler.bookImage.classList.remove('invalid_edittext');



  if (bookManageHandler.bookName.value.length < 3) {
      bookManageHandler.bookName.classList.add('invalid_edittext');
      return false;
  }
  if (bookManageHandler.authorName.value.length < 3) {
    bookManageHandler.authorName.classList.add('invalid_edittext');
    return false;
}if (bookManageHandler.price.value.length < 1) {
  bookManageHandler.price.classList.add('invalid_edittext');
  return false;
}if (bookManageHandler.description.value.length < 3) {
  bookManageHandler.description.classList.add('invalid_edittext');
  return false;
}if (bookManageHandler.bookImage.value.length < 3) {
  bookManageHandler.bookImage.classList.add('invalid_edittext');
  return false;
}

  return true;
}

bookManageHandler.btnAddBook.addEventListener("click", (e) => {
if (bookManageHandler.validateInputs()) {
          fetch('http://localhost/api/adminAddNewBook.php', {
          method: 'POST',
          headers: {"Content-type": "application/x-www-form-urlencoded; charset=UTF-8"},
          body: Object.entries({
              book_image:"http://localhost/images/" + bookManageHandler.bookImage.value,
              book_name : bookManageHandler.bookName.value,
              author_name : bookManageHandler.authorName.value,
              price: bookManageHandler.price.value,
              description: bookManageHandler.description.value        
          }).map(([k,v])=>{return k+'='+v}).join('&')

          
          }).then(response => response.json())
          
          
          .then(jsonResponse => {
                  //redirect to dashboard
                  if (jsonResponse.isTaskSuccess == 'true') {
                    bookManageHandler.bookName.value = '';
                    bookManageHandler.authorName.value = '';
                    bookManageHandler.price.value= '';
                    bookManageHandler.description.value='';
                    bookManageHandler.bookImage.value='';
                    fetchBooks();
                  }
                  else{
                      throw new Error(jsonResponse.response_msg);
                  }
          }).catch(error => bookManageHandler.setAuthenticationError(error));
  }
});

bookManageHandler.setAuthenticationError = (error) => {
  alert(error);
}