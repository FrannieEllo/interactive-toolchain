
let player, ground, bricks, carrots;
let score, exit, msg;
let playerIdle;
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
  ground = new Sprite(0, 500, 100000, 50, "static");
  ground.friction = 0; // used to prevent player rotation
  ground.img = "./assets/Ground.png"

  // main player
  player = new Sprite(-100, 450);
  playerIdle = loadAnimation(
    "./assets/player-idle-1.png",
    "./assets/player-idle-2.png");
  playerIdle.frameDelay = 30;
  player.width = 48;
  player.height = 112;
  player.shapeColor = color("red");
  player.rotationLock = true;

  // platform tiles
  bricks = new Group();
  bricks.w = 115;
  bricks.h = 25;
  bricks.tile = '=';
  bricks.collider = "static";
  bricks.friction = 0;
  bricks.img = "./assets/Platform.png"


  new Tiles(
    [
      "............................",
      "............................",
      "..=.........................",
      ".........................=..",
      ".=.=...................=...",
      ".......................=....",
      "........=...................",
      ".............=....=..==.....",
      "......=.....==....==........",
      "......=....===....==........",
    ],
    0,
  200,
    bricks.w + 4,
    bricks.h + 4
  );

  // carrot tiles
  carrots = new Group();
  carrots.w = 50;
  carrots.h = 50;
  carrots.tile = '=';
  carrots.img = "./assets/carrot-1.png"
}

window.draw = () => {
  background("lightblue");
  //text(msg, 100, 100);

  camera.x = player.x;
  // player x movement
  if (kb.pressing("right")) {
    player.vel.x +=0.5;
  } else if (kb.pressing("left")) {
    player.vel.x -=0.5;
  } else {
    player.vel.x = 0;
    player.ani = playerIdle;

  }

  // player y movement
  if (kb.presses("up")) {
    player.vel.y = -150;
  } else if (kb.pressing("down")) {
    player.vel.vel = 50;
  } else {
    player.vel.y = 0;
    player.ani = playerIdle;
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