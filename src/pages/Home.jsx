import React from 'react';

const Home = ({ user }) => {
  console.log(user);
  return (
    <div>
      <h1>Welcome, User {user.username}</h1>
      {/* Additional content based on user */}
    </div>
  );
};

export default Home;
