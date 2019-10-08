import React, { useEffect, useState } from 'react';
import ndarray = require('ndarray');

import { BuildImageData, MaskType } from '../../logic/misc';
import styles from './styles.css';
import MaskEditorRenderer from '../mask-editor-renderer';
import GrabCutWorkerWrapper from './worker/worker-wrapper';
import { CachedImage } from '../../logic/drawing';
import ExtendedCanvas, { CanvasPosition, CanvasSize } from '../extended-canvas';

interface Props {
  imageArray: ndarray;
}

const CalculateCanvasSize = (
  elementRef: React.RefObject<HTMLElement>
): CanvasSize => {
  let hOffset = 0;
  if (elementRef.current) {
    hOffset = elementRef.current.offsetTop;
  }
  return {
    width: document.body.clientWidth / 2,
    height: document.body.clientHeight - hOffset
  };
};

const Workspace = ({ imageArray }: Props) => {
  const divRef = React.useRef<HTMLDivElement>(null);
  const resultCanvasRef = React.useRef<ExtendedCanvas>(null);

  const [baseImage, setBaseImage] = useState<CachedImage>();
  const [resultImage, setResultImage] = useState<CachedImage>();
  const [edgeArray, setEdgeArray] = useState<Int32Array[]>();
  const [targetMaskType, setTargetMaskType] = useState<MaskType>(
    MaskType.Foreground
  );
  const [grabCutWorker, setGrabCutWorker] = useState<GrabCutWorkerWrapper>();
  const [transformState, setTransformState] = useState({
    LastX: 0,
    LastY: 0
  });
  const [canvasPosition, setCanvasPosition] = useState<CanvasPosition>({
    x: 0,
    y: 0
  });
  const [canvasScale, setCanvasScale] = useState<number>(1);
  const [canvasSize, setCanvasSize] = useState<CanvasSize>({
    width: 0,
    height: 0
  });

  useEffect(() => {
    const newBaseImageData = BuildImageData(imageArray);
    setBaseImage(new CachedImage(newBaseImageData));
    setResultImage(new CachedImage(newBaseImageData));

    let newWorker = new GrabCutWorkerWrapper(
      newBaseImageData,
      (resultImageData, edgeArray) => {
        setResultImage(new CachedImage(resultImageData));
        setEdgeArray(edgeArray);
      }
    );

    setGrabCutWorker(newWorker);

    const minScale = Math.min(
      canvasSize.width / imageArray.shape[0],
      canvasSize.height / imageArray.shape[1]
    );
    setCanvasScale(minScale);

    return () => {
      newWorker.Dispose();
    };
  }, [imageArray]);

  useEffect(() => {
    if (resultCanvasRef.current) resultCanvasRef.current.Draw();
  }, [resultImage]);

  useEffect(() => {
    const handleResize = () => {
      setCanvasSize(CalculateCanvasSize(divRef));
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const newSize = CalculateCanvasSize(divRef);

    const minScale = Math.min(
      newSize.width / imageArray.shape[0],
      newSize.height / imageArray.shape[1]
    );
    setCanvasScale(minScale);

    setCanvasSize(newSize);
  }, [divRef]);

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
      <div
        className={styles.center}
        ref={divRef}
        onPointerDown={evt => {
          if ((evt.buttons & 4) !== 4) return;
          if (!divRef.current) return;

          const rect = evt.currentTarget.getBoundingClientRect();
          const x = evt.clientX - rect.left;
          const y = evt.clientY - rect.top;
          setTransformState({
            LastX: x,
            LastY: y
          });
        }}
        onPointerMove={evt => {
          if (!divRef.current) return;
          if ((evt.buttons & 4) !== 4) return;

          const rect = evt.currentTarget.getBoundingClientRect();
          const x = evt.clientX - rect.left;
          const y = evt.clientY - rect.top;

          setCanvasPosition({
            x: canvasPosition.x + (x - transformState.LastX),
            y: canvasPosition.y + (y - transformState.LastY)
          });

          setTransformState({
            LastX: x,
            LastY: y
          });
        }}
        onWheel={evt => {
          const rect = evt.currentTarget.getBoundingClientRect();
          const x = (evt.clientX - rect.left) % canvasSize.width;
          const y = (evt.clientY - rect.top) % canvasSize.height;

          const oldX = (x - canvasPosition.x) / canvasScale;
          const oldY = (y - canvasPosition.y) / canvasScale;

          const sign = evt.deltaY < 0 ? 1 : -1;
          const scaleFactor = 1 + 0.1 * sign;

          const newScale = canvasScale * scaleFactor;
          setCanvasScale(newScale);

          const newX = oldX * newScale + canvasPosition.x;
          const newY = oldY * newScale + canvasPosition.y;

          setCanvasPosition({
            x: canvasPosition.x + (x - newX),
            y: canvasPosition.y + (y - newY)
          });
        }}
      >
        {baseImage && (
          <MaskEditorRenderer
            position={canvasPosition}
            scale={canvasScale}
            size={canvasSize}
            baseImage={baseImage}
            edgeArray={edgeArray}
            targetMaskType={targetMaskType}
            onMaskChanged={imageData => {
              if (!grabCutWorker) return;
              grabCutWorker.UpdateMask(imageData);
            }}
          ></MaskEditorRenderer>
        )}
        <ExtendedCanvas
          position={canvasPosition}
          scale={canvasScale}
          size={canvasSize}
          smoothingEnabled={false}
          draw={ctx => {
            if (resultImage) {
              resultImage.Draw(0, 0, ctx);
            }
          }}
          ref={resultCanvasRef}
        ></ExtendedCanvas>
      </div>
    </div>
  );
};

export default Workspace;
