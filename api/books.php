<?php
// Database connection parameters
$servername = "localhost";
$username = "username"; // Your MySQL username
$password = "password"; // Your MySQL password
$database = "books_database"; // Your MySQL database name

// Connect to MySQL database
$conn = new mysqli($servername, $username, $password, $database);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Check the request method
$request_method = $_SERVER['REQUEST_METHOD'];

// Function to sanitize input data
// function sanitize_input($data) {
//     $data = trim($data);
//     $data = stripslashes($data);
//     $data = htmlspecialchars($data);
//     return $data;
// }

// Handle POST request to add a new book
// if ($request_method == 'POST') {
//     $book_name = sanitize_input($_POST['book_name']);
//     $author_name = sanitize_input($_POST['author_name']);
//     $price = sanitize_input($_POST['price']);
//     $description = sanitize_input($_POST['description']);
//     // Image handling
//     $target_dir = "uploads/";
//     $target_file = $target_dir . basename($_FILES["image"]["name"]);
//     move_uploaded_file($_FILES["image"]["tmp_name"], $target_file);

//     // Insert data into the database
//     $sql = "INSERT INTO books (book_name, author_name, price, description, image) VALUES ('$book_name', '$author_name', '$price', '$description', '$target_file')";

//     if ($conn->query($sql) === TRUE) {
//         echo "New book added successfully";
//     } else {
//         echo "Error: " . $sql . "<br>" . $conn->error;
//     }
// }

// Handle GET request to fetch all books
if ($request_method == 'GET') {
    // Fetch all books from the database
    $sql = "SELECT * FROM books";
    $result = $conn->query($sql);

    $books = array();
    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $books[] = $row;
        }
    }

    header('Content-Type: application/json');
    echo json_encode($books);
}

// Close database connection
$conn->close();
?>
