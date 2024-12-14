const express = require("express");
const { handleLogin, handleLogout, authenticateToken, fetchAuthenticatedUser } = require("../controllers/authController");

const authRouter = express.Router();

authRouter.post("/signin", handleLogin);
authRouter.post("/signout", handleLogout);

authRouter.get("/user", fetchAuthenticatedUser);
authRouter.get("/me", fetchAuthenticatedUser);

module.exports = authRouter;
