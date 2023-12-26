import { Router } from "express";
import courseRoutes from "../modules/course/course.route";
import categoryRoutes from "../modules/category/category.route";
import reviewRoutes from "../modules/review/review.route";
import { userRoutes } from "../modules/user/user.route";
import { authRoutes } from "../modules/auth/auth.route";


const router = Router()

const routes = [
    {
        path: '/course',
        route: courseRoutes
    },
    {
        path: '/courses',
        route: courseRoutes
    },
    {
        path: '/categories',
        route: categoryRoutes
    },
    {
        path: '/reviews',
        route: reviewRoutes
    },
    {
        path: '/auth',
        route: userRoutes
    },
    {
        path: '/auth',
        route: authRoutes
    }
]

routes.forEach(route => router.use(route.path, route.route))

export default router