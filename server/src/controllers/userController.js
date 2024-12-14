const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const createError = require("http-errors");
const { successResponse } = require("./responseController");
const { createJSONWebToken } = require("../helper/jsonwebtoken");
const { jwtActivationKey, clientURL } = require("../config/secret");
const emailWithNodeMailer = require("../helper/email");
const pool = require("../config/db");

const getAllUsers = async (req, res, next) => {
  try {
    const [users] = await pool.query(
      "SELECT user_id, name, email, role FROM users"
    );

    return successResponse(res, {
      statusCode: 200,
      message: "Users retrieved successfully.",
      payload: users,
    });
  } catch (error) {
    next(error);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const [user] = await pool.query(
      "SELECT user_id, name, email FROM users WHERE user_id = ?",
      [id]
    );
    if (user.length === 0) {
      throw createError(404, "User not found.");
    }

    return successResponse(res, {
      statusCode: 200,
      message: "User retrieved successfully.",
      payload: user,
    });
  } catch (error) {
    next(error);
  }
};

const registerNewUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const [existingUser] = await pool.query(
      "SELECT email FROM users WHERE email = ?",
      [email]
    );
    if (existingUser.length > 0) {
      throw createError(409, "User email already exists. Please sign in.");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = { name, email, password: hashedPassword };

    console.log("\nDebugging is going on-----------------newUser");
    console.log(newUser);

    const token = createJSONWebToken(newUser, jwtActivationKey, "10m");

    const emailData = {
      email,
      subject: "Account Verification Email",
      html: `
        <h2>Hello ${name}!</h2>
        <p>Please click <a href="${clientURL}/api/users/activate/${token}" target="_blank">here</a> to verify your email and activate your account.</p>
      `,
    };

    try {
      // await emailWithNodeMailer(emailData);
    } catch (emailError) {
      next(createError(500, "Failed to send verification email"));
      return;
    }

    // Insert new user into the database (without activating yet)
    await pool.execute(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, hashedPassword]
    );

    return successResponse(res, {
      statusCode: 200,
      message: `Please check your email (${email}) to complete the registration process.`,
      payload: { token },
    });
  } catch (error) {
    next(error);
  }
};

const updateUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, email, password } = req.body;

    const [existingUser] = await pool.query(
      "SELECT user_id FROM users WHERE user_id = ?",
      [id]
    );
    if (existingUser.length === 0) {
      throw createError(404, "User not found.");
    }

    // Prepare dynamic query
    const updates = [];
    const values = [];

    if (name) {
      updates.push("name = ?");
      values.push(name);
    }
    if (email) {
      updates.push("email = ?");
      values.push(email);
    }
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updates.push("password = ?");
      values.push(hashedPassword);
    }

    // If no fields are provided, do nothing
    if (updates.length === 0) {
      return successResponse(res, {
        statusCode: 200,
        message: "No fields to update.",
      });
    }

    values.push(id);

    const updateQuery = `UPDATE users SET ${updates.join(", ")} WHERE user_id = ?`;
    await pool.execute(updateQuery, values);

    const [updatedUser] = await pool.query("SELECT * FROM users WHERE user_id = ?", [id]);
    return successResponse(res, {
      statusCode: 200,
      message: "User updated successfully.",
      payload: updatedUser[0],
    });
  } catch (error) {
    next(error);
  }
};

const deleteUserById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const [existingUser] = await pool.query(
      "SELECT user_id FROM users WHERE user_id = ?",
      [id]
    );
    if (existingUser[0].length === 0) {
      throw createError(404, "User not found.");
    }

    const deletedUser = await pool.query(
      "SELECT name FROM users WHERE user_id = ?",
      [id]
    );
    await pool.execute("DELETE FROM users WHERE user_id = ?", [id]);

    return successResponse(res, {
      statusCode: 200,
      message: `User named ${deleteUserById.name} deleted successfully`,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registerNewUser,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
};
