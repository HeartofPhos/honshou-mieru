import React from 'react';
import ndarray = require('ndarray');
import { Drawable } from './drawing';

export const BuildImageData = (imageArray: ndarray): ImageData => {
  const imageData = new ImageData(imageArray.shape[0], imageArray.shape[1]);
  let xMax = imageArray.shape[0];
  let yMax = imageArray.shape[1];
  for (let x = 0; x < xMax; x++) {
    for (let y = 0; y < yMax; y++) {
      let i = y * xMax * 4 + x * 4;
      imageData.data[i] = imageArray.get(x, y, 0);
      imageData.data[i + 1] = imageArray.get(x, y, 1);
      imageData.data[i + 2] = imageArray.get(x, y, 2);
      imageData.data[i + 3] = imageArray.get(x, y, 3);
    }
  }

  return imageData;
};

export const Redraw = (
  canvasRef: React.RefObject<HTMLCanvasElement>,
  drawable: Drawable
) => {
  const canvas = canvasRef.current;
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawable.Draw(0, 0, ctx);
};

export enum MaskType {
  Background,
  Foreground,
  ProbablyBackground,
  ProbablyForeground
}
