import catchAsync from "../../utilities/catchAsync";
import sendResponse from "../../utilities/sendResponse";
import { userServices } from "./user.service";

const createUser = catchAsync(async (req, res) => {
    console.log(req.body)
    const result = await userServices.createUserIntoDB(req.body)
    sendResponse(res, {
        statusCode: 201,
        message: "User registered successfully!",
        data: result
    })
})

export const userControllers = {
    createUser
}