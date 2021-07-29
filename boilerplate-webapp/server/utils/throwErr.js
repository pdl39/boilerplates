const throwErr = (status, message = '') => {
  const err = new Error(message);
  err.status = status;
  throw err;
}

module.exports = throwErr;
