require("dotenv").config();
const supertest = require("supertest");

const app = require("./server");

jest.mock("firebase/database");

const request = supertest(app);

describe("server", () => {
  describe("GET /", () => {
    it("should return welcome text", async () => {
      const res = await request.get("/");

      expect(res.status).toBe(200);
      expect(res.text).toBe("Welcome to the RentRedi interview!");
    });
  });
});
