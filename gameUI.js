


const pause = document.querySelector("#pauseicon"),
    continues = document.querySelector("#continue"),
    newgame = document.querySelector("#newgame"),
    newgamebtn = document.querySelector("#newgamebuttons"),
    newgameYes = document.querySelector("#yes"),
    newgameNo = document.querySelector("#no"),
    mainmenu = document.querySelector("#mainmenu"),
    gamemusic = document.querySelector("#gamemusic"),
    gameover_newgame = document.querySelector("#gameover_newgame"),
    gameover_mainmenu = document.querySelector("#gameover_mainmenu"),
    score_form = document.querySelector("#SCOREDIV"),
    


    gameUI = document.querySelector("#gameUI"),
    pauseUIbg = document.querySelector("#pauseUI"),
    pauseUI = document.querySelector(".pauseUI"),
    newgameUI = document.querySelector("#newgameUI"),
    newgameUIbg = document.querySelector("#newgameUIbg"),
    gameoverUIbg = document.querySelector("#gameoverUIbg"),
    gameoverUI = document.querySelector(".gameoverUI");


function changeUI(UIout,UIin,bool = false){

    UIinchildren = UIin.children;
    UIoutchildren = UIout.children;

    if (bool === false){
        UIout.style.opacity = "0";
        UIout.style.zIndex = "-1";

        UIin.style.opacity = "1";
        UIin.style.zIndex = "1";
    }
    else if (bool === true){
        
        UIout.style.opacity = "1";
        UIout.style.zIndex = "1";
        
        UIin.style.opacity = "1";
        UIin.style.zIndex = "2";
    }
    else {
        
        UIin.style.opacity = "1";
        UIin.style.zIndex = "1";

        for (const element of UIoutchildren){
            element.style.zIndex = "-1";
            // element.style.opacity = "0";
        }
        UIout.style.zIndex = "-1";
    
    }

    
    
}

function buttonhover(buttondiv,mousebehavior){
    
    let buttonchild = buttondiv.children;

    if (mousebehavior === "mouseenter"){
        buttonchild[0].style.borderRadius = "100%";
        buttonchild[0].style.border = "solid #00FF0A 3px";
        buttonchild[0].style.boxShadow = "0px 0px 10px #00FF0A";

        buttonchild[1].style.background = "linear-gradient(to right, #00FF0A, #0057FF)";
        buttonchild[1].style.webkitBackgroundClip = "text";
        buttonchild[1].style.color = "transparent";
    }
    else{
        buttonchild[0].style.borderRadius = "0%";
        buttonchild[0].style.border = "solid 3px #00D1FF";
        buttonchild[0].style.boxShadow = "none";

        buttonchild[1].style.background = "linear-gradient(to right, #13FFE3, #0057FF)";
        buttonchild[1].style.webkitBackgroundClip = "text";
        buttonchild[1].style.color = "transparent";
    }

}

function replaceWindow(currentUI,href){

    currentUI.style.opacity = "0";

    setTimeout(() => {
        window.location.replace(href);
    }, 300);
}

let mouseenter = "mouseenter",
    mouseleave = "mouseleave",
    mouseclick = "click";

document.addEventListener("keydown", (event) => {
    event.preventDefault();

    if (event.key === "p" || event.key === "P"){
        changeUI(gameUI,pauseUIbg,true);
        // stopgame = true;
    }
    
});

continues.addEventListener(mouseenter,() => {
    buttonhover(continues,mouseenter)
});

continues.addEventListener(mouseleave,() => {
    buttonhover(continues,mouseleave)
});

continues.addEventListener("click", () => {
    changeUI(pauseUIbg,gameUI,null);
    // stopgame = false;
});

newgame.addEventListener(mouseenter,() => {
    buttonhover(newgame,mouseenter)
});

newgame.addEventListener(mouseleave,() => {
    buttonhover(newgame,mouseleave)
});

newgame.addEventListener(mouseclick,() => {
    changeUI(pauseUIbg,newgameUIbg);

    yes.addEventListener(mouseclick,() => {
        replaceWindow(gameUI,"gameUI.php");
    });
    no.addEventListener(mouseclick,() => {
        changeUI(newgameUIbg,gameUI);
    });
    
});

yes.addEventListener(mouseenter,() => {
    buttonhover(yes,mouseenter)
});

yes.addEventListener(mouseleave,() => {
    buttonhover(yes,mouseleave)
});


no.addEventListener(mouseenter,() => {
    buttonhover(no,mouseenter)
});

no.addEventListener(mouseleave,() => {
    buttonhover(no,mouseleave)
});

