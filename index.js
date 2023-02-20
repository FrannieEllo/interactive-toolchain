let player, ground, bricks;

// game setup
window.setup = () => {
  // background & environment
  createCanvas(800, 500);
  background("lightblue");
  world.gravity.y = 90;

  // ground
  ground = new Sprite(0, 500, 100000, 50, "static");
  ground.friction = 0; // used to prevent player rotation

  // main player
  player = new Sprite(-100, 450);
  player.width = 20;
  player.height = 10;
  player.shapeColor = color("red");
  player.rotationLock = true;

  // tiles
  bricks = new Group();
  bricks.w = 115;
  bricks.h = 25;
  bricks.tile = '=';
  bricks.collider = "static";
  bricks.friction = 0;


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
    290,
    bricks.w + 4,
    bricks.h + 4
  );
};

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
    player.vel.vel = 50;
  } else {
    player.vel.y = 0;
  }

};
