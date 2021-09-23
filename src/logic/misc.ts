import fileSaver = require('file-saver');
import { DynamicImage } from './drawing';

export const SaveImage = (image: DynamicImage) => {
  const blobPromise = image.ToBlob();
  blobPromise.then((value: Blob) => {
    fileSaver.saveAs(value, 'output.png');
  });
};

export enum MaskType {
  Background,
  Foreground,
  ProbablyBackground,
  ProbablyForeground
}
