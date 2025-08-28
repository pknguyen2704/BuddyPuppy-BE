import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/Users";
import UserDetail from "../models/UserDetail";
import ApiError from "../utils/ApiError";
import { StatusCodes } from "http-status-codes";

export const registerService = async (userData) => {
    const {
        email, password, username,
        child_Fullname, child_Gender, child_dateOfBirth, child_school,
        guardian_Fullname, guardian_Gender, guardian_dateOfBirth, guardian_relation
    } = userData;

    // Check trùng Username
    const existingUser = await User.findOne({ username });
    if (existingUser) {
        throw new ApiError(StatusCodes.CONFLICT, "Username already registered");
    }
    const existingUserEmail = await User.findOne({ email });
    if (existingUserEmail) {
        throw new ApiError(StatusCodes.CONFLICT, "Email already registered");
    }

    // Tạo user mới
    const newUser = await User.create({ username, password, email });
    if (!newUser) {
        throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "Failed to create user");
    }

    const newUserDetail = await UserDetail.create({
        userId: newUser._id,
        child_Fullname,
        child_Gender,
        child_dateOfBirth,
        child_school,
        guardian_Fullname,
        guardian_Gender,
        guardian_dateOfBirth,
        guardian_relation,
    });
    if (!newUserDetail) {
        throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "Failed to create user detail");
    }

    const { password: _, ...userWithoutPassword } = newUser.toObject();

    return {
        user: userWithoutPassword,
        detail: newUserDetail,
    };
};

export const loginService = async (username, password) => {
    const user = await User.findOne({ username });
    if (!user) {
        throw new ApiError(StatusCodes.UNAUTHORIZED, "Invalid email or password");
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
        throw new ApiError(StatusCodes.UNAUTHORIZED, "Invalid email or password");
    }

    // Tạo JWT
    const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    return { user, token };
};
