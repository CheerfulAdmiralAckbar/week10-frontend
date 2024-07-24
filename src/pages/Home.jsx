import React, { useState, useEffect } from 'react';
import Navigation from '../../components/Navigation';

import { createApi } from 'unsplash-js';

// Unsplash API JavaScript SDK
const unsplash = createApi({
  accessKey: import.meta.env.VITE_UNSPLASH_ACCESS_KEY,
});

const Home = ({ user, onLogout }) => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const result = await unsplash.photos.getRandom({
        count: 10,
        orientation: 'portrait',
      });
      setImages(result.response);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <Navigation user={user} onLogout={onLogout} />
      <div className="content-wrapper">
        <h3>Welcome, {user.username}!</h3>
        <div className="images-grid">
          {images.map((image) => (
            <div key={image.id} className="image-item">
              <div className="image-container">
                <img src={image.urls.small} alt={image.alt_description} />
                <div className="image-info">
                  <p className="photographer">{image.user.name}</p>
                  <p className="likes">{image.likes} likes</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
