import { Types } from 'mongoose';
import { TReview } from "./review.interface"
import ReviewModel from "./review.model"
import { CourseModel } from '../course/course.model';
import sendError from '../../errorHandlers/sendError';
import httpStatus from 'http-status';


const createReviewIntoDB = async (createdBy: Types.ObjectId, payload: TReview) => {
    payload.createdBy = createdBy
    const isCourseExist = await CourseModel.findById(payload.courseId)
    if (!isCourseExist) {
        throw new sendError(httpStatus.NOT_FOUND, "Course not found!")
    }
    const result = (await ReviewModel.create(payload)).populate('createdBy', "username email role")
    return result
}


export const reviewServices = { createReviewIntoDB }