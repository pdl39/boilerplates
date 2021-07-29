const changeErrStatus = (status, err) => {
  err.status = status;
  return err;
}

module.exports = changeErrStatus;
