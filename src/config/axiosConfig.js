const axios = require("axios");
const env = require("./env");

axios.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

const apiInstance = axios.create({
  baseURL: "http://api.openweathermap.org/geo/1.0",
  params: {
    appid: env("API_KEY"),
  },
});

module.exports = {
  apiInstance,
};
