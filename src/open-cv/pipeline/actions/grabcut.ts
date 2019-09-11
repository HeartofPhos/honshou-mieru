import { cv } from '../../open-cv-wrapper';
import { PipelineState } from '..';

export const GrabCut = (state: PipelineState) => {
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
