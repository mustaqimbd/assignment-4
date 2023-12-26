import { TErrorResponse } from "./interface";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handleMongooseDuplicateError = (err: any): TErrorResponse => {
    const statusCode = 400
    const message = 'Duplicate Entry'
    const errorMessage = `${Object.values(err.keyValue)[0] as string} is already exist!`

    return { statusCode, message, errorMessage }
};

export default handleMongooseDuplicateError;