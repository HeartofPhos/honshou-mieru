import GrabCutWorker from 'worker-loader!./worker';

interface MaskUpdatedMessage {
  buffer: ArrayBuffer;
}

export default class GrabCutWorkerWrapper {
  private width: number;
  private height: number;

  private grabCutWorker: GrabCutWorker;
  private waitingForResponse: boolean;
  private bufferedMaskUpdatedMessage: MaskUpdatedMessage | null;

  public constructor(
    imageData: ImageData,
    resultCallback: (
      resultImageData: ImageData,
      edgeArray: Int32Array[]
    ) => void
  ) {
    this.width = imageData.width;
    this.height = imageData.height;

    this.grabCutWorker = new GrabCutWorker();
    this.waitingForResponse = true;
    this.bufferedMaskUpdatedMessage = null;
    resultCallback(imageData, []);

    this.grabCutWorker.onmessage = evt => {
      switch (evt.data.action) {
        case 'ready':
          {
            console.log('worker ready');
            this.grabCutWorker.postMessage(
              {
                action: 'initialize',
                sourceBuffer: imageData.data.buffer,
                width: this.width,
                height: this.height
              },
              [imageData.data.buffer]
            );

            this.waitingForResponse = false;
            if (this.bufferedMaskUpdatedMessage) {
              this.PostUpdateMask(this.bufferedMaskUpdatedMessage);
            }
          }
          break;
        case 'result-updated':
          {
            resultCallback(
              new ImageData(
                new Uint8ClampedArray(evt.data.resultBuffer),
                this.width,
                this.height
              ),
              evt.data.edgeBuffers.map((x: Buffer) => new Int32Array(x))
            );

            this.waitingForResponse = false;
            if (this.bufferedMaskUpdatedMessage) {
              this.PostUpdateMask(this.bufferedMaskUpdatedMessage);
            }
          }
          break;
      }
    };
  }

  public UpdateMask(maskImageData: ImageData) {
    const newMessage = {
      buffer: maskImageData.data.buffer
    };

    this.PostUpdateMask(newMessage);
  }

  private PostUpdateMask(message: MaskUpdatedMessage) {
    if (this.waitingForResponse) {
      this.bufferedMaskUpdatedMessage = message;
    } else {
      this.grabCutWorker.postMessage(
        {
          action: 'mask-updated',
          maskBuffer: message.buffer
        },
        [message.buffer]
      );

      this.bufferedMaskUpdatedMessage = null;
      this.waitingForResponse = true;
    }
  }

  public Dispose() {
    this.grabCutWorker.postMessage({ action: 'dispose' });
  }
}
