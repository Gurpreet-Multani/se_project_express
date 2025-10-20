const User = require('../models/User');

// updateProfile

const updateProfile = (req, res) => {
  const { name, avatar } = req.body;
  const userId = req.user._id;

  User.findByIdAndUpdate(
    userId,
    { name, avatar },
    // Options: return the updated document and run validation
    { new: true, runValidators: true },
  )
    .orFail(() => {
      const error = new Error('User not found');
      error.statusCode = 404;
      throw error;
    })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'Invalid data provided' });
      }
      if (err.statusCode === 404) {
        return res.status(404).send({ message: err.message });
      }
      return res
        .status(500)
        .send({ message: 'An error occurred on the server' });
    });
};

module.exports = { updateProfile };
