import { Router } from "express";
import {
  loginUser,
  logoutUser,
  registerUser,
  getUserProfile,
} from "../controller/auth.controller.js";
import { verifyJWT } from "../middlewares/verifyJWT.js";

const authRouter = Router();

authRouter.post("/register", registerUser);
authRouter.post("/login", loginUser);
authRouter.post("/logout", verifyJWT, logoutUser);
authRouter.get("/profile", verifyJWT, getUserProfile);

export default authRouter;
