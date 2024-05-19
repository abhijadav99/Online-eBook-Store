<?php
// Include database connection
include 'dbConfig.php';

// Retrieve user data from POST request
$id = $_POST['id'];
$username = $_POST['user_name'];
$email = $_POST['user_email'];

// Update user in the database
$sql = "UPDATE users SET user_name='$username', user_email='$email' WHERE id=$id";

if ($dbConn->query($sql) === TRUE) {
    echo "User updated successfully";
} else {
    echo "Error updating user: " . $dbConn->error;
}

$dbConn->close();
?>

