import React from 'react';
//@ts-ignore
import cv = require('../../open-cv/opencv.js');

import styles from './styles.css';

interface PositionCallback {
  (x: number, y: number): void;
}

interface Props {
  srcImg: HTMLImageElement | null;
  mask?: number[][];
  onMouseDown?: PositionCallback;
  onMouseUp?: PositionCallback;
  onMouseMove?: PositionCallback;
}

const foregroundColour = '#00ff00';
const backgroundColour = '#ff0000';

const MaskRenderer = ({
  srcImg,
  mask,
  onMouseDown,
  onMouseUp,
  onMouseMove
}: Props) => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const render = () => {
    if (!srcImg) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.height = srcImg.height;
    canvas.width = srcImg.width;

    ctx.drawImage(srcImg, 0, 0);

    if (!mask) return;
    for (let x = 0; x < mask.length; x++) {
      const xArray = mask[x];
      for (let y = 0; y < xArray.length; y++) {
        const maskValue = xArray[y];

        if (maskValue === cv.GC_FGD) {
          ctx.fillStyle = foregroundColour;
          ctx.fillRect(x, y, 1, 1);
        }
        if (maskValue === cv.GC_BGD) {
          ctx.fillStyle = backgroundColour;
          ctx.fillRect(x, y, 1, 1);
        }
      }
    }
  };

  const callbackEventPostion = (
    evt: React.MouseEvent<HTMLCanvasElement, MouseEvent>,
    callback?: PositionCallback
  ) => {
    if (!callback) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    var rect = canvas.getBoundingClientRect();
    callback(evt.clientX - rect.left, evt.clientY - rect.top);
  };

  render();

  return (
    <div className={styles.center}>
      <canvas
        className={styles.canvas}
        ref={canvasRef}
        onMouseDown={evt => callbackEventPostion(evt, onMouseDown)}
        onMouseUp={evt => callbackEventPostion(evt, onMouseUp)}
        onMouseMove={evt => callbackEventPostion(evt, onMouseMove)}
      />
    </div>
  );
};

export default MaskRenderer;
