import {
  Drawable,
  CachedImage,
  DynamicDrawable,
  DynamicImage
} from '../drawing';
import GrabCutWorkerWrapper from './worker/worker-wrapper';
import MaskEditor from './mask-editor';
import GhostRenderer from './ghost-renderer';
import EdgeRenderer from './edge-renderer';

export default class SegmentWrapper {
  private sourceImage: CachedImage;
  private resultImage: DynamicImage;
  private maskEditor: MaskEditor;
  private edgeRenderer: EdgeRenderer;
  private ghostRenderer: GhostRenderer;
  private targetScale: number;
  private worker: GrabCutWorkerWrapper;

  public get SourceImage(): Drawable {
    return this.sourceImage;
  }
  public get ResultDrawable(): DynamicDrawable {
    return this.resultImage;
  }
  public get EdgeDrawable(): DynamicDrawable {
    return this.edgeRenderer;
  }
  public get MaskEditor(): MaskEditor {
    return this.maskEditor;
  }
  public get GhostRenderer(): GhostRenderer {
    return this.ghostRenderer;
  }

  public constructor(srcImageData: ImageData) {
    this.sourceImage = new CachedImage(srcImageData);
    this.resultImage = new DynamicImage();
    this.maskEditor = new MaskEditor(srcImageData.width, srcImageData.height);
    this.edgeRenderer = new EdgeRenderer();
    this.ghostRenderer = new GhostRenderer(
      srcImageData.width,
      srcImageData.height
    );

    this.targetScale = 1;

    this.worker = new GrabCutWorkerWrapper(
      srcImageData,
      (resultImageData, edgeArray) => {
        this.resultImage.UpdateImage(resultImageData);
        this.edgeRenderer.UpdateEdgeArray(edgeArray);
      }
    );
  }

  public Segment() {
    this.worker.UpdateMask(this.maskEditor.GetData());
  }

  public UpdateTargetScale(scale: number) {
    this.targetScale = scale;
    this.edgeRenderer.UpdateLineWidth(2.5 / this.targetScale);
  }

  public Dispose() {
    this.worker.Dispose();
  }
}
