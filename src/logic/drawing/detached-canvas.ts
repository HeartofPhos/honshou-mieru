import { Drawable } from '../../logic/drawing';

export default class DetachedCanvas implements Drawable {
  public canvas: HTMLCanvasElement;
  public ctx: CanvasRenderingContext2D;

  public constructor(width: number, height: number) {
    this.canvas = document.createElement('canvas');
    this.canvas.width = width;
    this.canvas.height = height;

    let pixelCtx = this.canvas.getContext('2d');
    if (!pixelCtx) throw 'Could not create CanvasRenderingContext2D';
    this.ctx = pixelCtx;
  }

  public Draw(x: number, y: number, target: CanvasRenderingContext2D) {
    target.drawImage(this.canvas, x, y);
  }

  public ClearPixels() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  public GetData() {
    return this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
  }
}
