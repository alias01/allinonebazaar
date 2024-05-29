// send any success response
exports.success = (message, data, statusCode) => {
  return {
    message,
    error: false,
    code: statusCode,
    data,
  };
};

// send any error response
exports.error = (message, statusCode) => {
  // List of common HTTP request code
  const codes = [200, 201, 400, 401, 404, 403, 422, 500];

  // Get matched code
  const findCode = codes.find((code) => code == statusCode);

  if (!findCode) statusCode = 500;
  else statusCode = findCode;
  return {
    message,
    error: true,
    code: findCode,
  };
};

// send any validation response
exports.validation = (errors) => {
  return {
    message: "Validation errors",
    error: true,
    code: 422,
    errors,
  };
};
