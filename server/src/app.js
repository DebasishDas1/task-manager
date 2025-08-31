import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.static("public"));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

import authRouter from "./route/auth.route.js";
import userRouter from "./route/user.route.js";
import taskRouter from "./route/task.route.js";

app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/tasks", taskRouter);

export default app;
