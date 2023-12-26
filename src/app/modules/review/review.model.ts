import { Schema, model } from 'mongoose';
import { TReview } from './review.interface';

const reviewSchema = new Schema<TReview>(
    {
        courseId: {
            type: Schema.Types.ObjectId,
            ref: 'Course',
            required: true,
        },
        rating: {
            type: Number,
            required: true,
            min: 1,
            max: 5,
        },
        review: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

reviewSchema.methods.toJSON = function () {
    const review = this.toObject()
    delete review.__v
    delete review.createdAt
    delete review.updatedAt
    return review
}


const ReviewModel = model<TReview>('Review', reviewSchema);

export default ReviewModel;
