import express from 'express';
import { courseControllers } from './course.controller';
import requestValidator from '../../middlewares/requestValidator';
import { courseDataValidationSchema, updateCourseDataValidationSchema } from './course.validation';
import authGuard from '../../middlewares/authGuard';
const courseRoutes = express.Router()

courseRoutes.post(
    '/',
    authGuard('admin'),
    requestValidator(courseDataValidationSchema),
    courseControllers.createCourse
)

courseRoutes.get(
    '/',
    courseControllers.getCourses
)

courseRoutes.get(
    '/:courseId/reviews',
    courseControllers.getCourseWithReview
)
courseRoutes.get(
    '/best',
    courseControllers.getBestCourse
)

courseRoutes.put(
    '/:courseId',
    authGuard('admin'),
    requestValidator(updateCourseDataValidationSchema),
    courseControllers.updateCourse
)


export default courseRoutes