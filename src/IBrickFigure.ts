import {Brick} from "./Brick"

export interface IBrickFigure{
    bricks: Brick[][];
    placeBricks(): void;  
}

// export class BrickFigure{   
//     brickColomns: number;
//     brickRows: number;
//     bricks: Brick[][];
//     constructor(){   

//     }

//     placeBricks(){ 
//         for(var c=0; c<this.brickColomns; c++) {
//             this.bricks[c] = [];
//             for(var r=0; r<this.brickRows; r++) {
//                 var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
//                 var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
//                 bricks[c][r].x = brickX;
//                 bricks[c][r].y = brickY;
//                 bricks[c][r] = { x: 0, y: 0, status: 1 };
//             }
//         }
//     }
// }