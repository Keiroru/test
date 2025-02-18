import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mysql from "mysql";
import { body, validationResult } from "express-validator";

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

db.connect((err) => {
  if (err) {
    console.error("Could not connect to database:", err);
    return;
  }
  console.log("Connected to MySQL database");
});

app.post(
  "/users",
  [

    body("userName")
      .trim()
      .isLength({ min: 3 })
      .withMessage("Username must be at least 3 characters long")
      .custom((value) => {
        return new Promise((resolve, reject) => {
          const query = "SELECT * FROM users WHERE userName = ?";
          db.query(query, [value], (err, results) => {
            if (err) {
              return reject("Database error");
            }
            if (results.length > 0) {
              return reject("Username already exists");
            }
            return resolve(true);
          });
        });
      }),

    body("displayName")
      .trim()
      .notEmpty()
      .withMessage("Display Name is required")
      .custom((value) => {
        return new Promise((resolve, reject) => {
          const query = "SELECT * FROM users WHERE displayName = ?";
          db.query(query, [value], (err, results) => {
            if (err) {
              return reject("Database error");
            }
            if (results.length > 0) {
              return reject("Display name already exists");
            }
            return resolve(true);
          });
        });
      }),

    body("email")
      .normalizeEmail()
      .isEmail()
      .withMessage("Email address is not valid")
      .custom((value) => {
        return new Promise((resolve, reject) => {
          const query = "SELECT * FROM users WHERE email = ?";
          db.query(query, [value], (err, results) => {
            if (err) {
              return reject("Database error");
            }
            if (results.length > 0) {
              return reject("Email already exists");
            }
            return resolve(true);
          });
        });
      }),

    body("password")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters long")
      .matches(/(?=.*[a-z])/)
      .withMessage("Password must contain at least one lowercase letter")
      .matches(/(?=.*[A-Z])/)
      .withMessage("Password must contain at least one uppercase letter")
      .matches(/(?=.*\d)/)
      .withMessage("Password must contain at least one number")
      .matches(/(?=.*[!@#$%^&*])/)
      .withMessage("Password must contain at least one special character"),
  ],
  (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { userName, displayName, email, password, createdAt } = req.body;

    // Insert new user if all validations pass
    const insertQuery =
      "INSERT INTO users (userName, displayName, email, password, createdAt) VALUES (?, ?, ?, ?, ?)";
    db.query(
      insertQuery,
      [userName, displayName, email, password, createdAt],
      (err, results) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        res
          .status(201)
          .json({ message: "User created successfully", data: results });
      }
    );
  }
);

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});