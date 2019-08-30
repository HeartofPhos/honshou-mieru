import React, { useState } from 'react';

import ImageUpload from '../../components/image-upload';
import MaskEditor from '../../components/mask-editor';

import styles from './styles.css';
import ndarray = require('ndarray');

const Home = () => {
  const [gifIndex, setGifIndex] = useState<number>();
  const [imageArray, setImageArray] = useState<ndarray>();

  return (
    <div className={styles.center}>
      {imageArray && imageArray.shape.length === 4 && (
        <div>
          <button
            onClick={() => {
              if (gifIndex !== undefined) {
                setGifIndex(Math.max(0, gifIndex - 1));
              }
            }}
          >
            {'<<'}
          </button>
          <button
            onClick={() => {
              if (gifIndex !== undefined) {
                setGifIndex(Math.min(imageArray.shape[0] - 1, gifIndex + 1));
              }
            }}
          >
            {'>>'}
          </button>
        </div>
      )}
      {!imageArray && (
        <ImageUpload
          onUpload={image => {
            switch (image.shape.length) {
              case 3:
                {
                  setImageArray(image);
                }
                break;
              case 4:
                {
                  setGifIndex(0);
                  setImageArray(image);
                }
                break;
              default:
                {
                  console.error('invalid image uploaded');
                }
                break;
            }
          }}
        />
      )}
      {imageArray && (
        <MaskEditor
          imageArray={
            gifIndex !== undefined
              ? imageArray.pick(gifIndex, null, null, null)
              : imageArray
          }
        />
      )}
    </div>
  );
};

export default Home;
