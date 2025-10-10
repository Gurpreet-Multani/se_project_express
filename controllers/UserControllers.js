//controllers are meant to handle the req,res for the router
//controllers for getUsers, getUser, createUser
const User = require("../models/User.js");

// getUsers
const getUsers = (req, res) => {
  User.find({})
    .then((Users) => {
      // SUCCESS: Send the results
      res.send(Users);
    })
    .catch((err) => {
      // FAILURE: Send the 500 error
      res.status(500).send({ message: err.message });
    });
};

//getUser
const getUser = (req, res) => {
  const { userId } = req.params;

  User.findById(userId)
    .then((user) => {
      // 1. Check for 404: If Mongoose returns null (user not found)
      if (!user) {
        return res.status(404).send({ message: "User not found" });
      }

      // SUCCESS: User found
      res.status(200).send(user);
    })
    .catch((err) => {
      console.error(err);

      // 2. Check for 400: If the ID format is invalid (Mongoose CastError)
      if (err.name === "CastError") {
        return res.status(400).send({ message: "Invalid user ID format" });
      }

      // 3. Handle 500: Any other server/database error
      return res
        .status(500)
        .send({ message: "An error has occurred on the server" });
    });
};

//createUser
const createUser = (req, res) => {
  //declared 2 variables from http request body
  const { name, avatar } = req.body;

  User.create({ name, avatar })
    .then((user) => {
      res.status(201).send(user);
    })
    .catch((err) => {
      console.error(err);

      if (err.name === "ValidationError") {
        return res.status(400).send({ message: err.message });
      }

      return res
        .status(500)
        .send({ message: "An error has occurred on the server" });
    });
};

module.exports = {
  getUsers,
  createUser,
  getUser,
};
