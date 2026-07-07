import { User } from "../models/user.model.js";
import httpStatus from "http-status";

const authMiddleware = async (req, res, next) => {
    try {

        const token = req.headers.authorization;

        if (!token) {
            return res.status(httpStatus.UNAUTHORIZED).json({
                success: false,
                message: "Token not found"
            });
        }

        const user = await User.findOne({ token });

        if (!user) {
            return res.status(httpStatus.UNAUTHORIZED).json({
                success: false,
                message: "Invalid token"
            });
        }

        req.user = user;

        next();

    } catch (error) {

        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: error.message
        });

    }
};

export default authMiddleware;