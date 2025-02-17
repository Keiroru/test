import express from "express";
import mysql from "mysql";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();

app.use(bodyParser.json());
app.use(cors());

// Create MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "test",
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error("Could not connect to database:", err);
    return;
  }
  console.log("Connected to MySQL database");
});

// API endpoint to create a new user
app.post("/users", (req, res) => {
  const { userName, displayName, email, password, createdAt } = req.body;

  const checkQuery = "SELECT * FROM users WHERE userName = ? OR displayName = ? OR email = ?";
  db.query(checkQuery, [userName, displayName, email], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (results.length > 0) {
      return res.status(400).json({ error: "Username, display name, or email already exists" });
    }

    const insertQuery =
      "INSERT INTO users (userName, displayName, email, password, createdAt) VALUES (?, ?, ?, ?, ?)";
    db.query(insertQuery, [userName, displayName, email, password, createdAt], (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(201).json({ message: "User created successfully", data: results });
    });
  });
});

// Start the server
app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
