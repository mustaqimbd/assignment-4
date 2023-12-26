import { Router } from "express";
import requestValidator from "../../middlewares/requestValidator";
import { userValidationSchema } from "./user.validation";
import { userControllers } from "./user.controller";

const router = Router()

router.post(
    "/register",
    requestValidator(userValidationSchema),
    userControllers.createUser
)

export const userRoutes = router