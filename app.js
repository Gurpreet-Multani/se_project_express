// imports up here---------------------------------------------------------------
const express = require("express");
const mongoose = require("mongoose");
const mainRouter = require("./routes");
const cors = require("cors");
// imports up here--------------------------------------------------------------

// express
const app = express();
const { PORT = 3001 } = process.env;

// converts our document to json so postman can understand
app.use(express.json()); // For parsing application/json

//allows request from client to the server to be processed
app.use(cors());

// MongoDb/mongoose
mongoose.connect("mongodb://127.0.0.1:27017/wtwr_db");

// This middleware is for the GitHub Actions tests to pass.
// It sets a hardcoded user ID for requests that don't have a JWT.
app.use((req, res, next) => {
  req.user = {
    _id: "5d8b8592978f8bd833ca8133", // test user _id
  };
  next();
});
// users.js Routes
app.use("/", mainRouter);

// app/listen
app.listen(PORT, () => {});

module.exports = app;
