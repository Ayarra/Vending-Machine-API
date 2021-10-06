const mongoose = require("mongoose");
const app = require("../../index");
const supertest = require("supertest");
const request = supertest(app);
const bcrypt = require("bcrypt");
const { User } = require("../User/userModel");

describe("User managment", () => {
  beforeAll(async () => {
    await mongoose.connect(
      `mongodb://hhamdaou:hhamdaou@cluster0-shard-00-00.yupbg.mongodb.net:27017,cluster0-shard-00-01.yupbg.mongodb.net:27017,cluster0-shard-00-02.yupbg.mongodb.net:27017/${process.env.VENDINGMACHINE_TESTDB}?ssl=true&replicaSet=atlas-g7jga6-shard-0&authSource=admin&retryWrites=true&w=majority`
    );
  });

  it("Async test", async () => {
    const register = {
      username: "youes",
      password: "12345678",
      deposit: 1564,
      isSeller: true,
      isBuyer: true,
    };

    const res = await request.post("/users").send(register);
    // const salt = await bcrypt.genSalt(10);
    // register.password = await bcrypt.hash(register.password, salt);
    const user = await User.findOne({ username: register.username });
    // console.log(user._id.valueOf());
    expect(res.status).toBe(200);

    expect(res.body).toStrictEqual({
      _id: user._id.valueOf(),
      username: user.username,
      deposit: user.deposit,
      isSeller: user.isSeller,
      isBuyer: user.isBuyer,
    });
    // const validpassword = await bcrypt.compare(
    //   regiter.password,
    //   res.body.password
    // );
    // expect(validpassword).toBe(true);
    // expect(data).toBe("peanut butter");
  });
});
