import React from 'react';
import ndarray = require('ndarray');

export const BuildImageData = (imageArray: ndarray): ImageData => {
  const imageData = new ImageData(imageArray.shape[0], imageArray.shape[1]);
  let i = 0;
  for (let y = 0; y < imageArray.shape[1]; y++) {
    for (let x = 0; x < imageArray.shape[0]; x++) {
      imageData.data[i + 0] = imageArray.get(x, y, 0);
      imageData.data[i + 1] = imageArray.get(x, y, 1);
      imageData.data[i + 2] = imageArray.get(x, y, 2);
      imageData.data[i + 3] = imageArray.get(x, y, 3);
      i += 4;
    }
  }

  return imageData;
};

export const InitializeImageCanvas = (
  imageCanvasRef: React.RefObject<HTMLCanvasElement>,
  imageData: ImageData
) => {
  const canvas = imageCanvasRef.current;
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  canvas.height = imageData.height;
  canvas.width = imageData.width;
  ctx.putImageData(imageData, 0, 0);
};

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
