const express = require("express");
const cors = require("cors");

const registerUserRoutes = require("./users/routes");

const app = express();

app.use(express.json()); // for parsing application/json
app.use(cors());

app.get("/", (req, res) => {
  console.log('triggering  "/" endpoint...');

  // define company name
  let companyName = "RentRedi";
  console.log("companyName = ", companyName);

  // send response
  res.send(`Welcome to the ${companyName} interview!`);
});

registerUserRoutes(app);

module.exports = app;
