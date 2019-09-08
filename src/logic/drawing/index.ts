export * from './brushes';

export interface Drawable {
  Draw(x: number, y: number, target: CanvasRenderingContext2D): void;
}
