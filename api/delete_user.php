
<?php

include 'dbConfig.php';
$id = $_POST['id'];
$resultArray = array();
$response= new stdClass();
$response_msg = NULL;

    $result = $dbConn->query("DELETE FROM users WHERE id=$id");
    if($result) {
        // Deletion was successful, proceed with fetching books
        // Fetch all books from the database
        $result = $dbConn->query("SELECT * FROM users");
        if($result && $result->num_rows > 0) {
            while($row = mysqli_fetch_assoc($result)) {
                $resultArray[] = $row;
            }
        }
    } else {
        // Handle deletion failure
        $response_msg = "Error deleting book: " . $dbConn->error;
    }

$response->users = $resultArray;
$response->response_msg = $response_msg;
echo(json_encode($response));
$dbConn->close();
?>


