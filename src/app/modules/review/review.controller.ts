import catchAsync from "../../utilities/catchAsync"
import sendResponse from "../../utilities/sendResponse"
import { reviewServices } from "./review.service"


const createReview = catchAsync(async (req, res) => {
    const createdBy = req.user._id
    const result = await reviewServices.createReviewIntoDB(createdBy,req.body)
    sendResponse(res, {
        statusCode: 201,
        message: "Review created successfully",
        data: result
    })
})



export const reviewControllers = {
    createReview,
}