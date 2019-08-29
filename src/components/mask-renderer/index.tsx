import React from 'react';
import styles from './styles.css';

interface PositionCallback {
  (x: number, y: number): void;
}
interface Props {
  onMouseDown?: PositionCallback;
  onMouseUp?: PositionCallback;
  onMouseMove?: PositionCallback;
  blobUrl: string;
}

const MaskRenderer = ({
  blobUrl,
  onMouseDown,
  onMouseUp,
  onMouseMove
}: Props) => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  const srcImg = new Image();
  srcImg.onload = function() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.height = srcImg.height;
    canvas.width = srcImg.width;

    ctx.drawImage(srcImg, 0, 0);
  };
  srcImg.src = blobUrl;

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
