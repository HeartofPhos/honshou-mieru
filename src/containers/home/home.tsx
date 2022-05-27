import React, { useState } from 'react';

import ImageUpload from '../../components/image-upload';
import Workspace from '../../components/workspace';

import './styles.css';

const Home = () => {
  const [imageData, setImageData] = useState<ImageData>();

  return (
    <div className={"center"}>
      {!imageData && (
        <ImageUpload
          onUpload={(imageData) => {
            setImageData(imageData);
          }}
        />
      )}
      {imageData && <Workspace imageData={imageData} />}
    </div>
  );
};

export default Home;
