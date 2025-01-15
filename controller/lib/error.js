const errorHandler = (error, name, from) => {
  let loggerfunction = console.log;

  loggerfunction("_____START_____");
  loggerfunction("Error Occuered in " + name);

  if (from === "axios") {
    if (error.response) {
      loggerfunction(error.response.data);
      loggerfunction(error.response.status);
      loggerfunction(error.response.headers);

      loggerfunction(error.request);
    } else {
      loggerfunction(error.toJSON());
    }
  } else {
    loggerfunction(error);
  }

  loggerfunction("_____END_____");
};

module.exports = { errorHandler };
