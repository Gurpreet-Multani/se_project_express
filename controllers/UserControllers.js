// controllers are meant to handle the req,res for the router
// controllers for getUsers, getUser, createUser
// login controller aswell
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { JWT_SECRET } = require('../utils/config');

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

// getUser
const getUser = (req, res) => {
  const userId = req.user._id;

  User.findById(userId)
    .then((user) => {
      // 1. Check for 404: If Mongoose returns null (user not found)
      if (!user) {
        return res.status(404).send({ message: 'User not found' });
      }

      // SUCCESS: User found
      return res.status(200).send(user);
    })
    .catch((err) => {
      console.error(err);

      // 2. Check for 400: If the ID format is invalid (Mongoose CastError)
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'Invalid user ID format' });
      }

      // 3. Handle 500: Any other server/database error
      return res
        .status(500)
        .send({ message: 'An error has occurred on the server' });
    });
};

// hash the password by
// calling hash method pram 1password, 2salt
// make a then request to handle what to hash
// and a then if it false also and catch for error

// createUser
const createUser = async (req, res) => {
  // declared 2 variables from http request body
  const {
    name, avatar, email, password,
  } = req.body;

  try {
    // Check for required fields before hashing
    if (!email || !password) {
      return res
        .status(400)
        .send({ message: 'Email and password are required' });
    }

    // Check if user with the same email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).send({ message: 'Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      avatar,
      email,
      password: hashedPassword,
    });

    const { password: _, ...userWithoutPassword } = user.toObject();
    return res.status(201).send(userWithoutPassword);
  } catch (err) {
    console.error(err);
    if (err.name === 'ValidationError') {
      return res.status(400).send({ message: 'Invalid data provided' });
    }
    return res.status(500).send({ message: 'An error occurred on the server' });
  }
};

// Login Section

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res
        .status(400)
        .send({ message: 'Email and password are required' });
    }

    // Find user by email and explicitly select the password field
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).send({ message: 'Incorrect email or password' });
    }

    // Compare the provided password with the stored hash
    const matched = await bcrypt.compare(password, user.password);
    if (!matched) {
      return res.status(401).send({ message: 'Incorrect email or password' });
    }

    const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
      expiresIn: '7d',
    });
    return res.send({ token });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: 'An error occurred on the server' });
  }
};

module.exports = {
  getUsers,
  createUser,
  getUser,
  login,
};
