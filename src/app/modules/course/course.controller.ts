import catchAsync from "../../utilities/catchAsync";
import sendResponse from "../../utilities/sendResponse";
import { courseServices } from "./course.service";

const createCourse = catchAsync(async (req, res) => {
    const result = await courseServices.createCourseIntoDB(req.body)
    sendResponse(res, {
        statusCode: 201,
        message: "Course created successfully",
        data: result
    })
})
const getCourses = catchAsync(async (req, res) => {
    const { meta, data } = await courseServices.getCoursesFromDB(req.query)
    sendResponse(res, {
        message: "Courses retrieved successfully",
        meta,
        data: data
    })
})

const updateCourse = catchAsync(async (req, res) => {
    const id = req.params.courseId
    const result = await courseServices.updateCourseIntoDB(id, req.body)
    sendResponse(res, {
        message: "Course updated successfully",
        data: result
    })
})

const getCourseWithReview = catchAsync(async (req, res) => {
    const id = req.params.courseId
    const result = await courseServices.getCourseWithReviewFromDB(id)
    sendResponse(res, {
        message: "Course and Reviews retrieved successfully",
        data: result
    })
})

const getBestCourse = catchAsync(async (req, res) => {

    const result = await courseServices.getBestCourseFromDB()
    sendResponse(res, {
        message: "Best course retrieved successfully",
        data: result
    })
})

export const courseControllers = {
    createCourse, getCourses, updateCourse, getCourseWithReview, getBestCourse
}