import cv from '../../open-cv-wrapper';
import { SegmentState } from '..';

export const BuildEdges = (state: SegmentState): Int32Array[] => {
  const contours = new cv.MatVector();
  const hierarchy = new cv.Mat();
  cv.findContours(
    state.OutputMask,
    contours,
    hierarchy,
    cv.RETR_LIST,
    cv.CHAIN_APPROX_SIMPLE
  );

  const output: Int32Array[] = [];
  for (let i = 0; i < contours.size(); ++i) {
    output.push(contours.get(i).data32S.slice(0));
  }

  contours.delete();
  hierarchy.delete();

  return output;
};

export const BuildResult = (state: SegmentState): Uint8ClampedArray => {
  const originalData = state.Original.data;
  const output = new Uint8ClampedArray(originalData.slice(0));

  const outputMaskData = state.OutputMask.data;
  for (let x = 0; x < state.Width; x++) {
    for (let y = 0; y < state.Height; y++) {
      const outputIndex = y * state.Width * 4 + x * 4;
      const outputMaskValue = outputMaskData[y * state.Width + x];
      output[outputIndex + 3] = outputMaskValue;
    }
  }

  return output;
};
