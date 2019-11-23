import {Ball} from "./Ball"
import {Board} from "./Board"
import {Brick} from "./Brick"
import { IBrickFigure } from "./IBrickFigure"
import {RectangleFigure} from "./RectangeFigure"

export class Game{
    ball: Ball 
    board: Board 
    ctx: CanvasRenderingContext2D
    canvas: HTMLCanvasElement
    document: Document
    brickFigure: IBrickFigure
    isGameOver: boolean = false;
    constructor(document: Document){
        this.ball = new Ball(10, 100, 300, "#64C7FF");
        this.document = document;
        this.canvas = document.getElementById("canvas17") as HTMLCanvasElement;
        this.ctx = this.canvas.getContext("2d"); 
        this.board = new Board(100, 10, 100, 5000, "#70E852")
        this.document.addEventListener("keydown", (e) => this.keyDownHandler(e), false);
        this.document.addEventListener("keyup", (e) => this.keyUpHandler(e), false);
        this.brickFigure = new RectangleFigure();
    }

    keyDownHandler(e: KeyboardEvent) {
        if(e.key == "Right" || e.key == "ArrowRight") { 
                this.board.rightPressed = true;
            }
        else if(e.key == "Left" || e.key == "ArrowLeft") {
                this.board.leftPressed = true;
            }
        }
    
    keyUpHandler(e: KeyboardEvent) {
        if(e.key == "D" || e.key == "ArrowRight") {
            this.board.rightPressed = false;
        }
        else if(e.key == "A" || e.key == "ArrowLeft") {
            this.board.leftPressed = false;
        }
    } 

    draw() : void{
        if(!this.isGameOver){
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); 
            this.ball.move(this.ctx)
            this.board.draw(this.canvas, this.ctx);
            this.drawBrickFigure(this.brickFigure);

            this.ball.checkBorder(this.canvas.width, this.canvas.height); 
            this.checkBoard();
            this.collisionDetection();  
        
            requestAnimationFrame(() => this.draw());
        } 
    } 

    checkBoard(): void{
        if(this.ball.y + this.ball.velocity > this.canvas.height-this.ball.radius - this.board.height) {
            if(this.ball.x > this.board.x 
                && this.ball.x < this.board.x + this.board.width) {
                this.ball.direction[1] *= -1
            }
            else{
                if(this.ball.y + this.ball.velocity > this.canvas.height-this.ball.radius){
                    this.isGameOver = true;
                    document.location.reload();
                }
                //alert("Loh")
                
            }
        }
    }

    drawBrickFigure(figure: IBrickFigure){
        for(var c=0; c<figure.bricks.length; c++) {
            for(var r=0; r<figure.bricks[0].length; r++) {
                if(figure.bricks[c][r].status == 1) { 
                    let brick = figure.bricks[c][r];
                    this.ctx.beginPath();
                    this.ctx.rect(brick.x, brick.y, Brick.width, Brick.height);
                    this.ctx.fillStyle = "#0095DD";
                    this.ctx.fill();
                    this.ctx.closePath();
                }
            }
        }
    }

    collisionDetection(): void {
        for(var c=0; c<this.brickFigure.bricks.length; c++) {
            for(var r=0; r<this.brickFigure.bricks[0].length; r++) {
                var b = this.brickFigure.bricks[c][r];
                if(b.status == 1) {
                    if(this.ball.x > b.x && this.ball.x < b.x+Brick.width
                        && this.ball.y > b.y && this.ball.y < b.y+Brick.height) {
                        this.ball.direction[1] *= -1;
                        b.status = 0;
                    }
                }
            }
        }
    }
}