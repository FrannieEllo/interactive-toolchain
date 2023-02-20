
let player, ground, bricks;

// game setup
window.setup = () => {
  // background & environment
  createCanvas(800, 500);
  background("lightblue");
  //world.gravity.y = 85;

  // ground
  ground = new Sprite(0, 500, 800, 50, "static");
  ground.friction = 0; // used to prevent player rotation

  // main player
  player = createSprite(0, 450, 40, 85);
  player.shapeColor = color("red");
  player.rotationLock = true;

  // tiles
  bricks = new Group();
  bricks.w = 20;
  bricks.h = 10;
  bricks.tile = '=';

  new Tiles(
    [
      ".........................=..",
      "..=.....................=...",
      ".......................=....",
      ".=.=....=...................",
      ".............=....=..==.....",
      "......=.....==....==........",
      "......=....===....==........",
    ],
    0,
    350,
    bricks.w + 4,
    bricks.h + 4
  );
}

window.draw = () => {
  background("lightblue");

  camera.x = player.x;
  // player x movement
  if (kb.pressing("right")) {
    player.vel.x +=0.5;
  } else if (kb.pressing("left")) {
    player.vel.x -=0.5;
  } else {
    player.vel.x = 0;
  }

  // player y movement
  if (kb.presses("up")) {
    player.vel.y = -100;
  } else if (kb.pressing("down")) {
    player.height = 50;
  } else {
    player.vel.y = 0;
    player.height = 85;
  }

}

function resetPlayer() {
  player.vel.x = 0;
  player.vel.y = 0;
  player.x = 0;
  player.y = 500;
}