<?php 

    require "db.php";
    session_start();


    if(isset($_SESSION["username"])){
        $player_name = $_SESSION["username"];
    }
    else{
        $player_name = null;
    }

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="gameUI.css">
    <title>Document</title>
</head>
<body>
    <!-- <img id="game_bg" src="bg_images/game_background.jpg" alt=""> -->
    <header>
        <div id="highscoretxt">
            <span>
                <b>
                    HIGHEST SCORE:
                </b>
            </span>
        </div>
        <div id="HIGHSCORE">
            <span>
                <b>
                    <?php
                        $highscore = 0;

                        // Prepare and execute the query using PDO
                        $stmt = $conn->prepare("SELECT player_score FROM players");
                        $stmt->execute();
                        $highestScores = $stmt->fetchAll(PDO::FETCH_ASSOC);

                        if (count($highestScores) > 0) {
                            // Data found
                            foreach ($highestScores as $row) {
                                if ((int)$row['player_score'] > $highscore) {
                                    $highscore = (int)$row['player_score'];
                                }
                            }
                            echo (string)$highscore;
                        } else {
                            echo "0";
                        }
                    ?>
                </b>
            </span>
        </div>
        <div id="yourhighscoretxt">
            <span>
                <b>
                    YOUR HIGHEST SCORE:
                </b>
            </span>
        </div>
        <div id="YOURHIGHSCORE">
            <span>
                <b>
                    <?php
                        // Prepare and execute the query for active players
                        if ($player_name){
                            $stmt = $conn->prepare("SELECT player_score FROM players WHERE player_name = :player_name");
                            $stmt->execute([":player_name" => $player_name]);
                            $yourHighestScores = $stmt->fetchAll(PDO::FETCH_ASSOC);

                            if (count($yourHighestScores) > 0) {
                                // Data found
                                foreach ($yourHighestScores as $row) {
                                    echo (string)$row["player_score"];
                                }                    
                            } else {
                                echo "0";
                            }
                        }
                        else{
                            echo "0";
                        }
                    ?>
                </b>
            </span>
        </div>
        <div id="options">
            'P' -> Options
        </div>
    </header>
    <main>
        <audio id="gamemusic" src="bgm/OneCosmosRoyalty.mp3" autoplay loop volume="1"></audio>
        <div id="gameUI">
            <div id="player" class="player">
                
            </div>
        </div>
        <div id="gameoverUIbg">
            <div class="gameoverUI">
                <div id="gameover_newgame">
                    <div id="gameoversquare">

                    </div>
                    <div id="gameover/newgametxt">
                        <i>
                            New game
                        </i>
                    </div>
                </div>
                <div id="gameover_mainmenu">
                    <div id="gameoversquare">

                    </div>
                    <div id="gameover/mainmenutxt">
                        <i>
                            Main menu
                        </i>
                    </div>
                </div>
            </div>
        </div>
        <div id="pauseUI">
            <div class="pauseUI">
                <div id="continue">
                    <div id="pausesquare">

                    </div>
                    <div id="continuetxt">
                        <i>
                            Continue
                        </i>
                    </div>
                </div>
                <div id="newgame">
                    <div id="pausesquare">

                    </div>
                    <div id="newgametxt">
                        <i>
                            New game
                        </i>
                    </div>
                </div>
                <div id="mainmenu">
                    <div id="pausesquare">

                    </div>
                    <div id="mainmenutxt">
                        <i>
                            Main menu
                        </i>
                    </div>
                </div>
            </div>
        </div>
        <div id="newgameUIbg">
            <div id="newgameUI">
                <div id="newgametxt">
                    <p>
                        This will reset your score,<br>Start new game?
                    </p>
                </div>
                <div id="newgamebuttons">
                    <div id="yes">
                        <div id="buttonsquare">

                        </div>
                        <div id="newgamebtn">
                            <i>
                                Yes
                            </i>
                        </div>
                    </div>
                    <div id="no">
                        <div id="buttonsquare">

                        </div>
                        <div id="newgamebtn">
                            <i>
                                No
                            </i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
    <footer>
        <div id="HP">
            <b>
                HP:
            </b>
        </div>
        <div class="playerhpdiv">
            <div class="playerhp">

            </div>
        </div>
        <div id="scoretxt">
            <span>
                <b>
                    SCORE:
                </b>
            </span>
        </div>
        <form id="SCOREDIV" action="score.php" method="post">
            <input type="hidden" id="scoreInput" name="score_form" value=0>
            <span id="SCORE">
               <b>
                    0
               </b>
            </span>
        </form>
    </footer>
</body>
<script src="gameUI.js"></script>
</html>