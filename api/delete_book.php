
<?php

include 'dbConfig.php';
$bookName = $_POST['book_name'];
$resultArray = array();
$response= new stdClass();
$response_msg = NULL;

    $result = $dbConn->query("DELETE FROM books WHERE book_name='$bookName'");
    if($result) {
        // Deletion was successful, proceed with fetching books
        // Fetch all books from the database
        $result = $dbConn->query("SELECT * FROM books");
        if($result && $result->num_rows > 0) {
            while($row = mysqli_fetch_assoc($result)) {
                $resultArray[] = $row;
            }
        }
    } else {
        // Handle deletion failure
        $response_msg = "Error deleting book: " . $dbConn->error;
    }

$response->books = $resultArray;
$response->response_msg = $response_msg;
echo(json_encode($response));
$dbConn->close();
?>
