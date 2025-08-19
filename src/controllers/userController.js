import { getProfileService, getAllUsersService, promoteUserService } from "../services/userService";
import { StatusCodes } from "http-status-codes";

export const getProfile = async (req, res, next) => {
    try {
        const { user, userDetail } = await getProfileService(req.user.id);
        res.status(StatusCodes.OK).json({
            user: user,
            userDetail: userDetail
        });
    } catch (error) {
        next(error);
    }
};

export const getAllUsers = async (req, res, next) => {
    try {
        const { users, userDetails} = await getAllUsersService();
        res.status(StatusCodes.OK).json({
            users: users,
            userDetails: userDetails
        });
    } catch (error) {
        next(error);
    }
};

export const promoteUser = async (req, res, next) => {
    try {
        const updatedUser = await promoteUserService(req.body.userId); 
        res.status(StatusCodes.OK).json({
            message: "User promoted to admin",
            user: updatedUser,
        });
    } catch (err) {
        next(err); 
    }
};

