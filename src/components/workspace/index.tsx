import React, { useEffect, useState, useMemo } from 'react';
import ndarray = require('ndarray');

import {
  BuildImageData,
  InitializeCanvasFromImage,
  MaskType
} from '../../utility/misc';
import styles from './styles.css';
import MaskEditorRenderer from '../mask-editor-renderer';
import GrabCutWorkerWrapper from './worker-wrapper';

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

  const [grabCutWorker, setGrabCutWorker] = useState<GrabCutWorkerWrapper>();

  useEffect(() => {
    const newBaseImageData = BuildImageData(imageArray);
    setBaseImageData(newBaseImageData);
    setResultImageData(newBaseImageData);

    let newWorker = new GrabCutWorkerWrapper(
      newBaseImageData,
      resultImageData => {
        setResultImageData(resultImageData);
      }
    );

    setGrabCutWorker(newWorker);

    return () => {
      newWorker.Dispose();
    };
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
              if (!grabCutWorker) return;
              grabCutWorker.UpdateMask(imageData);
            }}
          ></MaskEditorRenderer>
        )}
        <canvas ref={resultCanvasRef}></canvas>
      </div>
    </div>
  );
};

export default Workspace;
