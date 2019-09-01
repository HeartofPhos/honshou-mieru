import React, { useState } from 'react';

import ImageUpload from '../../components/image-upload';
import Workspace from '../../components/workspace';

import styles from './styles.css';
import ndarray = require('ndarray');

const Home = () => {
  const [imageArray, setImageArray] = useState<ndarray>();

  return (
    <div className={styles.center}>
      {!imageArray && (
        <ImageUpload
          onUpload={image => {
            setImageArray(image);
          }}
        />
      )}
      {imageArray && <Workspace imageArray={imageArray} />}
    </div>
  );
};

export default Home;
