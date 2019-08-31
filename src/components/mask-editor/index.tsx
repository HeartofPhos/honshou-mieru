//@ts-ignore
import cv = require('../../open-cv/opencv.js');
import React, { useEffect, useState } from 'react';
import ndarray = require('ndarray');

import {
  BuildImageData,
  InitializeImageCanvas,
  InitializeMaskCanvas
} from './utility';
import { DrawLine } from './pixelDrawing';
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
  const [startPos, setStartPos] = useState();
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
        onPointerDown={evt => {
          if (!draw) {
            const canvas = evt.currentTarget;
            const ctx = canvas.getContext('2d');
            if (!ctx) return;

            const rect = canvas.getBoundingClientRect();
            const x = evt.clientX - rect.left;
            const y = evt.clientY - rect.top;
            setStartPos({ x, y });
            setDraw(true);
          }
        }}
        onPointerUp={evt => {
          if (draw) {
            const canvas = evt.currentTarget;
            const ctx = canvas.getContext('2d');
            if (!ctx) return;

            const rect = canvas.getBoundingClientRect();
            const x = evt.clientX - rect.left;
            const y = evt.clientY - rect.top;

            const imageData = ctx.getImageData(
              0,
              0,
              canvas.width,
              canvas.height
            );
            DrawLine(imageData, startPos.x, startPos.y, x, y);
            ctx.putImageData(imageData, 0, 0);
            setDraw(false);
          }
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
          const x = evt.clientX - rect.left;
          const y = evt.clientY - rect.top;

          if (onMaskChanged) onMaskChanged(x, y, MaskType.Foreground);
        }}
        className={styles.maskCanvas}
        ref={maskCanvasRef}
      ></canvas>
    </div>
  );
};

export default MaskEditor;
