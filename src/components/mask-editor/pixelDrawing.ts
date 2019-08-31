const setPixel = (imageData: ImageData, x: number, y: number) => {
  var index = (y * imageData.width + x) * 4;
  imageData.data[index] = 0;
  imageData.data[index + 1] = 255;
  imageData.data[index + 2] = 0;
  imageData.data[index + 3] = 255;
};
const sign = (x: number) => (x > 0 ? 1 : x < 0 ? -1 : 0);
const frac0 = (x: number) => x - Math.floor(x);
const fastVoxelTraverse = (
  startX: number,
  startY: number,
  endX: number,
  endY: number,
  onStep: (x: number, y: number) => void
) => {
  const dx = sign(endX - startX);
  const tDeltaX = dx != 0 ? dx / (endX - startX) : Number.POSITIVE_INFINITY;
  let tMaxX = dx != 0 ? tDeltaX * frac0(startX) : Number.POSITIVE_INFINITY;
  let currentX = Math.floor(startX);

  const dy = sign(endY - startY);
  const tDeltaY = dy != 0 ? dy / (endY - startY) : Number.POSITIVE_INFINITY;
  let tMaxY = dy != 0 ? tDeltaY * frac0(startY) : Number.POSITIVE_INFINITY;
  let currentY = Math.floor(startY);

  onStep(currentX, currentY);
  while (!(tMaxX > 1 && tMaxY > 1)) {
    if (tMaxX < tMaxY) {
      currentX += dx;
      tMaxX += tDeltaX;
    } else {
      currentY += dy;
      tMaxY += tDeltaY;
    }

    onStep(currentX, currentY);
  }
};

export const DrawLine = (
  imageData: ImageData,
  x0: number,
  y0: number,
  x1: number,
  y1: number
) => {
  fastVoxelTraverse(x0, y0, x1, y1, (x, y) => {
    setPixel(imageData, x, y);
  });
};
