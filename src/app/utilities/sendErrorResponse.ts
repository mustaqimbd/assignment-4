import { Response } from "express";

type TResponse<ED, S, D> = {
    statusCode?: number;
    success?: boolean;
    message?: string;
    errorMessage?: string;
    errorDetails?: ED;
    stack?: S;
    data?: D;
};

const sendErrorResponse = <ED, S, D>(
    res: Response,
    { statusCode, success = false, message, errorMessage, errorDetails, stack, data }: TResponse<ED, S, D>
) => {
    res.status(statusCode || 500).json({ success, statusCode, message, errorMessage, errorDetails, stack, data });
};

export default sendErrorResponse;
