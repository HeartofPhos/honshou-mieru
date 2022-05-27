import { Drawable } from '.';
import DetachedCanvas from './detached-canvas';

const StepBresenhamLine = (
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

interface BrushStepParameters {
  size: number;
  colour: string;
  compositeOperation: GlobalCompositeOperation;
}

export class CircleBrush implements Drawable {
  private stepCount: number;
  private stepParameters: BrushStepParameters[];
  private stepCanvases: DetachedCanvas[];

  public constructor(stepParameters: BrushStepParameters[]) {
    this.stepCount = stepParameters.length;
    this.stepParameters = stepParameters;
    this.stepCanvases = [];
    this.stepParameters.forEach((p) => {
      if (p.size % 2 == 0) p.size++;

      var canvas = new DetachedCanvas(p.size, p.size);
      canvas.ctx.strokeStyle = p.colour;
      canvas.ctx.fillStyle = p.colour;

      DrawCircle(
        Math.floor(p.size / 2),
        Math.floor(p.size / 2),
        Math.floor(p.size / 2),
        canvas.ctx
      );

      this.stepCanvases.push(canvas);
    });
  }

  public DrawToContext(x: number, y: number, target: CanvasRenderingContext2D) {
    for (let i = 0; i < this.stepCount; i++) {
      const stepParameter = this.stepParameters[i];
      const stepCanvas = this.stepCanvases[i];

      target.globalCompositeOperation = stepParameter.compositeOperation;
      target.drawImage(
        stepCanvas.canvas,
        Math.round(x - stepParameter.size / 2),
        Math.round(y - stepParameter.size / 2)
      );
    }
  }
}

export function CircleClearBrush(size: number) {
  return new CircleBrush([
    {
      size: size,
      colour: '#000000',
      compositeOperation: 'destination-out',
    },
  ]);
}

export function CirclePixelBrush(size: number, colour: string) {
  return new CircleBrush([
    {
      size: size,
      colour: '#000000',
      compositeOperation: 'destination-out',
    },
    {
      size: size,
      colour: colour,
      compositeOperation: 'source-over',
    },
  ]);
}

export function DrawLineToContext(
  x0: number,
  y0: number,
  x1: number,
  y1: number,
  target: CanvasRenderingContext2D,
  drawable: Drawable
) {
  x0 = Math.floor(x0);
  y0 = Math.floor(y0);
  x1 = Math.floor(x1);
  y1 = Math.floor(y1);
  StepBresenhamLine(x0, y0, x1, y1, (x, y) =>
    drawable.DrawToContext(x, y, target)
  );
}
