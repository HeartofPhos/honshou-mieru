const StepDrawBresenhamLine = (
  x0: number,
  y0: number,
  x1: number,
  y1: number,
  step: (x: number, y: number) => void
) => {
  x0 = x0;
  y0 = y0;
  x1 = x1;
  y1 = y1;

  let dx = Math.abs(x1 - x0),
    sx = x0 < x1 ? 1 : -1;
  let dy = Math.abs(y1 - y0),
    sy = y0 < y1 ? 1 : -1;
  let err = (dx > dy ? dx : -dy) / 2;

  while (true) {
    if (x0 === x1 && y0 === y1) break;
    step(x0, y0);
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

class CirclePixelBrush {
  private brushCanvas: HTMLCanvasElement;
  private brushCtx: CanvasRenderingContext2D | null;

  private outCanvas: HTMLCanvasElement;
  private outCtx: CanvasRenderingContext2D | null;
  private size: number;

  public constructor(size: number, colour: string) {
    this.size = size;

    this.brushCanvas = document.createElement('canvas');
    this.brushCtx = this.brushCanvas.getContext('2d');
    if (this.brushCtx) {
      this.brushCanvas.width = this.size + 1;
      this.brushCanvas.height = this.size + 1;
      this.brushCtx.strokeStyle = colour;
      this.brushCtx.fillStyle = colour;
      DrawCircle(
        Math.floor(this.size / 2),
        Math.floor(this.size / 2),
        Math.floor(this.size / 2),
        this.brushCtx
      );
    }

    this.outCanvas = document.createElement('canvas');
    this.outCtx = this.outCanvas.getContext('2d');
    if (this.outCtx) {
      this.outCanvas.width = this.size + 1;
      this.outCanvas.height = this.size + 1;
      this.outCtx.strokeStyle = '#000000';
      this.outCtx.fillStyle = '#000000';
      DrawCircle(
        Math.floor(this.size / 2),
        Math.floor(this.size / 2),
        Math.floor(this.size / 2),
        this.outCtx
      );
    }
  }

  public DrawToContext(x: number, y: number, target: CanvasRenderingContext2D) {
    target.globalCompositeOperation = 'destination-out';
    target.drawImage(
      this.outCanvas,
      Math.floor(x - this.size / 2),
      Math.floor(y - this.size / 2)
    );

    target.globalCompositeOperation = 'source-over';
    target.drawImage(
      this.brushCanvas,
      Math.floor(x - this.size / 2),
      Math.floor(y - this.size / 2)
    );
  }

  public DrawLineToContext(
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
    StepDrawBresenhamLine(x0, y0, x1, y1, (x, y) =>
      this.DrawToContext(x, y, target)
    );
  }
}

export default CirclePixelBrush;
