const isEmpty = (value) => {
  if (value === undefined || value === null) return true;

  if (value.length === 0) return true;

  return false;
};

const env = (key) => {
  const value = process.env[key];

  if (isEmpty(value)) {
    throw Error(
      `env variable ${key} is not set, add to .env or set manually before running the program`
    );
  }

  return value;
};

module.exports = env;
