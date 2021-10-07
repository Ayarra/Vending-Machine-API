const request = require("supertest");
const { Product } = require("./productModel");
const { User } = require("../User/userModel");

let server;

describe("Products", () => {
  beforeEach(() => {
    server = require("../../index");
  });
  afterEach(async () => {
    server.close();
    await Product.deleteMany({});
  });

  describe("GET /", () => {
    it("should return products", async () => {
      const res = await request(server).get("/products");

      expect(res.status).toBe(200);
    });
  });

  describe("GET /:id", () => {
    it("should return 200 if valid id is passed", async () => {
      const product = new Product({
        productName: "name",
        amountAvailable: 32,
        cost: 2,
      });
      await product.save();
      const res = await request(server).get("/products/" + product._id);

      expect(res.status).toBe(200);
    });

    it("should return 404 if id is not valid", async () => {
      const product = new Product({
        productName: "name",
        amountAvailable: 32,
        cost: 2,
      });
      await product.save();
      const res = await request(server).get("/products/" + product._id + 1);
    });
  });

  describe("POST /", () => {
    it("should return a 403 status if the user is not a seller", async () => {
      const token = new User().generateAuthToken();
      const res = await request(server)
        .post("/products")
        .set("x-auth-token", token)
        .send({
          productName: "name",
          amountAvailable: 32,
          cost: 2,
        });
      expect(res.status).toBe(403);
    });
  });
});
