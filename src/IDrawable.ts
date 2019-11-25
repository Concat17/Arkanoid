export default interface IDrawable {
  draw(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D): void;
}
