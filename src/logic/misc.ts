import ndarray = require('ndarray');
import fileSaver = require('file-saver');
import GifEncoder = require('gif-encoder');
import blobStream = require('blob-stream');
import { DynamicImage } from './drawing';

export const BuildImageData = (imageArray: ndarray): ImageData => {
  const width = imageArray.shape[0];
  const height = imageArray.shape[1];
  const imageData = new ImageData(width, height);
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      const index = y * width * 4 + x * 4;
      imageData.data[index] = imageArray.get(x, y, 0);
      imageData.data[index + 1] = imageArray.get(x, y, 1);
      imageData.data[index + 2] = imageArray.get(x, y, 2);
      imageData.data[index + 3] = imageArray.get(x, y, 3);
    }
  }

  return imageData;
};

export const SaveImage = (image: DynamicImage) => {
  const blobPromise = image.ToBlob();
  blobPromise.then((value: Blob) => {
    fileSaver.saveAs(value, 'output.png');
  });
};
export const SaveGif = (images: DynamicImage[]) => {
  const stream = blobStream();
  const imageDataArray = images.map(x => x.GetData());

  if (imageDataArray.length > 0) {
    const gif = new GifEncoder(
      imageDataArray[0].width,
      imageDataArray[0].height
    );
    gif.pipe(stream);
    gif.setTransparent('0x000000');
    gif.writeHeader();
    for (let i = 0; i < imageDataArray.length; i++) {
      gif.addFrame(imageDataArray[i].data);
    }
    gif.finish();
  }

  const blob = stream.toBlob();
  fileSaver.saveAs(blob, 'output.gif');
};

export enum MaskType {
  Background,
  Foreground,
  ProbablyBackground,
  ProbablyForeground
}
