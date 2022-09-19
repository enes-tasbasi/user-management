const { getDatabase, ref, set, get, child } = require("firebase/database");
const { v4: uuid } = require("uuid");

const { apiInstance } = require("../config/axiosConfig");

const db = getDatabase();

const getLocationDataByZip = async (zip) => {
  const response = await apiInstance({
    url: "/weather",
    params: {
      zip,
    },
  });

  const {
    coord: { lat, lon },
    timezone,
  } = response.data;
  return { lat, lon, timezone };
};

const createUser = async (req, res) => {
  const { name, zip } = req.body;

  try {
    const { lat, lon, timezone } = await getLocationDataByZip(zip);

    const id = uuid();
    const user = {
      id,
      name,
      zip,
      lat,
      lon,
      timezone,
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

const findAll = async (req, res) => {
  const dbRef = ref(db);
  try {
    const users = await get(child(dbRef, `users/`));
    if (users.exists()) {
      // users are returned as an object
      // convert to an array
      return res.json(Object.values(users.val()));
    }
    return res.json([]);
  } catch (err) {
    res.status(500);
    res.json({
      error: `unable to get users: ${err.message}`,
    });
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { body } = req;

  const zipUpdated = (user) => body.zip && user.zip !== body.zip;

  const updateAttributes = async (user) => {
    const updated = {
      ...user,
    };

    if (zipUpdated(user)) {
      const { lat, lon, timezone } = await getLocationDataByZip(body.zip);
      Object.assign(updated, { lat, lon, timezone });
    }

    if (body.name) {
      updated.name = body.name;
    }
    if (body.zip) {
      updated.zip = body.zip;
    }

    set(ref(db, "users/" + id), updated);

    return res.json(updated);
  };

  const dbRef = ref(db);
  try {
    const user = await get(child(dbRef, `users/${id}`));
    if (user.exists()) {
      return await updateAttributes(user.val());
    } else {
      res.status(404);
      return res.json({
        error: "A user with the given id does not exist",
      });
    }
  } catch (err) {
    res.status(500);
    return res.json({
      error: `unable to get users: ${err.message}`,
    });
  }
};

module.exports = { createUser, findAll, updateUser };
