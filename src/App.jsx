import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import { getTokenFromCookie } from "./common";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyToken = async () => {
      const token = getTokenFromCookie('jwt_token');
      if (token) {
        try {
          const response = await fetch("http://localhost:5001/users/verify-token", {
            method: "GET",
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          });
          if (!response.ok) throw new Error('Token verification failed');
          const data = await response.json();
          setUser(data.user);
        } catch (error) {
          console.error('Token verification failed:', error);
          // Optionally, clear the invalid token
          document.cookie = 'jwt_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        }
      }
      setLoading(false);
    };

    verifyToken();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Or a loading spinner
  }

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/register" element={<Register />} />
        <Route 
          path="/" 
          element={user ? <Home user={user} /> : <Navigate to="/login" replace />} 
        />
      </Routes>
    </Router>
  );
}

export default App;