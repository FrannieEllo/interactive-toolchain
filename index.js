
let player, ground, platform, carrots, falling;
let score, exit, msg;
let playerIdle, playerJump;
let walls;
// game setup
window.setup = () => {

  // background & environment
  createCanvas(800, 500);
  background("lightblue");
  world.gravity.y = 90;

  // walls
  walls = new Group();
  walls.width = 30;
  walls.height = 4000;

  walls.collider = "static";
  let wallTop = new walls.Sprite(400, 0);
  wallTop.rotation = 90;

  new walls.Sprite(-500, 250);
  new walls.Sprite(3750, 250);

  // hotbar
  //msg = "You got it!"
  exit = new Sprite(500, 500, 50, 50, "static");

  // ground
  ground = new Group();
  ground = new Sprite(0, 500, 100000, 50, "static");
  ground.friction = 0; // used to prevent player rotation
  ground.img = "./assets/Ground.png"

  // main player
  player = new Sprite(-100, 450);

  // idle animation
  playerIdle = loadAnimation(
    "./assets/player-idle-1.png",
    "./assets/player-idle-2.png");
  playerIdle.frameDelay = 30;
  player.width = 48;
  player.height = 112;
  player.shapeColor = color("red");
  player.rotationLock = true;

  // jumping animation
  playerJump = loadAnimation(
    "./assets/player-jump.png"
  );
  playerJump.frameDelay = 200;



  // standard platform tiles
  platform = new Group();
  platform.w = 115;
  platform.h = 25;
  platform.tile = '=';
  platform.collider = "static";
  platform.friction = 0;
  platform.img = "./assets/Platform.png"


  new Tiles(
    [
      "............................",
      "............................",
      "..=.........................",
      ".........................=..",
      ".=.=...................=...",
      ".......................=....",
      "........=...................",
      "............=.....=..==.....",
      "......=....==.....==........",
      "......=...===.....==........",
    ],
    0,
  200,
    platform.w + 4,
    platform.h + 4
  );

  // falling floor
  falling = new Group();
  falling.w = 115;
  falling.h = 20;
  falling.collider = "static";
  falling.friction = 0;
  for (let i = 0; i < 5; i++) {
    let fallplat = new falling.Sprite();
    fallplat.x = 1550 + 115 * i;
    fallplat.y = 400;
  }

  // carrots
  carrots = new Group();
  carrots.w = 50;
  carrots.h = 50;
  carrots.tile = '=';
  carrots.img = "./assets/carrot-1.png"
}

window.draw = () => {
  background("lightblue");
  text("(" + mouseX + ", " + mouseY + ")", mouseX, mouseY);
  //text(msg, 100, 100);

  camera.x = player.x;
  // player x movement
  if (kb.pressing("right")) {
    player.vel.x = 5;
    player.mirror.x = false;
  } else if (kb.pressing("left")) {
    player.vel.x = -5;
    player.mirror.x = true;
  } else {
    player.vel.x = 0;
    player.ani = playerIdle;

  }

  // player y movement
  if (kb.presses("up")) {
    player.vel.y = -24;
    player.ani = playerJump;
  } else if (kb.pressing("down")) {
    player.vel.y = 50;
  }

  // falling platform
  if (player.collides(falling)) {
    falling.collider = "dynamic";
  }

  // successful end
  /*if (player.collides(exit)) {
    msg = "Woohoo! You made it to the end!!"
  }*/

}

function resetPlayer() {
  player.vel.x = 0;
  player.vel.y = 0;
  player.x = -100;
  player.y = 450;
}

function collect(player, carrot) {
  carrot.remove();
}