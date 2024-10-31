const mpongoose = require("mongoose");
const validator = require("validator");

const clothingItemSchema = new mpongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  weather: {
    type: String,
    enum: ["hot", "cold", "warm"],
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
    validate: {
      validator(value) {
        return validator.isURL(value);
      },
      message: "You must enter a valid URL",
    },
  },
  likes: [{ type: mpongoose.Schema.Types.ObjectId, ref: "user" }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  owner: {
    type: mpongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
});

module.exports = mpongoose.model("item", clothingItemSchema);
