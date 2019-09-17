import { cv } from '../../open-cv-wrapper';

const ApplyToPlanes = (target: any, f: (planes: any) => void) => {
  const tempPlanes = new cv.MatVector();
  cv.split(target, tempPlanes);

  f(tempPlanes);

  cv.merge(tempPlanes, target);

  tempPlanes.delete();
};

const ApplyToLightPlane = (target: any, f: (lightPlane: any) => void) => {
  cv.cvtColor(target, target, cv.COLOR_RGB2Lab, 0);
  ApplyToPlanes(target, planes => {
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

const KMeans = (
  target: any,
  clusterCount: number,
  epsilon: number,
  maxIterations: number,
  attempts: number
) => {
  const targetData = target.data;
  const sample = new cv.Mat(target.rows * target.cols, 3, cv.CV_32F);
  const sampleData = sample.data32F;

  for (let y = 0; y < target.rows; y++) {
    for (let x = 0; x < target.cols; x++) {
      const targetIndex = y * target.cols * 3 + x * 3;
      const sampleIndex = x * target.rows * 3 + y * 3;

      sampleData[sampleIndex] = targetData[targetIndex];
      sampleData[sampleIndex + 1] = targetData[targetIndex + 1];
      sampleData[sampleIndex + 2] = targetData[targetIndex + 2];
    }
  }

  const labels = new cv.Mat();
  const criteria = new cv.TermCriteria(
    cv.TermCriteria_EPS + cv.TermCriteria_MAX_ITER,
    maxIterations,
    epsilon
  );
  const centers = new cv.Mat();

  cv.kmeans(
    sample,
    clusterCount,
    labels,
    criteria,
    attempts,
    cv.KMEANS_PP_CENTERS,
    centers
  );

  const labelsData = labels.data32S;
  const centersData = centers.data32F;
  for (let y = 0; y < target.rows; y++) {
    for (let x = 0; x < target.cols; x++) {
      const targetIndex = y * target.cols * 3 + x * 3;
      const labelsIndex = y + x * target.rows;
      const centersIndex = labelsData[labelsIndex] * centers.cols;

      targetData[targetIndex + 0] = centersData[centersIndex + 0];
      targetData[targetIndex + 1] = centersData[centersIndex + 1];
      targetData[targetIndex + 2] = centersData[centersIndex + 2];
      // targetData[targetIndex + 3] = 255;
    }
  }
  sample.delete();
  labels.delete();
  centers.delete();
};

export const InitializeSource = (original: any) => {
  const output = new cv.Mat();
  cv.cvtColor(original, output, cv.COLOR_RGBA2RGB, 0);

  ApplyToLightPlane(output, lightPlane => {
    CLAHE(lightPlane, 4, 16);
  });
  Sharpen(output, 11, 150, 0.5, 255);
  KMeans(output, 16, 0.0001, 10000, 1);
  BilateralFilter(output, 5, 50, 10);

  return output;
};
