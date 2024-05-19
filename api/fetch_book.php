<?php
// Include database connection
include 'dbConfig.php';

// Fetch books from database
$sql = "SELECT * FROM books";
$result = $dbConn->query($sql);

if ($result->num_rows > 0) {
    $books = [];
    while ($row = $result->fetch_assoc()) {
        $books[] = $row;
    }
    echo json_encode($books);
} else {
    echo json_encode([]);
}

$dbConn->close();
?>
