const requestHelper = {
  success(res, statusCode, message, data) {
    if (data) {
      return res.status(statusCode).json({
        success: true, statusCode, message, ...data,
      });
    }
    return res.status(statusCode).json({
      success: true,
      statusCode,
      message,
    });
  },
  error(res, statusCode, message, errors) {
    return res.status(statusCode).json({
      success: false,
      statusCode,
      message,
      errors,
    });
  },
};

export default requestHelper;
