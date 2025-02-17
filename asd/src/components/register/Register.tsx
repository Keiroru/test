import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./register.css";
import axios from "axios";

function Register() {
  const navigate = useNavigate();

  const navigateToLogin = () => {
    navigate("/login");
  };

  const [username, setUsername] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    try {
      const createdAt = new Date().toISOString().split("T")[0];
      const response = await axios.post("http://localhost:5000/users", {
        userName: username,
        displayName,
        email,
        password,
        createdAt,
      });
    } catch (err: any) {
      if (err.response && err.response.data && err.response.data.error) {
        alert(err.response.data.error);
      } else {
        alert("An error occurred. Please try again.");
      }
    }
  };

  return (
    <>
      <div className="page">
        <div className="background">
          <div className="registerForm">
            <h1>Sign Up</h1>
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
                <i className="fa fa-id-card"></i>
                <input
                  type="text"
                  id="displayname"
                  placeholder="Display Name"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  required
                />
              </div>
              <div className="inputContainer">
                <i className="fa fa-envelope"></i>
                <input
                  type="email"
                  id="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
              <div className="inputContainer">
                <i className="fa fa-lock"></i>
                <input
                  type="password"
                  id="confirmPassword"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
              <button type="submit">Register</button>
            </form>
            <p>
              Already have an account?{" "}
              <a href="" onClick={navigateToLogin}>
                Login Here
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
