//imports up here---------------------------------------------------------------
const express = require("express");
const mongoose = require("mongoose");
const mainRouter = require("./routes");
//imports up here--------------------------------------------------------------

//express
const app = express();
const { PORT = 3001 } = process.env;

app.listen(PORT, () => {});

//MongoDb/mongoose
mongoose.connect("mongodb://127.0.0.1:27017/wtwr_db");

//converts our document to json so postman can understand
app.use(express.json()); // For parsing application/json

//authorization middleware
app.use((req, res, next) => {
  req.user = {
    _id: "5d8b8592978f8bd833ca8133", // paste the _id of the test user created in the previous step
  };
  next();
});

//users.js Routes
app.use("/", mainRouter);

module.exports = app;
