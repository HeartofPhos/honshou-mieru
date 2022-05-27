import cv from '../../open-cv-wrapper';
import { SegmentState } from '..';

const ColourSize = 5;

export const ColourStealing = (
  state: SegmentState,
  result: Uint8ClampedArray
) => {
  const definitelyForegroundMask = new cv.Mat();
  cv.subtract(
    state.OutputMask,
    state.UnknownRegion.Mask,
    definitelyForegroundMask
  );

  let currentColour = [0, 0, 0];
  const unknownRegionData = state.UnknownRegion.Mask.data;
  const originalData = state.Original.data;
  const definitelyForegroundMaskData = definitelyForegroundMask.data;
  for (let x = 0; x < state.Width; x++) {
    for (let y = 0; y < state.Height; y++) {
      const maskIndex = y * state.Width + x;
      if (unknownRegionData[maskIndex] != 255) continue;

      const minX = Math.max(0, x - ColourSize);
      const maxX = Math.min(state.Width, x + ColourSize);
      const minY = Math.max(0, y - ColourSize);
      const maxY = Math.min(state.Height, y + ColourSize);

      let currentDistance = -1;
      for (let subX = minX; subX < maxX; subX++) {
        for (let subY = minY; subY < maxY; subY++) {
          const subMaskIndex = subY * state.Width + subX;
          if (definitelyForegroundMaskData[subMaskIndex] == 255) {
            const originalIndex = subY * state.Width * 4 + subX * 4;

            const deltaX = subX - x;
            const deltaY = subY - y;
            let distance = deltaX * deltaX + deltaY * deltaY;

            if (currentDistance == -1 || distance < currentDistance) {
              currentDistance = distance;
              currentColour[0] = originalData[originalIndex];
              currentColour[1] = originalData[originalIndex + 1];
              currentColour[2] = originalData[originalIndex + 2];
            }
          }
        }
      }

      if (currentDistance !== -1) {
        const resultIndex = y * state.Width * 4 + x * 4;
        result[resultIndex] = currentColour[0];
        result[resultIndex + 1] = currentColour[1];
        result[resultIndex + 2] = currentColour[2];
      }

      currentColour[0] = 0;
      currentColour[1] = 0;
      currentColour[2] = 0;
    }
  }

  definitelyForegroundMask.delete();
};
