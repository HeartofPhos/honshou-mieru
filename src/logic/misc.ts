import ndarray = require('ndarray');

export const BuildImageData = (imageArray: ndarray): ImageData => {
  const imageData = new ImageData(imageArray.shape[0], imageArray.shape[1]);
  let xMax = imageArray.shape[0];
  let yMax = imageArray.shape[1];
  for (let x = 0; x < xMax; x++) {
    for (let y = 0; y < yMax; y++) {
      let i = y * xMax * 4 + x * 4;
      imageData.data[i] = imageArray.get(x, y, 0);
      imageData.data[i + 1] = imageArray.get(x, y, 1);
      imageData.data[i + 2] = imageArray.get(x, y, 2);
      imageData.data[i + 3] = imageArray.get(x, y, 3);
    }
  }

  return imageData;
};

export enum MaskType {
  Background,
  Foreground,
  ProbablyBackground,
  ProbablyForeground
}
