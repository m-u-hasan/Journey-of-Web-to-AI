import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";
import config from "../../config";
import httpStatus from "http-status";
import bcrypt from "bcrypt";

const registerUser = async (req: Request, res: Response) => {

    const { name, email, password, profilePhoto } = req.body;
    //console.log(payload);

   


    res.status(httpStatus.CREATED).json({
        success: true,
        statusCode: httpStatus.CREATED,
        message: "User Registerd succesfully",
        data:
        {
            user
        }
    });

}

export const userController = {
   registerUser
}
