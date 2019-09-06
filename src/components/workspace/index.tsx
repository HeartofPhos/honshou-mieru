//@ts-ignore
import cv = require('../../open-cv/opencv.js');
import React, { useEffect, useState, useMemo } from 'react';
import ndarray = require('ndarray');

import {
  BuildImageData,
  InitializeCanvasFromImage,
  MaskType
} from '../../utility/misc';
import styles from './styles.css';
import MaskEditorRenderer from '../mask-editor-renderer';

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

  const [maskMat, setMaskMat] = useState<any>();
  const [imgMat, setImgMat] = useState<any>();

  useEffect(
    () => () => {
      maskMat.delete();
      imgMat.delete();
    },
    []
  );

  useMemo(() => {
    const newBaseImageData = BuildImageData(imageArray);
    setBaseImageData(newBaseImageData);
    setResultImageData(newBaseImageData);

    let newMaskMat = new cv.Mat(
      imageArray.shape[1],
      imageArray.shape[0],
      cv.CV_8UC1
    );

    newMaskMat.setTo([
      MaskType.ProbablyBackground,
      MaskType.ProbablyBackground,
      MaskType.ProbablyBackground,
      MaskType.ProbablyBackground
    ]);
    setMaskMat(newMaskMat);

    let newImgMat = cv.matFromImageData(newBaseImageData);
    setImgMat(newImgMat);
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
        <button
          onClick={() => {
            if (!resultImageData) return;
            if (!imgMat) return;

            let src = new cv.Mat();
            cv.cvtColor(imgMat, src, cv.COLOR_RGBA2RGB, 0);

            let bgdModel = new cv.Mat();
            let fgdModel = new cv.Mat();

            let rect = new cv.Rect(50, 50, 100, 100);
            cv.grabCut(
              src,
              maskMat,
              rect,
              bgdModel,
              fgdModel,
              1,
              cv.GC_INIT_WITH_MASK
            );

            console.log('success');

            const newResultImageData = BuildImageData(imageArray);

            let i = 0;
            for (let y = 0; y < src.rows; y++) {
              for (let x = 0; x < src.cols; x++) {
                if (
                  maskMat.ucharPtr(y, x)[0] == MaskType.Background ||
                  maskMat.ucharPtr(y, x)[0] == MaskType.ProbablyBackground
                ) {
                  newResultImageData.data[i + 3] = 0;
                }

                i += 4;
              }
            }

            setResultImageData(newResultImageData);

            src.delete();
            bgdModel.delete();
            fgdModel.delete();
          }}
        >
          Render
        </button>
      </div>
      <div className={styles.center}>
        {baseImageData && (
          <MaskEditorRenderer
            imageData={baseImageData}
            targetMaskType={targetMaskType}
          ></MaskEditorRenderer>
        )}
        <canvas ref={resultCanvasRef}></canvas>
      </div>
    </div>
  );
};

export default Workspace;
