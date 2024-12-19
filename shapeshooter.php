<?php
    require "db.php";
    session_start();

    $stmt = $conn->prepare("SELECT player_name FROM players WHERE player_name = :player_name");
    if(isset($_SESSION["username"])){
        $player_name = $_SESSION["username"];
    }
    $stmt->bindParam(':player_name', $player_name);
    $stmt->execute();
    
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

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
                        <input type="text" class="signup_ign" name="ign" placeholder="Name" autocomplete="player_name" required>
                        <input type="text" class="signup_player_name" name="setplayer_name" placeholder="username" autocomplete="username" required>
                        <input type="password" class="signup_password" name="setpassword" placeholder="Password" autocomplete="current-password" required>
                        <input type="password" class="signup_confirm" name="setconfirm" placeholder="Confirm password" autocomplete="current-password" required>
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
                <form class="login_form" action="login.php" method="POST">
                    <div id="logintxt">
                        <i>
                            Login
                        </i>
                    </div>
                    <div id="login_div">
                        <input type="text" class="login_player_name" name="username" placeholder="username" autocomplete="username" required>
                        <input type="password" class="login_password" name="password" placeholder="Password" autocomplete="current-password" required>
                        <input type="submit" value="Login">
                    </div>
                </form>
                
                <div id="delete_and_createplayer">
                    <div class="createnewplayer">
                        <div id="playernamessquare">

                        </div>
                        <div id="createplayertxt">
                            <i>
                                Sign up
                            </i>
                        </div>
                    </div>
                    <div class="logout_div hide">
                        <div id="playernamessquare">

                        </div>
                        <div id="logouttxt">
                            <i>
                                Logout
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
        <div class="leaderboardUIbg">
            <div class="leaderboardUI">

            </div>
        </div>
        <div id="mainUI">
            <audio id="bgmMain" src="bgm/EnteringABlackHole.mp3"autoplay loop volume="1"></audio>
            <!-- <button id="settings">
                <img id="settingsicon" src="icons/settings.png">
            </button> -->
            <div class="menu_buttons">
                <button id="playerprofile">
                    <img id="pp1" src="icons/square.png">
                    <img id="pp2" src="icons/circle.png">
                    <img id="pp3" src="icons/triangle.png">
                    <i class="playername">
                        <?php
                            if (count($result) > 0) {
                                // Data found
                                foreach ($result as $row) {
                                    if ($row["player_name"] === $player_name) {
                                        echo htmlspecialchars($row['player_name']);
                                        break;
                                    }
                                }
                            } else {
                                echo "Guest";
                            }
                        ?>
                    </i>
                </button>
                <button class="leaderboard">
                    <img id="pp4" class="star"  src="icons/star.png">
                    
                    <i>Leaderboard</i>
                    
                </button>
            </div>
            <div class="response hide"></div>
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