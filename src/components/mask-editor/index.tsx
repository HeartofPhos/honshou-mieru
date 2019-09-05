//@ts-ignore
import React, { useEffect } from 'react';
import { InitializeCanvasFromImage, MaskType } from '../../utility';
import styles from './styles.css';
import CirclePixelBrush from '../../utility/drawing';

export const MaskTypeToColor = (maskType: MaskType) => {};

export const InitializeMaskCanvas = (
  maskCanvasRef: React.RefObject<HTMLCanvasElement>,
  width: number,
  height: number
) => {
  const canvas = maskCanvasRef.current;
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  canvas.width = width;
  canvas.height = height;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
};

interface MaskIndex {
  x: number;
  y: number;
}

interface MaskChangedCallback {
  (changedIndexes: MaskIndex[], maskType: MaskType): void;
}

interface Props {
  imageData: ImageData;
  targetMaskType: MaskType;
  onMaskChanged?: MaskChangedCallback;
}

const ForegroundBrush = new CirclePixelBrush(14, '#00ff00');

const MaskEditor = ({ targetMaskType, imageData, onMaskChanged }: Props) => {
  const imageCanvasRef = React.useRef<HTMLCanvasElement>(null);
  const maskCanvasRef = React.useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    InitializeCanvasFromImage(imageCanvasRef, imageData);
    InitializeMaskCanvas(maskCanvasRef, imageData.width, imageData.height);
  }, [imageData]);

  return (
    <div className={styles.rendererDiv}>
      <canvas className={styles.imageCanvas} ref={imageCanvasRef}></canvas>
      <canvas
        onPointerDown={evt => {
          const canvas = evt.currentTarget;
          const ctx = canvas.getContext('2d');
          if (!ctx) return;

          const rect = canvas.getBoundingClientRect();
          const canvasX = evt.clientX - rect.left;
          const canvasY = evt.clientY - rect.top;

          ForegroundBrush.DrawToContext(canvasX, canvasY, ctx);
        }}
        onPointerMove={evt => {
          const canvas = evt.currentTarget;
          const ctx = canvas.getContext('2d');
          if (!ctx) return;

          const rect = canvas.getBoundingClientRect();
          const canvasX = evt.clientX - rect.left;
          const canvasY = evt.clientY - rect.top;

          ForegroundBrush.DrawLineToContext(
            canvasX,
            canvasY,
            canvasX + evt.movementX,
            canvasY + evt.movementY,
            ctx
          );
        }}
        className={styles.maskCanvas}
        ref={maskCanvasRef}
      ></canvas>
    </div>
  );
};

export default MaskEditor;