mainmenu.addEventListener(mouseenter,() => {
    buttonhover(mainmenu,mouseenter)
});

mainmenu.addEventListener(mouseleave,() => {
    buttonhover(mainmenu,mouseleave)
});

mainmenu.addEventListener(mouseclick,() => {

    replaceWindow(gameUI,"shapeshooter.php");
    
});


gameover_newgame.addEventListener(mouseenter,() => {
    buttonhover(gameover_newgame,mouseenter)
});

gameover_newgame.addEventListener(mouseleave,() => {
    buttonhover(gameover_newgame,mouseleave)
});

gameover_newgame.addEventListener(mouseclick,() => {
    replaceWindow(gameUI,"gameUI.php");
    
});


gameover_mainmenu.addEventListener(mouseenter,() => {
    buttonhover(gameover_mainmenu,mouseenter)
});

gameover_mainmenu.addEventListener(mouseleave,() => {
    buttonhover(gameover_mainmenu,mouseleave)
});

gameover_mainmenu.addEventListener(mouseclick,() => {
    replaceWindow(gameUI,"shapeshooter.php");
    
});
// var box = document.createElement("div");
//     box.id = "box",
//     gameUI.appendChild(box);



const mainmusic = "bgm\EnteringABlackHole.mp3",
    ingamemusic = "bgm\OneCosmosRoyalty.mp3";







let square = "icons/square.png",
    circle = "icons/circle.png",
    triangle = "icons/triangle.png";

let shapes = [square,circle,triangle]

var numdex = null;

var player = document.querySelector('#player'),
    score = 0
    playerhp = document.querySelector(".playerhp"),
    scorediv = document.querySelector("#SCORE"),
    scoreInput = document.getElementById('scoreInput'),
    
    game = gameUI,
    bulletpoint = document.querySelector("#bulletpoint"),
    ebulletsi = [],
    bullets = [],
    enemies = [],
    gameoffsetheight = game.offsetHeight,
    gameoffsetwidth = game.offsetWidth,
    scorediv.style.top = "89.5%",
    scorediv.style.left = "57%",
    
    hp = 20.0,
    hp_gain = 0,
    hp_gain_switch = false,
    stopgame = false,
    speed = 7;



player.style.top = (gameoffsetheight / 2) + 'px';
player.style.left = 300 + 'px';
playerhp.style.width = "400px"

let enemycount = 500;
let spawnspeed = 3000;
let shapecount = null;

function spawnEnemySquare() {
    var enemy = document.createElement('img');
    enemy.className = "enemy";
    enemy.src = square
    topy = Math.floor(Math.random() * (gameoffsetheight - 60));
    if (topy >= gameoffsetheight - 30){
        
        enemy.style.top = topy - 50 + 'px';
    }
    else{
        enemy.style.top = topy + 'px';
    }
    
    enemy.style.left = gameoffsetwidth + 30 + 'px';
    game.appendChild(enemy);

    // Create an enemy object and push it to the 'enemies' array
    let enemyObj = {
        el: enemy,
        shape: "square",
        ex: parseInt(enemy.style.left.replace("px", "")),
        ey: parseInt(enemy.style.top.replace("px", "")),
        ebullets: [],
        createbullet: null,
        enemyspeed: 3,
        enemybulletspeed: 7
        
    };

    enemyObj.createbullet = setInterval(() => {
        // Create an enemy bullet
        var enemybullet = document.createElement('div');
        enemybullet.className = 'enemybullet';
        enemybullet.style.top = (parseInt(enemy.style.top.replace("px", "")) + 12) + 'px';
        enemybullet.style.left = (parseInt(enemy.style.left.replace("px", "")) + 12) + 'px';

        game.appendChild(enemybullet);

        enemyObj.ebullets.push({
            ebullet: enemybullet,
            x: gameoffsetwidth
        });
    }, 1800);

    enemies.push(enemyObj);
}

