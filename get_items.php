<?php
// Create connection
$conn = new mysqli("localhost", "root", "", "pos", 3307);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$category = isset($_GET['category']) ? $_GET['category'] : null;

if ($category) {
    // Fetch items based on category
    $sql = "SELECT * FROM stock WHERE category = '$category'";
} else {
    // Fetch all items if no category is selected
    $sql = "SELECT * FROM stock";
}

$result = $conn->query($sql);

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        echo "<div class='itemCard'>
                <img src='" . $row['image_path'] . "' alt='" . $row['name'] . "'>
                <h4 class='itemName'>" . $row['name'] . "</h4>
                <p class='itemPrice'>" . $row['price'] . "</p>
              </div>";
    }
} else {
    echo "No items found.";
}

$conn->close();
?>
