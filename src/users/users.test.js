require("dotenv").config();
const supertest = require("supertest");
const firebase = require("firebase/database");
const uuid = require("uuid");

const axiosConfig = require("../config/axiosConfig");
const app = require("../server");

const request = supertest(app);

jest.mock("uuid");
jest.mock("../config/axiosConfig");
jest.mock("firebase/database");

firebase.ref = jest.fn();
firebase.getDatabase = jest.fn();
firebase.set = jest.fn();

uuid.v4.mockReturnValue("abc-123");

describe("users", () => {
  describe("POST /", () => {
    afterEach(() => {
      jest.resetAllMocks();
    });

    it("should create a new user", async () => {
      axiosConfig.apiInstance.mockReturnValue({
        data: {
          zip: "90210",
          name: "Beverly Hills",
          lat: 34.0901,
          lon: -118.4065,
          country: "US",
        },
      });

      const { body } = await request
        .post("/users")
        .send({ name: "John Doe", zip: 90210 });

      const expectedUser = {
        id: "abc-123",
        name: "John Doe",
        zip: 90210,
        lat: 34.0901,
        lon: -118.4065,
      };

      expect(body).toStrictEqual(expectedUser);
    });
  });
});
