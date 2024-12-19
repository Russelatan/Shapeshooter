<?php

require "db.php";
session_start();

try {
    $ign = $_POST['ign'];
    $player_name = $_POST['setplayer_name'];
    $password = $_POST['setpassword'];
    $confirm = $_POST['setconfirm'];
    $hashed = password_hash($password, PASSWORD_DEFAULT);

    // Check if the player_name already exists
    $stmt = $conn->prepare("SELECT COUNT(*) FROM players WHERE player_name = :player_name");
    $stmt->bindParam(':player_name', $player_name);
    $stmt->execute();
    $userExists = $stmt->fetchColumn();

    if ($userExists > 0) {
        $response = [
            'status' => 'error',
            'message' => 'player_name already exists. Please choose another.'
        ];
    } else {
        if ($password === $confirm){
            // Insert the new player into the database
            $insertStmt = $conn->prepare("INSERT INTO players (`ign`, `player_name`, `player_pass`, `player_score`) VALUES (:ign, :player_name, :password, '0')");
            $insertStmt->bindParam(':ign', $ign);
            $insertStmt->bindParam(':player_name', $player_name);
            $insertStmt->bindParam(':password', $hashed);
            $insertStmt->execute();

            $response = [
                'status' => 'success',
                'message' => 'Account created successfully!',
            ];
        }
        else{
            $response = [
                'status' => 'error',
                'message' => 'Password and Confirm Password doesn\'t match',
            ];
        }
    }

    // Set JSON response header and return response
    header('Content-Type: application/json');
    echo json_encode($response);

} catch (PDOException $e) {
    // Handle database errors
    $response = [
        'status' => 'error',
        'message' => 'An error occurred: ' . $e->getMessage()
    ];
    header('Content-Type: application/json');
    echo json_encode($response);
}

?>
