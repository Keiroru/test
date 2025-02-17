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
app.post("/user", (req, res) => {
  const { name, email, password } = req.body;
  const query = "INSERT INTO user (name, email, password) VALUES (?, ?, ?)";
  db.query(query, [name, email, password], (err, results) => {
    if (err) {
      console.error("Database query error:", err);
      res.status(500).json({ error: err.message });
      return;
    }
  });
});

// Start the server
app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
