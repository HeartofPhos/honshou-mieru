import { cv } from '../../open-cv-wrapper';
import { PipelineState } from '..';

const InterpretPair = (target: any, areaType: number, targetType: number) => {
  const targetData = target.data;

  const output = new cv.Mat(target.rows, target.cols, cv.CV_8UC1);
  output.setTo(new cv.Scalar(0));

  const targetMat = new cv.Mat(target.rows, target.cols, cv.CV_8UC1);
  const eitherMat = new cv.Mat(target.rows, target.cols, cv.CV_8UC1);

  const targetMatData = targetMat.data;
  const eitherMatData = eitherMat.data;
  for (let x = 0; x < target.cols; x++) {
    for (let y = 0; y < target.rows; y++) {
      const maskIndex = y * target.cols + x;
      const maskValue = targetData[maskIndex];

      if (maskValue == targetType) {
        targetMatData[maskIndex] = 255;
        eitherMatData[maskIndex] = 255;
      } else if (maskValue == areaType) {
        eitherMatData[maskIndex] = 255;
        targetMatData[maskIndex] = 0;
      } else {
        eitherMatData[maskIndex] = 0;
        targetMatData[maskIndex] = 0;
      }
    }
  }

  const tempMat = new cv.Mat(target.rows, target.cols, cv.CV_8UC1);
  const contours = new cv.MatVector();
  const hierarchy = new cv.Mat();
  cv.findContours(
    eitherMat,
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

    let mean = cv.mean(targetMat, tempMat);
    if (mean[0] == 0) {
      cv.drawContours(output, contours, i, markedColour, -1, cv.LINE_8);
    }
  }

  targetMat.delete();
  eitherMat.delete();
  tempMat.delete();
  contours.delete();
  hierarchy.delete();

  return output;
};

export const InterpretMask = (state: PipelineState) => {
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

  const clonedMaskMat = state.GrabCut.Mask.clone();
  const clonedMaskMatData = clonedMaskMat.data;
  const bgdResult = InterpretPair(clonedMaskMat, cv.GC_PR_BGD, cv.GC_BGD);
  const bgdResultData = bgdResult.data;
  for (let x = 0; x < state.Width; x++) {
    for (let y = 0; y < state.Height; y++) {
      const maskIndex = y * state.Width + x;
      if (bgdResultData[maskIndex] == 1) {
        if (maskMatData[maskIndex] == cv.GC_PR_BGD) {
          clonedMaskMatData[maskIndex] = cv.GC_PR_FGD;
        }
        outputMaskData[maskIndex] = 255;
      }
    }
  }

  const fgdResult = InterpretPair(clonedMaskMat, cv.GC_PR_FGD, cv.GC_FGD);
  const fgdResultData = fgdResult.data;
  for (let x = 0; x < state.Width; x++) {
    for (let y = 0; y < state.Height; y++) {
      let maskIndex = y * state.Width + x;
      if (fgdResultData[maskIndex] == 1) {
        outputMaskData[maskIndex] = 0;
      }
    }
  }

  bgdResult.delete();
  fgdResult.delete();
  clonedMaskMat.delete();
};
