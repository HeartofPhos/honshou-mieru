import cv from '../open-cv-wrapper';

export const ApplyToPlanes = (target: any, f: (planes: any) => void) => {
  const tempPlanes = new cv.MatVector();
  cv.split(target, tempPlanes);

  f(tempPlanes);

  cv.merge(tempPlanes, target);

  tempPlanes.delete();
};
