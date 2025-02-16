
const errorResponse = (
  res,
  { statusCode = 500, message = "REVOLOPER: Internal Server Error" }
) => {
  return res.status(statusCode).json({
    success: false,
    message: message,
  });
};

const successResponse = (
  res,
  { statusCode = 200, message = "REVOLOPER: Success", payload = {} }
) => {
  return res.status(statusCode).json({
    success: true,
    message: message,
    payload,
  });
};

module.exports = { errorResponse, successResponse };
