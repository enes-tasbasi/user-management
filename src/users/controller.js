const { getDatabase, ref, set } = require("firebase/database");
const { v4: uuid } = require("uuid");

const { apiInstance } = require("../config/axiosConfig");

const createUser = async (req, res) => {
  const { name, zip } = req.body;

  try {
    const response = await apiInstance({
      url: "/zip",
      params: {
        zip,
      },
    });

    const { lat, lon } = response.data;

    const db = getDatabase();
    const id = uuid();
    const user = {
      id,
      name,
      zip,
      lat,
      lon,
    };

    set(ref(db, "users/" + id), user);

    res.json(user);
  } catch (err) {
    res.status(500);
    res.json({
      error: `unable to create user: ${err.message}`,
    });
  }
};

module.exports = { createUser };
