import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

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
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (!response.ok) {
        throw new Error("Login Failed");
      }
      const data = await response.json();

      console.log("data: ", data);

      // Set user based on response and add token to local storage
      setUser({ id: data.user.id, /* other user properties */ });
      writeCookie("jwt_token", data.token, 7);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <form onSubmit={handleLogin}>
      <h1>Login</h1>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button type="submit">Login</button>
    </form>
  )
}

export default Login;