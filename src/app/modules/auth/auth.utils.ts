import jwt from "jsonwebtoken"
import { TJwtPayload } from "./auth.interface"

export const createJwtToken = (
    jwtPayload: TJwtPayload,
    jwt_secret: string,
    jwt_expire: string) => {

    const token = jwt.sign(jwtPayload, jwt_secret, { expiresIn: jwt_expire })
    
    return token
}