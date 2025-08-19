import { registerService, loginService } from "../services/authService";
import { StatusCodes } from "http-status-codes";

export const register = async (req, res, next) => {
    try {
        const { user, detail } = await registerService(req.body);
        res.status(StatusCodes.CREATED).json({
            message: "User registered successfully",
            user: {
                id: user._id,
                email: user.email,
                name: user.name
            },
            detail: {
                UserDetailid: detail._id,
                child_Fullname: detail.child_Fullname,
                child_Gender: detail.child_Gender,
                child_dateOfBirth: detail.child_dateOfBirth,
                child_school: detail.child_school,
                guardian_Fullname: detail.guardian_Fullname,
                guardian_Gender: detail.guardian_Gender,
                guardian_dateOfBirth: detail.guardian_dateOfBirth,
                guardian_relation: detail.guardian_relation,
            }
        });
    } catch (error) {
        next(error);
    }
};

export const login = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const { user, token } = await loginService(username, password);

        res.status(StatusCodes.OK).json({
            message: "Login successful",
            token,
            user: { id: user._id, email: user.email, username: user.username, role: user.role },
        });
    } catch (error) {
        next(error);
    }
};

export const logout = async (req, res, next) => {
    try {
        // Nếu dùng refresh token thì xử lý xoá token ở DB/Redis
        res.status(StatusCodes.OK).json({ message: "Logged out successfully" });
    } catch (error) {
        next(error);
    }
};
