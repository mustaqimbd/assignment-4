import { Router } from "express";
import requestValidator from "../../middlewares/requestValidator";
import { loginValidationSchema } from "./auth.validation";
import { authController } from "./auth.controller";

const router = Router()

router.post(
    '/login',
    requestValidator(loginValidationSchema),
    authController.loginUser
)

export const authRoutes = router