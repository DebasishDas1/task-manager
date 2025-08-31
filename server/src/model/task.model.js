import { Schema, model } from "mongoose";
import { User } from "./user.model.js";

const taskSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    status: {
      type: String,
      enum: ["pending", "in-progress", "completed"],
      default: "pending",
    },
    dueDate: { type: Date },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },
    user: { type: Schema.Types.ObjectId, ref: User, required: true },
  },
  { timestamps: true }
);

export const Task = model("Task", taskSchema);
