<?php

include 'dbConfig.php';

$resultArray = array();
$response= new stdClass();
$response_msg = NULL;
$response -> isTaskSuccess=FALSE;

if(isset($_POST['user_email']) && isset($_POST['user_pass'])){
    $userEmail = $_POST['user_email'];
    $userPass = $_POST['user_pass'];
    $result=$dbConn->query("SELECT * FROM users WHERE user_email='$userEmail' AND user_pass='$userPass'");
    if($result && $result->num_rows > 0) {
        $isTaskSuccess = "true";
        while($row = mysqli_fetch_assoc($result)) {
            $resultArray[] = $row;
        }
    } else {
        $isTaskSuccess = "false";
        $response_msg = "The Credentials You Have Entered Are <b>Incorrect</b>. Please Try Again !";
    }
    
}
else{
    $isTaskSuccess = "false";
    $response_msg = "Incomplete data. Please provide both email and password.";    
}

$response->users = $resultArray;
$response->isTaskSuccess = $isTaskSuccess;
$response->response_msg = $response_msg;
echo(json_encode($response));
$dbConn->close();
?>