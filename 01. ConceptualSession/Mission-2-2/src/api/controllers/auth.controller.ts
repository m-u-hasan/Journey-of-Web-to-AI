import type { Request, Response } from "express";
import authService from "../servies/auth.service";
import { sendResponse } from "../../utils/sendResponse";
import { signToken } from "../../utils/jwt";


export const signup = async (req: Request, res: Response) => {

    const user = await authService.createUser(req.body);
    if (!user) {
        sendResponse(res, { message: "Failed to create User" }, 400)
        return
    }
    sendResponse(res, { message: "User created successfully", data: user }, 201)
};

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const user = await authService.validateUser(email, password);

    if (!user) {
        sendResponse(res, { message: "Invalid email or password" }, 401)
        return
    }

    const { accessToken, refreshToken } = signToken(user);

    const result = {
        user: user,
        accessToken,
        refreshToken
    }
    return sendResponse(res, { message: "User Login Successfull", data: result })
};