import { z } from "zod";
const passwordRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/;
const passwordErrorMessage = "Password must be 8-16 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character."

export const loginValidationSchema = z.object({
    username: z.string().min(1, { message: "Username is required!" }),
    password: z.string().min(1, { message: "Password is required!" })
})

export const changeValidationSchema = z.object({
    currentPassword: z.string().min(1, { message: "Current password is required!" }),
    newPassword: z.string().refine((val) => {
        return passwordRegex.test(val)
    },
        { message: `New ${passwordErrorMessage}` }
    )
})