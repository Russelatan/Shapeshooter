<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

    $db_server = getenv('DB_HOST') ?: "localhost"; // Fallback for local development
    $db_user = getenv('DB_USER') ?: "root"; // Fallback for local development
    $db_pass = getenv('DB_PASS') ?: ''; // Fallback for local development
    $db_name = getenv('DB_NAME') ?: "shapeshooter_db"; // Fallback for local development

    // Create connection
    $conn = mysqli_connect($db_server, $db_user, $db_pass);

    // Check connection
    if (!$conn) {
        die("Connection failed: " . mysqli_connect_error());
    }

    // Check if the database exists
    $sql = "SHOW DATABASES LIKE '$db_name'";
    $result = mysqli_query($conn, $sql);

    if (mysqli_num_rows($result) > 0) {
        mysqli_select_db($conn, $db_name);
    } else {
        // Create database and tables
        mysqli_query($conn, "CREATE DATABASE $db_name");
        mysqli_select_db($conn, $db_name);
        mysqli_query($conn, "CREATE TABLE players (id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, player_name VARCHAR(30), player_pass VARCHAR(50), player_score VARCHAR(10), status VARCHAR(20))");
        mysqli_query($conn, "CREATE TABLE highscore (id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, high_score VARCHAR(30))");
        mysqli_query($conn, "INSERT INTO highscore (`high_score`) VALUES('0')");
    }

    // Close the connection when done
    mysqli_close($conn);

    // $score = $_POST["score_form"];

?>