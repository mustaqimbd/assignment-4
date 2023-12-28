import { Types } from 'mongoose';
import { TCategory } from "./category.interface";
import { CategoryModel } from "./category.model";

const createCategoryIntoDB = async (createdBy: Types.ObjectId, payload: TCategory) => {
    payload.createdBy = createdBy
    const result = await CategoryModel.create(payload)
    return result
}
const getAllCategoriesFromDB = async () => {
    const result = await CategoryModel.find().populate('createdBy', "username email role")
    return result
}

export const categoryServices = { createCategoryIntoDB, getAllCategoriesFromDB }