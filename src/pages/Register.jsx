import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

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
    <form onSubmit={handleRegister}>
      <h1>Register</h1>
      <input type="username" value={username} onChange={(e) => setUsername(e.target.value)} />
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <input type="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
      <button type="submit">Register</button>
    </form>
  )
}

export default Register;