import React from 'react';
import Navigation from '../../components/Navigation';

const Home = ({ user, onLogout }) => {
  console.log(user);
  return (
    <>
      <Navigation user={user} onLogout={onLogout} />
      <div className="content-wrapper">
        <h1>Home</h1>
      </div>
    </>
  );
};

export default Home;
