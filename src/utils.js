const isEmpty = (value) => {
  if (value === undefined || value === null) return true;

  if (value.length === 0) return true;

  return false;
};

module.exports = { isEmpty };
