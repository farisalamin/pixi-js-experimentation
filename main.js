//Prints line in console to make sure Pixi is working, with WebGL (can also be canvas)
PIXI.utils.sayHello("WebGL");

//Aliases
let Application = PIXI.Application,
    loader = PIXI.Loader.shared,
    resources = PIXI.Loader.shared.resources,
    Sprite = PIXI.Sprite;

//Creating a new instance of the Pixi `Application` object
let app = new Application({
    width: 512,
    height: 512,
    antialias: true,
    transparent: true,
    resolution: 1
  }
);

//Adding the canvas (created with the #view method of the Application object) to the HTML body
document.body.appendChild(app.view);

//Load an image and run the `setup` function when it's done
loader
  .add("images/cat.png")
  .load(setup);

//Predefining the cat so it can be used in both setup and gameloop
let cat;

//This `setup` function will run when the image has loaded
function setup() {

  //Create the cat sprite
  cat = new Sprite(resources["images/cat.png"].texture);

  //Set the cat's position
  cat.position.set(0, 224);

  //Set the cat's initial velocity
  cat.vx = 3;
  cat.vy = 3;

  //Add the cat to the stage
  app.stage.addChild(cat);

  //Add the gameloop function to the ticker, which will run it 60 times a second
  app.ticker.add(delta => gameLoop(delta));
}

//The gameLoop function which will contain anything I want to animate
//Everything in here will happen once every frame
const gameLoop = (delta) => {

  //Create dimensions for container
  const borderContainer = {x: 0, y: 0, width: app.renderer.width, height: app.renderer.height}

  //Contain cat and store collision data
  let catCollision = contain(cat, borderContainer);

  bounce(cat, catCollision)

  cat.x += cat.vx;
  cat.y += cat.vy;
};

function bounce(sprite, collision) {

  //If the sprite collides with the top or bottom, reverse the vertical velocity
  if (collision.includes("top") ||
      collision.includes("bottom")) {
    sprite.vy *= -1;
  };

  //If the sprite collides with the left or right, reverse the horizontal velocity
  if (collision.includes("left") ||
      collision.includes("right")) {
    sprite.vx *= -1;
  };
}

function contain(sprite, container) {

  let collision = [];

  //Left
  if (sprite.x < container.x) {
    sprite.x = container.x;
    collision.push("left");
  }

  //Top
  if (sprite.y < container.y) {
    sprite.y = container.y;
    collision.push("top");
  }

  //Right
  if (sprite.x + sprite.width > container.width) {
    sprite.x = container.width - sprite.width;
    collision.push("right");
  }

  //Bottom
  if (sprite.y + sprite.height > container.height) {
    sprite.y = container.height - sprite.height;
    collision.push("bottom");
  }

  //Return the `collision` value
  return collision;
}
