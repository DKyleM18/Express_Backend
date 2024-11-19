const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const indexRouter = require("./routes/index");
const { login, createUser } = require("./controllers/users");

const app = express();
const { PORT = 3001 } = process.env;

app.use(express.json());
app.use("/", indexRouter);
app.use(cors());

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    console.log("Connected to DB");
  })
  .catch(console.error);

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
