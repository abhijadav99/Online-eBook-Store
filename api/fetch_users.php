<?php
// Include database connection
include 'dbConfig.php';

// Fetch users from database
$sql = "SELECT * FROM users";
$result = $dbConn->query($sql);

if ($result->num_rows > 0) {
    $users = [];
    while ($row = $result->fetch_assoc()) {
        $users[] = $row;
    }
    echo json_encode($users);
} else {
    echo json_encode([]);
}

$dbConn->close();
?>
