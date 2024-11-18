const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { castError, notFoundError, serverError } = require("../utils/errors");

const createUser = (req, res, next) => {
  const { name, avatar, email, password } = req.body;

  User.findOne({ email })
    .then((existingUser) => {
      if (existingUser) {
        return res.status(400).send({ message: "Email in use" });
      }
      return bcrypt
        .hash(password, 10)
        .then((hash) => User.create({ name, avatar, email, password: hash }));
    })
    .then((user) => {
      const userWithoutPassword = user.toObject();
      delete userWithoutPassword.password;
      res.status(201).send(userWithoutPassword);
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return res.status(castError).send({ message: err.message });
      }
      return res.status(serverError).send({ message: "Invalid data" });
    });
};

const login = (req, res) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, "some-secret-key", {
        expiresIn: "7h",
      });
      res.send({ token });
    })
    .catch((err) => {
      console.error(err);
      return res.status(serverError).send({ message: "Invalid data" });
    });
};

const getUsers = (req, res) => {
  console.log("GET users in controller");
  User.find({})
    .orFail()
    .then((users) => res.status(200).send(users))
    .catch((err) => {
      console.error(err);
      return res.status(serverError).send({ message: "Invalid data" });
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
      }
      if (err.name === "CastError") {
        return res.status(castError).send({ message: err.message });
      }
      return res.status(serverError).send({ message: "Invalid data" });
    });
};

module.exports = { getUsers, createUser, getUser, login };
