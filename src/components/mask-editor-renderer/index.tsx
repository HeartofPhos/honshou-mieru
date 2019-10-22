//@ts-ignore
import React, { useMemo, useState } from 'react';
import { MaskType } from '../../logic/misc';
import styles from './styles.css';
import MaskEditor from '../../logic/segmenting/mask-editor';
import { Drawable, DynamicDrawable } from '../../logic/drawing';
import { CanvasSize, CanvasPosition } from '../extended-canvas';
import DrawableRenderer from '../drawable-renderer';
import GhostRenderer from '../../logic/segmenting/ghost-renderer';
import DynamicCanvas from '../dynamic-canvas';

type OnMaskChanged = () => void;

interface DrawingState {
  IsDrawing: boolean;
  LastX: number;
  LastY: number;
}

interface Props {
  position: CanvasPosition;
  scale: number;
  size: CanvasSize;
  baseImage: Drawable;
  maskEditor: MaskEditor;
  ghostRenderer: GhostRenderer;
  edgeRenderer: DynamicDrawable;
  targetMaskType: MaskType;
  brushSize: number;
  onMaskChanged?: OnMaskChanged;
}

const MaskEditorRenderer = ({
  position,
  scale,
  size,
  baseImage,
  maskEditor,
  ghostRenderer,
  edgeRenderer,
  targetMaskType,
  brushSize,
  onMaskChanged
}: Props) => {
  const divRef = React.useRef<HTMLDivElement>(null);

  const [drawingState, setDrawingState] = useState<DrawingState>({
    IsDrawing: false,
    LastX: 0,
    LastY: 0
  });

  useMemo(() => {
    if (maskEditor) {
      maskEditor.SetBrush(
        Math.min(Math.ceil(brushSize / scale), brushSize),
        targetMaskType
      );
    }
  }, [maskEditor, targetMaskType, brushSize, scale]);

  useMemo(() => {
    if (ghostRenderer) {
      ghostRenderer.SetBrush(
        Math.min(Math.ceil(brushSize / scale), brushSize),
        targetMaskType
      );
    }
  }, [ghostRenderer, targetMaskType, brushSize, scale]);

  return (
    <div
      className={styles.rendererDiv}
      ref={divRef}
      onPointerUp={() => {
        if (drawingState.IsDrawing) {
          if (maskEditor && onMaskChanged) {
            onMaskChanged();
          }
          setDrawingState({ ...drawingState, IsDrawing: false });
        }
      }}
      onPointerOut={() => {
        if (drawingState.IsDrawing) {
          if (maskEditor && onMaskChanged) {
            onMaskChanged();
          }
          setDrawingState({ ...drawingState, IsDrawing: false });
        }
        if (ghostRenderer) {
          ghostRenderer.ClearGhost();
        }
      }}
      onPointerDown={evt => {
        if ((evt.buttons & 1) !== 1) return;
        if (!maskEditor) return;
        if (!divRef.current) return;

        const rect = divRef.current.getBoundingClientRect();
        const x = (evt.clientX - rect.left - position.x) / scale;
        const y = (evt.clientY - rect.top - position.y) / scale;

        maskEditor.DrawMask(x, y);

        setDrawingState({
          IsDrawing: true,
          LastX: x,
          LastY: y
        });
      }}
      onPointerMove={evt => {
        if (!divRef.current) return;

        const rect = divRef.current.getBoundingClientRect();
        const x = (evt.clientX - rect.left - position.x) / scale;
        const y = (evt.clientY - rect.top - position.y) / scale;

        if (ghostRenderer) {
          ghostRenderer.SetGhostPosition(x, y);
        }

        if ((evt.buttons & 1) !== 1) return;
        if (!drawingState.IsDrawing) return;
        if (!maskEditor) return;

        maskEditor.DrawMaskLine(drawingState.LastX, drawingState.LastY, x, y);

        setDrawingState({
          IsDrawing: true,
          LastX: x,
          LastY: y
        });
      }}
    >
      <DrawableRenderer
        className={styles.baseCanvas}
        position={position}
        scale={scale}
        size={size}
        smoothingEnabled={false}
        drawable={baseImage}
      ></DrawableRenderer>
      <DynamicCanvas
        className={styles.stackedCanvas}
        position={position}
        scale={scale}
        size={size}
        smoothingEnabled={false}
        drawable={maskEditor}
      ></DynamicCanvas>
      <DynamicCanvas
        className={styles.stackedCanvas}
        position={position}
        scale={scale}
        size={size}
        smoothingEnabled={false}
        drawable={ghostRenderer}
      ></DynamicCanvas>
      <DynamicCanvas
        className={styles.stackedCanvas}
        position={position}
        scale={scale}
        size={size}
        smoothingEnabled={true}
        drawable={edgeRenderer}
      ></DynamicCanvas>
    </div>
  );
};

export default MaskEditorRenderer;
