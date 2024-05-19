<?php

include 'dbConfig.php';

$resultArray = array();
$response= new stdClass();
$response_msg = NULL;
$response -> isTaskSuccess=FALSE;

if(isset($_POST['user_email']) && isset($_POST['user_pass'])){
    $userName = $_POST['user_name'];
    $userEmail = $_POST['user_email'];
    $userPass = $_POST['user_pass'];
    $result = $dbConn->query("SELECT * FROM users WHERE user_email='$userEmail' OR user_name='$userName'");

    if ($result && $result->num_rows > 0) {
        $isTaskSuccess="false";
        $response_msg="It Looks Like You Are Already Registered With Us !.";
    } else {
        if ($dbConn->query("INSERT INTO users (user_name, user_email, user_pass) VALUES('$userName', '$userEmail', '$userPass')")) {
            
            $result = $dbConn->query("SELECT * FROM users WHERE user_email='$userEmail'");
            while($row = mysqli_fetch_assoc($result)) {
                $resultArray[] = $row;
            }
            $isTaskSuccess="true";
        } else {
            $isTaskSuccess="false";
            $response_msg="Hmmm ! Account Creation Process Failed. Looks Like You Are Not Entering Valid Information, Please Try Again With Valid Details !";
        }
    }
}
$response->users = $resultArray;
$response->isTaskSuccess = $isTaskSuccess;
$response->response_msg = $response_msg;
echo(json_encode($response));
?>