import express from 'express';
import { courseControllers } from './course.controller';
import requestValidator from '../../middlewares/requestValidator';
import { courseDataValidationSchema, updateCourseDataValidationSchema } from './course.validation';
const courseRoutes = express.Router()

courseRoutes.post(
    '/',
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
    requestValidator(updateCourseDataValidationSchema),
    courseControllers.updateCourse
)


export default courseRoutes