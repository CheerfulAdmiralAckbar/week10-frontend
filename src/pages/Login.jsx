import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "../../components/Navigation";

import { writeCookie } from "../common";

const Login = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:5001/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json();
      setUser(data.user); // This should now include id, username, and any other data
      writeCookie("jwt_token", data.token, 7);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <Navigation />
      <div class="login-wrapper">
        <h2>Login</h2>
        <form className="login-form"onSubmit={handleLogin}>
          <label>Email Address</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <label>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button type="submit">Login</button>
        </form>
      </div>
    </>
  )
}

export default Login;