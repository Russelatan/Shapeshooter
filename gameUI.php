<?php 

    include("db.php");

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
        <div id="highscoretxt" >
            <span>
                <b>
                    HIGHEST SCORE:
                </b>
            </span>
        </div>
        <div id="HIGHSCORE" >
            <span>
                <b>
                    <?php

                        $highscore = 0;
                        $highest = mysqli_query($conn,"select player_score from players");

                        if ($highest->num_rows > 0) {
                            // Data found
                            // $result = mysqli_query($conn,"select player_name from players where id > 0");
                            while ($row = $highest->fetch_assoc()) {
                                if ((int)$row['player_score'] > $highscore){
                                    $highscore = (int)$row['player_score'];
                                    
                                }
                                
                            }
                            mysqli_query($conn,"update highscore set high_score = '$highscore' where id = 1");


                            $gethighscore = mysqli_query($conn,"select high_score from highscore where id = 1");
                            if ($gethighscore->num_rows > 0) {
                                // Data found
                                // $result = mysqli_query($conn,"select player_name from players where id > 0");
                                while ($row = $gethighscore->fetch_assoc()) {
                                    echo (string)$row['high_score'];
                                    
                                }
                            }
                    
                            
                        }
                        else{
                            echo "0";
                        }

                    ?>
                </b>
            </span>
        </div>
        <div id="yourhighscoretxt" >
            <span>
                <b>
                    YOUR HIGHEST SCORE:
                </b>
            </span>
        </div>
        <div id="YOURHIGHSCORE" >
            <span>
                <b>
                    <?php

                        
                        $yourhighest = mysqli_query($conn,"select player_score from players where status = 'active'");

                        if ($yourhighest->num_rows > 0) {
                            // Data found
                            // $result = mysqli_query($conn,"select player_name from players where id > 0");
                            while ($row = $yourhighest->fetch_assoc()) {
                                echo (string)$row["player_score"];
                                
                            }                    
                            
                        }
                        else{
                            echo "0";
                        }

                    ?>
                </b>
            </span>
        </div>
        <div id="options" >
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
        <div id="HP" >
                <b>
                    HP:
                </b>
            </div>
        <div class="playerhpdiv" >
            <div class="playerhp" >

            </div>
        </div>
        <div id="scoretxt" >
            <span>
                <b>
                    SCORE:
                </b>
            </span>
        </div>
        <form id="SCOREDIV" action="score.php" method="post">
            <input type="hidden" id="scoreInput" name="score_form" value="0">
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