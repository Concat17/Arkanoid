export class Brick {
  x: number;
  y: number;
  static width: number = 50;
  static height: number = 15;
  status: number;
  color: string;
  constructor(x: number, y: number, color: string) {
    this.x = x;
    this.y = y;
    this.status = 1;
    this.color = color;
  }

  draw(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D): void {
    ctx.beginPath();
    ctx.rect(
      this.x,
      canvas.height - Brick.height * 2,
      Brick.width,
      Brick.height
    );
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }
}
