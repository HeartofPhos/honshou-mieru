//@ts-ignore
import React, { useEffect, useMemo, useState } from 'react';
import { MaskType } from '../../logic/misc';
import styles from './styles.css';
import MaskEditor from './mask-editor';
import { CachedImage } from '../../logic/drawing';
import ExtendedCanvas, {
  CanvasSize,
  CanvasScale,
  CanvasPosition
} from '../extended-canvas';

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
  position: CanvasPosition;
  scale: CanvasScale;
  size: CanvasSize;
  baseImage: CachedImage;
  edgeImage?: CachedImage;
  targetMaskType: MaskType;
  onMaskChanged?: OnMaskChanged;
}

const MaskEditorRenderer = ({
  position,
  scale,
  size,
  baseImage,
  edgeImage,
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

  useEffect(() => {
    const newMaskEditor = new MaskEditor(baseImage.width, baseImage.height);
    SetBrushFromMaskType(newMaskEditor, targetMaskType);
    setMaskEditor(newMaskEditor);
  }, [baseImage]);

  useEffect(() => {
    if (edgeCanvasRef.current) {
      edgeCanvasRef.current.Draw();
    }
  }, [edgeImage]);

  useMemo(() => {
    if (maskEditor) {
      SetBrushFromMaskType(maskEditor, targetMaskType);
    }
  }, [targetMaskType]);

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
        const x = (evt.clientX - rect.left - position.x) / scale.x;
        const y = (evt.clientY - rect.top - position.y) / scale.y;

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
        const x = (evt.clientX - rect.left - position.x) / scale.x;
        const y = (evt.clientY - rect.top - position.y) / scale.y;

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
        draw={ctx => {
          if (edgeImage) edgeImage.Draw(0, 0, ctx);
        }}
        ref={edgeCanvasRef}
      ></ExtendedCanvas>
    </div>
  );
};

export default MaskEditorRenderer;
