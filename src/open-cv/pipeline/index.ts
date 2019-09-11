import { cv } from '../open-cv-wrapper';
import { InitializeGrabCut } from './actions/initialize-grabcut';
import { InitializeSource } from './actions/initialize-source';
import { PrepareMask } from './actions/prepare-mask';
import { GrabCut } from './actions/grabcut';
import { InterpretMask } from './actions/interpret-mask';
import { BuildResult } from './actions/build-result';

export interface GrabCutState {
  Mask: any;
  BackgroundModel: any;
  ForegroundModel: any;
}

export interface PipelineState {
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
): PipelineState => {
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
  state: PipelineState,
  maskImageBuffer: ArrayBuffer
): SegmentOutput => {
  PrepareMask(state, maskImageBuffer);
  GrabCut(state);
  InterpretMask(state);
  const output = BuildResult(state);

  state.RunCount++;

  return output;
};

export const Dispose = (state: PipelineState) => {
  state.Original.delete();
  state.Source.delete();
  state.OutputMask.delete();

  state.GrabCut.Mask.delete();
  state.GrabCut.BackgroundModel.delete();
  state.GrabCut.ForegroundModel.delete();
};
