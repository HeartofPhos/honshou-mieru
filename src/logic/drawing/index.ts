import DetachedCanvas from './detached-canvas';

export * from './brushes';

export interface Drawable {
  DrawToContext(x: number, y: number, target: CanvasRenderingContext2D): void;
}

export interface DynamicDrawable extends Drawable {
  onChange: (() => void)[];
}

export class CachedImage implements Drawable {
  private detachedCanvas: DetachedCanvas;

  public constructor(imageData: ImageData) {
    this.detachedCanvas = new DetachedCanvas(imageData.width, imageData.height);
    this.detachedCanvas.ctx.putImageData(imageData, 0, 0);
  }

  public DrawToContext(x: number, y: number, target: CanvasRenderingContext2D) {
    target.drawImage(this.detachedCanvas.canvas, x, y);
  }
}

export class DynamicImage implements DynamicDrawable {
  private detachedCanvas: DetachedCanvas;

  public onChange: (() => void)[];

  public constructor() {
    this.detachedCanvas = new DetachedCanvas(0, 0);
    this.onChange = [];
  }

  public DrawToContext(x: number, y: number, target: CanvasRenderingContext2D) {
    target.drawImage(this.detachedCanvas.canvas, x, y);
  }

  public UpdateImage(imageData: ImageData) {
    this.detachedCanvas.canvas.width = imageData.width;
    this.detachedCanvas.canvas.height = imageData.height;

    this.detachedCanvas.ctx.putImageData(imageData, 0, 0);

    this.onChange.forEach(x => x());
  }

  public GetData() {
    return this.detachedCanvas.GetData();
  }

  public ToBlob() {
    return new Promise((resolve: (value: Blob) => void, reject) => {
      this.detachedCanvas.canvas.toBlob(blob => {
        if (blob) resolve(blob);
        else reject('Could not create blob');
      });
    });
  }
}
