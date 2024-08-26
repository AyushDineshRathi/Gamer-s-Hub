import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState(""); // Add state for error messages

  const handleRegister = async () => {
    try {
      const response = await axios.post("http://localhost:3001/auth/register", {
        email,
        password,
        username,
      });
      if (response.status === 201) {
        navigate("/login");
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message); // Set error message from backend
      } else {
        setError("An unexpected error occurred");
      }
    }
  };

  return (
    <div>
      <h1>Register</h1>
      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleRegister}>Register</button>
      {error && <p style={{ color: "red" }}>{error}</p>}{" "}
      {/* Display error messages */}
    </div>
  );
};

export default Register;
