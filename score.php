<?php   

    require "db.php";
    session_start();

    header('Content-Type: application/json');

    $response = [
        'status' => 'error',
        'message' => 'An unexpected error occurred.',
    ];

    // Check if the user is logged in
    if (isset($_SESSION["username"])) {
        $player_name = $_SESSION["username"];
        $score = $_POST["score_form"] ?? 0;

        // Prepare and execute the query to get active player scores
        $stmt = $conn->prepare("SELECT player_score FROM players WHERE player_name = :player_name");
        $stmt->execute([":player_name" => $player_name]);
        $highestScores = $stmt->fetchAll(PDO::FETCH_ASSOC);

        if (!empty($highestScores)) {
            foreach ($highestScores as $row) {
                if ((int)$row['player_score'] < (int)$score && $score !== "") {
                    // Prepare and execute the update statement
                    $updateStmt = $conn->prepare("UPDATE players SET player_score = :score WHERE player_name = :player_name");
                    $updateStmt->execute([":player_name" => $player_name, ':score' => $score]);

                    $response = [
                        'status' => 'success',
                        'message' => 'Score updated successfully!',
                        'player_name' => $player_name,
                    ];
                    break;
                }
            }
        } else {
            $response['message'] = 'No scores found for the player.';
        }
    } else {
        $response['message'] = 'User not logged in.';
    }

    // Output the JSON response
    echo json_encode($response);
?>