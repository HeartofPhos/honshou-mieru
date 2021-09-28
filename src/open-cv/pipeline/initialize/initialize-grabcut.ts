import { cv } from '../../open-cv-wrapper';
import { GrabCutState } from '..';

export const InitializeGrabCut = (
  width: number,
  height: number
): GrabCutState => {
  const mask = new cv.Mat(height, width, cv.CV_8UC1);
  mask.setTo(new cv.Scalar(cv.GC_PR_BGD));

  const bgdModel = new cv.Mat();
  const fgdModel = new cv.Mat();

  return {
    Mask: mask,
    BackgroundModel: bgdModel,
    ForegroundModel: fgdModel,
  };
};
