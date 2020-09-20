//Prints line in console to make sure Pixi is working, with WebGL (can also be canvas)
PIXI.utils.sayHello("WebGL");

//Create a new instance of the Pixi Application object
let app = new PIXI.Application({width: 512, height: 512, transparent: true});

//Add the canvas (created with the #view method of the Application object) to the HTML body
document.body.appendChild(app.view);
