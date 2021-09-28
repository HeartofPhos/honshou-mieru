import { cv } from '../open-cv-wrapper';
import { InitializeGrabCut } from './initialize/initialize-grabcut';
import { InitializeSource } from './initialize/initialize-source';
import { PrepareGrabcutMask } from './process/prepare-grabcut-mask';
import { GrabCut } from './process/grabcut';
import { InterpretGrabcut } from './process/interpret-grabcut';
import { BuildEdges, BuildResult } from './output/build-output';
import { CloseGaps } from './process/close-gaps';
import { BorderMatting } from './process/border-matting';
import { ColourStealing } from './process/colour-stealing';
import { CalculateUnknownRegion } from './process/unknown-region';

export interface GrabCutState {
  Mask: any;
  BackgroundModel: any;
  ForegroundModel: any;
}

export interface UnknownRegion {
  Size: number;
  Mask: any;
}

export interface SegmentState {
  Width: number;
  Height: number;
  RunCount: number;

  Original: any;
  Source: any;
  GrabCut: GrabCutState;
  OutputMask: any;

  UnknownRegion: UnknownRegion;
}

export interface SegmentOutput {
  resultArray: Uint8ClampedArray;
  edgeArray: Int32Array[];
}

export const InitializeState = (
  originalImageBuffer: ArrayBuffer,
  width: number,
  height: number
): SegmentState => {
  const originalMat = cv.matFromImageData(
    new ImageData(new Uint8ClampedArray(originalImageBuffer), width, height)
  );

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
      Mask: new cv.Mat(height, width, cv.CV_8UC1),
    },
  };
  const t1 = performance.now();
  console.log(`InitializeState: ${t1 - t0}ms`);

  return output;
};

export const Segement = (
  state: SegmentState,
  maskImageBuffer: ArrayBuffer
): SegmentOutput => {
  const t0 = performance.now();
  PrepareGrabcutMask(state, maskImageBuffer);
  GrabCut(state);
  InterpretGrabcut(state);
  CloseGaps(state);
  CalculateUnknownRegion(state);
  const edges = BuildEdges(state);
  BorderMatting(state);
  const result = BuildResult(state);
  ColourStealing(state, result);
  const t1 = performance.now();
  console.log(`Segment: ${t1 - t0}ms`);

  state.RunCount++;

  return {
    resultArray: result,
    edgeArray: edges,
  };
};

export const Dispose = (state: SegmentState) => {
  state.Original.delete();
  state.Source.delete();
  state.OutputMask.delete();

  state.GrabCut.Mask.delete();
  state.GrabCut.BackgroundModel.delete();
  state.GrabCut.ForegroundModel.delete();

  state.UnknownRegion.Mask.delete();
};
