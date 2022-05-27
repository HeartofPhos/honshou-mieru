const InitializeGrabCut = (width, height) => {
  const mask = new cv.Mat(height, width, cv.CV_8UC1);
  mask.setTo(new cv.Scalar(cv.GC_PR_BGD));
  const bgdModel = new cv.Mat();
  const fgdModel = new cv.Mat();
  return {
    Mask: mask,
    BackgroundModel: bgdModel,
    ForegroundModel: fgdModel
  };
};
const ApplyToPlanes = (target, f) => {
  const tempPlanes = new cv.MatVector();
  cv.split(target, tempPlanes);
  f(tempPlanes);
  cv.merge(tempPlanes, target);
  tempPlanes.delete();
};
const ApplyToLightPlane = (target, f) => {
  cv.cvtColor(target, target, cv.COLOR_RGB2Lab, 0);
  ApplyToPlanes(target, (planes) => {
    f(planes.get(0));
  });
  cv.cvtColor(target, target, cv.COLOR_Lab2RGB, 0);
};
const CLAHE = (target, clipLimit, tileGridSize) => {
  const clahe = new cv.CLAHE(clipLimit, new cv.Size(tileGridSize, tileGridSize));
  clahe.apply(target, target);
  clahe.delete();
};
const Sharpen = (target, kernelSize, sigma, amount, threshold) => {
  const blur = new cv.Mat();
  cv.GaussianBlur(target, blur, new cv.Size(kernelSize, kernelSize), sigma, sigma, cv.BORDER_DEFAULT);
  const sharpened = new cv.Mat();
  cv.addWeighted(target, 1 + amount, blur, -amount, 0, sharpened);
  const lowContrastMask = new cv.Mat();
  cv.absdiff(sharpened, blur, lowContrastMask);
  cv.threshold(lowContrastMask, lowContrastMask, threshold, threshold, cv.THRESH_TOZERO);
  target.copyTo(sharpened, lowContrastMask);
  sharpened.copyTo(target);
  sharpened.delete();
  lowContrastMask.delete();
  blur.delete();
};
const InitializeSource = (original) => {
  const output = new cv.Mat();
  cv.cvtColor(original, output, cv.COLOR_RGBA2RGB, 0);
  ApplyToLightPlane(output, (lightPlane) => {
    CLAHE(lightPlane, 4, 4);
  });
  Sharpen(output, 19, 100, 0.5, 255);
  return output;
};
const PrepareGrabcutMask = (state2, maskImageBuffer) => {
  const maskMatData = state2.GrabCut.Mask.data;
  const data = new Uint8ClampedArray(maskImageBuffer);
  for (let x = 0; x < state2.Width; x++) {
    for (let y = 0; y < state2.Height; y++) {
      const index = y * state2.Width * 4 + x * 4;
      const maskIndex = y * state2.Width + x;
      if (data[index] == 255) {
        maskMatData[maskIndex] = cv.GC_BGD;
      } else if (data[index + 1] == 255) {
        maskMatData[maskIndex] = cv.GC_FGD;
      } else if (data[index + 3] == 0) {
        if (maskMatData[maskIndex] == cv.GC_BGD) {
          maskMatData[maskIndex] = cv.GC_PR_BGD;
        } else if (maskMatData[maskIndex] == cv.GC_FGD) {
          maskMatData[maskIndex] = cv.GC_PR_FGD;
        } else
          ;
      }
    }
  }
};
const GrabCut = (state2) => {
  try {
    const rect = new cv.Rect(0, 0, state2.Width, state2.Height);
    cv.grabCut(state2.Source, state2.GrabCut.Mask, rect, state2.GrabCut.BackgroundModel, state2.GrabCut.ForegroundModel, 1, state2.RunCount == 0 ? cv.GC_INIT_WITH_MASK : cv.GC_EVAL);
  } catch {
    console.log("grab cut failed");
  }
};
const InterpretGrabcut = (state2) => {
  const maskMatData = state2.GrabCut.Mask.data;
  const outputMaskData = state2.OutputMask.data;
  for (let i = 0; i < maskMatData.length; i++) {
    const maskValue = maskMatData[i];
    if (maskValue == cv.GC_BGD || maskValue == cv.GC_PR_BGD) {
      outputMaskData[i] = 0;
    } else {
      outputMaskData[i] = 255;
    }
  }
};
const BuildEdges = (state2) => {
  const contours = new cv.MatVector();
  const hierarchy = new cv.Mat();
  cv.findContours(state2.OutputMask, contours, hierarchy, cv.RETR_LIST, cv.CHAIN_APPROX_SIMPLE);
  const output = [];
  for (let i = 0; i < contours.size(); ++i) {
    output.push(contours.get(i).data32S.slice(0));
  }
  contours.delete();
  hierarchy.delete();
  return output;
};
const BuildResult = (state2) => {
  const originalData = state2.Original.data;
  const output = new Uint8ClampedArray(originalData.slice(0));
  const outputMaskData = state2.OutputMask.data;
  for (let x = 0; x < state2.Width; x++) {
    for (let y = 0; y < state2.Height; y++) {
      const outputIndex = y * state2.Width * 4 + x * 4;
      const outputMaskValue = outputMaskData[y * state2.Width + x];
      output[outputIndex + 3] = outputMaskValue;
    }
  }
  return output;
};
const InterpretPair = (target, areaType, targetType) => {
  const targetData = target.data;
  const output = new cv.Mat(target.rows, target.cols, cv.CV_8UC1);
  output.setTo(new cv.Scalar(0));
  const targetTypeMat = new cv.Mat(target.rows, target.cols, cv.CV_8UC1);
  const eitherTypeMat = new cv.Mat(target.rows, target.cols, cv.CV_8UC1);
  const targetTypeData = targetTypeMat.data;
  const eitherTypeData = eitherTypeMat.data;
  for (let i = 0; i < targetData.length; i++) {
    const targetValue = targetData[i];
    if (targetValue == targetType) {
      targetTypeData[i] = 255;
      eitherTypeData[i] = 255;
    } else if (targetValue == areaType) {
      eitherTypeData[i] = 255;
      targetTypeData[i] = 0;
    } else {
      eitherTypeData[i] = 0;
      targetTypeData[i] = 0;
    }
  }
  const tempMat = new cv.Mat(target.rows, target.cols, cv.CV_8UC1);
  const contours = new cv.MatVector();
  const hierarchy = new cv.Mat();
  cv.findContours(eitherTypeMat, contours, hierarchy, cv.RETR_LIST, cv.CHAIN_APPROX_SIMPLE);
  const black = new cv.Scalar(0);
  const white = new cv.Scalar(255);
  const markedColour = new cv.Scalar(1);
  for (let i = 0; i < contours.size(); ++i) {
    tempMat.setTo(black);
    cv.drawContours(tempMat, contours, i, white, -1, cv.LINE_8);
    let mean = cv.mean(targetTypeMat, tempMat);
    if (mean[0] == 0) {
      cv.drawContours(output, contours, i, markedColour, -1, cv.LINE_8);
    }
  }
  targetTypeMat.delete();
  eitherTypeMat.delete();
  tempMat.delete();
  contours.delete();
  hierarchy.delete();
  return output;
};
const CloseUnmarkedSections = (state2) => {
  const outputMaskData = state2.OutputMask.data;
  const clonedMaskMat = state2.GrabCut.Mask;
  const clonedMaskMatData = clonedMaskMat.data;
  const bgdResult = InterpretPair(clonedMaskMat, cv.GC_PR_BGD, cv.GC_BGD);
  const bgdResultData = bgdResult.data;
  for (let i = 0; i < bgdResultData.length; i++) {
    if (bgdResultData[i] == 1) {
      if (clonedMaskMatData[i] == cv.GC_PR_BGD) {
        clonedMaskMatData[i] = cv.GC_PR_FGD;
      }
      outputMaskData[i] = 255;
    }
  }
  const fgdResult = InterpretPair(clonedMaskMat, cv.GC_PR_FGD, cv.GC_FGD);
  const fgdResultData = fgdResult.data;
  for (let i = 0; i < fgdResultData.length; i++) {
    if (fgdResultData[i] == 1) {
      if (clonedMaskMatData[i] == cv.GC_PR_FGD) {
        clonedMaskMatData[i] = cv.GC_PR_BGD;
      }
      outputMaskData[i] = 0;
    }
  }
  bgdResult.delete();
  fgdResult.delete();
};
const CloseGaps = (state2) => {
  CloseUnmarkedSections(state2);
};
const BorderMatting = (state2) => {
  const contours = new cv.MatVector();
  const hierarchy = new cv.Mat();
  cv.findContours(state2.OutputMask, contours, hierarchy, cv.RETR_CCOMP, cv.CHAIN_APPROX_SIMPLE);
  const hierarchyData = hierarchy.data32S;
  const OutputMaskData = state2.OutputMask.data;
  const unknownRegionData = state2.UnknownRegion.Mask.data;
  for (let x = 0; x < state2.Width; x++) {
    for (let y = 0; y < state2.Height; y++) {
      const maskIndex = y * state2.Width + x;
      if (unknownRegionData[maskIndex] != 255)
        continue;
      const point = new cv.Point(x, y);
      let current = Number.POSITIVE_INFINITY;
      for (let hIndex = 0; hIndex < hierarchy.cols; hIndex++) {
        const hierarchyIndex = hIndex * 4;
        const direction = hierarchyData[hierarchyIndex + 3] == -1 ? 1 : -1;
        const distance = cv.pointPolygonTest(contours.get(hIndex), point, true) * direction;
        if (Math.abs(distance) < Math.abs(current)) {
          current = distance;
        }
      }
      current = state2.UnknownRegion.Size / 2 + current;
      const interp = Math.min(state2.UnknownRegion.Size, Math.max(0, current)) / state2.UnknownRegion.Size;
      const newMaskValue = Math.floor(255 * interp);
      OutputMaskData[maskIndex] = newMaskValue;
    }
  }
  contours.delete();
  hierarchy.delete();
};
const ColourSize = 5;
const ColourStealing = (state2, result) => {
  const definitelyForegroundMask = new cv.Mat();
  cv.subtract(state2.OutputMask, state2.UnknownRegion.Mask, definitelyForegroundMask);
  let currentColour = [0, 0, 0];
  const unknownRegionData = state2.UnknownRegion.Mask.data;
  const originalData = state2.Original.data;
  const definitelyForegroundMaskData = definitelyForegroundMask.data;
  for (let x = 0; x < state2.Width; x++) {
    for (let y = 0; y < state2.Height; y++) {
      const maskIndex = y * state2.Width + x;
      if (unknownRegionData[maskIndex] != 255)
        continue;
      const minX = Math.max(0, x - ColourSize);
      const maxX = Math.min(state2.Width, x + ColourSize);
      const minY = Math.max(0, y - ColourSize);
      const maxY = Math.min(state2.Height, y + ColourSize);
      let currentDistance = -1;
      for (let subX = minX; subX < maxX; subX++) {
        for (let subY = minY; subY < maxY; subY++) {
          const subMaskIndex = subY * state2.Width + subX;
          if (definitelyForegroundMaskData[subMaskIndex] == 255) {
            const originalIndex = subY * state2.Width * 4 + subX * 4;
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
        const resultIndex = y * state2.Width * 4 + x * 4;
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
const CalculateUnknownRegion = (state2) => {
  const M = cv.Mat.ones(state2.UnknownRegion.Size, state2.UnknownRegion.Size, cv.CV_8U);
  cv.morphologyEx(state2.OutputMask, state2.UnknownRegion.Mask, cv.MORPH_GRADIENT, M);
  M.delete();
};
const InitializeState = (originalImageBuffer, width, height) => {
  const originalMat = cv.matFromImageData(new ImageData(new Uint8ClampedArray(originalImageBuffer), width, height));
  const t0 = performance.now();
  const output = {
    Width: width,
    Height: height,
    RunCount: 0,
    Original: originalMat,
    Source: InitializeSource(originalMat),
    GrabCut: InitializeGrabCut(width, height),
    OutputMask: new cv.Mat(height, width, cv.CV_8UC1),
    UnknownRegion: {
      Size: 3,
      Mask: new cv.Mat(height, width, cv.CV_8UC1)
    }
  };
  const t1 = performance.now();
  console.log(`InitializeState: ${t1 - t0}ms`);
  return output;
};
const Segement = (state2, maskImageBuffer) => {
  const t0 = performance.now();
  PrepareGrabcutMask(state2, maskImageBuffer);
  GrabCut(state2);
  InterpretGrabcut(state2);
  CloseGaps(state2);
  CalculateUnknownRegion(state2);
  const edges = BuildEdges(state2);
  BorderMatting(state2);
  const result = BuildResult(state2);
  ColourStealing(state2, result);
  const t1 = performance.now();
  console.log(`Segment: ${t1 - t0}ms`);
  state2.RunCount++;
  return {
    resultArray: result,
    edgeArray: edges
  };
};
const Dispose = (state2) => {
  state2.Original.delete();
  state2.Source.delete();
  state2.OutputMask.delete();
  state2.GrabCut.Mask.delete();
  state2.GrabCut.BackgroundModel.delete();
  state2.GrabCut.ForegroundModel.delete();
  state2.UnknownRegion.Mask.delete();
};
importScripts("opencv-4.5.0.js");
let state;
self.addEventListener("message", (evt) => {
  switch (evt.data.action) {
    case "initialize":
      {
        if (state == null) {
          state = InitializeState(evt.data.sourceBuffer, evt.data.width, evt.data.height);
        }
      }
      break;
    case "mask-updated":
      {
        if (state != null) {
          const result = Segement(state, evt.data.maskBuffer);
          const edgeBuffers = [];
          for (let i = 0; i < result.edgeArray.length; i++) {
            edgeBuffers.push(result.edgeArray[i].buffer);
          }
          self.postMessage({
            action: "result-updated",
            resultBuffer: result.resultArray.buffer,
            edgeBuffers
          }, [result.resultArray.buffer, ...edgeBuffers]);
        }
      }
      break;
    case "dispose":
      {
        if (state != null) {
          Dispose(state);
          state = null;
        }
        self.close();
      }
      break;
  }
});
cv.onRuntimeInitialized = async () => {
  self.postMessage({ action: "ready" });
};
