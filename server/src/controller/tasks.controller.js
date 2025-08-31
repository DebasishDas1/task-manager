import ApiResponse from "../util/ApiResponse.js";
import ApiError from "../util/ApiError.js";
import { Task } from "../model/task.model.js";

export const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res
      .status(200)
      .json(new ApiResponse(200, tasks, "Tasks retrieved successfully"));
  } catch (error) {
    res
      .status(500)
      .json(new ApiError("Failed to retrieve tasks", error.message));
  }
};

export const getUserTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user._id });
    res
      .status(200)
      .json(new ApiResponse(true, tasks, "Tasks retrieved successfully"));
  } catch (error) {
    res
      .status(500)
      .json(new ApiError("Failed to retrieve tasks", error.message));
  }
};

export const createTask = async (req, res) => {
  try {
    const { title, description, priority, status, dueDate } = req.body;
    const newTask = new Task({
      title,
      description,
      priority,
      status,
      dueDate,
      user: req.user._id,
    });
    const savedTask = await newTask.save();
    res
      .status(201)
      .json(new ApiResponse(true, savedTask, "Task created successfully"));
  } catch (error) {
    res.status(500).json(ApiError("Failed to create task", error.message));
  }
};

export const updateTaskById = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, priority, status, dueDate } = req.body;
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { title, description, priority, status, dueDate },
      { new: true }
    );
    if (!updatedTask) {
      return res
        .status(404)
        .json(new ApiError("Task not found", "No task with the given ID"));
    }
    res
      .status(200)
      .json(new ApiResponse(200, updatedTask, "Task updated successfully"));
  } catch (error) {
    res.status(500).json(new ApiError("Failed to update task", error.message));
  }
};

export const deleteTaskById = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTask = await Task.findByIdAndDelete(id);
    if (!deletedTask) {
      return res
        .status(404)
        .json(new ApiError("Task not found", "No task with the given ID"));
    }
    res
      .status(200)
      .json(new ApiResponse(200, deletedTask, "Task deleted successfully"));
  } catch (error) {
    res.status(500).json(new ApiError("Failed to delete task", error.message));
  }
};
