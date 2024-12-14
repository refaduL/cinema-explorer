const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const createError = require("http-errors");
const pool = require("../config/db");
const { jwtAccessKey } = require("../config/secret");
const { successResponse } = require("./responseController");
const { createJSONWebToken } = require("../helper/jsonwebtoken");

const handleLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const [users] = await pool.query(
      "SELECT user_id, name, email, password, role FROM users WHERE email = ?",
      [email]
    );

    if (users.length === 0) {
      throw createError(
        404,
        "User doesn't exist with this email. Please register first."
      );
    }

    const user = users[0];

    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if (!isPasswordMatched) {
      throw createError(401, "Email or password doesn't match.");
    }

    // Check if the user is banned
    // if (user.is_banned) {
    //   throw createError(403, "User is banned. Please contact support.");
    // }

    const accessToken = createJSONWebToken(
      {user: { user_id: user.user_id, name:user.name, email: user.email, role: user.role } },
      jwtAccessKey,
      "15m"
    );

    res.cookie("accessToken", accessToken, {
      maxAge: 15 * 60 * 1000,
      httpOnly: true, // Prevent client-side access to the cookie
      secure: true, // Use HTTPS in production
      sameSite: "none", // Cross-site requests allowed
    });

    const { password: _, ...userWithoutPassword } = user;

    return successResponse(res, {
      statusCode: 200,
      message: "User logged in successfully.",
      payload: {user: userWithoutPassword, token: accessToken }
    });
  } catch (error) {
    next(error);
  }
};

const handleLogout = async (req, res, next) => {
  try {
    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    return successResponse(res, {
      statusCode: 200,
      message: "User logged out successfully.",
      payload: {},
    });
  } catch (error) {
    next(error);
  }
};


const fetchAuthenticatedUser = async (req, res, next) => {
  try {
      const token = req.cookies.accessToken;
      if (!token) {
          throw createError(401, "Authentication token missing. Failed fetching user.");
      }

      const decoded = jwt.verify(token, jwtAccessKey);
      const user = decoded.user;
      console.log("\nDecoded user is here: ", decoded.user);

      return successResponse(res, {
        statusCode: 200,
        message: "Authenticated user info fetched successfully.",
        payload: {user, token},
      });
  } catch (error) {
      next(error);
  }
};




module.exports = { handleLogin, handleLogout, fetchAuthenticatedUser };
