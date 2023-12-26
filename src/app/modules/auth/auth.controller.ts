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

export const authController = { loginUser }