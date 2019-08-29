import React from 'react';

import MaskRenderer from '../mask-renderer';

import styles from './styles.css';

interface Props {
  blobUrl: string;
}

const MaskEditor = ({ blobUrl }: Props) => {
  return (
    <div>
      <MaskRenderer
        blobUrl={blobUrl}
        onMouseDown={(x, y) => console.log({ x, y })}
      />
    </div>
  );
};

export default MaskEditor;
