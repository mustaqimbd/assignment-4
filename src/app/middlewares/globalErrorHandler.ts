import { ErrorRequestHandler } from "express";
import { ZodError } from "zod";
import handleZodError from "../errorHandlers/handleZodError";
import handleMongooseDuplicateError from "../errorHandlers/handleMongooseDuplicateError";
import handleMongooseCastError from "../errorHandlers/handleMongooseCastError";
import handleMongooseValidationError from "../errorHandlers/handleMongooseValidationError";
import mongoose from "mongoose";
import sendError from "../errorHandlers/sendError";
import sendErrorResponse from "../utilities/sendErrorResponse";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
    let statusCode, message, errorMessage, errorDetails, stack, data

    if (err instanceof ZodError) {
        const formattedError = handleZodError(err)
        statusCode = formattedError.statusCode
        message = formattedError.message
        errorMessage = formattedError.errorMessage
        errorDetails = err
        stack = err.stack
    }
    else if (err?.name === "CastError") {
        const formattedError = handleMongooseCastError(err)
        statusCode = formattedError.statusCode
        message = formattedError.message
        errorMessage = formattedError.errorMessage
        errorDetails = err
        stack = err.stack
    }
    else if (err?.code === 11000) {
        const formattedError = handleMongooseDuplicateError(err)
        statusCode = formattedError.statusCode
        message = formattedError.message
        errorMessage = formattedError.errorMessage
        errorDetails = err
        stack = err.stack
    }
    else if (err?.name === "ValidationError") {
        errorDetails = (Object.values((err as mongoose.Error.ValidationError).errors)[0]);
        stack = err.stack
        if (errorDetails?.name === "ValidatorError") {
            const formattedError = handleMongooseValidationError(errorDetails)
            statusCode = formattedError.statusCode
            message = formattedError.message
            errorMessage = formattedError.errorMessage
        }
        else if (errorDetails?.name === "CastError") {
            const formattedError = handleMongooseCastError(errorDetails)
            statusCode = formattedError.statusCode
            message = formattedError.message
            errorMessage = formattedError.errorMessage
        }
    }
    else if (err instanceof sendError) {
        if (err.statusCode === 401) {
            message = err.message
            errorMessage = "You do not have the necessary permissions to access this resource.",
            errorDetails = null
            stack = null
        } else {
            statusCode = err.statusCode
            message = err.message
            data = null
        }

    }
    else if (err.name === "JsonWebTokenError") {
        message = "Unauthorized Access"
        errorMessage = "You do not have the necessary permissions to access this resource.",
        errorDetails = null
        stack = null
    } else {
        statusCode = 500
        message = "Something went wrong!"
        errorDetails = err
        stack = err.stack
    }

    sendErrorResponse(res, {
        statusCode, message, errorMessage, errorDetails, data, stack,
    })
}

export default globalErrorHandler