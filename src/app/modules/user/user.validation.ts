import { z } from 'zod';

const passwordRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/;
const passwordErrorMessage = "Password must be 8-16 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character."

export const userValidationSchema = z.object({
    username: z.string().min(1, { message: "Username is required!" }),
    email: z.string().min(1, { message: "Email is required!" }).email({ message: "Email is Invalid" }),
    password: z.string().refine((val) => {
        return passwordRegex.test(val);
    },
        { message: passwordErrorMessage }
    ),
    role: z.enum(['user', 'admin']).default('user')
});
