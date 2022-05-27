import { SegmentState } from '..';

export const InterpretGrabcut = (state: SegmentState) => {
  const maskMatData = state.GrabCut.Mask.data;
  const outputMaskData = state.OutputMask.data;

  for (let i = 0; i < maskMatData.length; i++) {
    const maskValue = maskMatData[i];
    if (maskValue == cv.GC_BGD || maskValue == cv.GC_PR_BGD) {
      outputMaskData[i] = 0;
    } else {
      outputMaskData[i] = 255;
    }
  }
};
