<?php   

    $db_server = "localhost";
    $db_user = "root";
    $db_pass = '';
    $db_name = "shapeshooter_db";   
    

    try{
        $conn = mysqli_connect($db_server,$db_user,$db_pass);
    }
    catch(mysqli_sql_exception){
        echo "connection failed";
    }

    $sql = "show databases like '$db_name'";
    $result = mysqli_query($conn, $sql);

    // if (mysqli_num_rows($result) > 0) {
    //     // Output data of each row
    //     while($row = mysqli_fetch_assoc($result)) {
    //         echo "ID: " . $row["id"] . " - Name: " . $row["name"] . " - Email: " . $row["email"] . "<br>";
    //     }
    // } else {
    //     echo "0 results";
    // }

    if (mysqli_num_rows($result) > 0) {
        mysqli_query($conn, "use shapeshooter_db");

    } else {
        mysqli_query($conn, "create database shapeshooter_db");
        mysqli_query($conn, "use shapeshooter_db");
        mysqli_query($conn, "create table players (id int not null auto_increment primary key, player_name varchar(30), player_pass varchar(50),player_score varchar(10), status varchar(20))");
        mysqli_query($conn, "create table highscore (id int not null auto_increment primary key, high_score varchar(30))");
        mysqli_query($conn, "insert into highscore (`high_score`) values('0')");
    }

    // $score = $_POST["score_form"];




?>