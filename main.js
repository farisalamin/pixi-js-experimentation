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

  //Add the cat to the stage
  app.stage.addChild(cat);

  //Add the gameloop function to the ticker, which will run it 60 times a second
  app.ticker.add(delta => gameLoop(delta));
}

//The gameLoop function which will contain anything I want to animate
//Everything in here will happen once every frame
const gameLoop = (delta) => {
  cat.x += 1 + delta;
  cat.y += 1 + delta;
};
