export interface CanvasSize {
  width: number;
  height: number;
}

export const ResizeCanvas = (
  canvasSize: CanvasSize,
  imageCanvasRef: React.RefObject<HTMLCanvasElement>
) => {
  const canvas = imageCanvasRef.current;
  if (!canvas) return;

  canvas.width = canvasSize.width;
  canvas.height = canvasSize.height;
};
