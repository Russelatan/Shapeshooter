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
class Game {

    constructor() {
        this.mainmusic = "bgm/EnteringABlackHole.mp3"
        this.ingamemusic = "bgm/OneCosmosRoyalty.mp3"
        this.audioplay = false;
        this.square = "icons/square.png",
        this.circle = "icons/circle.png",
        this.triangle = "icons/triangle.png";
        this.shapes =   [   this.square,
                            this.circle,
                            this.triangle]

        this.gameState = {
            player: document.querySelector('#player'),
            bulletpoint: document.querySelector("#bulletpoint"),
            playerhp: document.querySelector(".playerhp"),
            scorediv: document.querySelector("#SCORE"),
            scoreInput: document.getElementById('scoreInput'),
            game: gameUI,
            gameoffsetheight: gameUI.offsetHeight,
            gameoffsetwidth: gameUI.offsetWidth,
            stopgame: false,
            speed: 7,
            enemycount: 500,
            spawnspeed: 3000,
            shapecount: null
        };

        this.gameState.player.style.top = (this.gameState.gameoffsetheight / 2) + 'px';
        this.gameState.player.style.left = 300 + 'px';
        this.gameState.playerhp.style.width = "400px";
        this.gameState.scorediv.style.top = "89.5%";
        this.gameState.scorediv.style.left = "57%";

        this.player = {
            hp: 20.0,
            hp_gain: 0,
            hp_gain_switch: false,
            score: 0,
            ebulletsi: [],
            bullets: [],
            playerbullet: document.querySelector('.bullet'),
            playerbullet_speed: 300,
            clickcooldown: false,
            isHolding: false,
            mousecount: false,
            mouseX: null,
            mouseY: null,
            powerupTimer: false,
            normalbullet: true,
        }
        this.enemies = [];
        this.powerups = [];
        this.spawnIntervals = [];
    }

    toggleAllBullets() {
        const bullets = document.querySelectorAll('.bullet'); // Select all bullet elements
        bullets.forEach(bullet => {
            bullet.classList.toggle('powered'); // Toggle the class on each bullet
        });
    }


    startTimer(powerup) {
        // Check if the timer already exists
        if (!powerup) {
            // Set the timer for 20 seconds
            powerup = setTimeout(() => {
                console.log("Timer completed!"); // Action to perform when the timer completes
                // Reset the timer variable
                shapeshooter.player.powerupTimer = true; 
                this.player.playerbullet_speed = 300;
                this.player.normalbullet = true;
                
            }, 20000); // 20000 milliseconds = 20 seconds

            console.log("Timer started for 20 seconds.");
            this.player.playerbullet_speed = 150;
            this.player.normalbullet = false;
            
        } else {
            console.log("Timer is already running.");
            
        }
    }

