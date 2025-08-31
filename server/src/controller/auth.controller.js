import ApiResponse from "../util/ApiResponse.js";
import ApiError from "../util/ApiError.js";
import { User } from "../model/user.model.js";

// Helper: Generate tokens
const generateAccessAndRefereshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating refresh and access token"
    );
  }
};

// ✅ Register
export const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .json(new ApiResponse(400, null, "All fields are required"));
    }

    const existedUser = await User.findOne({ $or: [{ name }, { email }] });
    if (existedUser) {
      return res
        .status(409)
        .json(new ApiResponse(409, null, "User already exists"));
    }

    const user = await User.create({ name, email, password });

    const createdUser = await User.findById(user._id).select(
      "-password -refreshToken"
    );

    return res
      .status(201)
      .json(new ApiResponse(201, createdUser, "User registered successfully"));
  } catch (error) {
    next(error);
  }
};

// ✅ Login
export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json(new ApiResponse(400, null, "Email and password are required"));
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json(new ApiResponse(404, null, "User not found"));
    }

    const isPasswordValid = await user.isPasswordCorrect(password);
    if (!isPasswordValid) {
      return res
        .status(401)
        .json(new ApiResponse(401, null, "Invalid credentials"));
    }

    const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(
      user._id
    );

    const loggedInUser = await User.findById(
      user._id,
      "-password -refreshToken"
    );

    const options = {
      httpOnly: true,
      secure: true,
    };

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json(
        new ApiResponse(
          200,
          {
            user: loggedInUser,
            accessToken,
            refreshToken,
          },
          "User logged in successfully"
        )
      );
  } catch (error) {
    next(error);
  }
};

// ✅ Logout
export const logoutUser = async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(
      req.user._id,
      { $unset: { refreshToken: "" } },
      {
        new: true,
      }
    );

    const options = {
      httpOnly: true,
      secure: true,
    };

    return res
      .status(200)
      .clearCookie("accessToken", options)
      .clearCookie("refreshToken", options)
      .json(new ApiResponse(200, null, "User logged out successfully"));
  } catch (error) {
    next(error);
  }
};

// ✅ Get Profile
export const getUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).select(
      "-password -refreshToken"
    );
    if (!user) {
      return res.status(404).json(new ApiResponse(404, null, "User not found"));
    }

    return res
      .status(200)
      .json(new ApiResponse(200, user, "User profile fetched successfully"));
  } catch (error) {
    next(error);
  }
};
