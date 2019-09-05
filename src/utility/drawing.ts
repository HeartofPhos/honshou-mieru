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

class CirclePixelBrush {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D | null;
  private size: number;

  public constructor(size: number, colour: string) {
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.size = size;

    if (this.ctx) {
      this.ctx.strokeStyle = colour;
      this.ctx.fillStyle = colour;

      this.canvas.width = this.size + 1;
      this.canvas.height = this.size + 1;
      this.DrawCircle(
        Math.floor(this.size / 2),
        Math.floor(this.size / 2),
        Math.floor(this.size / 2)
      );
    }
  }

  public DrawToContext(x: number, y: number, target: CanvasRenderingContext2D) {
    target.globalCompositeOperation = 'destination-out';
    target.drawImage(
      this.canvas,
      Math.floor(x - this.size / 2),
      Math.floor(y - this.size / 2)
    );

    target.globalCompositeOperation = 'source-over';
    target.drawImage(
      this.canvas,
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

  private DrawPixel(x: number, y: number) {
    if (!this.ctx) return;
    this.ctx.fillRect(x, y, 1, 1);
  }

  private DrawCircle(centerX: number, centerY: number, radius: number) {
    let x = radius;
    let y = 0;
    let radiusError = 1 - x;

    while (x >= y) {
      let startX = -x + centerX;
      let endX = x + centerX;
      StepDrawBresenhamLine(startX, y + centerY, endX, y + centerY, (x, y) =>
        this.DrawPixel(x, y)
      );
      if (y != 0) {
        StepDrawBresenhamLine(
          startX,
          -y + centerY,
          endX,
          -y + centerY,
          (x, y) => this.DrawPixel(x, y)
        );
      }

      y++;

      if (radiusError < 0) {
        radiusError += 2 * y + 1;
      } else {
        if (x >= y) {
          startX = -y + 1 + centerX;
          endX = y - 1 + centerX;

          StepDrawBresenhamLine(
            startX,
            x + centerY,
            endX,
            x + centerY,
            (x, y) => this.DrawPixel(x, y)
          );
          StepDrawBresenhamLine(
            startX,
            -x + centerY,
            endX,
            -x + centerY,
            (x, y) => this.DrawPixel(x, y)
          );
        }
        x--;
        radiusError += 2 * (y - x + 1);
      }
    }
  }
}

export default CirclePixelBrush;
