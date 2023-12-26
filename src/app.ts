import express, { NextFunction, Request, Response } from "express";
import cors from "cors"
import router from "./app/routes";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api', router)

app.get('/', (req: Request, res: Response) => {
    res.send('<h1 style="text-align: center; margin-top: 50px;">Server is running</h1>')
})

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(404).json({ success: false, message: "Route not found" })
})

app.use(globalErrorHandler)

export default app