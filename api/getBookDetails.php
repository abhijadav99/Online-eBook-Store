<?php

include 'dbConfig.php';

$resultArray = array();
$response= new stdClass();
$response_msg = NULL;
$response -> isTaskSuccess=FALSE;

   
    if(isset($_POST['book_name'])){
        $bookName = $_POST['book_name'];
        $result=$dbConn->query("SELECT * FROM books WHERE book_name='$bookName'");
        if($result && $result->num_rows > 0) {
            $isTaskSuccess = "true";
            while($row = mysqli_fetch_assoc($result)) {
                $resultArray[] = $row;
            }
        } 
        $dbConn->close();
    }

    $response->book = $resultArray;
    $response->isTaskSuccess = $isTaskSuccess;
    $response->response_msg = $response_msg;
    echo(json_encode($response));
?>