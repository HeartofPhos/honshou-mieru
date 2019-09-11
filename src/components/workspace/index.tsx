import React, { useEffect, useState } from 'react';
import ndarray = require('ndarray');

import { BuildImageData, MaskType, Redraw } from '../../logic/misc';
import styles from './styles.css';
import MaskEditorRenderer from '../mask-editor-renderer';
import GrabCutWorkerWrapper from './worker/worker-wrapper';
import { CachedImage } from '../../logic/drawing';
import { CanvasSize, ResizeCanvas } from '../../logic/canvas-resize';

interface Props {
  imageArray: ndarray;
}

const CalculateCanvasSize = (
  canvasRef: React.RefObject<HTMLCanvasElement>
): CanvasSize => {
  let hOffset = 0;
  if (canvasRef.current) {
    hOffset = canvasRef.current.offsetTop;
  }
  return {
    width: document.body.clientWidth / 2,
    height: document.body.clientHeight - hOffset
  };
};

const Workspace = ({ imageArray }: Props) => {
  const resultCanvasRef = React.useRef<HTMLCanvasElement>(null);

  const [baseImage, setBaseImage] = useState<CachedImage>();
  const [resultImage, setResultImage] = useState<CachedImage>();
  const [edgeImage, setEdgeImage] = useState<CachedImage>();
  const [targetMaskType, setTargetMaskType] = useState<MaskType>(
    MaskType.Foreground
  );
  const [grabCutWorker, setGrabCutWorker] = useState<GrabCutWorkerWrapper>();
  const [canvasSize, setCanvasSize] = useState<CanvasSize>({
    width: 0,
    height: 0
  });

  useEffect(() => {
    const handleResize = () => {
      setCanvasSize(CalculateCanvasSize(resultCanvasRef));
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  useEffect(() => {
    setCanvasSize(CalculateCanvasSize(resultCanvasRef));
  }, [resultCanvasRef]);

  useEffect(() => {
    const newBaseImageData = BuildImageData(imageArray);
    setBaseImage(new CachedImage(newBaseImageData));
    setResultImage(new CachedImage(newBaseImageData));

    let newWorker = new GrabCutWorkerWrapper(
      newBaseImageData,
      (resultImageData, edgeImageData) => {
        setResultImage(new CachedImage(resultImageData));
        setEdgeImage(new CachedImage(edgeImageData));
      }
    );

    setGrabCutWorker(newWorker);

    return () => {
      newWorker.Dispose();
    };
  }, [imageArray]);

  useEffect(() => {
    if (resultImage) {
      Redraw(resultCanvasRef, resultImage);
    }
  }, [resultImage]);

  useEffect(() => {
    ResizeCanvas(canvasSize, resultCanvasRef);
    if (resultImage) {
      Redraw(resultCanvasRef, resultImage);
    } else if (baseImage) {
      Redraw(resultCanvasRef, baseImage);
    }
  }, [canvasSize]);

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
        {baseImage && (
          <MaskEditorRenderer
            baseImage={baseImage}
            edgeImage={edgeImage}
            targetMaskType={targetMaskType}
            onMaskChanged={imageData => {
              if (!grabCutWorker) return;
              grabCutWorker.UpdateMask(imageData);
            }}
            canvasSize={canvasSize}
          ></MaskEditorRenderer>
        )}
        <canvas ref={resultCanvasRef}></canvas>
      </div>
    </div>
  );
};

export default Workspace;
