import GrabCutWorker from 'worker-loader!./worker';

interface MaskUpdatedMessage {
  buffer: ArrayBuffer;
  width: number;
  height: number;
}

export default class GrabCutWorkerWrapper {
  private grabCutWorker: GrabCutWorker;
  private waitingForResponse: boolean;
  private bufferedMaskUpdatedMessage: MaskUpdatedMessage | null;

  public constructor(
    imageData: ImageData,
    resultCallback: (resultImageData: ImageData) => void
  ) {
    this.grabCutWorker = new GrabCutWorker();
    this.waitingForResponse = false;
    this.bufferedMaskUpdatedMessage = null;

    this.grabCutWorker.onmessage = evt => {
      switch (evt.data.action) {
        case 'ready':
          {
            this.grabCutWorker.postMessage(
              {
                action: 'initialize',
                buffer: imageData.data.buffer,
                width: imageData.width,
                height: imageData.height
              },
              [imageData.data.buffer]
            );
          }
          break;
        case 'result-updated':
          {
            resultCallback(
              new ImageData(
                new Uint8ClampedArray(evt.data.buffer),
                evt.data.width,
                evt.data.height
              )
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
      buffer: maskImageData.data.buffer,
      width: maskImageData.width,
      height: maskImageData.height
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
          buffer: message.buffer,
          width: message.width,
          height: message.height
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
