import { cv } from '../../../open-cv/open-cv-wrapper';
import {
  SegmentState,
  InitializeState,
  Segement,
  Dispose
} from '../../../open-cv/pipeline';
const ctx = self as any;

cv.onRuntimeInitialized = async () => {
  ctx.postMessage({ action: 'ready' });
};

let state: SegmentState | null;
ctx.addEventListener('message', (evt: any) => {
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
          const edgeBuffers = [];
          for (let i = 0; i < result.edgeArray.length; i++) {
            edgeBuffers.push(result.edgeArray[i].buffer);
          }

          ctx.postMessage(
            {
              action: 'result-updated',
              resultBuffer: result.resultArray.buffer,
              edgeBuffers: edgeBuffers
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
        ctx.close();
      }
      break;
  }
});
