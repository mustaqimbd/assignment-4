import { Types } from "mongoose";

export type TUserLogin = {
    username: string;
    password: string;
}

export type TJwtPayload = {
    _id: Types.ObjectId,
    role: string,
    email: string
}

export type TPasswordChange = {
    currentPassword: string,
    newPassword: string
}