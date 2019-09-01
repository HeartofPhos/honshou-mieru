//@ts-ignore
import React, { useEffect } from 'react';
import { InitializeCanvasFromImage, MaskType } from '../../utility';
import styles from './styles.css';

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

          let fillStyle;
          const x = canvasX - 5;
          const y = canvasY - 5;
          const width = 11;
          const height = 11;

          switch (targetMaskType) {
            case MaskType.Background:
              {
                fillStyle = 'rgba(255,0,0,0.5)';
              }
              break;
            case MaskType.Foreground:
              {
                fillStyle = 'rgba(0,255,0,0.5)';
              }
              break;
          }

          ctx.clearRect(x, y, width, height);

          if (fillStyle) {
            ctx.fillStyle = fillStyle;
            ctx.fillRect(x, y, width, height);
          }

          const changedIndexes: MaskIndex[] = [];

          for (let i = x; i < x + width; i++) {
            for (let j = y; j < y + height; j++) {
              changedIndexes.push({ x: i, y: j });
            }
          }

          if (onMaskChanged) onMaskChanged(changedIndexes, targetMaskType);
        }}
        className={styles.maskCanvas}
        ref={maskCanvasRef}
      ></canvas>
    </div>
  );
};

export default MaskEditor;
