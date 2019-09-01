//@ts-ignore
import cv = require('../../open-cv/opencv.js');
import React, { useEffect, useState, useMemo } from 'react';
import ndarray = require('ndarray');

import {
  BuildImageData,
  InitializeCanvasFromImage,
  MaskType
} from '../../utility';
import styles from './styles.css';
import MaskEditor from '../mask-editor';

interface Props {
  imageArray: ndarray;
}

const Workspace = ({ imageArray }: Props) => {
  const resultCanvasRef = React.useRef<HTMLCanvasElement>(null);

  const [baseImageData, setBaseImageData] = useState<ImageData>();
  const [resultImageData, setResultImageData] = useState<ImageData>();
  const [targetMaskType, setTargetMaskType] = useState<MaskType>(
    MaskType.Foreground
  );

  useMemo(() => {
    const newBaseImageData = BuildImageData(imageArray);
    setBaseImageData(newBaseImageData);
    setResultImageData(newBaseImageData);
  }, [imageArray]);

  useEffect(() => {
    if (resultImageData)
      InitializeCanvasFromImage(resultCanvasRef, resultImageData);
  }, [resultImageData]);

  return (
    <div>
      <div className={styles.buttonGroup}>
        <button
          onClick={() => {
            setTargetMaskType(MaskType.Foreground);
          }}
        >
          Foreground
        </button>
        <button
          onClick={() => {
            setTargetMaskType(MaskType.Background);
          }}
        >
          Background
        </button>
        <button
          onClick={() => {
            setTargetMaskType(MaskType.ProbablyBackground);
          }}
        >
          Clear
        </button>
      </div>
      <div className={styles.center}>
        {baseImageData && (
          <MaskEditor
            imageData={baseImageData}
            targetMaskType={targetMaskType}
            onMaskChanged={(x, y, width, height, maskType) => {
              console.log(
                `Mask change: (${x}, ${y}, ${width}, ${height}, ${maskType})`
              );
            }}
          ></MaskEditor>
        )}
        <canvas ref={resultCanvasRef}></canvas>
      </div>
    </div>
  );
};

export default Workspace;