function spawnEnemyCircle() {
    var enemy = document.createElement('img');
    enemy.className = 'enemy';
    enemy.src = circle
    topy = Math.floor(Math.random() * (gameoffsetheight - 60));
    if (topy >= gameoffsetheight - 30){
        enemy.style.top = topy - 50 + 'px';
    }
    else{
        enemy.style.top = topy + 30 + 'px';
    }
    enemy.style.left = gameoffsetwidth + 30 + 'px';
    game.appendChild(enemy);

    // Create an enemy object and push it to the 'enemies' array
    let enemyObj = {
        el: enemy,
        shape: "circle",
        ex: parseInt(enemy.style.left.replace("px", "")),
        ey: parseInt(enemy.style.top.replace("px", "")),
        ebullets: [],
        createbullet: null,
        enemyspeed: 4,
        enemybulletspeed: 8
    };

    enemyObj.createbullet = setInterval(() => {
        // Create an enemy bullet
        var enemybullet = document.createElement('div');
        enemybullet.className = 'enemybullet';
        enemybullet.style.top = (parseInt(enemy.style.top.replace("px", "")) + 12) + 'px';
        enemybullet.style.left = (parseInt(enemy.style.left.replace("px", "")) + 12) + 'px';

        game.appendChild(enemybullet);

        enemyObj.ebullets.push({
            ebullet: enemybullet,
            x: gameoffsetwidth
        });
    }, 1500);

    enemies.push(enemyObj);
}

function spawnEnemyTriangle() {
    var enemy = document.createElement('img');
    enemy.className = 'enemy';
    enemy.style.transform = "rotateZ(30deg)";
    enemy.src = triangle
    topy = Math.floor(Math.random() * (gameoffsetheight - 60));
    if (topy >= gameoffsetheight - 30){
        enemy.style.top = topy - 30 + 'px';
    }
    else{
        enemy.style.top = topy + 'px';
    }
    enemy.style.left = gameoffsetwidth + 50 + 'px';
    game.appendChild(enemy);

    // Create an enemy object and push it to the 'enemies' array
    let enemyObj = {
        el: enemy,
        shape: "triangle",
        ex: parseInt(enemy.style.left.replace("px", "")),
        ey: parseInt(enemy.style.top.replace("px", "")),
        ebullets: [],
        createbullet: null,
        enemyspeed: 6,
        enemybulletspeed: 10
    };

    enemyObj.createbullet = setInterval(() => {
        // Create an enemy bullet
        var enemybullet = document.createElement('div');
        enemybullet.className = 'enemybullet';
        enemybullet.style.top = (parseInt(enemy.style.top.replace("px", "")) + 12) + 'px';
        enemybullet.style.left = (parseInt(enemy.style.left.replace("px", "")) + 12) + 'px';

        game.appendChild(enemybullet);

        enemyObj.ebullets.push({
            ebullet: enemybullet,
            x: gameoffsetwidth
        });
    }, 1000);

    enemies.push(enemyObj);
}



function HP_decay(){
    
    
    hp = hp - 0.25;
    playerhp.style.width = parseInt(playerhp.style.width) - 5 + "px"
    console.log(`hp: ${hp}  divhp: ${parseInt(playerhp.style.width)}`)

    if (hp_gain === 3 && hp <= 18.0 && hp > 1){
        console.log("HP gain")
        hp_gain = 0;
        hp = hp + 1.0;
        playerhp.style.width = parseInt(playerhp.style.width) + 20 + "px"
    }

    if (hp > 15){
        playerhp.style.backgroundColor = "#05ff26";
    }
    else if (hp > 10){
        playerhp.style.backgroundColor = "yellow";
    }
    else if (hp > 5){
        playerhp.style.backgroundColor = "rgb(255, 60, 0)";
    }
    else{
        playerhp.style.backgroundColor = "rgb(213, 0, 0)";
    }
    
}

function spawnfunction(){
    
    spawninterval = setInterval(() => {
        shapecount = Math.floor(Math.random() * 3);
        
        if (hp_gain_switch === true){
            HP_decay()
        }

        if (hp > 0) {
            if (shapecount === 0){
                spawnEnemySquare();
                enemycount--;
            }
            else if (shapecount === 1){
                spawnEnemyCircle();
                enemycount--;
            }
            else{
                spawnEnemyTriangle()
                enemycount--;
            }
        }
        else {
            playerhp.style.width = "0px";
            clearInterval(spawninterval);
            setTimeout(changeUI(gameUI,gameoverUIbg,true),5000);
            scoreInput.value = parseInt(scorediv.innerText);
            
            
            score_form.addEventListener('submit', function(event) {
                event.preventDefault(); // Prevent the form from submitting the traditional way
            
                const formData = new FormData(this);
            
                fetch('score.php', {
                    method: 'POST',
                    body: formData
                })
                .then(response => response.text())
                .then(data => {
                    // Handle the response from the server
                    document.getElementById('response').innerHTML = data;
                })
                .catch(error => console.error('Error:', error));
            
            });
            score_form.requestSubmit();
            
        }
    }, spawnspeed);
}
    


spawnfunction()

setTimeout(() => {
    clearInterval(spawninterval);
    spawnspeed = 2000;
    spawnfunction()
}, 15000);

