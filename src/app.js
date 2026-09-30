const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

// Security
app.use(helmet());

// CORS
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging
app.use(morgan("dev"));

// Static files
app.use("/uploads", express.static("uploads"));

// Health check
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "FlowBoard API is running",
  });
});

module.exports = app;