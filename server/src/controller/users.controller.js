import ApiResponse from "../util/ApiResponse.js";
import ApiError from "../util/ApiError.js";
import { User } from "../model/user.model.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, "-password -refreshToken");
    res
      .status(200)
      .json(new ApiResponse(200, users, "Users retrieved successfully"));
  } catch (error) {
    res
      .status(500)
      .json(new ApiError("Failed to retrieve users", error.message));
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id, "-password -refreshToken");
    if (!user) {
      return res
        .status(404)
        .json(new ApiError("User not found", "No user with the given ID"));
    }
    res
      .status(200)
      .json(new ApiResponse(200, user, "User retrieved successfully"));
  } catch (error) {
    res
      .status(500)
      .json(new ApiError("Failed to retrieve user", error.message));
  }
};

export const updateUserById = async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!name && !email) {
      return res
        .status(400)
        .json(
          new ApiError("No data to update", "Provide name or email to update")
        );
    }
    const user = await User.findById(req.params.id, "-password -refreshToken");
    if (!user) {
      return res
        .status(404)
        .json(new ApiError("User not found", "No user with the given ID"));
    }

    if (name) user.name = name;
    if (email) user.email = email;
    await user.save();

    res
      .status(200)
      .json(new ApiResponse(200, user, "User retrieved successfully"));
  } catch (error) {
    res
      .status(500)
      .json(new ApiError("Failed to retrieve user", error.message));
  }
};
export const deleteUserById = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res
        .status(404)
        .json(new ApiError("User not found", "No user with the given ID"));
    }
    res
      .status(200)
      .json(new ApiResponse(200, null, "User deleted successfully"));
  } catch (error) {
    res.status(500).json(new ApiError("Failed to delete user", error.message));
  }
};
