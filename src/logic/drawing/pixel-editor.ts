import {
  Brush,
  CircleClearBrush,
  CirclePixelBrush,
  Drawable
} from '../../logic/drawing';
import DetachedCanvas from './detached-canvas';

class PixelEditor implements Drawable {
  private detachedCanvas: DetachedCanvas;
  private brush?: Brush;

  public constructor(width: number, height: number) {
    this.detachedCanvas = new DetachedCanvas(width, height);
  }

  public SetBrush(size: number, color: string | null) {
    if (color) {
      this.brush = new CirclePixelBrush(size, color);
    } else {
      this.brush = new CircleClearBrush(size);
    }
  }

  public DrawPixels(x: number, y: number) {
    if (!this.brush) return;
    this.brush.Draw(x, y, this.detachedCanvas.ctx);
  }

  public DrawPixelsLine(x0: number, y0: number, x1: number, y1: number) {
    if (!this.brush) return;
    this.brush.DrawLine(x0, y0, x1, y1, this.detachedCanvas.ctx);
  }

  public Draw(x: number, y: number, target: CanvasRenderingContext2D) {
    this.detachedCanvas.Draw(x, y, target);
  }

  public ClearPixels() {
    this.detachedCanvas.ClearPixels();
  }

  public GetData() {
    return this.detachedCanvas.GetData();
  }
}

export default PixelEditor;
