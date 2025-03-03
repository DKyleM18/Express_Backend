const newsCard = require("../models/newsCard");
const NotFoundError = require("../errors/not-found-error");
const BadRequestError = require("../errors/bad-request-error");

const getNewsCards = (req, res, next) => {
  newsCard
    .find({})
    .then((newsCards) => res.send({ data: newsCards }))
    .catch(next);
};

const createNewsCard = (req, res, next) => {
  const { keyword, title, text, source, link, date, image } = req.body;
  newsCard
    .create({ keyword, title, text, source, link, date, image })
    .then((newsCard) => res.send({ data: newsCard }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        next(new BadRequestError(err.message));
      }
      next(err);
    });
};

const deleteNewsCard = (req, res, next) => {
  const { newsCardId } = req.params;
  newsCard
    .findByIdAndRemove(newsCardId)
    .orFail()
    .then(() => res.send({ message: "News card deleted" }))
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
  getNewsCards,
  createNewsCard,
  deleteNewsCard,
};
