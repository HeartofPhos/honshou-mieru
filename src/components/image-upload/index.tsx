import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import styles from './styles.css';

interface Props {
  onUpload: (blob: string) => void;
}

const ImageUpload = ({ onUpload }: Props) => {
  const onDrop = useCallback(acceptedFiles => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      const reader = new FileReader();

      reader.onabort = () => console.log('file reading was aborted');
      reader.onerror = () => console.log('file reading has failed');
      reader.onload = () => {
        const dataUrl = reader.result as string;
        if (dataUrl) onUpload(dataUrl);
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
