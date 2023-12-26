import mongoose from "mongoose";
import { TErrorResponse } from "./interface";

const handleMongooseCastError = (err: mongoose.Error.CastError): TErrorResponse => {
    const statusCode = 400
    const message = 'Invalid Id!'
    const errorMessage = `${err.value} is not a valid ID!`
    return { statusCode, message, errorMessage }
};

export default handleMongooseCastError;