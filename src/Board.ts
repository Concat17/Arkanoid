import IDrawable from './IDrawable';

// just like that
export class Board implements IDrawable {
  width: number;
  height: number;
  velocity: number;
  direction: number[];
  x: number;
  y: number;
  color: string;

  // you mustn't place user controll handling inside model - it's incorrect
  leftPressed: boolean;
  rightPressed: boolean;

  constructor(
    width: number,
    height: number,
    x: number,
    y: number,
    color: string // here we have tslint and prettier mismatch (about trailing comma - we need to fix it some way)
  ) {
    this.width = width;
    this.height = height;
    this.velocity = 5;
    this.x = x;
    this.y = y;
    this.direction = [1, 1];
    this.color = color;
  }

  // need to implement interface over every draw method
  draw(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D): void {
    if (this.rightPressed) {
      this.x += 5;
      if (this.x + this.width > canvas.width) {
        this.x = canvas.width - this.width;
      }
    } else if (this.leftPressed) {
      this.x -= 5;
      if (this.x < 0) {
        this.x = 0;
      }
    }
    ctx.beginPath();
    ctx.rect(this.x, canvas.height - this.height * 2, this.width, this.height);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }
}
