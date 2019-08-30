import React, { useState } from 'react';

import ImageUpload from '../../components/image-upload';
import MaskEditor from '../../components/mask-editor';

import styles from './styles.css';
import ndarray = require('ndarray');

const Home = () => {
  const [imageArray, setImageArray] = useState<ndarray | undefined>(undefined);
  return (
    <div className={styles.center}>
      {!imageArray && (
        <ImageUpload
          onUpload={image => {
            setImageArray(image);
          }}
        />
      )}
      {imageArray && <MaskEditor imageArray={imageArray} />}
    </div>
  );
};

export default Home;
