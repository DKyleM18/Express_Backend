const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const newsUser = require("../models/newsUser");
const BadRequestError = require("../errors/bad-request-error");
const UnauthorizedError = require("../errors/unauthorized-error");
const NotFoundError = require("../errors/not-found-error");
const ConflictError = require("../errors/conflict-error");
const { JWT_SECRET } = require("../utils/config");

const createNewsUser = (req, res, next) => {
  const { username, email, password } = req.body;

  return bcrypt
    .hash(password, 10)
    .then((hash) => newsUser.create({ username, email, password: hash }))
    .then((user) => {
      const userWithoutPassword = user.toObject();
      delete userWithoutPassword.password;
      res.status(201).send(userWithoutPassword);
    })
    .catch((err) => {
      if (err.message === "Email in use" || err.code === 11000) {
        next(new ConflictError(err.message));
      } else if (err.name === "ValidationError" || err.name === "CastError") {
        next(new BadRequestError(err.message));
      } else {
        next(err);
      }
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError("Invalid data");
  }

  return newsUser
    .findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      res.send({ token });
    })
    .catch((err) => {
      if (err.message === "Incorrect email or password") {
        next(new UnauthorizedError(err.message));
      } else {
        next(err);
      }
    });
};

const getCurrentUser = (req, res, next) => {
  const { _id } = req.user;
  newsUser
    .findById(_id)
    .orFail()
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        next(new NotFoundError(err.message));
      }
      if (err.name === "CastError") {
        next(new BadRequestError(err.message));
      }
      next(err);
    });
};

module.exports = {
  getCurrentUser,
  login,
  createNewsUser,
};
