<?php
// Create connection
$conn = new mysqli("localhost", "root", "", "pos", 3307);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $category = $_POST['category'];
    $name = $_POST['name'];
    $price = $_POST['price'];
    $image = $_FILES['image']['name'];

    // Folder to upload images
    $target_dir = "uploads/";
    $target_file = $target_dir . basename($image);
    
    // Move the uploaded file to the desired folder
    if (move_uploaded_file($_FILES['image']['tmp_name'], $target_file)) {
        // Insert into database
        $sql = "INSERT INTO stock (category, name, price, image_path) VALUES ('$category', '$name', '$price', '$target_file')";

        if ($conn->query($sql) === TRUE) {
            echo "Product inserted successfully!";
        } else {
            echo "Error: " . $sql . "<br>" . $conn->error;
        }
    } else {
        echo "Error uploading image.";
    }
}

$conn->close();
?>
