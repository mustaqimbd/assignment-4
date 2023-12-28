import httpStatus from "http-status";
import sendError from "../errorHandlers/sendError";
import catchAsync from "../utilities/catchAsync";
import jwt, { JwtPayload } from "jsonwebtoken";
import { jwt_secret } from "../config/config";
import UserModel from "../modules/user/user.model";

type TUserRole = "user" | "admin"

const authGuard = (...role: TUserRole[]) => {
    return catchAsync(async (req, res, next) => {
        const token = req.headers.authorization
        
        if (!token) {
            throw new sendError(httpStatus.UNAUTHORIZED, "Unauthorized access!")
        }

        const decode = jwt.verify(token, jwt_secret as string) as JwtPayload
        const user = await UserModel.findById(decode._id)

        if (!user) {
            throw new sendError(httpStatus.NOT_FOUND, "User not found!")
        }

        if (role && !role.includes(decode.role)) {
            throw new sendError(httpStatus.UNAUTHORIZED, "Unauthorized access!")
        }

        const passwordChangedTime = new Date(user.passwordChangedAt).getTime() / 1000
        if (passwordChangedTime > (decode.iat as number)) {
            throw new sendError(httpStatus.UNAUTHORIZED, "Unauthorized access! Login again!")
        }
        
        req.user = decode

        next()
    })
};

export default authGuard;