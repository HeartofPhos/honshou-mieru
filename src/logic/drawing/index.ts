export * from './brushes';

export interface Drawable {
  DrawToContext(x: number, y: number, target: CanvasRenderingContext2D): void;
}
