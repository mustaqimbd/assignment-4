import catchAsync from "../../utilities/catchAsync"
import sendResponse from "../../utilities/sendResponse"
import { categoryServices } from "./category.service"

const createCategory = catchAsync(async (req, res) => {
    const result = await categoryServices.createCategoryIntoDB(req.body)
    sendResponse(res, {
        statusCode: 201,
        message: "Category created successfully",
        data: result
    })
})

const getAllCategories = catchAsync(async (req, res) => {
    const result = await categoryServices.getAllCategoriesFromDB()
    sendResponse(res, {
        statusCode: 200,
        message: "Categories retrieved successfully",
        data: result
    })
})

export const categoryControllers = {
    createCategory, getAllCategories
}