import { cv } from '../../open-cv-wrapper';
import { SegmentState, SegmentOutput } from '..';

const BuildEdges = (state: SegmentState) => {
  const edgeMat = cv.Mat.zeros(state.Height, state.Width, cv.CV_8UC4);
  const contours = new cv.MatVector();
  const hierarchy = new cv.Mat();
  cv.findContours(
    state.OutputMask,
    contours,
    hierarchy,
    cv.RETR_LIST,
    cv.CHAIN_APPROX_SIMPLE
  );

  let edgeColor = new cv.Scalar(255, 255, 0, 255);
  for (let i = 0; i < contours.size(); ++i) {
    cv.drawContours(
      edgeMat,
      contours,
      i,
      edgeColor,
      1,
      cv.LINE_8,
      hierarchy,
      100
    );
  }

  const output = edgeMat.data.slice(0);

  edgeMat.delete();
  contours.delete();
  hierarchy.delete();

  return output;
};

export const BuildOutput = (state: SegmentState): SegmentOutput => {
  const orginalMatData = state.Original.data;

  const output = {
    resultArray: new Uint8ClampedArray(orginalMatData.slice(0)),
    edgeArray: BuildEdges(state)
  };

  const data = state.OutputMask.data;
  for (let x = 0; x < state.Width; x++) {
    for (let y = 0; y < state.Height; y++) {
      const index = y * state.Width * 4 + x * 4;
      const value = data[y * state.Width + x];

      if (value < 127) {
        output.resultArray[index + 3] = 0;
      }
    }
  }

  return output;
};
