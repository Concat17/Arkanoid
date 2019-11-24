import { IBrickFigure } from "./IBrickFigure";
import { Brick } from "./Brick";

export class RectangleFigure implements IBrickFigure {
  brickColomns: number = 7;
  brickRows: number = 3;
  bricks: Brick[][] = new Array();
  brickPadding: number = 30;
  brickOffsetTop: number = 30;
  brickOffsetLeft: number = 30;
  constructor() {
    this.placeBricks();
  }

  placeBricks(): void {
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
