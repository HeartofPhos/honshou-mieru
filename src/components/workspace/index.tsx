import React, { useEffect, useState, useMemo } from 'react';

import { MaskType, SaveImage } from '../../logic/misc';
import styles from './styles.css';
import MaskEditorRenderer from '../mask-editor-renderer';
import { CanvasPosition, CanvasSize } from '../extended-canvas';
import SegmentWrapper from '../../logic/segmenting/segment-wrapper';
import DynamicCanvas from '../dynamic-canvas';
import BrushSettings from '../brush-settings';

interface Props {
  imageData: ImageData;
}

const CalculateCanvasSize = (
  elementRef: React.RefObject<HTMLElement>
): CanvasSize => {
  let hOffset = 0;
  if (elementRef.current) {
    hOffset = elementRef.current.offsetTop;
  }

  const w = Math.max(window.innerWidth, document.body.clientWidth);
  const h = Math.max(window.innerHeight, document.body.clientHeight);
  return {
    width: w / 2,
    height: h - hOffset,
  };
};

const Workspace = ({ imageData }: Props) => {
  const divRef = React.useRef<HTMLDivElement>(null);

  const [segmentWrapper, setSegmentWrapper] = useState<SegmentWrapper>();
  const [targetMaskType, setTargetMaskType] = useState(MaskType.Foreground);
  const [brushSize, setBrushSize] = useState(20);
  const [transformState, setTransformState] = useState({
    LastX: 0,
    LastY: 0,
  });
  const [canvasPosition, setCanvasPosition] = useState<CanvasPosition>({
    x: 0,
    y: 0,
  });
  const [canvasScale, setCanvasScale] = useState<number>(1);
  const [canvasSize, setCanvasSize] = useState<CanvasSize>({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    const newBaseImageData = imageData;
    const newSegmentWrapper = new SegmentWrapper(newBaseImageData);
    setSegmentWrapper(newSegmentWrapper);

    const minScale = Math.min(
      canvasSize.width / imageData.width,
      canvasSize.height / imageData.height
    );
    setCanvasScale(minScale);

    return () => {
      newSegmentWrapper.Dispose();
    };
  }, [imageData]);

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
      newSize.width / imageData.width,
      newSize.height / imageData.height
    );
    setCanvasScale(minScale);

    setCanvasSize(newSize);
  }, [divRef]);

  useMemo(() => {
    if (segmentWrapper) segmentWrapper.UpdateTargetScale(canvasScale);
  }, [canvasScale]);

  return (
    <div>
      <div className={styles.controlsHolder}>
        <div className={styles.controlsBox}>
          <BrushSettings
            className={styles.brushSettings}
            maskType={targetMaskType}
            brushSize={brushSize}
            onMaskTypeChange={(newMaskType) => setTargetMaskType(newMaskType)}
            onBrushSizeChange={(newBrushSize) => setBrushSize(newBrushSize)}
          ></BrushSettings>
          <button
            className={styles.save}
            onClick={() => {
              if (!segmentWrapper) return;
              SaveImage(segmentWrapper.ResultDrawable);
            }}
          >
            Save
          </button>
        </div>
      </div>
      <div
        className={styles.canvasHolder}
        ref={divRef}
        onPointerDown={(evt) => {
          if ((evt.buttons & 4) !== 4) return;
          if (!divRef.current) return;

          const rect = evt.currentTarget.getBoundingClientRect();
          const x = evt.clientX - rect.left;
          const y = evt.clientY - rect.top;
          setTransformState({
            LastX: x,
            LastY: y,
          });
        }}
        onPointerMove={(evt) => {
          if (!divRef.current) return;
          if ((evt.buttons & 4) !== 4) return;

          const rect = evt.currentTarget.getBoundingClientRect();
          const x = evt.clientX - rect.left;
          const y = evt.clientY - rect.top;

          setCanvasPosition({
            x: canvasPosition.x + (x - transformState.LastX),
            y: canvasPosition.y + (y - transformState.LastY),
          });

          setTransformState({
            LastX: x,
            LastY: y,
          });
        }}
        onWheel={(evt) => {
          const rect = evt.currentTarget.getBoundingClientRect();

          const pointerX = (evt.clientX - rect.left) % canvasSize.width;
          const pointerY = (evt.clientY - rect.top) % canvasSize.height;

          const deltaX = pointerX - canvasPosition.x;
          const deltaY = pointerY - canvasPosition.y;

          let scaleFactor = 0.9;
          if (evt.deltaY < 0) scaleFactor = 1 / scaleFactor;

          setCanvasScale(canvasScale * scaleFactor);
          setCanvasPosition({
            x: pointerX - deltaX * scaleFactor,
            y: pointerY - deltaY * scaleFactor,
          });
        }}
      >
        {segmentWrapper && (
          <MaskEditorRenderer
            position={canvasPosition}
            scale={canvasScale}
            size={canvasSize}
            baseImage={segmentWrapper.SourceImage}
            maskEditor={segmentWrapper.MaskEditor}
            ghostRenderer={segmentWrapper.GhostRenderer}
            edgeRenderer={segmentWrapper.EdgeDrawable}
            targetMaskType={targetMaskType}
            brushSize={brushSize}
            onMaskChanged={() => {
              if (segmentWrapper) segmentWrapper.Segment();
            }}
          ></MaskEditorRenderer>
        )}
        {segmentWrapper && (
          <div style={{ position: 'relative' }}>
            <DynamicCanvas
              className={styles.baseCanvas}
              position={canvasPosition}
              scale={canvasScale}
              size={canvasSize}
              smoothingEnabled={false}
              drawable={segmentWrapper.ResultDrawable}
            ></DynamicCanvas>
            <DynamicCanvas
              className={styles.stackedCanvas}
              position={canvasPosition}
              scale={canvasScale}
              size={canvasSize}
              smoothingEnabled={false}
              drawable={segmentWrapper.GhostRenderer}
            ></DynamicCanvas>
          </div>
        )}
      </div>
    </div>
  );
};

export default Workspace;
