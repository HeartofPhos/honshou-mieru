//@ts-ignore
import React, { useEffect, useMemo, useState } from 'react';
import { InitializeCanvasFromImage, MaskType } from '../../utility/misc';
import styles from './styles.css';
import MaskEditor from './mask-editor';

const InitializeMaskCanvas = (
  maskCanvasRef: React.RefObject<HTMLCanvasElement>,
  width: number,
  height: number
) => {
  const canvas = maskCanvasRef.current;
  if (!canvas) return;

  canvas.width = width;
  canvas.height = height;
};

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
  imageData: ImageData;
  targetMaskType: MaskType;
  OnMaskChanged?: OnMaskChanged;
}

const MaskEditorRenderer = ({
  imageData,
  targetMaskType,
  OnMaskChanged
}: Props) => {
  const imageCanvasRef = React.useRef<HTMLCanvasElement>(null);
  const maskCanvasRef = React.useRef<HTMLCanvasElement>(null);

  const [maskEditor, setMaskEditor] = useState<MaskEditor>();
  const [drawingState, setDrawingState] = useState<DrawingState>({
    IsDrawing: false,
    LastX: 0,
    LastY: 0
  });

  useEffect(() => {
    InitializeCanvasFromImage(imageCanvasRef, imageData);
    InitializeMaskCanvas(maskCanvasRef, imageData.width, imageData.height);

    const newMaskEditor = new MaskEditor(imageData.width, imageData.height);
    SetBrushFromMaskType(newMaskEditor, targetMaskType);
    setMaskEditor(newMaskEditor);
  }, [imageData]);

  useMemo(() => {
    if (maskEditor) {
      SetBrushFromMaskType(maskEditor, targetMaskType);
    }
  }, [targetMaskType]);

  return (
    <div className={styles.rendererDiv}>
      <canvas className={styles.imageCanvas} ref={imageCanvasRef}></canvas>
      <canvas
        onPointerUp={evt => {
          if (drawingState.IsDrawing) {
            if (maskEditor && OnMaskChanged) {
              OnMaskChanged(maskEditor.GetData());
            }
            setDrawingState({ ...drawingState, IsDrawing: false });
          }
        }}
        onPointerOut={evt => {
          if (drawingState.IsDrawing) {
            if (maskEditor && OnMaskChanged) {
              OnMaskChanged(maskEditor.GetData());
            }
            setDrawingState({ ...drawingState, IsDrawing: false });
          }
        }}
        onPointerDown={evt => {
          if (!maskEditor) return;

          const canvas = evt.currentTarget;
          const rect = canvas.getBoundingClientRect();
          const x = evt.clientX - rect.left;
          const y = evt.clientY - rect.top;

          maskEditor.Draw(x, y);

          setDrawingState({
            IsDrawing: true,
            LastX: x,
            LastY: y
          });

          const ctx = canvas.getContext('2d');
          if (!ctx) return;
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          maskEditor.DrawToContext(0, 0, ctx);
        }}
        onPointerMove={evt => {
          if (!drawingState.IsDrawing) return;
          if (!maskEditor) return;

          const canvas = evt.currentTarget;
          const rect = canvas.getBoundingClientRect();
          const x = evt.clientX - rect.left;
          const y = evt.clientY - rect.top;

          maskEditor.DrawLine(drawingState.LastX, drawingState.LastY, x, y);

          setDrawingState({
            IsDrawing: true,
            LastX: x,
            LastY: y
          });

          const ctx = canvas.getContext('2d');
          if (!ctx) return;
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          maskEditor.DrawToContext(0, 0, ctx);
        }}
        className={styles.maskCanvas}
        ref={maskCanvasRef}
      ></canvas>
    </div>
  );
};

export default MaskEditorRenderer;
