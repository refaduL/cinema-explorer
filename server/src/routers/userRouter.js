const express = require("express");
const userRouter = express.Router();

const {
  getAllUsers,
  registerNewUser,
  updateUserById,
  deleteUserById,
  getUserById,
} = require("../controllers/userController");

userRouter.get("/", getAllUsers);

userRouter.post("/signup", registerNewUser);
userRouter.get("/:id", getUserById);
userRouter.put("/:id", updateUserById);
userRouter.delete("/:id", deleteUserById);
// userRouter.put("/update-password/:id([0-9a-fA-F]{24})", updatePassword);
// userRouter.put("/manage-user/:id([0-9a-fA-F]{24})", manageUserStatusById);

module.exports = userRouter;
