//@ts-ignore
import React, { useEffect, useMemo, useState } from 'react';
import { InitializeCanvasFromImage, MaskType } from '../../utility/misc';
import styles from './styles.css';
import MaskEditor from '../../utility/mask-editor';

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
  switch (maskType) {
    case MaskType.Background:
      {
        maskEditor.SetBrush(10, 'rgba(255,0,0,0.5)');
      }
      break;
    case MaskType.Foreground:
      {
        maskEditor.SetBrush(10, 'rgba(0,255,0,0.5)');
      }
      break;
    default:
      {
        maskEditor.SetBrush(10, null);
      }
      break;
  }
};

interface Props {
  imageData: ImageData;
  targetMaskType: MaskType;
}

const MaskEditorRenderer = ({ targetMaskType, imageData }: Props) => {
  const imageCanvasRef = React.useRef<HTMLCanvasElement>(null);
  const maskCanvasRef = React.useRef<HTMLCanvasElement>(null);

  const [maskEditor, setMaskEditor] = useState<MaskEditor>();

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

  let isDrawing = false;
  return (
    <div className={styles.rendererDiv}>
      <canvas className={styles.imageCanvas} ref={imageCanvasRef}></canvas>
      <canvas
        onPointerUp={evt => {
          if (isDrawing) {
            isDrawing = false;
          }
        }}
        onPointerOut={evt => {
          if (isDrawing) {
            isDrawing = false;
          }
        }}
        onPointerDown={evt => {
          isDrawing = true;
          if (!maskEditor) return;

          const canvas = evt.currentTarget;
          const rect = canvas.getBoundingClientRect();
          const x = evt.clientX - rect.left;
          const y = evt.clientY - rect.top;

          maskEditor.Draw(x, y);

          const ctx = canvas.getContext('2d');
          if (!ctx) return;
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          maskEditor.DrawToContext(0, 0, ctx);
        }}
        onPointerMove={evt => {
          if (!isDrawing) return;
          if (!maskEditor) return;

          const canvas = evt.currentTarget;
          const rect = canvas.getBoundingClientRect();
          const x = evt.clientX - rect.left;
          const y = evt.clientY - rect.top;

          maskEditor.DrawLine(x, y, x + evt.movementX, y + evt.movementY);

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
