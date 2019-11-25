export class Ball {
  radius: number;
  velocity: number;
  direction: number[] = [1, 1];
  x: number;
  y: number;
  color: string;
  constructor(radius: number, x: number, y: number, color: string) {
    this.radius = radius;
    this.velocity = 3;
    this.x = x;
    this.y = y;
    this.color = color;
  }

  // name mismatch? my "move" method performs drawing?
  move(ctx: CanvasRenderingContext2D): void {
    // it would be better to depend moving on global Time
    // then your system will not depend on fps
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;

    // placing this code inside ctx brackets is not good as i've already said
    this.x += this.velocity * this.direction[0];
    this.y += this.velocity * this.direction[1];
    ctx.fill();
    ctx.closePath();
  }

  // a little naming mismatch
  // here besides "border checking" u also do direction reverting
  // so it's better to name it smth like "processBorderCollision" or "processBounce"
  checkBorder(canvasWidth: number, canvasHeight: number): void {
    if (
      this.x + this.velocity > canvasWidth - this.radius ||
      this.x + this.velocity < this.radius
    ) {
      this.direction[0] *= -1;
    }
    if (this.y + this.velocity < this.radius || this.y > canvasHeight) {
      this.direction[1] *= -1;
    }
  }
}
