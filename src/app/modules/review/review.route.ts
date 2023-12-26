import express from 'express';
import { reviewControllers } from './review.controller';
import requestValidator from '../../middlewares/requestValidator';
import { reviewValidationSchema } from './review.validation';

const reviewRoutes = express.Router()

reviewRoutes.post(
    '/',
    requestValidator(reviewValidationSchema),
    reviewControllers.createReview
)


export default reviewRoutes