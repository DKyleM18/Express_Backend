const mongoose = require("mongoose");

const newsCardSchema = new mongoose.Schema({
  source: {
    name: { type: String, required: true },
  },
  author: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  url: { type: String, required: true },
  urlToImage: { type: String, required: true },
  publishedAt: { type: Date, required: true },
  content: { type: String, required: true },
});

module.exports = mongoose.model("NewsCard", newsCardSchema);
