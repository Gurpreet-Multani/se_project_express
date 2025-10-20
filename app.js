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

// users.js Routes
app.use("/", mainRouter);

// app/listen
app.listen(PORT, () => {});

module.exports = app;
