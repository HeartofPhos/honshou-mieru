import { SegmentState } from '..';

export const CalculateUnknownRegion = (state: SegmentState) => {
  const M = cv.Mat.ones(
    state.UnknownRegion.Size,
    state.UnknownRegion.Size,
    cv.CV_8U
  );
  cv.morphologyEx(
    state.OutputMask,
    state.UnknownRegion.Mask,
    cv.MORPH_GRADIENT,
    M
  );
  M.delete();
};
