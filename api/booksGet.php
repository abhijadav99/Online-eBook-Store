<?php

include 'dbConfig.php';

$resultArray = array();
$response= new stdClass();
$response_msg = NULL;

    $result = $dbConn->query("SELECT * FROM books");
    if($result && $result->num_rows > 0) {
        while($row = mysqli_fetch_assoc($result)) {
            $resultArray[] = $row;
        }
    }
   

$response->books = $resultArray;
$response->response_msg = $response_msg;
echo(json_encode($response));
?>