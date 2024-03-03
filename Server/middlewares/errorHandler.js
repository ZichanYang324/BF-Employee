function errorHandler(err, req, res, next) {
  // Log the error, for example using console.error or a logging library
  console.error(err);

  // If the response has already been sent, forward the error to the default Express error handler
  if (res.headersSent) {
    return next(err);
  }

  // Set the status code. If the error has a status code, use it. Otherwise, use 500 (Internal Server Error)
  res.status(err.status || 500);

  // Send the error message as the response
  res.json({
    error: {
      message: err.message,
    },
  });
}

export default errorHandler;
