import type { NextFunction, Request, Response } from "express";
import { sendResponse } from "./sendResponse";
import { verifyToken } from "./jwt";
import authService from "../api/servies/auth.service";

const auth = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization

    // const refreshToken = req.cookies?.refreshToken;

    if (!token) {

        return sendResponse(res, { message: "Token not found" }, 401)

    }
    const payload = verifyToken(token, "access")

    if (!payload) {
        return sendResponse(res, { message: "Invalid Token" }, 401)
    }

    const user = await authService.getUserByID(payload.id)
    console.log(user);

    if (!user) {
        return sendResponse(res, { message: "User Not found" }, 401)
    }
    req.user = user
    next()

};

export default auth