import express from 'express';
import { reviewControllers } from './review.controller';
import requestValidator from '../../middlewares/requestValidator';
import { reviewValidationSchema } from './review.validation';
import authGuard from '../../middlewares/authGuard';

const reviewRoutes = express.Router()

reviewRoutes.post(
    '/',
    authGuard('user'),
    requestValidator(reviewValidationSchema),
    reviewControllers.createReview
)


export default reviewRoutes