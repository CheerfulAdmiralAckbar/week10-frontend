import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Navigation from "../../components/Navigation";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:5001/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password
        }),
      })

      if (!response.ok) {
        throw new Error("Register Failed");
      }
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Navigation />
      <div className="register-wrapper">
        <h2>Register</h2>
        <form className="register-form" onSubmit={handleRegister}>
          <label>Username</label>
          <input type="username" value={username} onChange={(e) => setUsername(e.target.value)} />
          <label>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <label>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <label>Confirm Password</label>
          <input type="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          <button type="submit">Register</button>  
        </form>
      </div>
    </>
  )
}

export default Register;