import React from 'react';
import styles from './styles.css';

interface Props {
  blobUrl: string;
}

const MaskEditor = ({ blobUrl }: Props) => {
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

  return (
    <div className={styles.center}>
      <canvas
        className={styles.canvas}
        ref={canvasRef}
        onClick={evt => {
          const canvas = canvasRef.current;
          if (!canvas) return;
          const ctx = canvas.getContext('2d');
          if (!ctx) return;

          var rect = canvas.getBoundingClientRect();
          console.log({
            x: evt.clientX - rect.left,
            y: evt.clientY - rect.top
          });
        }}
      />
    </div>
  );
};

export default MaskEditor;
