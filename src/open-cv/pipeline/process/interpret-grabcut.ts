import { cv } from '../../open-cv-wrapper';
import { SegmentState } from '..';

export const InterpretGrabcut = (state: SegmentState) => {
  const maskMatData = state.GrabCut.Mask.data;
  const outputMaskData = state.OutputMask.data;
  for (let x = 0; x < state.Width; x++) {
    for (let y = 0; y < state.Height; y++) {
      const maskIndex = y * state.Width + x;
      const maskValue = maskMatData[maskIndex];
      if (maskValue == cv.GC_BGD || maskValue == cv.GC_PR_BGD) {
        outputMaskData[maskIndex] = 0;
      } else {
        outputMaskData[maskIndex] = 255;
      }
    }
  }
};
