<?php

    include("db.php");

    $username = $_POST['setusername'];
    $password = $_POST['setpassword'];
    $unique = 0;

    $check_unique = mysqli_query($conn,"select player_name from players");
    
    if ($check_unique->num_rows > 0) {
        // Data found
        while ($row = $check_unique->fetch_assoc()) {
            if ($row["player_name"] === $username){
                $unique++;
            }
            
        }

        if ($unique === 0){
            mysqli_query($conn,"insert into players (`player_name`,`player_pass`,`player_score`,`status`) values('$username','$password','0','inactive')");
            echo "added";
        }
        
    }
    else{
        mysqli_query($conn,"insert into players (`player_name`,`player_pass`,`player_score`,`status`) values('$username','$password','0','inactive')");
    }

?>