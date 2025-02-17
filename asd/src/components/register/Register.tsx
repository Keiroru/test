import React, { useState } from "react";
import "./register.css";
import axios from "axios";
import Header from "../Header/Header";

function Register() {
  const [name, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/user", {
        name,
        email,
        password,
      });
      console.log(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div>
        <Header />
      </div>
      <div className="page">
        <div className="registerForm">
          <h1>Register</h1>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                id="username"
                value={name}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit">Register</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Register;
