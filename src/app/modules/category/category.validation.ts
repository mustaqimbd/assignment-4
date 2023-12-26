import { z } from "zod";

const categoryValidationSchema = z.object({
    name: z.string().min(1, { message: "Name is required!" })
})
export default categoryValidationSchema