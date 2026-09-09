import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { authService } from "./auth.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";

const loginUser =catchAsync(async(req: Request, res: Response, next: NextFunction)=>{

    const payload =req.body;
    const {accessToken, refreshToken} =await authService.loginUser(payload);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "User Logged in Successfully",
        data: {accessToken, refreshToken}
    });
});

export const authController ={
    loginUser
}