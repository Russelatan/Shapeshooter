<?php
    include("db.php");

    $result = mysqli_query($conn, "select player_name,status from players where status = 'active'");    

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="shapeshooter.css">
</head>
<body>
    <header>

    </header>
    <main>
        <div id="signupUIbg" >
            <div class="signupUI" >
                <form id="signup_UI" action="signup.php" method="POST">
                    <div id="signuptxt">
                            <i>
                                    Sign up
                            </i>
                    </div>
                    <div id="signup_div">
                        <input type="text" name="setusername" placeholder="Username" autocomplete="username" required>
                        <input type="password" name="setpassword" placeholder="Password" autocomplete="current-password" required>
                        <input type="submit" value="Sign up">
                    </div>
                </form>
                <div id="backdiv">
                    <div id="signup_back" >
                        <div id="playernamessquare">

                        </div>
                        <div id="backtxt">
                            <i>
                                Back
                            </i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div id="playernamesUIbg">
            <div class="playernamesUI">
                <form id="playernamelist_UI" action="login.php" method="POST">
                    <div id="logintxt">
                        <i>
                            Login
                        </i>
                    </div>
                    <div id="login_div">
                        <input type="text" name="username" placeholder="Username" autocomplete="username" required>
                        <input type="password" name="password" placeholder="Password" autocomplete="current-password" required>
                        <input type="submit" value="Login">
                    </div>
                </form>
                <div id="delete_and_createplayer">
                    <div id="createnewplayer" >
                        <div id="playernamessquare">

                        </div>
                        <div id="createplayertxt">
                            <i>
                                Sign up
                            </i>
                        </div>
                    </div>
                    <div id="create_delete_back" >
                        <div id="playernamessquare">

                        </div>
                        <div id="backtxt">
                            <i>
                                Back
                            </i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div id="mainUI">
            <audio id="bgmMain" src="bgm/EnteringABlackHole.mp3"autoplay loop volume="1"></audio>
            <!-- <button id="settings">
                <img id="settingsicon" src="icons/settings.png">
            </button> -->
            <button id="playerprofile">
                <img id="pp1" src="icons/square.png">
                <img id="pp2" src="icons/circle.png">
                <img id="pp3" src="icons/triangle.png">
                <i>
                    <?php
                        if ($result->num_rows > 0) {
                            // Data found
                            // $result = mysqli_query($conn,"select player_name from players where id > 0");
                            while ($row = $result->fetch_assoc()) {
                                if ($row["status"] === "active"){
                                    echo (string)$row['player_name'];
                                    break;
                                }
                                
                            }
                    
                            
                        }
                        else{
                            echo "Guest";
                        }
                    ?>
                </i>
            </button>
            <div id="title">
                <i>
                    SHAPE SHOOTER
                </i>
            </div>
            <div id="style1">
                <div id="circle">

                </div>
                <div id="square">

                </div>
                <div id="triangle">

                </div>
            </div>
            <div id="style2">
                <div id="circle">

                </div>
                <div id="square">

                </div>
                <div id="triangle">

                </div>
            </div>
            <button id="start">
                <div id="buttonsquare">

                </div>
                <div id="italicstart">
                    <i>
                        Start
                    </i>
                </div>
            </button>
        </div>

    </main>
    <footer>

    </footer>
    <script src="shapeshooter.js"></script>
</body>
</html>