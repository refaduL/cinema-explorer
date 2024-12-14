const createError = require("http-errors");
const jwt = require("jsonwebtoken");
const { jwtAccessKey } = require("../config/secret");

const isLoggedIn = async (req, res, next) => {
  try {
    // is there access token
    const accessToken = req.cookies.accessToken;
    if (!accessToken) {
      throw createError(401, "Access token not found. Please Log in");
    }

    const decoded = jwt.verify(accessToken, jwtAccessKey);
    if (!decoded || !decoded.user) {
      throw createError(401, "Invalid access token. Please log in again.");
    }

    req.user = decoded.user;
    next();
  } catch (error) {
    return next(error);
  }
};

const isLoggedOut = async (req, res, next) => {
  try {
    // is there access token
    const accessToken = req.cookies.accessToken;
    if (accessToken) {
      // check: it is valid or not
      try {
        const decoded = jwt.verify(accessToken, jwtAccessKey);
        if (decoded) {
          throw createError(400, "User is already Logged in.");
        }
      } catch (error) {
        throw error;
      }
    }

    next();
  } catch (error) {
    return next(error);
  }
};

const isAdmin = async (req, res, next) => {
  try {
    if (!req.user.role === "admin") {
      throw createError(403, "Forbidden req. You must be an admin.");
    }
    next();
  } catch (error) {
    return next(error);
  }
};

// Middleware for role-based access control
const authorizeRole = (requiredRole) => {
  return (req, res, next) => {
    if (req.user.role !== requiredRole) {
      return next(
        createError(403, "You do not have permission to perform this action.")
      );
    }
    next();
  };
};

module.exports = { isLoggedIn, isLoggedOut, isAdmin, authorizeRole };
