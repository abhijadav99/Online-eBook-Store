<?php

include 'dbConfig.php';

$action = $_POST['action'] ?? '';


$action = $_POST['action'] ?? '';

switch ($action) {
    case 'add':
        $username = $_POST['username'] ?? '';
        $permission = $_POST['permission'] ?? '';
        $stmt = $dbConn->prepare("INSERT INTO users1 (username, permission) VALUES ('$username', '$permission')");
        
        $stmt->execute();
        echo json_encode(['status' => 'success']);
        break;
    case 'delete':
        $username = $_POST['username'] ?? '';
        $stmt = $dbConn->prepare("DELETE FROM `users1` WHERE username = '$username'");
       
        $stmt->execute();
        echo json_encode(['status' => 'success']);
        break;
    case 'list':
        $sql = "SELECT id, username, permission FROM users1";
        $result = $dbConn->query($sql);
        $users = [];
        if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                $users[] = $row;
            }
        }
        echo json_encode($users);
        break;
    default:
        echo json_encode(['error' => 'Invalid action']);
}

$dbConn->close();
?>