import { DynamicDrawable } from '../drawing';
import { MaskType } from '../misc';
import PixelEditor from '../drawing/pixel-editor';

class MaskEditor implements DynamicDrawable {
  private pixelEditor: PixelEditor;

  public onChange: (() => void) | undefined;

  public constructor(width: number, height: number) {
    this.pixelEditor = new PixelEditor(width, height);
  }

  public SetBrush(size: number, maskType: MaskType) {
    this.pixelEditor.SetBrush(size, this.ColorFromMaskType(maskType));
  }

  public DrawMask(x: number, y: number) {
    this.pixelEditor.DrawPixels(x, y);
    if (this.onChange) this.onChange();
  }

  public DrawMaskLine(x0: number, y0: number, x1: number, y1: number) {
    this.pixelEditor.DrawPixelsLine(x0, y0, x1, y1);
    if (this.onChange) this.onChange();
  }

  public Draw(x: number, y: number, target: CanvasRenderingContext2D) {
    this.pixelEditor.Draw(x, y, target);
  }

  public GetData() {
    return this.pixelEditor.GetData();
  }

  private ColorFromMaskType(maskType: MaskType): string | null {
    switch (maskType) {
      case MaskType.Background:
        return 'rgba(255,0,0,0.5)';
      case MaskType.Foreground:
        return 'rgba(0,255,0,0.5)';
      default:
        return null;
    }
  }
}

export default MaskEditor;
