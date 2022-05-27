import cv from '../../open-cv-wrapper';
import { SegmentState } from '..';

export const GrabCut = (state: SegmentState) => {
  try {
    const rect = new cv.Rect(0, 0, state.Width, state.Height);
    cv.grabCut(
      state.Source,
      state.GrabCut.Mask,
      rect,
      state.GrabCut.BackgroundModel,
      state.GrabCut.ForegroundModel,
      1,
      state.RunCount == 0 ? cv.GC_INIT_WITH_MASK : cv.GC_EVAL
    );
  } catch {
    console.log('grab cut failed');
  }
};
