//@ts-ignore
import React, { useEffect, useMemo, useState } from 'react';
import { MaskType } from '../../logic/misc';
import styles from './styles.css';
import MaskEditor from './mask-editor';
import { CachedImage } from '../../logic/drawing';
import ExtendedCanvas, { CanvasSize, CanvasPosition } from '../extended-canvas';

const SetBrushFromMaskType = (
  maskEditor: MaskEditor,
  maskType: MaskType,
  size: number
) => {
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
  position: CanvasPosition;
  scale: number;
  size: CanvasSize;
  baseImage: CachedImage;
  edgeArray?: Int32Array[];
  targetMaskType: MaskType;
  onMaskChanged?: OnMaskChanged;
}

const MaskEditorRenderer = ({
  position,
  scale,
  size,
  baseImage,
  edgeArray,
  targetMaskType,
  onMaskChanged
}: Props) => {
  const divRef = React.useRef<HTMLDivElement>(null);
  const baseCanvasRef = React.useRef<ExtendedCanvas>(null);
  const maskCanvasRef = React.useRef<ExtendedCanvas>(null);
  const edgeCanvasRef = React.useRef<ExtendedCanvas>(null);

  const [maskEditor, setMaskEditor] = useState<MaskEditor>();
  const [drawingState, setDrawingState] = useState<DrawingState>({
    IsDrawing: false,
    LastX: 0,
    LastY: 0
  });

  const maxBrushSize = 20;
  useEffect(() => {
    const newMaskEditor = new MaskEditor(baseImage.width, baseImage.height);
    setMaskEditor(newMaskEditor);
  }, [baseImage]);

  useEffect(() => {
    if (edgeCanvasRef.current) {
      edgeCanvasRef.current.Draw();
    }
  }, [edgeArray]);

  useMemo(() => {
    if (maskEditor) {
      SetBrushFromMaskType(
        maskEditor,
        targetMaskType,
        Math.min(Math.ceil(maxBrushSize / scale), maxBrushSize)
      );
    }
  }, [maskEditor, targetMaskType, scale]);

  return (
    <div
      className={styles.rendererDiv}
      ref={divRef}
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
        if ((evt.buttons & 1) !== 1) return;
        if (!maskEditor) return;
        if (!divRef.current) return;
        if (!maskCanvasRef.current) return;

        const rect = divRef.current.getBoundingClientRect();
        const x = (evt.clientX - rect.left - position.x) / scale;
        const y = (evt.clientY - rect.top - position.y) / scale;

        maskEditor.DrawMask(x, y);

        setDrawingState({
          IsDrawing: true,
          LastX: x,
          LastY: y
        });

        maskCanvasRef.current.Draw();
      }}
      onPointerMove={evt => {
        if ((evt.buttons & 1) !== 1) return;
        if (!drawingState.IsDrawing) return;
        if (!maskEditor) return;
        if (!divRef.current) return;

        const rect = divRef.current.getBoundingClientRect();
        const x = (evt.clientX - rect.left - position.x) / scale;
        const y = (evt.clientY - rect.top - position.y) / scale;

        maskEditor.DrawMaskLine(drawingState.LastX, drawingState.LastY, x, y);

        setDrawingState({
          IsDrawing: true,
          LastX: x,
          LastY: y
        });

        if (maskCanvasRef.current) {
          maskCanvasRef.current.Draw();
        }
      }}
    >
      <ExtendedCanvas
        className={styles.baseCanvas}
        position={position}
        scale={scale}
        size={size}
        smoothingEnabled={false}
        draw={ctx => {
          baseImage.Draw(0, 0, ctx);
        }}
        ref={baseCanvasRef}
      ></ExtendedCanvas>
      <ExtendedCanvas
        className={styles.stackedCanvas}
        position={position}
        scale={scale}
        size={size}
        smoothingEnabled={false}
        draw={ctx => {
          if (maskEditor) maskEditor.Draw(0, 0, ctx);
        }}
        ref={maskCanvasRef}
      ></ExtendedCanvas>
      <ExtendedCanvas
        className={styles.stackedCanvas}
        position={position}
        scale={scale}
        size={size}
        smoothingEnabled={true}
        draw={ctx => {
          if (edgeArray) {
            ctx.lineWidth = 2.5 / scale;
            ctx.strokeStyle = 'yellow';
            for (let i = 0; i < edgeArray.length; i++) {
              const edges = edgeArray[i];

              ctx.beginPath();
              ctx.moveTo(edges[0] + 0.5, edges[1] + 0.5);
              for (let j = 2; j < edges.length + 2; j += 2) {
                ctx.lineTo(
                  edges[j % edges.length] + 0.5,
                  edges[(j + 1) % edges.length] + 0.5
                );
              }
              ctx.stroke();
            }
          }
        }}
        ref={edgeCanvasRef}
      ></ExtendedCanvas>
    </div>
  );
};

export default MaskEditorRenderer;
