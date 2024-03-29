import { Router } from "express";
import requestValidator from "../../middlewares/requestValidator";
import { changeValidationSchema, loginValidationSchema } from "./auth.validation";
import { authController } from "./auth.controller";
import authGuard from "../../middlewares/authGuard";

const router = Router()

router.post(
    '/login',
    requestValidator(loginValidationSchema),
    authController.loginUser
)

router.post(
    '/change-password',
    authGuard('user', "admin"),
    requestValidator(changeValidationSchema),
    authController.changePassword
)

export const authRoutes = router