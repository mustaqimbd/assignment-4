import { Router } from "express";
import courseRoutes from "../modules/course/course.route";
import categoryRoutes from "../modules/category/category.route";
import reviewRoutes from "../modules/review/review.route";
import { userRoutes } from "../modules/user/user.route";


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
   
]

routes.forEach(route => router.use(route.path, route.route))

export default router