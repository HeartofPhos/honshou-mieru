import { DynamicDrawable } from '../drawing';
import { MaskType } from '../misc';
import PixelEditor from '../drawing/pixel-editor';

class GhostRenderer implements DynamicDrawable {
  private pixelEditor: PixelEditor;
  private x: number;
  private y: number;

  public onChange: (() => void) | undefined;

  public constructor(width: number, height: number) {
    this.pixelEditor = new PixelEditor(width, height);
    this.x = 0;
    this.y = 0;
  }

  public SetBrush(size: number, maskType: MaskType) {
    this.pixelEditor.SetBrush(size, this.ColorFromMaskType(maskType));
    this.UpdateGhost();
  }

  public ClearGhost() {
    this.x = 0;
    this.y = 0;
    this.pixelEditor.ClearPixels();
    if (this.onChange) this.onChange();
  }

  public SetGhostPosition(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.UpdateGhost();
  }

  private UpdateGhost() {
    this.pixelEditor.ClearPixels();
    this.pixelEditor.DrawPixels(this.x, this.y);
    if (this.onChange) this.onChange();
  }

  public Draw(x: number, y: number, target: CanvasRenderingContext2D) {
    this.pixelEditor.Draw(x, y, target);
  }

  private ColorFromMaskType(maskType: MaskType): string | null {
    switch (maskType) {
      case MaskType.Background:
        return 'rgba(255,0,0,0.5)';
      case MaskType.Foreground:
        return 'rgba(0,255,0,0.5)';
      default:
        return 'rgba(0,0,255,0.5)';
    }
  }
}

export default GhostRenderer;
