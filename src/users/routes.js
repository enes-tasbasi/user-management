const { createUser, findAll, updateUser, deleteUser } = require("./controller");

const register = (app) => {
  app.post("/users", createUser);
  app.get("/users", findAll);
  app.patch("/users/:id", updateUser);
  app.delete("/users/:id", deleteUser);
};

module.exports = register;
