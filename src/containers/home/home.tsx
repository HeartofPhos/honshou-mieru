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
            switch (image.shape.length) {
              case 3:
                {
                  setImageArray(image);
                }
                break;
              case 4: {
                const newImage = image.pick(0, null, null, null);
                setImageArray(newImage);
                console.warn('.gif uploaded, loading first frame');
              }
              default:
                {
                  console.error('invalid image uploaded');
                }
                break;
            }
          }}
        />
      )}
      {imageArray && <MaskEditor imageArray={imageArray} />}
    </div>
  );
};

export default Home;
