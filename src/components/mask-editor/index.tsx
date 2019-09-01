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

interface MaskChangedCallback {
  (
    x: number,
    y: number,
    width: number,
    height: number,
    maskType: MaskType
  ): void;
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
          let x = 0;
          let y = 0;
          let width = 0;
          let height = 0;

          switch (targetMaskType) {
            case MaskType.Background:
              {
                fillStyle = '#ff0000';
                x = canvasX;
                y = canvasY;
                width = 1;
                height = 1;
              }
              break;
            case MaskType.Foreground:
              {
                fillStyle = '#00ff00';
                x = canvasX;
                y = canvasY;
                width = 1;
                height = 1;
              }
              break;
            case MaskType.ProbablyBackground:
            case MaskType.ProbablyForeground:
              {
                x = canvasX - 5;
                y = canvasY - 5;
                width = 11;
                height = 11;
              }
              break;
          }

          if (fillStyle) {
            ctx.fillStyle = fillStyle;
            ctx.fillRect(x, y, width, height);
          } else {
            ctx.clearRect(x, y, width, height);
          }

          if (onMaskChanged) onMaskChanged(x, y, width, height, targetMaskType);
        }}
        className={styles.maskCanvas}
        ref={maskCanvasRef}
      ></canvas>
    </div>
  );
};

export default MaskEditor;
