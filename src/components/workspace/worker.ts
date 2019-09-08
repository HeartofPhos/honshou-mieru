//@ts-ignore
import cv = require('../../open-cv/opencv.js');
const ctx = self as any;

cv.onRuntimeInitialized = async () => {
  ctx.postMessage({ action: 'ready' });
};

interface GrabCutOutput {
  width: number;
  height: number;
  resultArray: Uint8ClampedArray;
  edgeArray: Uint8ClampedArray;
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
    const resultArray = new Uint8ClampedArray(orginalMatData.slice(0));
    const edgeArray = new Uint8ClampedArray(width * height * 4);

    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        let index = y * width * 4 + x * 4;
        let maskValue = maskMatData[y * width + x];

        if (maskValue == cv.GC_BGD || maskValue == cv.GC_PR_BGD) {
          resultArray[index + 3] = 0;

          let touching = false;
          if (x > 0) {
            let leftValue = maskMatData[y * width + (x - 1)];
            if (leftValue == cv.GC_FGD || leftValue == cv.GC_PR_FGD) {
              touching = true;
            }
          }
          if (x < width - 1) {
            let rightValue = maskMatData[y * width + (x + 1)];
            if (rightValue == cv.GC_FGD || rightValue == cv.GC_PR_FGD) {
              touching = true;
            }
          }
          if (y > 0) {
            let topValue = maskMatData[(y - 1) * width + x];
            if (topValue == cv.GC_FGD || topValue == cv.GC_PR_FGD) {
              touching = true;
            }
          }
          if (y < height - 1) {
            let bottomValue = maskMatData[(y + 1) * width + x];
            if (bottomValue == cv.GC_FGD || bottomValue == cv.GC_PR_FGD) {
              touching = true;
            }
          }

          if (touching) {
            edgeArray[index + 0] = 255;
            edgeArray[index + 1] = 255;
            edgeArray[index + 3] = 255;
          }
        }
      }
    }
    let t1 = performance.now();
    let t = t1 - t0;
    console.log(`Total: ${t}ms`);

    console.log(`Delta: ${t - gc}ms`);
    return {
      width: width,
      height: height,
      resultArray: resultArray,
      edgeArray: edgeArray
    };
  }
}

let grabCutWorker: GrabCutWorker | null = null;
ctx.addEventListener('message', (evt: any) => {
  switch (evt.data.action) {
    case 'initialize':
      {
        if (grabCutWorker == null) {
          grabCutWorker = new GrabCutWorker(
            evt.data.sourceBuffer,
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
            evt.data.maskBuffer,
            evt.data.width,
            evt.data.height
          );

          ctx.postMessage(
            {
              action: 'result-updated',
              resultBuffer: result.resultArray.buffer,
              edgeBuffer: result.edgeArray.buffer,
              width: result.width,
              height: result.height
            },
            [result.resultArray.buffer, result.edgeArray.buffer]
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
        ctx.close();
      }
      break;
  }
});
