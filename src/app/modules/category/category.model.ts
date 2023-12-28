import { Schema, model } from "mongoose"
import { TCategory } from "./category.interface"

const categorySchema = new Schema<TCategory>({
    name: { type: String, required: true, unique: true },
    createdBy: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User"
    }
}, {
    timestamps: true 
})

categorySchema.methods.toJSON = function () {
    const category = this.toObject()
    delete category.__v
    return category
}


export const CategoryModel = model<TCategory>('Category', categorySchema)