setTimeout(() => {
    clearInterval(spawninterval);
    spawnspeed = 1000;
    spawnfunction()
}, 30000);

setTimeout(() => {
    clearInterval(spawninterval);
    spawnspeed = 500;
    hp_gain_switch = true;
    spawnfunction()
}, 45000);

setTimeout(() => {
    clearInterval(spawninterval);
    spawnspeed = 350;
    spawnfunction()
}, 60000);

let clickcooldown = false;
let bulletspeed = 350;
let audioplay = false;

document.addEventListener("mousedown", function (e) {
    if (hp > 0){
        audioplay = true;
        if (audioplay){
            gamemusic.play()
        }
        isHolding = true;
        holdcheck = setInterval(function () {
            if (isHolding) {
                if (!clickcooldown) {
                    var bullet = document.createElement('div');
                    bullet.className = 'bullet';
                    bullet.style.top = parseInt(player.style.top.replace("px", "")) + 12 + 'px';
                    bullet.style.left = parseInt(player.style.left) + 10 + 'px';

                    game.appendChild(bullet);
                    bullets.push({
                        el: bullet,
                        x: gameoffsetwidth + 100,
                        y: parseInt(player.style.top.replace("px", "")) + 12
                    });

                    clickcooldown = true;

                    setTimeout(() => {
                        clickcooldown = false;
                    }, bulletspeed);
                }
            }
        }, 100);
    }
});

document.addEventListener("mouseup", function (e) {
    if (e.button === 0) {
        isHolding = false;
    }
});


let mousecount = false;


document.addEventListener('mousemove', (event) => {
    
    if (hp > 0){
        mousecount = true;

        if (!mousecount){
            let mouseX = event.clientX - 14;
            let mouseY = event.clientY - 84;

            if (mouseY >= 0 && mouseY <= gameoffsetheight - 30) {
                player.style.top = mouseY + "px";
            }
        
            if (mouseX >= 0 && mouseX <= gameoffsetwidth - 30) {
                player.style.left = mouseX + "px";
            }
        }
        else{
            mouseX = event.clientX - 14;
            mouseY = event.clientY - 84;

            if (mouseY >= 0 && mouseY <= gameoffsetheight - 30) {
                player.style.top = mouseY + "px";
            }
        
            if (mouseX >= 0 && mouseX <= gameoffsetwidth - 30) {
                player.style.left = mouseX + "px";
            }
        }
    }

});


