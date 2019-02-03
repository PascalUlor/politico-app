const requestHelper = {
  success(res, statusCode, message, data) {
    if (data) {
      return res.status(statusCode).json({ success: true, message, ...data });
    }
    return res.status(statusCode).json({
      success: true,
      message,
    });
  },
  error(res, statusCode, errors) {
    return res.status(statusCode).json({
      success: false,
      errors,
    });
  },
};

export default requestHelper;
