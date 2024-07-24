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
      console.log('Token from cookie:', token);
  
      if (token) {
        try {
          const response = await fetch("http://localhost:5001/users/verify-token", {
            method: "GET",
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          });
  
          console.log('Response status:', response.status);
  
          if (!response.ok) {
            const errorText = await response.text();
            console.log('Error response:', errorText);
            throw new Error(`Token verification failed: ${response.status} ${errorText}`);
          }
  
          const data = await response.json();
          console.log('Response data:', data);
  
          if (data.user) {
            setUser(data.user);
          } else {
            throw new Error('User data not found in response');
          }
        } catch (error) {
          console.error('Token verification failed:', error);
          document.cookie = 'jwt_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
          setUser(null);
        }
      } else {
        console.log('No token found in cookie');
        setUser(null);
      }
      setLoading(false);
    };
  
    verifyToken();
  }, []);

  const handleLogout = () => {
    document.cookie = 'jwt_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    setUser(null);
  }

  if (loading) {
    return <div>Loading...</div>; // Or a loading spinner
  }

  return (
    <div className="wrapper">
      <Router>
        <Routes>
          <Route path="/login" element={user ? <Navigate to="/" replace /> : <Login setUser={setUser} />} />
          <Route path="/register" element={<Register />} />
          <Route 
            path="/" 
            element={user ? <Home user={user} onLogout={handleLogout} /> : <Navigate to="/login" replace />} 
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;