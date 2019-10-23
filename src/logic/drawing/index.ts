export * from './brushes';

export interface Drawable {
  Draw(x: number, y: number, target: CanvasRenderingContext2D): void;
}
export interface DynamicDrawable extends Drawable {
  onChange: (() => void)[];
}

export class CachedImage implements Drawable {
  private _width: number;
  private _height: number;

  private canvas: HTMLCanvasElement;

  public constructor(imageData: ImageData) {
    this._width = imageData.width;
    this._height = imageData.height;

    this.canvas = document.createElement('canvas');
    this.canvas.width = this._width;
    this.canvas.height = this._height;

    let ctx = this.canvas.getContext('2d');
    if (!ctx) throw 'Could not create CanvasRenderingContext2D';
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

export class DynamicImage implements DynamicDrawable {
  private _width: number;
  private _height: number;
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;

  public onChange: (() => void)[];

  public constructor() {
    this._width = 0;
    this._height = 0;
    this.canvas = document.createElement('canvas');
    const ctx = this.canvas.getContext('2d');
    if (!ctx) throw 'Could not create CanvasRenderingContext2D';
    this.ctx = ctx;

    this.onChange = [];
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

  public UpdateImage(imageData: ImageData) {
    this._width = imageData.width;
    this._height = imageData.height;

    this.canvas.width = this._width;
    this.canvas.height = this._height;

    this.ctx.putImageData(imageData, 0, 0);

    this.onChange.forEach(x => x());
  }

  public GetData() {
    return this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
  }

  public ToBlob() {
    return new Promise((resolve: (value: Blob) => void, reject) => {
      this.canvas.toBlob(blob => {
        if (blob) resolve(blob);
        else reject('Could not create blob');
      });
    });
  }
}
