import { Drawable } from '.';

const StepDrawBresenhamLine = (
  x0: number,
  y0: number,
  x1: number,
  y1: number,
  step: (x: number, y: number) => void
) => {
  let dx = Math.abs(x1 - x0);
  let sx = x0 < x1 ? 1 : -1;
  let dy = Math.abs(y1 - y0);
  let sy = y0 < y1 ? 1 : -1;
  let err = (dx > dy ? dx : -dy) / 2;

  while (true) {
    step(x0, y0);
    if (x0 === x1 && y0 === y1) break;
    var e2 = err;
    if (e2 > -dx) {
      err -= dy;
      x0 += sx;
    }
    if (e2 < dy) {
      err += dx;
      y0 += sy;
    }
  }
};

const DrawPixel = (x: number, y: number, ctx: CanvasRenderingContext2D) => {
  ctx.fillRect(x, y, 1, 1);
};

const DrawHorizontalLine = (
  x0: number,
  y0: number,
  x1: number,
  ctx: CanvasRenderingContext2D
) => {
  for (let x = x0; x <= x1; ++x) DrawPixel(x, y0, ctx);
};

const Plot4Points = (
  cx: number,
  cy: number,
  x: number,
  y: number,
  ctx: CanvasRenderingContext2D
) => {
  DrawHorizontalLine(cx - x, cy + y, cx + x, ctx);
  if (y != 0) DrawHorizontalLine(cx - x, cy - y, cx + x, ctx);
};

const DrawCircle = (
  cx: number,
  cy: number,
  radius: number,
  ctx: CanvasRenderingContext2D
) => {
  let error = -radius;
  let x = radius;
  let y = 0;

  while (x >= y) {
    let lastY = y;

    error += y;
    ++y;
    error += y;

    Plot4Points(cx, cy, x, lastY, ctx);

    if (error >= 0) {
      if (x != lastY) Plot4Points(cx, cy, lastY, x, ctx);

      error -= x;
      --x;
      error -= x;
    }
  }
};

export interface Brush extends Drawable {
  DrawLine(
    x0: number,
    y0: number,
    x1: number,
    y1: number,
    target: CanvasRenderingContext2D
  ): void;
}

export class CircleClearBrush implements Brush {
  private size: number;
  private outCanvas: HTMLCanvasElement;

  public constructor(size: number) {
    this.size = size % 2 == 0 ? size + 1 : size;

    this.outCanvas = document.createElement('canvas');
    const outCtx = this.outCanvas.getContext('2d');
    if (outCtx) {
      this.outCanvas.width = this.size;
      this.outCanvas.height = this.size;
      outCtx.strokeStyle = '#000000';
      outCtx.fillStyle = '#000000';
      DrawCircle(
        Math.floor(this.size / 2),
        Math.floor(this.size / 2),
        Math.floor(this.size / 2),
        outCtx
      );
    }
  }

  public Draw(x: number, y: number, target: CanvasRenderingContext2D) {
    target.globalCompositeOperation = 'destination-out';
    target.drawImage(
      this.outCanvas,
      Math.floor(0.5 + x - this.size / 2),
      Math.floor(0.5 + y - this.size / 2)
    );
  }

  public DrawLine(
    x0: number,
    y0: number,
    x1: number,
    y1: number,
    target: CanvasRenderingContext2D
  ) {
    x0 = Math.floor(x0);
    y0 = Math.floor(y0);
    x1 = Math.floor(x1);
    y1 = Math.floor(y1);
    StepDrawBresenhamLine(x0, y0, x1, y1, (x, y) => this.Draw(x, y, target));
  }
}

export class CirclePixelBrush implements Brush {
  private size: number;
  private clearBrush: CircleClearBrush;
  private brushCanvas: HTMLCanvasElement;

  public constructor(size: number, colour: string) {
    this.size = size % 2 == 0 ? size + 1 : size;
    this.clearBrush = new CircleClearBrush(size);

    this.brushCanvas = document.createElement('canvas');
    const brushCtx = this.brushCanvas.getContext('2d');
    if (brushCtx) {
      this.brushCanvas.width = this.size;
      this.brushCanvas.height = this.size;
      brushCtx.strokeStyle = colour;
      brushCtx.fillStyle = colour;
      DrawCircle(
        Math.floor(this.size / 2),
        Math.floor(this.size / 2),
        Math.floor(this.size / 2),
        brushCtx
      );
    }
  }

  public Draw(x: number, y: number, target: CanvasRenderingContext2D) {
    this.clearBrush.Draw(x, y, target);

    target.globalCompositeOperation = 'source-over';
    target.drawImage(
      this.brushCanvas,
      Math.floor(0.5 + x - this.size / 2),
      Math.floor(0.5 + y - this.size / 2)
    );
  }

  public DrawLine(
    x0: number,
    y0: number,
    x1: number,
    y1: number,
    target: CanvasRenderingContext2D
  ) {
    x0 = Math.floor(x0);
    y0 = Math.floor(y0);
    x1 = Math.floor(x1);
    y1 = Math.floor(y1);
    StepDrawBresenhamLine(x0, y0, x1, y1, (x, y) => this.Draw(x, y, target));
  }
}
