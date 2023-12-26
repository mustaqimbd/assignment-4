import { ZodError } from "zod"
import { TErrorResponse } from "./interface"

const handleZodError = (err: ZodError): TErrorResponse => {
    const statusCode = 400
    const message = 'Validation error'

    const errorSource = err.issues.map(issue => {
        return {
            path: issue?.path[issue?.path.length - 1],
            msg: issue.message,
        }
    })
    console.log(errorSource)
    const errorMessage = errorSource.map(({ msg }) => msg).join(' ');

    return { statusCode, message, errorMessage }
}

export default handleZodError