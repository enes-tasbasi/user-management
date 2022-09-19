const axios = require("axios");
const env = require("./env");

const apiInstance = axios.create({
  baseURL: "https://api.openweathermap.org/data/2.5",
  params: {
    appid: env("API_KEY"),
  },
});

module.exports = {
  apiInstance,
};
