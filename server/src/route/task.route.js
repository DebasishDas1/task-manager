import { Router } from "express";
import {
  getAllTasks,
  createTask,
  updateTaskById,
  deleteTaskById,
  getUserTasks,
} from "../controller/tasks.controller.js";
import { verifyJWT } from "../middlewares/verifyJWT.js";

const taskRouter = Router();

taskRouter.get("/all", getAllTasks);
taskRouter.get("/", verifyJWT, getUserTasks);
taskRouter.post("/", verifyJWT, createTask);
taskRouter.put("/:id", verifyJWT, updateTaskById);
taskRouter.delete("/:id", verifyJWT, deleteTaskById);

export default taskRouter;
