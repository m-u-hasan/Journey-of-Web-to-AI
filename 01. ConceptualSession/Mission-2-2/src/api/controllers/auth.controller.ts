import type { Request, Response } from "express";
import authService from "../servies/auth.service";
import { sendResponse } from "../../utils/sendResponse";

export const signup = async (req: Request, res: Response) => {

    const user = await authService.createUser(req.body);
    if (!user) {
        sendResponse(res, { message: "Failed to create User" }, 400)
        return
    }
    sendResponse(res, { message: "User created successfully", data: user }, 201)
};

