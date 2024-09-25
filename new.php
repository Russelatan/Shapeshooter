<!DOCTYPE html>
<html>
<head>
    <style>
        #game {
            position: relative;
            height: 600px;
            width: 800px;
            border: 1px solid black;
        }
        .player, .bullet, .enemy {
            position: absolute;
            background-color: transparent;
        }
        .player, .enemy {
            height: 0;
            width: 0;
            border-left: 25px solid transparent;
            border-right: 25px solid red;
            border-bottom: 50px solid #555;
        }
        .bullet {
            height: 30px;
            width: 30px;
            border-radius: 50%;
            background-color: black;
        }
    </style>
</head>
<body>
    <div id="game">
        <div id="player" class="player"></div>
    </div>

    <script>
        var player = document.getElementById('player'),
            game = document.getElementById('game'),
            bullets = [],
            enemies = [],
            speed = 5;

        player.style.top = (game.offsetHeight / 2) + 'px';
        player.style.left = (game.offsetWidth / 2) + 'px';

        setInterval(function() {
            var enemy = document.createElement('div');
            enemy.className = 'enemy';
            enemy.style.top = Math.random() * game.offsetHeight + 'px';
            enemy.style.left = Math.random() * game.offsetWidth + 'px';
            game.appendChild(enemy);
            enemies.push(enemy);
        }, 2000);

        game.addEventListener('click', function(e) {
            var bullet = document.createElement('div');
            bullet.className = 'bullet';
            bullet.style.top = parseInt(player.style.top) + 'px';
            bullet.style.left = parseInt(player.style.left) + 'px';
            game.appendChild(bullet);
            bullets.push({
                el: bullet,
                x: e.clientX,
                y: e.clientY
            });
        });

        function gameLoop() {
            bullets.forEach(function(bullet, i) {
                var x = parseInt(bullet.el.style.left),
                    y = parseInt(bullet.el.style.top),
                    dx = bullet.x - x,
                    dy = bullet.y - y,
                    dist = Math.sqrt(dx*dx + dy*dy);

                if (dist < speed) {
                    bullet.el.parentNode.removeChild(bullet.el);
                    bullets.splice(i, 1);
                } else {
                    bullet.el.style.left = x + speed * dx / dist + 'px';
                    bullet.el.style.top = y + speed * dy / dist + 'px';
                }
            });

            enemies.forEach(function(enemy, i) {
                bullets.forEach(function(bullet, j) {
                    var ex = parseInt(enemy.style.left),
                        ey = parseInt(enemy.style.top),
                        bx = parseInt(bullet.el.style.left),
                        by = parseInt(bullet.el.style.top),
                        dx = ex - bx,
                        dy = ey - by,
                        dist = Math.sqrt(dx*dx + dy*dy);

                    if (dist < 30) {
                        enemy.parentNode.removeChild(enemy);
                        enemies.splice(i, 1);
                        bullet.el.parentNode.removeChild(bullet.el);
                        bullets.splice(j, 1);
                    }
                });
            });

            requestAnimationFrame(gameLoop);
        }

        gameLoop();
    </script>
</body>
</html>
