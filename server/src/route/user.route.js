import { Router } from "express";
import {
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
} from "../controller/users.controller.js";
import { verifyJWT } from "../middlewares/verifyJWT.js";

const userRouter = Router();

userRouter.get("/", verifyJWT, getAllUsers);
userRouter.get("/:id", verifyJWT, getUserById);
userRouter.put("/:id", verifyJWT, updateUserById);
userRouter.delete("/:id", verifyJWT, deleteUserById);

export default userRouter;
