import Brick from './Brick';
import { IBrickFigure } from './IBrickFigure';

export class RectangleFigure implements IBrickFigure {
  brickColomns: number = 7;
  brickRows: number = 3;
  bricks: Brick[][] = []; // it's more laconically
  brickPadding: number = 30;
  brickOffsetTop: number = 30;
  brickOffsetLeft: number = 30;
  constructor() {
    this.placeBricks();
  }

  // u can introduce your collision logic for rectangle objects right here for:
  // board
  // bricks

  placeBricks(): void {
    // u do not really need to sign "c" as "number" here - it's obvious
    // good:
    // const myNumber = 1;
    // bad: (overdefined)
    // const myNumber : number = 1;
    for (var c: number = 0; c < this.brickColomns; c++) {
      this.bricks[c] = [];
      for (var r: number = 0; r < this.brickRows; r++) {
        var brickX =
          c * (Brick.width + this.brickPadding) + this.brickOffsetLeft;
        var brickY =
          r * (Brick.height + this.brickPadding) + this.brickOffsetTop;
        this.bricks[c][r] = new Brick(brickX, brickY, "#CC00CC");
      }
    }
  }
}
