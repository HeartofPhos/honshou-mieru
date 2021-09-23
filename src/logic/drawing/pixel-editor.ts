import {
  CircleClearBrush,
  CirclePixelBrush,
  Drawable,
  DrawLineToContext
} from '../../logic/drawing';
import DetachedCanvas from './detached-canvas';

class PixelEditor implements Drawable {
  private detachedCanvas: DetachedCanvas;
  private brush?: Drawable;

  public constructor(width: number, height: number) {
    this.detachedCanvas = new DetachedCanvas(width, height);
  }

  public SetBrush(size: number, color: string | null) {
    if (color) {
      this.brush = CirclePixelBrush(size, color);
    } else {
      this.brush = CircleClearBrush(size);
    }
  }

  public Draw(x: number, y: number) {
    if (!this.brush) return;
    this.brush.DrawToContext(x, y, this.detachedCanvas.ctx);
  }

  public DrawLine(x0: number, y0: number, x1: number, y1: number) {
    if (!this.brush) return;
    DrawLineToContext(x0, y0, x1, y1, this.detachedCanvas.ctx, this.brush);
  }

  public DrawToContext(x: number, y: number, target: CanvasRenderingContext2D) {
    this.detachedCanvas.DrawToContext(x, y, target);
  }

  public ClearPixels() {
    this.detachedCanvas.ClearPixels();
  }

  public GetData() {
    return this.detachedCanvas.GetData();
  }
}

export default PixelEditor;
