const { createUser, findAll, updateUser } = require("./controller");

const register = (app) => {
  app.post("/users", createUser);
  app.get("/users", findAll);
  app.patch("/users/:id", updateUser);
};

module.exports = register;
