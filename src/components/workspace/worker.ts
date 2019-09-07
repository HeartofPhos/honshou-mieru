//@ts-ignore
import cv = require('../../open-cv/opencv.js');

const ctx: Worker = self as any;

cv.onRuntimeInitialized = async () => {
  ctx.postMessage({ action: 'ready' });
};

interface GrabCutOutput {
  width: number;
  height: number;
  array: Uint8ClampedArray;
}

class GrabCutWorker {
  private originalMat: any;
  private srcMat: any;
  private maskMat: any;

  private bgdModel: any;
  private fgdModel: any;

  public constructor(buffer: ArrayBuffer, width: number, height: number) {
    this.originalMat = cv.matFromImageData(
      new ImageData(new Uint8ClampedArray(buffer), width, height)
    );
    this.srcMat = new cv.Mat();
    cv.cvtColor(this.originalMat, this.srcMat, cv.COLOR_RGBA2RGB, 0);

    this.maskMat = new cv.Mat(height, width, cv.CV_8UC1);
    this.maskMat.setTo([
      cv.GC_PR_BGD,
      cv.GC_PR_BGD,
      cv.GC_PR_BGD,
      cv.GC_PR_BGD
    ]);

    this.bgdModel = new cv.Mat();
    this.fgdModel = new cv.Mat();
  }

  public Dispose() {
    this.originalMat.delete();
    this.srcMat.delete();
    this.maskMat.delete();
    this.bgdModel.delete();
    this.fgdModel.delete();
  }

  public GrabCut(
    buffer: ArrayBuffer,
    width: number,
    height: number
  ): GrabCutOutput {
    let t0 = performance.now();
    const data = new Uint8ClampedArray(buffer);

    let maskMatData = this.maskMat.data;
    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        let index = y * width * 4 + x * 4;
        let maskIndex = y * width + x;

        if (data[index] == 255) {
          //Red == 255
          maskMatData[maskIndex] = cv.GC_BGD;
        } else if (data[index + 1] == 255) {
          //Green == 255
          maskMatData[maskIndex] = cv.GC_FGD;
        } else if (data[index + 3] == 0) {
          //Alpha == 0
          maskMatData[maskIndex] = cv.GC_PR_BGD;
        }
      }
    }

    let rect = new cv.Rect(0, 0, 1, 1);

    let gc0 = performance.now();
    cv.grabCut(
      this.srcMat,
      this.maskMat,
      rect,
      this.bgdModel,
      this.fgdModel,
      1,
      cv.GC_INIT_WITH_MASK
    );
    let gc1 = performance.now();
    let gc = gc1 - gc0;
    console.log(`GrabCut: ${gc}ms`);

    let orginalMatData = this.originalMat.data;
    const outputImageData = new Uint8ClampedArray(orginalMatData.slice(0));

    for (let x = 0; x < this.srcMat.cols; x++) {
      for (let y = 0; y < this.srcMat.rows; y++) {
        let index = y * width * 4 + x * 4;
        let maskIndex = y * width + x;
        let maskValue = maskMatData[maskIndex];

        if (maskValue == cv.GC_BGD || maskValue == cv.GC_PR_BGD) {
          outputImageData[index + 3] = 0;
        }
      }
    }
    let t1 = performance.now();
    let t = t1 - t0;
    console.log(`Total: ${t}ms`);

    console.log(`Delta: ${t - gc}ms`);
    return {
      width: this.srcMat.cols,
      height: this.srcMat.rows,
      array: outputImageData
    };
  }
}

let grabCutWorker: GrabCutWorker | null = null;
ctx.addEventListener('message', evt => {
  switch (evt.data.action) {
    case 'initialize':
      {
        if (grabCutWorker == null) {
          grabCutWorker = new GrabCutWorker(
            evt.data.buffer,
            evt.data.width,
            evt.data.height
          );
        }
      }
      break;
    case 'mask-updated':
      {
        if (grabCutWorker != null) {
          const result = grabCutWorker.GrabCut(
            evt.data.buffer,
            evt.data.width,
            evt.data.height
          );

          ctx.postMessage(
            {
              action: 'result-updated',
              buffer: result.array.buffer,
              width: result.width,
              height: result.height
            },
            [result.array.buffer]
          );
        }
      }
      break;
    case 'dispose':
      {
        if (grabCutWorker != null) {
          grabCutWorker.Dispose();
          grabCutWorker = null;
        }
        ctx.terminate();
      }
      break;
  }
});
