import { z } from 'zod';

export const reviewValidationSchema = z.object({
    courseId: z.string().min(1, { message: "CourseId is required!" }),
    rating: z.number().int().min(1, { message: "Rating is required!" }).max(5),
    review: z.string().min(1, { message: "Review is required!" }),
});


