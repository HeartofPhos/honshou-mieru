//@ts-ignore
import cv = require('../../open-cv/opencv.js');
import React, { useEffect, useState } from 'react';
import ndarray = require('ndarray');

import {
  BuildImageData,
  InitializeImageCanvas,
  InitializeMaskCanvas
} from './utility';
import styles from './styles.css';

const foregroundColour = '#00ff00';
const backgroundColour = '#ff0000';

enum MaskType {
  Background,
  Foreground,
  ProbablyBackground,
  ProbablyForeground
}

interface MaskChangedCallback {
  (x: number, y: number, maskType: MaskType): void;
}

interface Props {
  imageArray: ndarray;
  onMaskChanged?: MaskChangedCallback;
}

const MaskEditor = ({ imageArray, onMaskChanged }: Props) => {
  const [draw, setDraw] = useState(false);
  const imageCanvasRef = React.useRef<HTMLCanvasElement>(null);
  const maskCanvasRef = React.useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const imageData = BuildImageData(imageArray);
    InitializeImageCanvas(imageCanvasRef, imageData);
    InitializeMaskCanvas(maskCanvasRef, imageData.width, imageData.height);
  }, [imageArray]);

  return (
    <div className={styles.rendererDiv}>
      <canvas className={styles.imageCanvas} ref={imageCanvasRef}></canvas>
      <canvas
        onPointerDown={() => {
          if (!draw) setDraw(true);
        }}
        onPointerUp={() => {
          if (draw) setDraw(false);
        }}
        onPointerOut={() => {
          if (draw) setDraw(false);
        }}
        onPointerMove={evt => {
          if (!draw) return;

          const canvas = evt.currentTarget;
          const ctx = canvas.getContext('2d');
          if (!ctx) return;

          const rect = canvas.getBoundingClientRect();

          const x = Math.floor(evt.clientX - rect.left);
          const y = Math.floor(evt.clientY - rect.top);

          ctx.fillStyle = foregroundColour;
          ctx.fillRect(x, y, 1, 1);

          if (onMaskChanged) onMaskChanged(x, y, MaskType.Foreground);
        }}
        className={styles.maskCanvas}
        ref={maskCanvasRef}
      ></canvas>
    </div>
  );
};

export default MaskEditor;
