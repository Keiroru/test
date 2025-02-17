import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import axios from "axios";

function Login() {
  const navigate = useNavigate();

  const navigateToRegister = () => {
    navigate("/register");
  };

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/login", {
        userName: username,
        password,
      });
      console.log(response.data);
    } catch (err: any) {
      if (err.response && err.response.data && err.response.data.error) {
        alert(err.response.data.error);
      } else {
        alert("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="page">
      <div className="background">
        <div className="loginForm">
          <h1>Login</h1>
          <form onSubmit={handleSubmit}>
            <div className="inputContainer">
              <i className="fa fa-user"></i>
              <input
                type="text"
                id="username"
                placeholder="Username"
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
            Don't have an account?
            <a href="" onClick={navigateToRegister}>
              Register Here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
