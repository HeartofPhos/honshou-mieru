import { cv } from '../open-cv-wrapper';
import { InitializeGrabCut } from './initialize/initialize-grabcut';
import { InitializeSource } from './initialize/initialize-source';
import { PrepareGrabcutMask } from './process/prepare-grabcut-mask';
import { GrabCut } from './process/grabcut';
import { InterpretGrabcut } from './process/interpret-grabcut';
import { BuildOutput } from './output/build-result';
import { CloseGaps } from './process/close-gaps';

export interface GrabCutState {
  Mask: any;
  BackgroundModel: any;
  ForegroundModel: any;
}

export interface SegmentState {
  Width: number;
  Height: number;
  RunCount: number;

  Original: any;
  Source: any;
  GrabCut: GrabCutState;
  OutputMask: any;
}

export interface SegmentOutput {
  resultArray: Uint8ClampedArray;
  edgeArray: Uint8ClampedArray;
}

export const InitializeState = (
  originalImageBuffer: ArrayBuffer,
  width: number,
  height: number
): SegmentState => {
  const originalMat = cv.matFromImageData(
    new ImageData(new Uint8ClampedArray(originalImageBuffer), width, height)
  );

  return {
    Width: width,
    Height: height,
    RunCount: 0,
    Original: originalMat,
    Source: InitializeSource(originalMat),
    OutputMask: new cv.Mat(height, width, cv.CV_8UC1),
    GrabCut: InitializeGrabCut(width, height)
  };
};

export const Segement = (
  state: SegmentState,
  maskImageBuffer: ArrayBuffer
): SegmentOutput => {
  PrepareGrabcutMask(state, maskImageBuffer);
  GrabCut(state);
  InterpretGrabcut(state);
  CloseGaps(state);
  const output = BuildOutput(state);

  state.RunCount++;

  return output;
};

export const Dispose = (state: SegmentState) => {
  state.Original.delete();
  state.Source.delete();
  state.OutputMask.delete();

  state.GrabCut.Mask.delete();
  state.GrabCut.BackgroundModel.delete();
  state.GrabCut.ForegroundModel.delete();
};