    spawnEnemySquare() {
        var enemy = document.createElement('img');
        enemy.className = "enemy";
        enemy.src = this.square
        var topy = Math.floor(Math.random() * (this.gameState.gameoffsetheight - 60));
        if (topy >= this.gameState.gameoffsetheight - 30){
            enemy.style.top = topy - 50 + 'px';
        }
        else{
            enemy.style.top = topy + 'px';
        }
        
        enemy.style.left = this.gameState.gameoffsetwidth + 30 + 'px';
        this.gameState.game.appendChild(enemy);
    
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
    
            this.gameState.game.appendChild(enemybullet);
    
            enemyObj.ebullets.push({
                ebullet: enemybullet,
                x: this.gameState.gameoffsetwidth
            });
        }, 1800);
    
        this.enemies.push(enemyObj);
    }

    spawnEnemyCircle() {
        var enemy = document.createElement('img');
        enemy.className = 'enemy';
        enemy.src = this.circle
        var topy = Math.floor(Math.random() * (this.gameState.gameoffsetheight - 60));
        if (topy >= this.gameState.gameoffsetheight - 30){
            enemy.style.top = topy - 50 + 'px';
        }
        else{
            enemy.style.top = topy + 30 + 'px';
        }
        enemy.style.left = this.gameState.gameoffsetwidth + 30 + 'px';
        this.gameState.game.appendChild(enemy);
    
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
    
            this.gameState.game.appendChild(enemybullet);
    
            enemyObj.ebullets.push({
                ebullet: enemybullet,
                x: this.gameState.gameoffsetwidth
            });
        }, 1500);
    
        this.enemies.push(enemyObj);
    }

    spawnEnemyTriangle() {
        var enemy = document.createElement('img');
        enemy.className = 'enemy';
        enemy.style.transform = "rotateZ(30deg)";
        enemy.src = this.triangle
        var topy = Math.floor(Math.random() * (this.gameState.gameoffsetheight - 60));
        if (topy >= this.gameState.gameoffsetheight - 30){
            enemy.style.top = topy - 30 + 'px';
        }
        else{
            enemy.style.top = topy + 'px';
        }
        enemy.style.left = this.gameState.gameoffsetwidth + 50 + 'px';
        this.gameState.game.appendChild(enemy);
    
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
    
            this.gameState.game.appendChild(enemybullet);
    
            enemyObj.ebullets.push({
                ebullet: enemybullet,
                x: this.gameState.gameoffsetwidth
            });
        }, 1000);
    
        this.enemies.push(enemyObj);
    }

    spawn_fast_bullets() {
        var fast_bullets = document.createElement('div');
        fast_bullets.className = 'fast_bullets';
        var topy = Math.floor(Math.random() * (this.gameState.gameoffsetheight - 60));
        if (topy >= this.gameState.gameoffsetheight - 30){
            fast_bullets.style.top = topy - 30 + 'px';
        }
        else{
            fast_bullets.style.top = topy + 'px';
        }
        fast_bullets.style.left = this.gameState.gameoffsetwidth + 50 + 'px';
        this.gameState.game.appendChild(fast_bullets);
    
        // Create an enemy object and push it to the 'enemies' array
        let fast_bulletsObj = {
            el: fast_bullets,
            ex: parseInt(fast_bullets.style.left.replace("px", "")),
            ey: parseInt(fast_bullets.style.top.replace("px", "")),
            powerupspeed: 4,
        };
    
        
    
        this.powerups.push(fast_bulletsObj);
    }

    

    HP_decay(){
    
    
        this.player.hp -= 0.25;
        this.gameState.playerhp.style.width = parseInt(this.gameState.playerhp.style.width) - 5 + "px"
        console.log(`hp: ${this.player.hp}  divhp: ${parseInt(this.gameState.playerhp.style.width)}`)
    
        if (this.player.hp_gain === 3 && this.player.hp <= 18.0 && this.player.hp > 1){
            console.log("HP gain")
            this.player.hp_gain = 0;
            this.player.hp += 1.0;
            this.gameState.playerhp.style.width = parseInt(this.gameState.playerhp.style.width) + 20 + "px"
        }
    
        if (this.player.hp > 15){
            this.gameState.playerhp.style.backgroundColor = "#05ff26";
        }
        else if (this.player.hp > 10){
            this.gameState.playerhp.style.backgroundColor = "yellow";
        }
        else if (this.player.hp > 5){
            this.gameState.playerhp.style.backgroundColor = "rgb(255, 60, 0)";
        }
        else{
            this.gameState.playerhp.style.backgroundColor = "rgb(213, 0, 0)";
        }
        
    }

    spawnfunction(){
    
        this.spawninterval = setInterval(() => {
            this.gameState.shapecount = Math.floor(Math.random() * 3);
            
            if (this.player.hp_gain_switch === true){
                this.HP_decay()
            }
    
            if (this.player.hp > 0) {
                if (this.gameState.shapecount === 0){
                    this.spawnEnemySquare();
                    this.gameState.enemycount--;
                }
                else if (this.gameState.shapecount === 1){
                    this.spawnEnemyCircle();
                    this.gameState.enemycount--;
                }
                else{
                    this.spawnEnemyTriangle()
                    this.gameState.enemycount--;
                }

                let result = Math.floor(Math.random() * 20) + 1;
                if (result >= 19){
                    this.spawn_fast_bullets();
                    console.log("powered bullet", result);
                }
            }
            else {
                this.gameState.playerhp.style.width = "0px";
                clearInterval(this.spawninterval);
                setTimeout(changeUI(gameUI,gameoverUIbg,true),5000);
                this.gameState.scoreInput.value = parseInt(this.gameState.scorediv.innerText);
                
                
                score_form.addEventListener('submit', function(event) {
                    event.preventDefault(); // Prevent the form from submitting the traditional way
                
                    const formData = new FormData(this);
                
                    fetch('score.php', {
                        method: 'POST',
                        body: formData
                    })
                    .then(response => {
                        // Log the response for debugging
                        return response.text().then(text => {
                            console.log('Response:', text); // Log the raw response
                            try {
                                return JSON.parse(text); // Attempt to parse the response as JSON
                            } catch (e) {
                                throw new Error('Invalid JSON: ' + e.message);
                            }
                        });
                    })
                    .then(data => {
                        console.log(data.message); // Log the response message
                    })
                    .catch(error => console.error('Error:', error));
                });
                score_form.requestSubmit();
                
            }
        }, this.gameState.spawnspeed);

    }

    enemyspawnfunction(){
        setTimeout(() => {
            clearInterval(this.spawninterval);
            shapeshooter.gameState.spawnspeed = 2000;
            shapeshooter.spawnfunction()
        }, 15000);
        
        setTimeout(() => {
            clearInterval(this.spawninterval);
            shapeshooter.gameState.spawnspeed = 1000;
            shapeshooter.spawnfunction()
        }, 30000);
        
        setTimeout(() => {
            clearInterval(this.spawninterval);
            shapeshooter.gameState.spawnspeed = 500;
            shapeshooter.player.hp_gain_switch = true;
            shapeshooter.spawnfunction()
        }, 45000);
        
        setTimeout(() => {
            clearInterval(this.spawninterval);
            shapeshooter.gameState.spawnspeed = 350;
            shapeshooter.spawnfunction()
        }, 60000);
    }

    gameLoop() {
    
        if (!shapeshooter.gameState.stopgame){
            shapeshooter.player.bullets.forEach((bullet, i) => {
                var x = parseInt(bullet.el.style.left),
                    dx = bullet.x - x,
                    dist = Math.sqrt(dx * dx);
        
                if (dist < shapeshooter.gameState.speed) {
                    bullet.el.parentNode.removeChild(bullet.el);
                    shapeshooter.player.bullets.splice(i, 1);
                } else {
                    bullet.el.style.left = x + shapeshooter.gameState.speed * dx / dist + 'px';
                }
        
            });
        
            

            shapeshooter.powerups.forEach((fast_bullets,i) => {
        
                var px = parseInt(fast_bullets.el.style.left),
                    py = parseInt(fast_bullets.el.style.top),
                    mx = parseInt(shapeshooter.gameState.player.style.left),
                    my = parseInt(shapeshooter.gameState.player.style.top),
                    dx = px - mx,
                    dy = py - my,
                    dist = Math.sqrt(dx * dx + dy * dy);
        
                if (dist < 30) {
                    
                    fast_bullets.el.parentNode.removeChild(fast_bullets.el);
                    shapeshooter.powerups.splice(i, 1);
                    shapeshooter.player.powerupTimer = false;
                    shapeshooter.startTimer(shapeshooter.player.powerupTimer);

                    
                    
                
                }
            })

            shapeshooter.powerups.forEach((fast_bullet,i) => {
                var px = parseInt(fast_bullet.el.style.left.replace("px", "")),
                    dx = 0 - px,
                    dist = Math.sqrt(dx * dx);
                    
                    if (dist < fast_bullet.powerupspeed) {
                        fast_bullet.el.parentNode.removeChild(fast_bullet.el);
                        shapeshooter.powerups.splice(i, 1);
                        // ebullet.ebullet.parentNode.removeChild(ebullet.ebullet);
                        // enemy.ebullets.splice(j, 1);
        
                        
                    } else {
                        fast_bullet.el.style.left = px + fast_bullet.powerupspeed * dx / dist + 'px';
                    }
        
                
            })

            shapeshooter.enemies.forEach((enemy,i) => {
        
                var ex = parseInt(enemy.el.style.left),
                    ey = parseInt(enemy.el.style.top),
                    mx = parseInt(shapeshooter.gameState.player.style.left),
                    my = parseInt(shapeshooter.gameState.player.style.top),
                    dx = ex - mx,
                    dy = ey - my,
                    dist = Math.sqrt(dx * dx + dy * dy);
        
                if (dist < 30) {
                    clearInterval(enemy.createbullet);
                    enemy.ebullets.forEach(ebullet => {
                        ebullet.ebullet.parentNode.removeChild(ebullet.ebullet);
                    });
                    enemy.el.parentNode.removeChild(enemy.el);
                    shapeshooter.enemies.splice(i, 1);
                    
                    if (enemy.shape === "square"){
                        shapeshooter.gameState.scorediv.textContent = parseInt(shapeshooter.gameState.scorediv.innerText) + 10;
                    }
                    else if (enemy.shape === "circle"){
                        shapeshooter.gameState.scorediv.textContent = parseInt(shapeshooter.gameState.scorediv.innerText) + 50;
                    }
                    else{
                        shapeshooter.gameState.scorediv.textContent = parseInt(shapeshooter.gameState.scorediv.innerText) + 100;
                    }
                    shapeshooter.player.hp--;
                    shapeshooter.gameState.playerhp.style.width = parseInt(shapeshooter.gameState.playerhp.style.width.replace("px","")) - 20 + "px"
                        if (shapeshooter.player.hp > 15){
                            shapeshooter.gameState.playerhp.style.backgroundColor = "#05ff26";
                        }
                        else if (shapeshooter.player.hp > 10){
                            shapeshooter.gameState.playerhp.style.backgroundColor = "yellow";
                        }
                        else if (shapeshooter.player.hp > 5){
                            shapeshooter.gameState.playerhp.style.backgroundColor = "rgb(255, 60, 0)";
                        }
                        else{
                            shapeshooter.gameState.playerhp.style.backgroundColor = "rgb(213, 0, 0)";
                        }
                }
            })
            
        
            shapeshooter.enemies.forEach((enemy,i) => {
                var ex = parseInt(enemy.el.style.left.replace("px", "")),
                    dx = 0 - ex,
                    dist = Math.sqrt(dx * dx);
                    
                    if (dist < enemy.enemyspeed) {
                        enemy.el.parentNode.removeChild(enemy.el);
                        shapeshooter.enemies.splice(i, 1);
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
        
            shapeshooter.enemies.forEach((enemy, i) => {
                shapeshooter.player.bullets.forEach((bullet, j) => {
                    var ex = parseInt(enemy.el.style.left),
                        ey = parseInt(enemy.el.style.top),
                        bx = parseInt(bullet.el.style.left),
                        by = parseInt(bullet.el.style.top),
                        dx = ex - bx,
                        dy = ey - by,
                        dist = Math.sqrt(dx * dx + dy * dy);
        
                    if (dist < 30) {
                        clearInterval(enemy.createbullet);
                        if (shapeshooter.player.hp_gain < 3){
                            shapeshooter.player.hp_gain++;
                        }
                        console.log(`hp_gain: ${shapeshooter.player.hp_gain}`)
                        enemy.ebullets.forEach(ebullet => {
                            ebullet.ebullet.parentNode.removeChild(ebullet.ebullet);
                        });
                        enemy.el.parentNode.removeChild(enemy.el);
                        shapeshooter.enemies.splice(i, 1);
                        
                        bullet.el.parentNode.removeChild(bullet.el);
                        shapeshooter.player.bullets.splice(j, 1);
                        if (enemy.shape === "square"){
                            shapeshooter.gameState.scorediv.textContent = parseInt(shapeshooter.gameState.scorediv.innerText) + 10;
                        }
                        else if (enemy.shape === "circle"){
                            shapeshooter.gameState.scorediv.textContent = parseInt(shapeshooter.gameState.scorediv.innerText) + 50;
                        }
                        else{
                            shapeshooter.gameState.scorediv.textContent = parseInt(shapeshooter.gameState.scorediv.innerText) + 100;
                        }
                    }
                });
            });
        
            shapeshooter.enemies.forEach((enemy, i) => {
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
    
    
            if (shapeshooter.player.hp > 0){
                    shapeshooter.enemies.forEach((enemy, i) => {
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
                            shapeshooter.player.hp--;
                            shapeshooter.gameState.playerhp.style.width = parseInt(shapeshooter.gameState.playerhp.style.width.replace("px","")) - 20 + "px"
                            if (shapeshooter.player.hp > 15){
                                shapeshooter.gameState.playerhp.style.backgroundColor = "#05ff26";
                            }
                            else if (shapeshooter.player.hp > 10){
                                shapeshooter.gameState.playerhp.style.backgroundColor = "yellow";
                            }
                            else if (shapeshooter.player.hp > 5){
                                shapeshooter.gameState.playerhp.style.backgroundColor = "rgb(255, 60, 0)";
                            }
                            else{
                                shapeshooter.gameState.playerhp.style.backgroundColor = "rgb(213, 0, 0)";
                            }
                            // Handle player hit logic here
                        }
                    });
            
                });
            }
    
            else{
                try{
                    shapeshooter.gameState.player.parentNode.removeChild(player)
                }
                catch(e){
                    null
                }
            }
            
        
            requestAnimationFrame(shapeshooter.gameLoop);
        }
    }

    

    
}

const shapeshooter = new Game();
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

shapeshooter.spawnfunction();
shapeshooter.enemyspawnfunction();

document.addEventListener("mousedown", function (e) {
    if (shapeshooter.player.hp > 0){
        shapeshooter.audioplay = true;
        if (shapeshooter.audioplay){
            gamemusic.play()
        }
        shapeshooter.player.isHolding = true;
        holdcheck = setInterval(function () {
            if (shapeshooter.player.isHolding) {
                if (!shapeshooter.player.clickcooldown) {
                    var bullet = document.createElement('div');

                    bullet.className = shapeshooter.player.normalbullet 
                        ? 'bullet' // If normalbullet is true, set it to just 'bullet'
                        : 'bullet powered'; // If normalbullet is false, set it to 'bullet powered'

                    bullet.style.top = parseInt(shapeshooter.gameState.player.style.top.replace("px", "")) + 12 + 'px';
                    bullet.style.left = parseInt(shapeshooter.gameState.player.style.left) + 10 + 'px';

                    shapeshooter.gameState.game.appendChild(bullet);
                    shapeshooter.player.bullets.push({
                        el: bullet,
                        x: shapeshooter.gameState.gameoffsetwidth + 100,
                        y: parseInt(shapeshooter.gameState.player.style.top.replace("px", "")) + 12
                    });

                    shapeshooter.player.clickcooldown = true;

                    setTimeout(() => {
                        shapeshooter.player.clickcooldown = false;
                    }, shapeshooter.player.playerbullet_speed);
                }
            }
        }, 100);
    }
});

document.addEventListener("mouseup", function (e) {
    if (e.button === 0) {
        shapeshooter.player.isHolding = false;
    }
});

document.addEventListener('mousemove', (event) => {
    
    if (shapeshooter.player.hp > 0){
        shapeshooter.player.mousecount = true;

        if (!shapeshooter.player.mousecount){
            shapeshooter.player.mouseX = event.clientX - 14;
            shapeshooter.player.mouseY = event.clientY - 84;

            if (shapeshooter.player.mouseY >= 0 && shapeshooter.player.mouseY <= shapeshooter.gameState.gameoffsetheight - 30) {
                shapeshooter.gameState.player.style.top = shapeshooter.player.mouseY + "px";
            }
        
            if (mouseX >= 0 && mouseX <= gameoffsetwidth - 30) {
                shapeshooter.gameState.player.style.left = mouseX + "px";
            }
        }
        else{
            shapeshooter.player.mouseX = event.clientX - 14;
            shapeshooter.player.mouseY = event.clientY - 84;

            if (shapeshooter.player.mouseY >= 0 && shapeshooter.player.mouseY <= shapeshooter.gameState.gameoffsetheight - 30) {
                shapeshooter.gameState.player.style.top = shapeshooter.player.mouseY + "px";
            }
        
            if (shapeshooter.player.mouseX >= 0 && shapeshooter.player.mouseX <= shapeshooter.gameState.gameoffsetwidth - 30) {
                shapeshooter.gameState.player.style.left = shapeshooter.player.mouseX + "px";
            }
        }
    }

});

shapeshooter.gameLoop();