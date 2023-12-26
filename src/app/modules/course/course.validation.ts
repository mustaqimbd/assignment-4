import { z } from "zod";

const tags = z.object({
    name: z.string().min(1, { message: "Name is required!" }),
    isDeleted: z.boolean().optional()
})

const details = z.object({
    level: z.string().min(1, { message: "Level is required!" }),
    description: z.string().min(1, { message: "Description is required!" })
})


export const courseDataValidationSchema = z.object({
    title: z.string().min(1, { message: "Title is required!" }),
    instructor: z.string().min(1, { message: "Instructor is required!" }),
    categoryId: z.string().min(1, { message: "categoryId is required!" }),
    price: z.number().min(1, { message: "Price is required!" }),
    tags: z.array(tags).min(1, { message: "Tags is required!" }),
    startDate: z.string().min(1, { message: "StartDate is required!" }),
    endDate: z.string().min(1, { message: "EndDate is required!" }),
    language: z.string().min(1, { message: "Language is required!" }),
    provider: z.string().min(1, { message: "Provider is required!" }),
    details: details
})


const updateTags = z.object({
    name: z.string().optional(),
    isDeleted: z.boolean().optional()
});

const updateDetails = z.object({
    level: z.string().optional(),
    description: z.string().optional()
});

export const updateCourseDataValidationSchema = z.object({
    title: z.string().optional(),
    instructor: z.string().optional(),
    categoryId: z.string().optional(),
    price: z.number().optional(),
    tags: z.array(updateTags).optional(),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
    language: z.string().optional(),
    provider: z.string().optional(),
    details: updateDetails.optional()
});

