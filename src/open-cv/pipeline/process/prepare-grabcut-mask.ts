import { cv } from '../../open-cv-wrapper';
import { SegmentState } from '..';

export const PrepareGrabcutMask = (
  state: SegmentState,
  maskImageBuffer: ArrayBuffer
) => {
  const maskMatData = state.GrabCut.Mask.data;

  const data = new Uint8ClampedArray(maskImageBuffer);
  for (let x = 0; x < state.Width; x++) {
    for (let y = 0; y < state.Height; y++) {
      const index = y * state.Width * 4 + x * 4;
      const maskIndex = y * state.Width + x;

      if (data[index] == 255) {
        //Red == 255
        maskMatData[maskIndex] = cv.GC_BGD;
      } else if (data[index + 1] == 255) {
        //Green == 255
        maskMatData[maskIndex] = cv.GC_FGD;
      } else if (data[index + 3] == 0) {
        //Alpha == 0

        if (maskMatData[maskIndex] == cv.GC_FGD) {
          maskMatData[maskIndex] = cv.GC_PR_FGD;
        } else if (maskMatData[maskIndex] == cv.GC_BGD) {
          maskMatData[maskIndex] = cv.GC_PR_BGD;
        } else {
          // maskMatData[maskIndex] = cv.GC_PR_BGD;
        }
      }
    }
  }
};
