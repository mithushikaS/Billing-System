<?php
// Create connection
$conn = new mysqli("localhost", "root", "", "pos", 3307);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Fetch distinct categories
$sql = "SELECT DISTINCT category FROM stock";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        echo "<li>" . $row['category'] . "</li>";
    }
} else {
    echo "No categories found.";
}

$conn->close();
?>
