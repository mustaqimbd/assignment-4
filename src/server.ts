import mongoose from "mongoose"
import app from "./app"
import { dbUrl, port } from "./app/config/config"

const run = async () => {
    try {
        await mongoose.connect(dbUrl as string)
            .then(() => console.log('Connected to MongoDB'))
            .catch(() => console.log("Failed to connect to MongoDB"))

        app.listen(port, () => console.log(`Server is running on port ${port}`))
    } catch (error) {
        console.log(error)
    }
}
run()