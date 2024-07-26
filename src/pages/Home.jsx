import React, { useState, useEffect } from 'react';
import Navigation from '../../components/Navigation';
// import heart icon from FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

import { createApi } from 'unsplash-js';
import { getTokenFromCookie } from '../common';

// Unsplash API JavaScript SDK
const unsplash = createApi({
  accessKey: import.meta.env.VITE_UNSPLASH_ACCESS_KEY,
});

const Home = ({ user, onLogout }) => {
  const [images, setImages] = useState([]);
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const result = await unsplash.photos.getRandom({
        count: 10,
        orientation: 'portrait',
      });
      console.log(result);
      setImages(result.response);
    } catch (error) {
      console.error(error);
    }
  }

  const handleFavourite = async (image) => {
    const token = getTokenFromCookie("jwt_token");
    try {
      const response = await fetch("http://localhost:5001/favourites/favourite-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          userId: user.id,
          imageId: image.id, 
          thumbnailUrl: image.urls.regular,
          authorName: image.user.name,
        }),
      });

      if (response.ok) {
        // Fetch favourites response from server and then push into the favourites array
        const newFavourite = await response.json();
        setFavourites(prevFavourites => [...prevFavourites, newFavourite.favourite]);
      } else {
        throw new Error("Failed to favourite image");
      }
    } catch (error) {
      console.error('Error favouriting image:', error);
    }
  }

  // Set image to isFavourited so it can be styled accordingly
  const isFavorited = (imageId) => {
    return favourites.some(fav => fav.unsplashId === imageId);
  }

  return (
    <>
      <Navigation user={user} onLogout={onLogout} />
      <div className="content-wrapper">
        <h3>Welcome, {user.username}!</h3>
        <div className="images-grid">
          {images.map((image) => (
            <div key={image.id} className="image-item">
              <div className="image-container" onClick={() => handleFavourite(image)}>
                <img src={image.urls.regular} alt={image.alt_description} />
                <div className="image-info">
                  <div className="image-info-left">
                    <p className="photographer">{image.user.name}</p>
                  </div>
                  <div className="image-info-right">
                    <FontAwesomeIcon icon={faHeart} size="xl" className={isFavorited(image.id) ? 'heart-read' : 'heart-unread'} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <p className="copyright">Copyright © 2023 Benstagram. All rights reserved.</p>
      </div>
    </>
  );
};

export default Home;
