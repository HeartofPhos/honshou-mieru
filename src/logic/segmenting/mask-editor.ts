import { DynamicDrawable } from '../drawing';
import { MaskType } from '../misc';
import PixelEditor from '../drawing/pixel-editor';

class MaskEditor implements DynamicDrawable {
  private pixelEditor: PixelEditor;

  public onChange: (() => void)[];

  public constructor(width: number, height: number) {
    this.pixelEditor = new PixelEditor(width, height);

    this.onChange = [];
  }

  public SetBrush(size: number, maskType: MaskType) {
    this.pixelEditor.SetBrush(size, this.ColorFromMaskType(maskType));
  }

  public Draw(x: number, y: number) {
    this.pixelEditor.Draw(x, y);
    this.onChange.forEach(x => x());
  }

  public DrawLine(x0: number, y0: number, x1: number, y1: number) {
    this.pixelEditor.DrawLine(x0, y0, x1, y1);
    this.onChange.forEach(x => x());
  }

  public DrawToContext(x: number, y: number, target: CanvasRenderingContext2D) {
    this.pixelEditor.DrawToContext(x, y, target);
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
