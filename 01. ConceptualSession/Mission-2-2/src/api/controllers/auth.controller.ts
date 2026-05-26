import type { Request, Response } from "express";
import authService from "../servies/auth.service";
import { sendResponse } from "../../utils/sendResponse";
import { signToken, verifyToken } from "../../utils/jwt";
import type { JwtPayload } from "jsonwebtoken";


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

    res.cookie("refreshToken", refreshToken, {
        sameSite: "lax",
        httpOnly: true,
        secure: false
    })
    const result = {
        user: user,
        accessToken,
        refreshToken
    }
    return sendResponse(res, { message: "User Login Successfull", data: result })
};


export const refresh = async (req: Request, res: Response) => {
    //refresh token=> validate=> user info
    const refreshToken = req.cookies?.refreshToken;
    console.log(`The cookies is: ${req.cookies}`);
   // const refreshToken = req.cookies?.refreshToken;
    console.log(refreshToken);
    if (!refreshToken) {

        return sendResponse(res, { message: "Refresh token not found" }, 401)
    
    }

    const payload = verifyToken(refreshToken, "refresh") as JwtPayload;
    console.log(payload);
    if (!payload) {
        return sendResponse(res, { message: "Invalid Token" }, 401)
    }

    //console.log(payload);

    const user = await authService.getUserByID(payload.id)
    console.log(user);
}