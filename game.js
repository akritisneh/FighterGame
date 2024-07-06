function load_images() {
  //player, enemies gem
  enemy_image = new Image();
  enemy_image.src = "./Assets/enemy.png";

  player_image = new Image();
  player_image.src = "./Assets/player.jpg";

  gem_image = new Image();
  gem_image.src = "./Assets/gem.jpg";
}
function init() {
  //objects we will have in our game
  canvas = document.getElementById("mycanvas");
  console.log(canvas);
  W = 700;
  H = 400;
  canvas.width = W;
  canvas.height = H;

  game_over = false;
  //create a context object
  pen = canvas.getContext("2d");
  console.log(pen);

  e1 = {
    x: 150,
    y: 50,
    w: 60,
    h: 60,
    speed: 20,
  };
  e2 = {
    x: 300,
    y: 150,
    w: 60,
    h: 60,
    speed: 30,
  };
  e3 = {
    x: 450,
    y: 20,
    w: 60,
    h: 60,
    speed: 40,
  };

  enemy = [e1, e2, e3];

  player = {
    x: 20,
    y: H / 2,
    w: 60,
    h: 80,
    speed: 20,
    moving: false,
    health: 100,
  };
  gem = {
    x: W - 100,
    y: H / 2,
    w: 60,
    h: 60,
  };
  //create event listeners
  canvas.addEventListener("mousedown", function () {
    player.moving = true;
  });
  canvas.addEventListener("mouseup", function () {
    player.moving = false;
  });
}

function isOverlap(rect1, rect2) {
  if (
    rect1.x < rect2.x + rect2.w &&
    rect1.x + rect1.w > rect2.x &&
    rect1.y < rect2.y + rect2.h &&
    rect1.y + rect1.h > rect2.y
  ) {
    return true;
  }
  return false;
}

function draw() {
  //clear the canvas area for the old frame
  pen.clearRect(0, 0, W, H);
  pen.fillStyle = "red";
  // pen.drawImage(enemy_image , box.x, box.y, box.w, box.h);
  for (let i = 0; i < enemy.length; i++) {
    pen.drawImage(enemy_image, enemy[i].x, enemy[i].y, enemy[i].w, enemy[i].h);
  }
  //draw player
  pen.drawImage(player_image, player.x, player.y, player.w, player.h);
  pen.drawImage(gem_image, gem.x, gem.y, gem.w, gem.h);

  //display score
  pen.fillStyle = "white";
  pen.fillText("Score : " + player.health, 20, 20);
}
function update() {
  //move box downwards
  // box.y += box.speed;
  // if(box.y + box.h >= H || box.y < 0){
  //     box.speed *= -1
  // }
  //check over bw player & gem
  //if player is moving
  if (player.moving == true) {
    player.x += player.speed;
    player.health += 20;
  }
  for (let i = 0; i < enemy.length; i++) {
    if (isOverlap(enemy[i], player)) {
      player.health -= 50;
      if (player.health < 0) {
        alert("you lost" + player.health);
        game_over = true;
      }
    }
  }
  if (isOverlap(player, gem)) {
    alert("you won");
    game_over = true;
    return;
  }

  for (let i = 0; i < enemy.length; i++) {
    enemy[i].y += enemy[i].speed;
    if (enemy[i].y + enemy[i].w >= H || enemy[i].y < 0) {
      enemy[i].speed *= -1;
    }
  }
}
function gameloop() {
  if (game_over == true) {
    clearInterval(f);
  }
  draw();
  update();
  console.log("In game loop");
}
load_images();
init();
var f = setInterval(gameloop, 100);
