import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import axios from "axios";

function Login() {
  const userRef = useRef<HTMLInputElement>(null);
  const errRef = useRef<HTMLDivElement>(null);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    userRef.current?.focus();
  }, []);

  // Navigate to chat page on success
  useEffect(() => {
    if (success) {
      navigate("/chat");
    }
  }, [success, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/login", {
        userName: username,
        password,
      });
      console.log(response.data);
      setSuccess(true);
    } catch (err: any) {
      if (err.response && err.response.data && err.response.data.error) {
        setError(err.response.data.error);
      } else {
        setError("An error occurred. Please try again.");
      }
      errRef.current?.focus();
      setUsername("");
      setPassword("");
    }
  };

  return (
    <div className="page">
      <div className="background">
        <div className="loginForm">
          <p
            ref={errRef}
            className={error ? "error" : "offscreen"}
            aria-live="assertive"
          >
            {error}
          </p>
          <h1>Login</h1>
          <form onSubmit={handleSubmit}>
            <div className="inputContainer">
              <i className="fa fa-user"></i>
              <input
                type="text"
                id="username"
                placeholder="Username"
                ref={userRef}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="inputContainer">
              <i className="fa fa-lock"></i>
              <input
                type="password"
                id="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit">Login</button>
          </form>
          <p>
            Don't have an account? <a href="/register">Register Here</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
