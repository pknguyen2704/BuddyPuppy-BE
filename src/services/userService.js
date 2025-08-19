import User from "../models/Users";
import UserDetail from "../models/UserDetail";
import ApiError from "../utils/ApiError";
import { StatusCodes } from "http-status-codes";

export const getProfileService = async (userId) => {
    const user = await User.findById(userId).select("-password");
    const userDetail = await UserDetail.findOne({userId: userId});
    if (!user) throw new ApiError(StatusCodes.NOT_FOUND, "User not found");
    if (!userDetail) throw new ApiError(StatusCodes.NOT_FOUND, "UserDetail not found");
    return {
        user: user,
        userDetail: userDetail
    };
};

export const getAllUsersService = async () => {
    const users = await User.find();
    const userDetails = await UserDetail.find();
    return {
        users: users,
        userDetails: userDetails
    };

};

export const promoteUserService = async (id) => {
    const user = await User.findById(id);
    if (!user) throw new ApiError(StatusCodes.NOT_FOUND, "User not found");

    if (user.role === "admin") {
        throw new ApiError(StatusCodes.BAD_REQUEST, "User is already an admin");
    }

    user.role = "admin";
    await user.save();
    return {
        id: user._id,
        username: user.username,
        role: user.role,
    };
};
