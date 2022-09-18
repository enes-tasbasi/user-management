const { createUser } = require("./controller");

const register = (app) => {
  app.post("/users", createUser);
};

module.exports = register;
