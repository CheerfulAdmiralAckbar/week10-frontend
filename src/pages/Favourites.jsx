import React, { useState, useEffect } from 'react';
import { getTokenFromCookie } from '../common';
// import heart icon from FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';


import Navigation from '../../components/Navigation';

const Favourites = ({ user, onLogout }) => {
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    fetchFavourites();
  }, []);

  const fetchFavourites = async () => {
    const token = getTokenFromCookie("jwt_token");
    try {
      const response = await fetch(`http://localhost:5001/favourites/getAllFavourites/${user.id}`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });

      const data = await response.json();
      console.log('Data:', data);
      setFavourites(data.favourites);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <Navigation user={user} onLogout={onLogout} />
      <div className="content-wrapper">
        <h3 style={{ fontSize: "1.5rem" }}>Your Favourites</h3>
        <div className="images-grid">
          {favourites.length === 0 ? (
            <p>You have no favourites yet!</p>
          ) : (
            <>
            {favourites.map((image) => (
              <div key={image.id} className="image-item">
                <div className="image-container">
                  <img src={image.thumbnailUrl} alt={image.authorName} />
                  <div className="image-info">
                    <div className="image-info-left">
                      <p className="photographer">{image.authorName}</p>
                    </div>
                    <div className="image-info-right">
                      <FontAwesomeIcon icon={faHeart} size="xl" className="heart-read" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Favourites;