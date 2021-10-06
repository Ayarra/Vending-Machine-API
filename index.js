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
const products = require("./components/Product/productRoute");
const users = require("./components/User/userRoute");
const auth = require("./components/Auth/authRoute");
const deposit = require("./components/Deposit/depositRoute");
const buy = require("./components/Buy/buyRoute");
const reset = require("./components/Reset/resetRoute");

//Setting up the DB
// mongoose.connect(
//   `mongodb+srv://${process.env.VENDINGMACHINE_DB_USER}:${process.env.VENDINGMACHINE_DB_PASSWORD}@cluster0.yupbg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
// );
mongoose.connect(
  `mongodb://hhamdaou:hhamdaou@cluster0-shard-00-00.yupbg.mongodb.net:27017,cluster0-shard-00-01.yupbg.mongodb.net:27017,cluster0-shard-00-02.yupbg.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-g7jga6-shard-0&authSource=admin&retryWrites=true&w=majority`
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error: "));
db.once("open", function () {
  console.log("Connected to DB successfully");
});

//Middlewares
app.use(express.json());

//Routes
app.use("/products", products);
app.use("/users", users);
app.use("/auth", auth);
app.use("/deposit", deposit);
app.use("/buy", buy);
app.use("/reset", reset);

app.use("/", (req, res) => {
  res.status(404).send("Not Found.");
});

app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});

// feat fix chore refact
// https://open.spotify.com/track/2LMq1O0NiqGhPOlXo3McYQ?si=2f402536ca8c4640
