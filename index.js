const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const port = 3000;

if (!process.env.VENDINGMACHINE_JWT_PRIVATEKEY) {
  console.error("FATAL ERROR: jwtProvateKey is not defined.");
  process.exit(1);
}

//Importing Routes
const users = require("./components/User/userRoute");
const auth = require("./components/Auth/authRoute");

//Setting up the DB
mongoose.connect(
  `mongodb+srv://${process.env.VENDINGMACHINE_DB_USER}:${process.env.VENDINGMACHINE_DB_PASSWORD}@cluster0.yupbg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error: "));
db.once("open", function () {
  console.log("Connected to DB successfully");
});

//Middlewares
app.use(express.json());

//Routes
app.use("/users", users);
app.use("/auth", auth);

// Root route of express app
app.use("/", (req, res) => {
  res.send("Bonjour");
});

app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});

// feat fix chore refact
// https://open.spotify.com/track/2LMq1O0NiqGhPOlXo3McYQ?si=2f402536ca8c4640
