import React, { useState } from 'react';
//@ts-ignore
import cv = require('../../open-cv/opencv.js');

import MaskRenderer from '../mask-renderer';

import styles from './styles.css';
import src from '*.png';

interface Props {
  blobUrl: string;
}

const MaskEditor = ({ blobUrl }: Props) => {
  const [imgLoaded, setImgLoaded] = useState<boolean>(false);
  const [maskArray, setMaskArray] = useState<number[][] | undefined>(undefined);
  const [img, setImg] = useState<HTMLImageElement | null>(null);

  if (!img || img.src !== blobUrl) {
    const newImg = new Image();
    newImg.onload = () => {
      setImgLoaded(true);
      const newMaskArray = [];
      for (let x = 0; x < newImg.width; x++) {
        const xArray: number[] = [];
        newMaskArray.push(xArray);
        for (let y = 0; y < newImg.height; y++) {
          xArray.push(cv.GC_PR_BGD);
        }
      }
      setMaskArray(newMaskArray);
    };
    newImg.src = blobUrl;

    setImg(newImg);
  }

  return (
    <div>
      <MaskRenderer
        srcImg={imgLoaded ? img : null}
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
