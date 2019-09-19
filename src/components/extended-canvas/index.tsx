import React, { useEffect, RefObject, useState, useMemo } from 'react';
import { Drawable } from '../../logic/drawing';

export interface CanvasPosition {
  x: number;
  y: number;
}

export interface CanvasScale {
  x: number;
  y: number;
}

export interface CanvasSize {
  width: number;
  height: number;
}

interface Props {
  position: CanvasPosition;
  scale: CanvasScale;
  size: CanvasSize;
  draw: (ctx: CanvasRenderingContext2D) => void;
  className?: any;
}

const ResizeCanvas = (size: CanvasSize, ctx: CanvasRenderingContext2D) => {
  ctx.canvas.width = size.width;
  ctx.canvas.height = size.height;
};

const GetContext = (canvasRef: React.RefObject<HTMLCanvasElement>) => {
  const canvas = canvasRef.current;
  if (!canvas) return null;
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;
  return ctx;
};

class ExtendedCanvas extends React.Component<Props> {
  private canvasRef: React.RefObject<HTMLCanvasElement>;
  public constructor(props: Props) {
    super(props);

    this.canvasRef = React.createRef<HTMLCanvasElement>();
  }

  public Draw() {
    const ctx = GetContext(this.canvasRef);
    if (!ctx) return;

    ctx.save();
    ctx.resetTransform();
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.restore();

    this.props.draw(ctx);
  }

  public componentDidMount() {
    const ctx = GetContext(this.canvasRef);
    if (!ctx) return;

    ResizeCanvas(this.props.size, ctx);
    ctx.setTransform(
      this.props.scale.x,
      0,
      0,
      this.props.scale.y,
      this.props.position.x,
      this.props.position.y
    );

    this.Draw();
  }

  public componentDidUpdate(prevProps: Props) {
    let requireDraw = false;
    let requireRescaling =
      this.props.position !== prevProps.position ||
      this.props.scale !== prevProps.scale;

    const ctx = GetContext(this.canvasRef);
    if (!ctx) return;

    if (this.props.size !== prevProps.size) {
      ResizeCanvas(this.props.size, ctx);
      requireDraw = true;
      requireRescaling = true;
    }

    if (requireRescaling) {
      ctx.setTransform(
        this.props.scale.x,
        0,
        0,
        this.props.scale.y,
        this.props.position.x,
        this.props.position.y
      );
      requireDraw = true;
    }

    if (requireDraw) {
      this.Draw();
    }
  }

  public render() {
    return (
      <canvas className={this.props.className} ref={this.canvasRef}></canvas>
    );
  }
}

export default ExtendedCanvas;
