<?php   

    include("db.php");

    $score = $_POST["score_form"];
    $highscore = 0;
    $highest = mysqli_query($conn,"select player_score from players where status = 'active'");

    if ($highest->num_rows > 0) {
        // Data found
        // $result = mysqli_query($conn,"select player_name from players where id > 0");
        while ($row = $highest->fetch_assoc()) {
            if ((int)$row['player_score'] < (int)$score && $score !== ""){
                mysqli_query($conn,"update players set player_score = '$score' where status = 'active'");
            }
            
        }

        echo $highscore;

        
    }

    if ($score !== ""){
        
    }

    




?>