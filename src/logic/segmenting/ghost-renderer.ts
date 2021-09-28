import { DynamicDrawable, CirclePixelBrush, Drawable } from '../drawing';
import { MaskType } from '../misc';

class GhostRenderer implements DynamicDrawable {
  private x: number;
  private y: number;
  private brush?: Drawable;
  private hideBrush: boolean;

  public onChange: (() => void)[];

  public constructor() {
    this.x = 0;
    this.y = 0;
    this.hideBrush = false;

    this.onChange = [];
  }

  public SetBrush(size: number, maskType: MaskType) {
    this.brush = this.CreateBrush(size, maskType);
    this.onChange.forEach((x) => x());
  }

  public ClearGhost() {
    this.x = 0;
    this.y = 0;
    this.hideBrush = true;
    this.onChange.forEach((x) => x());
  }

  public SetGhostPosition(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.hideBrush = false;
    this.onChange.forEach((x) => x());
  }

  public DrawToContext(x: number, y: number, target: CanvasRenderingContext2D) {
    if (this.brush && !this.hideBrush) {
      this.brush.DrawToContext(x + this.x, y + this.y, target);
    }
  }

  private CreateBrush(size: number, maskType: MaskType) {
    switch (maskType) {
      case MaskType.Background:
        return CirclePixelBrush(size, 'rgba(255,0,0,0.5)');
      case MaskType.Foreground:
        return CirclePixelBrush(size, 'rgba(0,255,0,0.5)');
      default:
        return CirclePixelBrush(size, 'rgba(0,0,255,0.5)');
    }
  }
}

export default GhostRenderer;
