<?php

include 'dbConfig.php';

$resultArray = array();
$response= new stdClass();
$response_msg = NULL;
$response -> isTaskSuccess=FALSE;

if(isset($_POST['book_name']) && isset($_POST['author_name'])){
    $bookName = $_POST['book_name'];
    $authorName = $_POST['author_name'];
    $price = $_POST['price'];
    $description = $_POST['description'];
    $bookImage = $_POST['book_image'];
    $result = $dbConn->query("SELECT * FROM books WHERE book_name='$bookName'");

    if ($result && $result->num_rows > 0) {
        $isTaskSuccess="false";
        $response_msg="It Looks Like You Are Already Registered With Us !.";
    } else {
        if ($dbConn->query("INSERT INTO books (book_name, author_name, price, description, book_image) VALUES('$bookName', '$authorName', '$price', '$description', '$bookImage')")) {
            
            $result = $dbConn->query("SELECT * FROM books WHERE book_name='$bookName'");
            while($row = mysqli_fetch_assoc($result)) {
                $resultArray[] = $row;
            }
            $isTaskSuccess="true";
        } else {
            $isTaskSuccess="false";
            $response_msg="Hmmm ! Book Creation Process Failed. Looks Like You Are Not Entering Valid Information, Please Try Again With Valid Details !";
        }
    }
}
$response->users = $resultArray;
$response->isTaskSuccess = $isTaskSuccess;
$response->response_msg = $response_msg;
echo(json_encode($response));
?>