function gameLoop() {
    
    if (!stopgame){
        bullets.forEach((bullet, i) => {
            var x = parseInt(bullet.el.style.left),
                dx = bullet.x - x,
                dist = Math.sqrt(dx * dx);
    
            if (dist < speed) {
                bullet.el.parentNode.removeChild(bullet.el);
                bullets.splice(i, 1);
            } else {
                bullet.el.style.left = x + speed * dx / dist + 'px';
            }
    
            // if (x <= 0) {
            //     // Remove the bullet from the game
            //     bullet.el.parentNode.removeChild(bullet.el);
            //     bullets.splice(i, 1);
            // }
        });
    
        enemies.forEach((enemy,i) => {
            
            // if (mouseY >= 0 && mouseY <= gameoffsetheight - 30) {
            //     player.style.top = mouseY + "px";
            // }
        
            // if (mouseX >= 0 && mouseX <= gameoffsetwidth - 30) {
            //     player.style.left = mouseX + "px";
            // }
    
            var ex = parseInt(enemy.el.style.left),
                ey = parseInt(enemy.el.style.top),
                mx = parseInt(player.style.left),
                my = parseInt(player.style.top),
                dx = ex - mx,
                dy = ey - my,
                dist = Math.sqrt(dx * dx + dy * dy);
    
            if (dist < 30) {
                clearInterval(enemy.createbullet);
                enemy.ebullets.forEach(ebullet => {
                    ebullet.ebullet.parentNode.removeChild(ebullet.ebullet);
                });
                enemy.el.parentNode.removeChild(enemy.el);
                enemies.splice(i, 1);
                
                if (enemy.shape === "square"){
                    scorediv.textContent = parseInt(scorediv.innerText) + 10;
                }
                else if (enemy.shape === "circle"){
                    scorediv.textContent = parseInt(scorediv.innerText) + 50;
                }
                else{
                    scorediv.textContent = parseInt(scorediv.innerText) + 100;
                }
                hp--;
                playerhp.style.width = parseInt(playerhp.style.width.replace("px","")) - 20 + "px"
                    if (hp > 15){
                        playerhp.style.backgroundColor = "#05ff26";
                    }
                    else if (hp > 10){
                        playerhp.style.backgroundColor = "yellow";
                    }
                    else if (hp > 5){
                        playerhp.style.backgroundColor = "rgb(255, 60, 0)";
                    }
                    else{
                        playerhp.style.backgroundColor = "rgb(213, 0, 0)";
                    }
            }
        })
        
    
        enemies.forEach((enemy,i) => {
            var ex = parseInt(enemy.el.style.left.replace("px", "")),
                dx = 0 - ex,
                dist = Math.sqrt(dx * dx);
                
                if (dist < enemy.enemyspeed) {
                    enemy.el.parentNode.removeChild(enemy.el);
                    enemies.splice(i, 1);
                    // ebullet.ebullet.parentNode.removeChild(ebullet.ebullet);
                    // enemy.ebullets.splice(j, 1);
    
                    enemy.ebullets.forEach((ebullet) => {
                        ebullet.ebullet.parentNode.removeChild(ebullet.ebullet);
                    });
                    clearInterval(enemy.createbullet);
                } else {
                    enemy.el.style.left = ex + enemy.enemyspeed * dx / dist + 'px';
                }
    
            
        })
    
        enemies.forEach((enemy, i) => {
            bullets.forEach((bullet, j) => {
                var ex = parseInt(enemy.el.style.left),
                    ey = parseInt(enemy.el.style.top),
                    bx = parseInt(bullet.el.style.left),
                    by = parseInt(bullet.el.style.top),
                    dx = ex - bx,
                    dy = ey - by,
                    dist = Math.sqrt(dx * dx + dy * dy);
    
                if (dist < 30) {
                    clearInterval(enemy.createbullet);
                    if (hp_gain < 3){
                        hp_gain++;
                    }
                    console.log(`hp_gain: ${hp_gain}`)
                    enemy.ebullets.forEach(ebullet => {
                        ebullet.ebullet.parentNode.removeChild(ebullet.ebullet);
                    });
                    enemy.el.parentNode.removeChild(enemy.el);
                    enemies.splice(i, 1);
                    
                    bullet.el.parentNode.removeChild(bullet.el);
                    bullets.splice(j, 1);
                    if (enemy.shape === "square"){
                        scorediv.textContent = parseInt(scorediv.innerText) + 10;
                    }
                    else if (enemy.shape === "circle"){
                        scorediv.textContent = parseInt(scorediv.innerText) + 50;
                    }
                    else{
                        scorediv.textContent = parseInt(scorediv.innerText) + 100;
                    }
                }
            });
        });
    
        enemies.forEach((enemy, i) => {
            enemy.ebullets.forEach((ebullet, j) => {
                var x = parseInt(ebullet.ebullet.style.left.replace("px", "")),
                    dx = ebullet.x - x,
                    dist = Math.sqrt(dx * dx);
    
                if (dist < enemy.enemybulletspeed) {
                    ebullet.ebullet.parentNode.removeChild(ebullet.ebullet);
                    enemy.ebullets.splice(j, 1);
                    
                } else {
                    ebullet.ebullet.style.left = x - enemy.enemybulletspeed * dx / dist + 'px';
                }
    
                
            })
            
    
           
        });


        if (hp > 0){
                enemies.forEach((enemy, i) => {
                enemy.ebullets.forEach((ebullet, j) => {
                    var px = parseInt(player.style.left.replace("px", "")),
                        py = parseInt(player.style.top.replace("px", "")),
                        bx = parseInt(ebullet.ebullet.style.left.replace("px", "")),
                        by = parseInt(ebullet.ebullet.style.top.replace("px", "")),
                        dx = px - bx,
                        dy = py - by,
                        dist = Math.sqrt(dx * dx + dy * dy);
        
                    if (dist < 30) {
                        ebullet.ebullet.parentNode.removeChild(ebullet.ebullet);
                        enemy.ebullets.splice(j, 1);
                        hp--;
                        playerhp.style.width = parseInt(playerhp.style.width.replace("px","")) - 20 + "px"
                        if (hp > 15){
                            playerhp.style.backgroundColor = "#05ff26";
                        }
                        else if (hp > 10){
                            playerhp.style.backgroundColor = "yellow";
                        }
                        else if (hp > 5){
                            playerhp.style.backgroundColor = "rgb(255, 60, 0)";
                        }
                        else{
                            playerhp.style.backgroundColor = "rgb(213, 0, 0)";
                        }
                        // Handle player hit logic here
                    }
                });
        
            });
        }

        else{
            try{
                player.parentNode.removeChild(player)
            }
            catch(e){
                null
            }
        }
        
    
        requestAnimationFrame(gameLoop);
    }
}

gameLoop();