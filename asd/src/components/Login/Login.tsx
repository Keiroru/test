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

  useEffect(() => {
    userRef.current?.focus();
  }, []);

  const navigate = useNavigate();

  const navigateToRegister = () => {
    navigate("/register");
  };

  const navigateToChat = () => {
    navigate("/chat");
  };

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
      setSuccess(true);
    }
  };

  return success ? (
    navigateToChat()
  ) : (
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
              <input
                type="text"
                ref={userRef}
                autoComplete="off"
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                required
              />
            </div>
            <div className="inputContainer">
              <input
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
              />
            </div>
            <button type="submit">Login</button>
          </form>
          <button onClick={navigateToRegister}>Register</button>
        </div>
      </div>
    </div>
  );
}

export default Login;
