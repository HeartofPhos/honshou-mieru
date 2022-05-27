import { SegmentState } from '..';

const InterpretPair = (target: any, areaType: number, targetType: number) => {
  const targetData = target.data;

  const output = new cv.Mat(target.rows, target.cols, cv.CV_8UC1);
  output.setTo(new cv.Scalar(0));

  const targetTypeMat = new cv.Mat(target.rows, target.cols, cv.CV_8UC1);
  const eitherTypeMat = new cv.Mat(target.rows, target.cols, cv.CV_8UC1);

  const targetTypeData = targetTypeMat.data;
  const eitherTypeData = eitherTypeMat.data;
  for (let i = 0; i < targetData.length; i++) {
    const targetValue = targetData[i];
    if (targetValue == targetType) {
      targetTypeData[i] = 255;
      eitherTypeData[i] = 255;
    } else if (targetValue == areaType) {
      eitherTypeData[i] = 255;
      targetTypeData[i] = 0;
    } else {
      eitherTypeData[i] = 0;
      targetTypeData[i] = 0;
    }
  }
  const tempMat = new cv.Mat(target.rows, target.cols, cv.CV_8UC1);
  const contours = new cv.MatVector();
  const hierarchy = new cv.Mat();
  cv.findContours(
    eitherTypeMat,
    contours,
    hierarchy,
    cv.RETR_LIST,
    cv.CHAIN_APPROX_SIMPLE
  );

  const black = new cv.Scalar(0);
  const white = new cv.Scalar(255);

  const markedColour = new cv.Scalar(1);
  for (let i = 0; i < contours.size(); ++i) {
    tempMat.setTo(black);
    cv.drawContours(tempMat, contours, i, white, -1, cv.LINE_8);

    let mean = cv.mean(targetTypeMat, tempMat);
    if (mean[0] == 0) {
      cv.drawContours(output, contours, i, markedColour, -1, cv.LINE_8);
    }
  }

  targetTypeMat.delete();
  eitherTypeMat.delete();
  tempMat.delete();
  contours.delete();
  hierarchy.delete();

  return output;
};

const CloseUnmarkedSections = (state: SegmentState) => {
  const outputMaskData = state.OutputMask.data;
  const clonedMaskMat = state.GrabCut.Mask;
  const clonedMaskMatData = clonedMaskMat.data;

  const bgdResult = InterpretPair(clonedMaskMat, cv.GC_PR_BGD, cv.GC_BGD);
  const bgdResultData = bgdResult.data;
  for (let i = 0; i < bgdResultData.length; i++) {
    if (bgdResultData[i] == 1) {
      if (clonedMaskMatData[i] == cv.GC_PR_BGD) {
        clonedMaskMatData[i] = cv.GC_PR_FGD;
      }
      outputMaskData[i] = 255;
    }
  }

  const fgdResult = InterpretPair(clonedMaskMat, cv.GC_PR_FGD, cv.GC_FGD);
  const fgdResultData = fgdResult.data;
  for (let i = 0; i < fgdResultData.length; i++) {
    if (fgdResultData[i] == 1) {
      if (clonedMaskMatData[i] == cv.GC_PR_FGD) {
        clonedMaskMatData[i] = cv.GC_PR_BGD;
      }
      outputMaskData[i] = 0;
    }
  }

  bgdResult.delete();
  fgdResult.delete();
};

export const CloseGaps = (state: SegmentState) => {
  CloseUnmarkedSections(state);
};
