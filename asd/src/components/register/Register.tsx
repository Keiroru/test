import React, { useState } from "react";
import "./register.css";
import axios from "axios";
import Alert from "@mui/material/Alert";

function Register() {
  const [username, setUsername] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<string[]>([]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setErrors([]);

    if (password !== confirmPassword) {
      setErrors((prev) => [...prev, "Passwords do not match!"]);
      return;
    }

    try {
      const createdAt = new Date().toISOString().split("T")[0];
      await axios.post("http://localhost:5000/users", {
        userName: username,
        displayName,
        email,
        password,
        createdAt,
      });
    } catch (err: any) {
      console.error(err.response.data);
      if (err.response && err.response.data && err.response.data.errors) {
        const errorsArray = err.response.data.errors;
        const errorMessages: string[] = errorsArray.map(
          (error: any) => error.msg
        );
        setErrors(errorMessages);
      } else if (err.response && err.response.data && err.response.data.error) {
        setErrors([err.response.data.error]);
      } else {
        setErrors(["An error occurred. Please try again."]);
      }
    }
  };

  return (
    <div className="page">
      {errors.length > 0 && (
        <Alert
          severity="error"
          className="alert"
          onClose={() => {
            setErrors([]);
          }}
        >
          <ul>
            {errors.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
          </ul>
        </Alert>
      )}
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
            Already have an account? <a href="/login">Login Here</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
