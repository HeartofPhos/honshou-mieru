import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

import styles from './styles.css';

interface Props {
  onUpload: (imageData: ImageData) => void;
}

function convertUriToImageData(uri: string) {
  return new Promise<ImageData>(function (resolve, reject) {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    if (!context) return reject();

    const image = new Image();
    image.addEventListener(
      'load',
      function () {
        canvas.width = image.width;
        canvas.height = image.height;
        context.drawImage(image, 0, 0, canvas.width, canvas.height);
        resolve(context.getImageData(0, 0, canvas.width, canvas.height));
      },
      false
    );
    image.src = uri;
  });
}

const ImageUpload = ({ onUpload }: Props) => {
  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      const reader = new FileReader();

      reader.onabort = () => console.log('file reading was aborted');
      reader.onerror = () => console.log('file reading has failed');
      reader.onload = async () => {
        const dataUri = reader.result as string;
        if (dataUri) {
          const imageData = await convertUriToImageData(dataUri);
          onUpload(imageData);
        }
      };

      reader.readAsDataURL(acceptedFiles[0]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: ['image/png', 'image/gif', 'image/jpeg'],
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
