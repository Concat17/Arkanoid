import {Ball} from "./src/Ball"
import {Game} from "./src/Game"

let canvas = document.getElementById("canvas17") as HTMLCanvasElement;
let ctx = canvas.getContext("2d");  
const game = new Game(document)
game.draw() 