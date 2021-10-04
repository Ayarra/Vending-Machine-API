const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const port = 3000;

//Setting up the DB

mongoose.connect(
  `mongodb+srv://hhamdaou:${process.env.DB_PASSWORD}@cluster0.yupbg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error: "));
db.once("open", function () {
  console.log("Connected to DB successfully");
});

app.get("/", (req, res) => {
  res.send("Test");
});

app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});

// feat fix chore refact
// https://open.spotify.com/track/2LMq1O0NiqGhPOlXo3McYQ?si=2f402536ca8c4640
