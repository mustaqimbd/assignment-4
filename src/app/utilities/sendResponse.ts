import { Response } from "express";

type TResponse<M, T> = {
    statusCode?: number;
    success?: boolean;
    message?: string;
    meta?: M;
    data: T;
};

const sendResponse = <M, T>(
    res: Response,
    { statusCode = 200, success = true, message = "responded successfully", meta, data }: TResponse<M, T>
) => {
    res.status(statusCode).json({ success, statusCode, message, meta, data });
};

export default sendResponse;
