<?php

include 'dbConfig.php';

$resultArray = array();
$response= new stdClass();
$response_msg = NULL;
$response -> isTaskSuccess=FALSE;

if(isset($_POST['admin_email']) && isset($_POST['admin_pass'])){
    $adminEmail = $_POST['admin_email'];
    $adminPass = $_POST['admin_pass'];
    $result=$dbConn->query("SELECT * FROM admins WHERE admin_email='$adminEmail' AND admin_pass='$adminPass'");
    if($result && $result->num_rows > 0) {
        $isTaskSuccess = "true";
        while($row = mysqli_fetch_assoc($result)) {
            $resultArray[] = $row;
        }
    } else {
        $isTaskSuccess = "false";
        $response_msg = "The Credentials You Have Entered Are <b>Incorrect</b>. Please Try Again !";
    }
    $dbConn->close();
}
else{
    $response_msg = "Incomplete data. Please provide both email and password.";
    $isTaskSuccess = "false";
}
$response->admins = $resultArray;
$response->isTaskSuccess = $isTaskSuccess;
$response->response_msg = $response_msg;
echo(json_encode($response));
?>