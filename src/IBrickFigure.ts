import Brick from './Brick';

export interface IBrickFigure {
  bricks: Brick[][];
  placeBricks(): void;
}
