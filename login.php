<?php

    require "db.php";
    session_start();

    $player_name = $_POST['username'];
    $password = $_POST['password'];

    // Prepare and execute the query to find the account
    $stmt = $conn->prepare("SELECT * FROM players WHERE player_name = :player_name");
    $stmt->bindParam(':player_name', $player_name);
    $stmt->execute();
    $result = $stmt->fetch(PDO::FETCH_ASSOC); // Fetch the first matching record

    if ($result && password_verify($password, $result['player_pass'])) {

        $response = [
            'status' => 'success',
            'message' => 'Login successful!',
            'player_name' => $result['ign'],
        ];

        $_SESSION["username"] = $player_name;
    } else {
        $response = [
            'status' => 'failed',
            'message' => 'Invalid player_name or password',
            'player_name' => null
        ];
    }

    // Set JSON response header and return the response
    header('Content-Type: application/json');
    echo json_encode($response);
?>