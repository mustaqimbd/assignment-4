import dotenv from "dotenv"
dotenv.config()

const port = process.env.PORT
const dbUrl = process.env.DATABASE_URL
const jwt_secret = process.env.JWT_SECRET
const jwt_expire = process.env.JWT_EXPIRE

export { port, dbUrl, jwt_secret, jwt_expire }