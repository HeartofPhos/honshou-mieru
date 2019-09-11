export * from './brushes';

export interface Drawable {
  Draw(x: number, y: number, target: CanvasRenderingContext2D): void;
}

export class CachedImage implements Drawable {
  private _width: number;
  private _height: number;

  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;

  public constructor(imageData: ImageData) {
    this._width = imageData.width;
    this._height = imageData.height;

    this.canvas = document.createElement('canvas');
    this.canvas.width = this._width;
    this.canvas.height = this._height;

    let ctx = this.canvas.getContext('2d');
    if (!ctx) throw 'Could not create CanvasRenderingContext2D';
    this.ctx = ctx;

    ctx.putImageData(imageData, 0, 0);
  }

  public get width() {
    return this._width;
  }
  public get height() {
    return this._height;
  }

  public Draw(x: number, y: number, target: CanvasRenderingContext2D) {
    target.drawImage(this.canvas, x, y);
  }
}
