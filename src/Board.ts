export class Board{
    width: number;
    height: number;
    velocity: number;
    direction: number[];
    x: number;
    y: number;
    color: string;
    leftPressed: boolean;
    rightPressed: boolean;

    constructor(width: number, height:number, x: number, y: number, color:string){
        this.width = width;
        this.height = height;
        this.velocity = 5;
        this.x = x;
        this.y = y;
        this.direction = [1, 1]
        this.color = color; 
    }

    draw(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D): void{
        if(this.rightPressed) {
            this.x += 5;
            if (this.x + this.width > canvas.width){
                this.x = canvas.width - this.width;
            }
        }
        else if(this.leftPressed) {
            this.x -= 5;
            if (this.x < 0){
                this.x = 0;
            }
        }
        ctx.beginPath();
        ctx.rect(this.x, canvas.height-this.height * 2, this.width, this.height);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }

    // dontmove(ctx: CanvasRenderingContext2D): void{
    //     ctx.fillStyle = this.color;
    //     ctx.fillRect(this.dx, this.dy, this.size * 5, this.size); 
    // }

    // moveRight(ctx: CanvasRenderingContext2D): void { 
    //     ctx.fillStyle = this.color;
    //     this.dx += this.velocity; 
    //     ctx.fillRect(this.dx, this.dy, this.size * 5, this.size); 
    // }

    // moveLeft(ctx: CanvasRenderingContext2D): void { 
    //     ctx.fillStyle = this.color;
    //     this.dx -= this.velocity; 
    //     ctx.fillRect(this.dx, this.dy, this.size * 5, this.size); 
    // }
}