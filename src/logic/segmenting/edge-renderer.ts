import DetachedCanvas from '../drawing/detached-canvas';
import { DynamicDrawable } from '../drawing';

export default class EdgeRenderer implements DynamicDrawable {
  private edgeArray: Int32Array[] | undefined;
  private lineWidth: number | undefined;

  public onChange: (() => void) | undefined;

  public UpdateEdgeArray(edgeArray: Int32Array[]) {
    this.edgeArray = edgeArray;
    if (this.onChange) this.onChange();
  }

  public UpdateLineWidth(lineWidth: number) {
    this.lineWidth = lineWidth;
  }

  public Draw(x: number, y: number, target: CanvasRenderingContext2D) {
    if (this.edgeArray && this.lineWidth) {
      target.lineWidth = this.lineWidth;
      target.strokeStyle = 'yellow';
      for (let i = 0; i < this.edgeArray.length; i++) {
        const edges = this.edgeArray[i];

        target.beginPath();
        target.moveTo(x + edges[0] + 0.5, y + edges[1] + 0.5);
        for (let j = 2; j < edges.length + 2; j += 2) {
          target.lineTo(
            edges[j % edges.length] + 0.5,
            edges[(j + 1) % edges.length] + 0.5
          );
        }
        target.stroke();
      }
    }
  }
}
