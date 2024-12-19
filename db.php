<?php   

    $db_server = "localhost";
    $db_user = "root";
    $db_pass = '';
    $db_name = "shapeshooter_db";   
    
    try {
        $conn = new PDO("mysql:host=$db_server", $db_user, $db_pass);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    } catch (PDOException $e) {
        echo "Connection failed: " . $e->getMessage();
    }

    
    $conn->exec("CREATE DATABASE if not exists shapeshooter_db");
    $conn->exec("USE shapeshooter_db");
    $conn->exec("CREATE TABLE if not exists players (id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, ign VARCHAR(30), player_name VARCHAR(30), player_pass VARCHAR(255), player_score VARCHAR(10))");
    

    // $score = $_POST["score_form"];

?>