<?php  

include 'dbConfig.php';

$userEmail=$_POST['user_email'];

$response= new stdClass();
$updateString="SET ";

if (isset($_POST['user_name'])) {
    $userName = mysqli_real_escape_string($dbConn,$_POST['user_name']);
    $updateString=$updateString."user_name='$userName',";
}

if (isset($_POST['user_pass'])) {
    $userPass = mysqli_real_escape_string($dbConn,$_POST['user_pass']);
    $updateString=$updateString."user_pass='$userPass',";
}



//prepare query string for SQL
$updateString=rtrim($updateString,",");


$isTaskSuccess=NULL;
$response_msg=NULL;
$userRow=NULL;

if($dbConn->query("UPDATE users $updateString WHERE user_email='$userEmail'")=== TRUE){
    
    $result = $dbConn->query("SELECT * FROM users WHERE user_email='$userEmail'");
    while($row = mysqli_fetch_assoc($result)) {
        $resultArray[] = $row;
    }
    $isTaskSuccess="true";
    $response_msg="Account Details have been Updated !!!";
}
else{
    $isTaskSuccess="false";
    $response_msg="Failed to Update Details , Contact Support !";
}

$response->users = $resultArray;
$response->isTaskSuccess = $isTaskSuccess;
$response->response_msg = $response_msg;
echo(json_encode($response));

$dbConn->close();

?>  