import mongoose from "mongoose"
import { TErrorResponse } from "./interface"

const handleMongooseValidationError = (err: mongoose.Error.ValidatorError): TErrorResponse => {
    const statusCode = 400
    const message = 'Validator error!'
    const errorMessage = `${err?.path} is required!`
    return { statusCode, message, errorMessage }
}

export default handleMongooseValidationError;