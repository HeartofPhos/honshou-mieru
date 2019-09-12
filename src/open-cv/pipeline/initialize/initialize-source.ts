import { cv } from '../../open-cv-wrapper';

export const applyToPlanes = (target: any, f: (planes: any) => void) => {
  const tempPlanes = new cv.MatVector();
  cv.split(target, tempPlanes);

  f(tempPlanes);

  cv.merge(tempPlanes, target);

  tempPlanes.delete();
};

const ApplyToLightPlane = (target: any, f: (lightPlane: any) => void) => {
  cv.cvtColor(target, target, cv.COLOR_RGB2Lab, 0);
  applyToPlanes(target, planes => {
    f(planes.get(0));
  });
  cv.cvtColor(target, target, cv.COLOR_Lab2RGB, 0);
};

const CLAHE = (target: any, clipLimit: number, tileGridSize: number) => {
  const clahe = new cv.CLAHE(
    clipLimit,
    new cv.Size(tileGridSize, tileGridSize)
  );
  clahe.apply(target, target);
  clahe.delete();
};

const BilateralFilter = (
  targetMat: any,
  d: number,
  sigmaColor: number,
  sigmaSpace: number
) => {
  const bfMat = targetMat.clone();
  cv.bilateralFilter(
    bfMat,
    targetMat,
    d,
    sigmaColor,
    sigmaSpace,
    cv.BORDER_DEFAULT
  );
  bfMat.delete();
};

const Sharpen = (
  target: any,
  kernelSize: number,
  sigma: number,
  amount: number,
  threshold: number
) => {
  const blur = new cv.Mat();
  cv.GaussianBlur(
    target,
    blur,
    new cv.Size(kernelSize, kernelSize),
    sigma,
    sigma,
    cv.BORDER_DEFAULT
  );

  const sharpened = new cv.Mat();
  cv.addWeighted(target, 1 + amount, blur, -amount, 0, sharpened);

  const lowContrastMask = new cv.Mat();
  cv.absdiff(sharpened, blur, lowContrastMask);
  cv.threshold(
    lowContrastMask,
    lowContrastMask,
    threshold,
    threshold,
    cv.THRESH_TOZERO
  );
  target.copyTo(sharpened, lowContrastMask);
  sharpened.copyTo(target);

  sharpened.delete();
  lowContrastMask.delete();
  blur.delete();
};

export const InitializeSource = (original: any) => {
  const output = new cv.Mat();
  cv.cvtColor(original, output, cv.COLOR_RGBA2RGB, 0);

  BilateralFilter(output, 3, 50, 10);
  Sharpen(output, 11, 50, 0.5, 200);
  ApplyToLightPlane(output, lightPlane => {
    CLAHE(lightPlane, 100, 5);
  });
  BilateralFilter(output, 3, 50, 10);

  return output;
};
