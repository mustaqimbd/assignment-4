import catchAsync from "../../utilities/catchAsync"
import sendResponse from "../../utilities/sendResponse"
import { authServices } from "./auth.service"

const loginUser = catchAsync(async (req, res) => {
    const result = await authServices.loginUser(req.body)
    sendResponse(res, {
        statusCode: 200,
        message: "User login successful",
        data: result
    })
})

const changePassword = catchAsync(async (req, res) => {
    const userId = req.user._id
    const result = await authServices.changePassword(userId,req.body)
    sendResponse(res, {
        statusCode: 200,
        message: "Password changed successfully",
        data: result
    })
})

export const authController = { loginUser, changePassword }