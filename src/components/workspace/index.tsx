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
      </div>
      <div className={styles.center}>
        {baseImageData && (
          <MaskEditorRenderer
            imageData={baseImageData}
            targetMaskType={targetMaskType}
            OnMaskChanged={imageData => {
              if (!imgMat) return;
              if (!maskMat) return;

              for (let x = 0; x < imageData.width; x++) {
                for (let y = 0; y < imageData.height; y++) {
                  let i = y * imageData.width * 4 + x * 4;

                  if (imageData.data[i] == 255) {
                    //Red == 255
                    maskMat.ucharPtr(y, x)[0] = MaskType.Background;
                  } else if (imageData.data[i + 1] == 255) {
                    //Green == 255
                    maskMat.ucharPtr(y, x)[0] = MaskType.Foreground;
                  } else if (imageData.data[i + 3] == 0) {
                    //Alpha == 0
                    maskMat.ucharPtr(y, x)[0] = MaskType.ProbablyBackground;
                  }
                }
              }

              let src = new cv.Mat();
              cv.cvtColor(imgMat, src, cv.COLOR_RGBA2RGB, 0);

              let bgdModel = new cv.Mat();
              let fgdModel = new cv.Mat();
              let rect = new cv.Rect(0, 0, 1, 1);

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
          ></MaskEditorRenderer>
        )}
        <canvas ref={resultCanvasRef}></canvas>
      </div>
    </div>
  );
};

export default Workspace;
