import express from 'express';
import { categoryControllers } from './category.controller';
import requestValidator from '../../middlewares/requestValidator';
import categoryValidationSchema from './category.validation';
import authGuard from '../../middlewares/authGuard';

const categoryRoutes = express.Router()

categoryRoutes.post(
    '/',
    authGuard('admin'),
    requestValidator(categoryValidationSchema),
    categoryControllers.createCategory
)

categoryRoutes.get('/', categoryControllers.getAllCategories)

export default categoryRoutes