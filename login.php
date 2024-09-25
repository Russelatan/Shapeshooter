<?php

    include("db.php");

    $username = $_POST['username'];
    $password = $_POST['password'];

    $find_account = mysqli_query($conn,"select player_name,player_pass from players where player_name = '$username'and player_pass = '$password'");
    
    if ($find_account->num_rows > 0) {
        // Data found
        mysqli_query($conn,"update players set status = 'inactive' where id > 0");
        while ($row = $find_account->fetch_assoc()) {
            if ($row["player_name"] === $username && $row["player_pass"]){
                mysqli_query($conn,"update players set status = 'active' where player_name = '$username'and player_pass = '$password'");
            }
            
        }

        
    }
    else{
        echo "invalid username and password";
    }

?>