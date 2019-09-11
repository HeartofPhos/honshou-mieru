//@ts-ignore
import React, { useEffect, useMemo, useState } from 'react';
import { Redraw, MaskType } from '../../logic/misc';
import styles from './styles.css';
import MaskEditor from './mask-editor';
import { CachedImage } from '../../logic/drawing';
import { CanvasSize, ResizeCanvas } from '../../logic/canvas-resize';

const SetBrushFromMaskType = (maskEditor: MaskEditor, maskType: MaskType) => {
  const size = 10;
  switch (maskType) {
    case MaskType.Background:
      {
        maskEditor.SetBrush(size, 'rgba(255,0,0,0.5)');
      }
      break;
    case MaskType.Foreground:
      {
        maskEditor.SetBrush(size, 'rgba(0,255,0,0.5)');
      }
      break;
    default:
      {
        maskEditor.SetBrush(size, null);
      }
      break;
  }
};

type OnMaskChanged = (imageData: ImageData) => void;

interface DrawingState {
  IsDrawing: boolean;
  LastX: number;
  LastY: number;
}

interface Props {
  baseImage: CachedImage;
  edgeImage?: CachedImage;
  targetMaskType: MaskType;
  onMaskChanged?: OnMaskChanged;
  canvasSize: CanvasSize;
}

const MaskEditorRenderer = ({
  baseImage,
  edgeImage,
  targetMaskType,
  onMaskChanged,
  canvasSize
}: Props) => {
  const baseCanvasRef = React.useRef<HTMLCanvasElement>(null);
  const maskCanvasRef = React.useRef<HTMLCanvasElement>(null);
  const edgeCanvasRef = React.useRef<HTMLCanvasElement>(null);

  const [maskEditor, setMaskEditor] = useState<MaskEditor>();
  const [drawingState, setDrawingState] = useState<DrawingState>({
    IsDrawing: false,
    LastX: 0,
    LastY: 0
  });

  useEffect(() => {
    Redraw(baseCanvasRef, baseImage);

    const newMaskEditor = new MaskEditor(baseImage.width, baseImage.height);
    SetBrushFromMaskType(newMaskEditor, targetMaskType);
    setMaskEditor(newMaskEditor);
  }, [baseImage]);

  useEffect(() => {
    if (edgeImage) {
      Redraw(edgeCanvasRef, edgeImage);
    }
  }, [edgeImage]);

  useEffect(() => {
    ResizeCanvas(canvasSize, baseCanvasRef);
    ResizeCanvas(canvasSize, maskCanvasRef);
    ResizeCanvas(canvasSize, edgeCanvasRef);
    Redraw(baseCanvasRef, baseImage);
    if (maskEditor) {
      Redraw(maskCanvasRef, maskEditor);
    }
    if (edgeImage) {
      Redraw(edgeCanvasRef, edgeImage);
    }
  }, [canvasSize]);

  useMemo(() => {
    if (maskEditor) {
      SetBrushFromMaskType(maskEditor, targetMaskType);
    }
  }, [targetMaskType]);

  return (
    <div
      className={styles.rendererDiv}
      onPointerUp={() => {
        if (drawingState.IsDrawing) {
          if (maskEditor && onMaskChanged) {
            onMaskChanged(maskEditor.GetData());
          }
          setDrawingState({ ...drawingState, IsDrawing: false });
        }
      }}
      onPointerOut={() => {
        if (drawingState.IsDrawing) {
          if (maskEditor && onMaskChanged) {
            onMaskChanged(maskEditor.GetData());
          }
          setDrawingState({ ...drawingState, IsDrawing: false });
        }
      }}
      onPointerDown={evt => {
        if (!maskEditor) return;
        if (!maskCanvasRef.current) return;

        const canvas = maskCanvasRef.current;
        const rect = canvas.getBoundingClientRect();
        const x = evt.clientX - rect.left;
        const y = evt.clientY - rect.top;

        maskEditor.DrawMask(x, y);

        setDrawingState({
          IsDrawing: true,
          LastX: x,
          LastY: y
        });

        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        maskEditor.Draw(0, 0, ctx);
      }}
      onPointerMove={evt => {
        if (!drawingState.IsDrawing) return;
        if (!maskEditor) return;
        if (!maskCanvasRef.current) return;

        const canvas = maskCanvasRef.current;
        const rect = canvas.getBoundingClientRect();
        const x = evt.clientX - rect.left;
        const y = evt.clientY - rect.top;

        maskEditor.DrawMaskLine(drawingState.LastX, drawingState.LastY, x, y);

        setDrawingState({
          IsDrawing: true,
          LastX: x,
          LastY: y
        });

        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        maskEditor.Draw(0, 0, ctx);
      }}
    >
      <canvas className={styles.baseCanvas} ref={baseCanvasRef}></canvas>
      <canvas className={styles.stackedCanvas} ref={maskCanvasRef}></canvas>
      <canvas className={styles.stackedCanvas} ref={edgeCanvasRef}></canvas>
    </div>
  );
};

export default MaskEditorRenderer;
