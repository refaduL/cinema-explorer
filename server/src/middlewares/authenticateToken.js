const authenticateToken = (req, res, next) => {
    const token = req.cookies.accessToken;
  
    if (!token) {
      return next(createError(401, "Access token is missing. Please log in."));
    }
  
    try {
      const decoded = jwt.verify(token, jwtAccessKey);
      req.user = decoded; // Attach the decoded token payload to `req.user`
      next();
    } catch (error) {
      return next(createError(403, "Invalid or expired token."));
    }
  };
  
  module.exports = { authenticateToken };
  