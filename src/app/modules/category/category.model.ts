import { Schema, model } from "mongoose"
import { TCategory } from "./category.interface"

const categorySchema = new Schema<TCategory>({
    name: { type: String, required: true, unique: true }
})

categorySchema.methods.toJSON = function () {
    const category = this.toObject()
    delete category.__v
    return category
}


export const CategoryModel = model<TCategory>('Category', categorySchema)