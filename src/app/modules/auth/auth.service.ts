import sendError from "../../errorHandlers/sendError"
import UserModel from "../user/user.model"
import { TPasswordChange, TUserLogin } from "./auth.interface"
import httpStatus from "http-status"
import bcrypt from "bcrypt"
import { jwt_expire, jwt_secret } from "../../config/config"
import { createJwtToken } from "./auth.utils"
import { TPasswordChangeHistory } from "../user/user.interface"

const loginUser = async (payload: TUserLogin) => {
    const { username, password } = payload

    const user = await UserModel.findOne({ username }, { createdAt: 0, updatedAt: 0 })
    if (!user) {
        throw new sendError(httpStatus.NOT_FOUND, "Username not found!")
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password)
    if (!isPasswordMatch) {
        throw new sendError(httpStatus.BAD_REQUEST, "Password does not match!")
    }

    const jwtPayload = { _id: user._id, role: user.role, email: user.email }
    const token = createJwtToken(jwtPayload, jwt_secret as string, jwt_expire as string)

    return { user, token }
}

const changePassword = async (userId: string, payload: TPasswordChange) => {
    const { currentPassword, newPassword } = payload

    const user = await UserModel.findById(userId)

    if (!user) {
        throw new sendError(httpStatus.NOT_FOUND, "User not found!")
    }

    const { passwordChangedHistory, password, passwordChangedAt } = user

    const isPasswordMatch = await bcrypt.compare(currentPassword, password)
    if (!isPasswordMatch) {
        throw new sendError(httpStatus.BAD_REQUEST, "Password does not match!")
    }

    const isPasswordMatchWithPrevious = passwordChangedHistory.find(({ oldPassword }) => oldPassword === newPassword)

    if (isPasswordMatchWithPrevious || currentPassword === newPassword) {
        throw new sendError(
            httpStatus.BAD_REQUEST,
            `Password change failed. Ensure the new password is unique and not among the last 2 used (last used on ${isPasswordMatchWithPrevious?.date || passwordChangedAt}).`
        );
    }

    const updatedPassHistory = (passwordChangedHistory.length === 2 ? passwordChangedHistory.slice(0, -1) : passwordChangedHistory) as TPasswordChangeHistory[]

    const hashedPassword = await bcrypt.hash(newPassword, 10)
    const result = await UserModel.findByIdAndUpdate(
        userId,
        {
            password: hashedPassword,
            passwordChangedAt: Date.now(),
            passwordChangedHistory: [
                { oldPassword: currentPassword, date: Date.now() },
                ...updatedPassHistory
            ]
        },
        { new: true }
    ).select("-passwordChangedAt")

    return result
}

export const authServices = { loginUser, changePassword }