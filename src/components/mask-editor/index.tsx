//@ts-ignore
import cv = require('../../open-cv/opencv.js');
import React, { useState } from 'react';
import ndarray = require('ndarray');

import MaskRenderer from '../mask-renderer';

import styles from './styles.css';
import src from '*.png';

interface Props {
  imageArray: ndarray;
}

const MaskEditor = ({ imageArray }: Props) => {
  const [maskArray, setMaskArray] = useState<ndarray | undefined>(undefined);

  const imageData = new ImageData(
    new Uint8ClampedArray(imageArray.data),
    imageArray.shape[0],
    imageArray.shape[1]
  );

  if (!maskArray) {
    const newMaskArray = [];
    for (let x = 0; x < imageData.width; x++) {
      for (let y = 0; y < imageData.height; y++) {
        newMaskArray.push(cv.GC_PR_BGD);
      }
    }
    setMaskArray(ndarray(newMaskArray, [imageData.width, imageData.height]));
  }

  return (
    <div>
      <MaskRenderer
        imageData={imageData}
        onMouseDown={(x, y) => {
          console.log({ x, y });
          if (maskArray) {
            maskArray.set(x, y, cv.GC_FGD);
            setMaskArray(ndarray(maskArray.data, maskArray.shape));
          }
        }}
        mask={maskArray}
      />
    </div>
  );
};

export default MaskEditor;
