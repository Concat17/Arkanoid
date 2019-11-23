export class Ball{
    radius: number
    velocity: number
    direction: number[] = [1, 1]
    x: number
    y: number
    color: string
    constructor(radius: number, x: number, y: number, color:string){
        this.radius = radius;
        this.velocity = 3;
        this.x = x;
        this.y = y; 
        this.color = color;
    }

    move(ctx: CanvasRenderingContext2D): void{  
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2);
        ctx.fillStyle = this.color;
        this.x += this.velocity * this.direction[0];
        this.y += this.velocity * this.direction[1];  
        ctx.fill();
        ctx.closePath(); 
    }

    checkBorder(canvasWidth: number, canvasHeight: number) : void{
        if(this.x + this.velocity > canvasWidth- this.radius || this.x + this.velocity < this.radius){
            this.direction[0] *= -1
        }
        if(this.y + this.velocity < this.radius|| this.y > canvasHeight){
            this.direction[1] *= -1
        }  
    } 

    reverseDirection() : void{
        this.direction[0] *= -1
        this.direction[1] *= -1
    }
}