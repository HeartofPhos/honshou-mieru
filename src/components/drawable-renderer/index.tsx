import React, { useEffect } from 'react';
import ExtendedCanvas, { CanvasPosition, CanvasSize } from '../extended-canvas';
import { Drawable } from '../../logic/drawing';

interface Props {
  className?: string;
  position: CanvasPosition;
  scale: number;
  size: CanvasSize;
  smoothingEnabled?: boolean;
  drawable?: Drawable;
}

const DrawableRenderer = ({
  className,
  position,
  scale,
  size,
  smoothingEnabled,
  drawable
}: Props) => {
  const drawableCanvasRef = React.useRef<ExtendedCanvas>(null);

  useEffect(() => {
    if (drawableCanvasRef.current) {
      drawableCanvasRef.current.Draw();
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
        if (drawable) drawable.DrawToContext(0, 0, ctx);
      }}
      ref={drawableCanvasRef}
    ></ExtendedCanvas>
  );
};

export default DrawableRenderer;
