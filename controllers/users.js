const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");
const {
  badRequestError,
  unauthorizedError,
  forbiddenError,
  notFoundError,
  conflictError,
  serverError,
} = require("../utils/errors");

const createUser = (req, res, next) => {
  const { name, avatar, email, password } = req.body;
  User.findOne({ email })
    .select("+password")
    .then((existingUser) => {
      if (existingUser) {
        return Promise.reject(new Error("Email in use"));
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
      if (err.name === "ValidationError" || err.name === "CastError") {
        next(new badRequestError("Invalid data"));
      } else if (err.name === "MongoError" && err.code === 11000) {
        next(new conflictError("Email in use"));
      } else {
        next(err);
      }
    });
};

const login = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    next(new badRequestError("Invalid data"));
  }
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      res.send({ token });
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "UnauthorizedError") {
        next(new unauthorizedError("Incorrect email or password"));
      } else {
        next(err);
      }
    });
};

const getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail()
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        next(new notFoundError("User not found"));
      } else if (err.name === "CastError") {
        next(new badRequestError("Invalid data"));
      } else {
        next(err);
      }
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

const updateUser = (req, res, next) => {
  const { name, avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, avatar },
    { new: true, runValidators: true }
  )
    .orFail()
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError" || err.name === "CastError") {
        next(new badRequestError("Invalid data"));
      } else if (err.name === "DocumentNotFoundError") {
        next(new notFoundError("User not found"));
      } else {
        next(err);
      }
    });
};

module.exports = {
  getUsers,
  createUser,
  getUser,
  login,
  getCurrentUser,
  updateUser,
};
