const User = require("../models/user");
const { castError, notFoundError, serverError } = require("../utils");

const createUser = (req, res) => {
  console.log("POST user in controller");
  const { name, avatar } = req.body;
  User.create({ name, avatar })
    .then((user) => res.status(201).send(user))
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return res.status(castError).send({ message: err.message });
      }
      return res.status(serverError).send({ message: err.message });
    });
};

const getUsers = (req, res) => {
  console.log("GET users in controller");
  User.find({})
    .orFail()
    .then((users) => res.status(200).send(users))
    .catch((err) => {
      console.error(err);
      return res.status(serverError).send({ message: err.message });
    });
};

const getUser = (req, res) => {
  console.log("GET user by ID in controller");
  const { userId } = req.params;
  User.findById(userId)
    .orFail()
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        return res.status(notFoundError).send({ message: err.message });
      } else if (err.name === "CastError") {
        return res.status(castError).send({ message: err.message });
      }
      return res.status(serverError).send({ message: err.message });
    });
};

module.exports = { getUsers, createUser, getUser };
