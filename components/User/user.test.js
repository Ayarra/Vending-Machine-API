const request = require("supertest");
const { User } = require("./userModel");

let server;

describe("Users", () => {
  beforeEach(() => {
    server = require("../../index");
  });
  afterEach(async () => {
    server.close();
    await User.deleteMany({});
  });

  describe("GET /", () => {
    it("should return 401 if user is not logged in", async () => {
      const res = await request(server).get("/users");

      expect(res.status).toBe(401);
    });
    it("should return users if user is logged in", async () => {
      const token = new User().generateAuthToken();

      const res = await request(server)
        .get("/users")
        .set("x-auth-token", token);

      expect(res.status).toBe(200);
    });
  });

  describe("POST /", () => {
    it("should return a 400 status if other than the Deposit is not included", async () => {
      const res = await request(server).post("/users").send({
        username: "username",
        password: "password",
        isBuyer: false,
      });
      expect(res.status).toBe(400);
    });

    it("should return a 400 if username input is not validated", async () => {
      const res = await request(server).post("/users").send({
        username: "ue",
        password: "password",
        isSeller: true,
        isBuyer: false,
      });
      expect(res.status).toBe(400);
    });

    // SAME LOGIC CAN BE APPLIED FOR OTHER INPUT VALIDATION

    it("should return a 400 if a user is already registered", async () => {
      const user = new User({
        username: "username",
        password: "12345678",
        isSeller: true,
        isBuyer: true,
      });
      await user.save();

      const res = await request(server).post("/users").send({
        username: "username",
        password: "password",
        isSeller: true,
        isBuyer: false,
      });
      expect(res.status).toBe(400);
    });

    it("should return a 201 if a user succesfully got registred", async () => {
      const res = await request(server).post("/users").send({
        username: "username",
        password: "password",
        isSeller: true,
        isBuyer: false,
      });
      expect(res.status).toBe(201);
    });
  });

  describe("PUT /:id", () => {
    it("should return a 400 status if other than the Deposit is not included", async () => {
      const token = new User().generateAuthToken();
      const res = await request(server)
        .put("/users/:id")
        .set("x-auth-token", token)
        .send({
          username: "username",
          password: "password",
          isBuyer: false,
        });
      expect(res.status).toBe(400);
    });

    it("should return a 400 if username input is not validated", async () => {
      const token = new User().generateAuthToken();
      const res = await request(server)
        .put("/users/:id")
        .set("x-auth-token", token)
        .send({
          username: "ue",
          password: "password",
          isSeller: true,
          isBuyer: false,
        });
      expect(res.status).toBe(400);
    });

    // SAME LOGIC CAN BE APPLIED FOR OTHER INPUT VALIDATION

    it("should return 201 if valid id is passed", async () => {
      const updatedUser = {
        username: "username1",
        password: "password",
        isSeller: true,
        isBuyer: true,
      };
      const user = new User({
        username: "username",
        password: "password",
        isBuyer: true,
        isSeller: false,
      });
      await user.save();
      const token = user.generateAuthToken();
      const res = await request(server)
        .put("/users/" + user._id)
        .set("x-auth-token", token)
        .send(updatedUser);
      expect(res.status).toBe(201);
    });

    it("should return 404 if id is not valid", async () => {
      const updatedUser = {
        username: "username1",
        password: "password",
        isSeller: true,
        isBuyer: true,
      };
      const user = new User({
        username: "username",
        password: "password",
        isBuyer: true,
        isSeller: false,
      });
      await user.save();
      const token = user.generateAuthToken();
      const res = await request(server)
        .put("/users/" + user._id + 1)
        .set("x-auth-token", token)
        .send(updatedUser);
      expect(res.status).toBe(404);
    });
  });

  describe("DELETE /:id", () => {
    it("should return 202 if valid id is passed", async () => {
      const user = new User({
        username: "username",
        password: "password",
        isBuyer: true,
        isSeller: false,
      });
      await user.save();
      const token = user.generateAuthToken();
      const res = await request(server)
        .delete("/users/" + user._id)
        .set("x-auth-token", token);

      expect(res.status).toBe(202);
    });

    it("should return 404 if id is not valid", async () => {
      const user = new User({
        username: "username",
        password: "password",
        isBuyer: true,
        isSeller: false,
      });
      await user.save();
      const token = user.generateAuthToken();
      const res = await request(server)
        .delete("/users/" + user._id + 1)
        .set("x-auth-token", token);
      expect(res.status).toBe(404);
    });
  });
});
