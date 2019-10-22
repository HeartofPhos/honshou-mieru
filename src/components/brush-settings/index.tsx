import React, { useState } from 'react';

import styles from './styles.css';
import { MaskType } from '../../logic/misc';

interface Props {
  className?: string;
  maskType: MaskType;
  brushSize: number;
  onMaskTypeChange?: (maskType: MaskType) => void;
  onBrushSizeChange?: (size: number) => void;
}

const BrushSettings = ({
  className,
  maskType,
  brushSize,
  onMaskTypeChange,
  onBrushSizeChange
}: Props) => {
  const targetMaskTypeChange = (element: any) => {
    if (onMaskTypeChange) onMaskTypeChange(parseInt(element.value));
  };

  return (
    <div className={className}>
      <form className={styles.flexGroup}>
        <label>
          <input
            id="foreground"
            type="radio"
            value={MaskType.Foreground}
            checked={maskType == MaskType.Foreground}
            onChange={evt => targetMaskTypeChange(evt.target)}
          />
          <span>Foreground</span>
        </label>
        <label>
          <input
            id="background"
            type="radio"
            value={MaskType.Background}
            checked={maskType == MaskType.Background}
            onChange={evt => targetMaskTypeChange(evt.target)}
          />
          <span>Background</span>
        </label>
        <label>
          <input
            id="probablyBackground"
            type="radio"
            value={MaskType.ProbablyBackground}
            checked={maskType == MaskType.ProbablyBackground}
            onChange={evt => targetMaskTypeChange(evt.target)}
          />
          <span>Clear</span>
        </label>
      </form>
      <div className={styles.flexGroup}>
        <input
          className={styles.brushSizeRange}
          type="range"
          min={5}
          max={50}
          step={5}
          value={brushSize}
          id="brushSizeRange"
          onChange={evt => {
            const value = parseInt(evt.target.value);
            if (onBrushSizeChange) onBrushSizeChange(value);
          }}
        />
        <span>{brushSize}</span>
      </div>
    </div>
  );
};

export default BrushSettings;
