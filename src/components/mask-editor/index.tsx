//@ts-ignore
import cv = require('../../open-cv/opencv.js');
import React, { useMemo, useState } from 'react';
import ndarray = require('ndarray');

import MaskRenderer from '../mask-renderer';

interface Props {
  imageArray: ndarray;
}
const buildImageData = (imageArray: ndarray): ImageData => {
  const imageData = new ImageData(imageArray.shape[0], imageArray.shape[1]);
  let i = 0;
  for (let y = 0; y < imageArray.shape[1]; y++) {
    for (let x = 0; x < imageArray.shape[0]; x++) {
      imageData.data[i + 0] = imageArray.get(x, y, 0);
      imageData.data[i + 1] = imageArray.get(x, y, 1);
      imageData.data[i + 2] = imageArray.get(x, y, 2);
      imageData.data[i + 3] = imageArray.get(x, y, 3);
      i += 4;
    }
  }

  return imageData;
};

const buildMask = (imageArray: ndarray, imageData: ImageData): ndarray => {
  const newMaskArray = [];
  for (let x = 0; x < imageData.width; x++) {
    for (let y = 0; y < imageData.height; y++) {
      newMaskArray.push(cv.GC_PR_BGD);
    }
  }

  return ndarray(newMaskArray, [imageData.width, imageData.height]);
};

const MaskEditor = ({ imageArray }: Props) => {
  const [imageData, setImageData] = useState<ImageData>();
  const [mask, setMask] = useState<ndarray>();

  useMemo(() => {
    const newImageData = buildImageData(imageArray);
    const newMask = buildMask(imageArray, newImageData);

    setImageData(newImageData);
    setMask(newMask);
  }, [imageArray]);

  return (
    <div>
      {imageData && mask && (
        <MaskRenderer
          imageData={imageData}
          mask={mask}
          onMouseDown={(x, y) => {
            console.log({ x, y });
            if (mask) {
              mask.set(Math.floor(x), Math.floor(y), cv.GC_FGD);
              setMask(ndarray(mask.data, mask.shape));
            }
          }}
        />
      )}
    </div>
  );
};

export default MaskEditor;
