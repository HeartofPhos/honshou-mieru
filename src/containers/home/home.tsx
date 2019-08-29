import React, { useState } from 'react';

import ImageUpload from '../../components/image-upload';
import MaskEditor from '../../components/mask-editor';

import styles from './styles.css';

const Home = () => {
  const [fileBlob, setFileBlob] = useState<string>('');
  return (
    <div className={styles.center}>
      {fileBlob === '' && (
        <ImageUpload
          onUpload={blob => {
            setFileBlob(blob);
          }}
        />
      )}
      {fileBlob !== '' && <MaskEditor blobUrl={fileBlob} />}
    </div>
  );
};

export default Home;
