/// <reference lib="webworker" />

importScripts('opencv-4.5.0.js');
declare global {
  var cv: any;
}

import {
  SegmentState,
  InitializeState,
  Segement,
  Dispose,
} from '../../../open-cv/pipeline';

let state: SegmentState | null;
self.addEventListener('message', (evt: any) => {
  switch (evt.data.action) {
    case 'initialize':
      {
        if (state == null) {
          state = InitializeState(
            evt.data.sourceBuffer,
            evt.data.width,
            evt.data.height
          );
        }
      }
      break;
    case 'mask-updated':
      {
        if (state != null) {
          const result = Segement(state, evt.data.maskBuffer);
          const edgeBuffers: ArrayBufferLike[] = [];
          for (let i = 0; i < result.edgeArray.length; i++) {
            edgeBuffers.push(result.edgeArray[i].buffer);
          }

          self.postMessage(
            {
              action: 'result-updated',
              resultBuffer: result.resultArray.buffer,
              edgeBuffers: edgeBuffers,
            },
            [result.resultArray.buffer, ...edgeBuffers]
          );
        }
      }
      break;
    case 'dispose':
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
  self.postMessage({ action: 'ready' });
};
