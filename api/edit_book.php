<?php
// Include database connection
include 'dbConfig.php';

$response = new stdClass();

if(isset($_POST['book_name'], $_POST['author_name'], $_POST['price'], $_POST['description'], $_POST['book_image'])) {
    // Retrieve book data from POST request
    $id = $_POST['id'];
    $bookName = $_POST['book_name'];
    $authorName = $_POST['author_name'];
    $price = $_POST['price'];
    $description = $_POST['description'];
    $bookImage = $_POST['book_image'];

    // Prepare and execute UPDATE statement
    $sql = "UPDATE books SET book_name='$bookName', author_name='$authorName', price='$price', description='$description', book_image='$bookImage' WHERE id=$id";

    if($dbConn->query($sql) === TRUE) {
        $response->message = "Book updated successfully";
    } else {
        $response->message = "Error updating book: " . $dbConn->error;
    }
} else {
    $response->message = "Required data not provided";
}

echo json_encode($response);

$dbConn->close();
?>
