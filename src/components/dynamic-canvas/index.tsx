import React, { useEffect } from 'react';
import ExtendedCanvas, { CanvasPosition, CanvasSize } from '../extended-canvas';
import { DynamicDrawable } from '../../logic/drawing';

interface Props {
  className?: string;
  position: CanvasPosition;
  scale: number;
  size: CanvasSize;
  smoothingEnabled?: boolean;
  drawable?: DynamicDrawable;
}

const DynamicCanvas = ({
  className,
  position,
  scale,
  size,
  smoothingEnabled,
  drawable
}: Props) => {
  const drawableCanvasRef = React.useRef<ExtendedCanvas>(null);

  useEffect(() => {
    const redraw = () => {
      if (drawableCanvasRef.current) {
        drawableCanvasRef.current.Draw();
      }
    };

    if (drawable) {
      redraw();
      drawable.onChange.push(redraw);
    }
  }, [drawable]);

  return (
    <ExtendedCanvas
      className={className}
      position={position}
      scale={scale}
      size={size}
      smoothingEnabled={smoothingEnabled}
      draw={ctx => {
        if (drawable) drawable.Draw(0, 0, ctx);
      }}
      ref={drawableCanvasRef}
    ></ExtendedCanvas>
  );
};

export default DynamicCanvas;
