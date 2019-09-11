import { cv } from '../../../open-cv/open-cv-wrapper';
import {
  PipelineState,
  InitializeState,
  Segement,
  Dispose
} from '../../../open-cv/pipeline';
const ctx = self as any;

cv.onRuntimeInitialized = async () => {
  ctx.postMessage({ action: 'ready' });
};

let state: PipelineState | null;
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

          ctx.postMessage(
            {
              action: 'result-updated',
              resultBuffer: result.resultArray.buffer,
              edgeBuffer: result.edgeArray.buffer
            },
            [result.resultArray.buffer, result.edgeArray.buffer]
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
