import {
  Brush,
  CircleClearBrush,
  CirclePixelBrush,
  Drawable
} from '../../logic/drawing';

class MaskEditor implements Drawable {
  private maskCanvas: HTMLCanvasElement;
  private maskCtx: CanvasRenderingContext2D;
  private brush: Brush | null;

  public constructor(width: number, height: number) {
    this.maskCanvas = document.createElement('canvas');
    this.maskCanvas.width = width;
    this.maskCanvas.height = height;

    let maskCtx = this.maskCanvas.getContext('2d');
    if (!maskCtx) throw 'Could not create CanvasRenderingContext2D';
    this.maskCtx = maskCtx;

    this.brush = null;
  }

  public SetBrush(size: number, color: string | null) {
    if (color) {
      this.brush = new CirclePixelBrush(size, color);
    } else {
      this.brush = new CircleClearBrush(size);
    }
  }

  public DrawMask(x: number, y: number) {
    if (!this.brush) return;

    this.brush.Draw(x, y, this.maskCtx);
  }

  public DrawMaskLine(x0: number, y0: number, x1: number, y1: number) {
    if (!this.brush) return;

    this.brush.DrawLine(x0, y0, x1, y1, this.maskCtx);
  }

  public Draw(x: number, y: number, target: CanvasRenderingContext2D) {
    target.drawImage(this.maskCanvas, x, y);
  }

  public GetData() {
    return this.maskCtx.getImageData(
      0,
      0,
      this.maskCanvas.width,
      this.maskCanvas.height
    );
  }
}

export default MaskEditor;
