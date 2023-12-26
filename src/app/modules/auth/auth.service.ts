import sendError from "../../errorHandlers/sendError"
import UserModel from "../user/user.model"
import { TUserLogin } from "./auth.interface"
import httpStatus from "http-status"
import bcrypt from "bcrypt"
import { jwt_expire, jwt_secret } from "../../config/config"
import { createJwtToken } from "./auth.utils"

const loginUser = async (payload: TUserLogin) => {
    const { username, password } = payload

    const user = await UserModel.findOne({ username }, { createdAt: 0, updatedAt: 0 })
    if (!user) {
        throw new sendError(httpStatus.NOT_FOUND, "Username not found!")
    }
    console.log(user.password)
    const isPasswordMatch = await bcrypt.compare(password, user.password)
    if (!isPasswordMatch) {
        throw new sendError(httpStatus.BAD_REQUEST, "Password does not match!")
    }

    const jwtPayload = { _id: user._id, role: user.role, email: user.email }
    const token = createJwtToken(jwtPayload, jwt_secret as string, jwt_expire as string)

    return { user, token }
}

export const authServices = { loginUser }