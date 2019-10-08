import { cv } from '../../open-cv-wrapper';
import { SegmentState } from '..';

export const BorderMatting = (state: SegmentState) => {
  const contours = new cv.MatVector();
  const hierarchy = new cv.Mat();
  cv.findContours(
    state.OutputMask,
    contours,
    hierarchy,
    cv.RETR_CCOMP,
    cv.CHAIN_APPROX_SIMPLE
  );

  const hierarchyData = hierarchy.data32S;
  const OutputMaskData = state.OutputMask.data;
  const unknownRegionData = state.UnknownRegion.Mask.data;
  for (let x = 0; x < state.Width; x++) {
    for (let y = 0; y < state.Height; y++) {
      const maskIndex = y * state.Width + x;
      if (unknownRegionData[maskIndex] != 255) continue;

      const point = new cv.Point(x, y);
      let current = Number.POSITIVE_INFINITY;
      for (let hIndex = 0; hIndex < hierarchy.cols; hIndex++) {
        const hierarchyIndex = hIndex * 4;

        const direction = hierarchyData[hierarchyIndex + 3] == -1 ? 1 : -1;
        const distance =
          cv.pointPolygonTest(contours.get(hIndex), point, true) * direction;
        if (Math.abs(distance) < Math.abs(current)) {
          current = distance;
        }
      }

      current = state.UnknownRegion.Size / 2 + current;
      const interp =
        Math.min(state.UnknownRegion.Size, Math.max(0, current)) /
        state.UnknownRegion.Size;

      const newMaskValue = Math.floor(255 * interp);
      OutputMaskData[maskIndex] = newMaskValue;
    }
  }

  contours.delete();
  hierarchy.delete();
};
