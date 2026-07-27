import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";
import config from "../../config";
import httpStatus from "http-status";
import bcrypt from "bcrypt";
import { userService } from "./user.service";

const registerUser = async (req: Request, res: Response) => {

    try{
        const payload = req.body;
    //console.log(payload);
    const user =await userService.registerUserIntoDB(payload);

    res.status(httpStatus.CREATED).json({
        success: true,
        statusCode: httpStatus.CREATED,
        message: "User Registerd succesfully",
        data:
        {
            user
        }
    });

} catch(error){
    console.log(error);

    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        statuscode: httpStatus.INTERNAL_SERVER_ERROR,
        message: "Failed to User Registration",
        error: (error as Error).message
    })
    }
}
export const userController = {
   registerUser
}
