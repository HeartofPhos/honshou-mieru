import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import ndarray = require('ndarray');
import getPixels from 'get-pixels';

import styles from './styles.css';

interface Props {
  onUpload: (image: ndarray) => void;
}

const ImageUpload = ({ onUpload }: Props) => {
  const onDrop = useCallback(acceptedFiles => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      const reader = new FileReader();

      reader.onabort = () => console.log('file reading was aborted');
      reader.onerror = () => console.log('file reading has failed');
      reader.onload = () => {
        const dataUrl = reader.result as string;
        if (dataUrl) {
          getPixels(dataUrl, function(err: any, img: ndarray) {
            if (err) {
              console.log('Bad image path');
              return;
            }
            onUpload(img);
          });
        }
      };

      reader.readAsDataURL(acceptedFiles[0]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: 'image/*'
  });

  return (
    <div className={styles.dragDrop} {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag `n` drop some files here, or click to select files</p>
      )}
    </div>
  );
};

export default ImageUpload;
