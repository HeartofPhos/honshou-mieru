import React, { useEffect } from 'react';

import styles from './styles.css';
import ndarray = require('ndarray');

interface PositionCallback {
  (x: number, y: number): void;
}

enum MaskType {
  Background,
  Foreground,
  ProbablyBackground,
  ProbablyForeground
}

interface Props {
  imageData: ImageData;
  mask: ndarray | undefined;
  onMouseDown?: PositionCallback;
  onMouseUp?: PositionCallback;
  onMouseMove?: PositionCallback;
}

const foregroundColour = '#00ff00';
const backgroundColour = '#ff0000';

const MaskRenderer = ({
  imageData,
  mask,
  onMouseDown,
  onMouseUp,
  onMouseMove
}: Props) => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

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

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.height = imageData.height;
    canvas.width = imageData.width;
    ctx.putImageData(imageData, 0, 0);

    if (mask) {
      for (let x = 0; x < imageData.width; x++) {
        for (let y = 0; y < imageData.height; y++) {
          switch (mask.get(x, y) as MaskType) {
            case MaskType.Foreground:
              {
                ctx.fillStyle = foregroundColour;
                ctx.fillRect(x, y, 1, 1);
              }
              break;
            case MaskType.Background:
              {
                ctx.fillStyle = backgroundColour;
                ctx.fillRect(x, y, 1, 1);
              }
              break;
          }
        }
      }
    }
  }, [mask]);

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
