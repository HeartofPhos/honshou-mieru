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
  const [maskArray, setMaskArray] = useState<number[][] | undefined>(undefined);

  const imageData = new ImageData(
    new Uint8ClampedArray(imageArray.data),
    imageArray.shape[0],
    imageArray.shape[1]
  );

  if (!maskArray) {
    const newMaskArray = [];
    for (let x = 0; x < imageData.width; x++) {
      const xArray: number[] = [];
      newMaskArray.push(xArray);
      for (let y = 0; y < imageData.height; y++) {
        xArray.push(cv.GC_PR_BGD);
      }
    }
    setMaskArray(newMaskArray);
  }

  return (
    <div>
      <MaskRenderer
        imageData={imageData}
        onMouseDown={(x, y) => {
          console.log({ x, y });
          if (maskArray) {
            maskArray[x][y] = cv.GC_FGD;
            setMaskArray(maskArray.slice(0));
          }
        }}
        mask={maskArray}
      />
    </div>
  );
};

export default MaskEditor;
