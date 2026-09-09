import config from "../../config";
import { prisma } from "../../lib/prisma";
import { jwtUtils } from "../../utils/jwt";
import { ILoginUser } from "./auth.interface";
import bcrypt from "bcrypt";
import jwt, { SignOptions } from "jsonwebtoken";

const loginUser = async (payload: ILoginUser) => {
    const { email, password } = payload;

    const user = await prisma.user.findFirstOrThrow({
        where: { email }
    })
    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if (!isPasswordMatched) {
        throw new Error("Password is incorrect");
    }


    const jwtPayload = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
    }



    // const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret, {
    //     expiresIn: config.jwt_access_expires_in
    // } as SignOptions
    // )


    const accessToken = jwtUtils.createToken(
        jwtPayload,
        config.jwt_access_secret,
        config.jwt_access_expires_in as SignOptions,
    )


    // const refreshToken = jwt.sign(
    //     jwtPayload, 
    //     config.jwt_refresh_seccret,
    //      { expiresIn: config.jwt_refresh_expires_in 
    //      } as SignOptions
    // );

    const refreshToken = jwtUtils.createToken(
        jwtPayload,
        config.jwt_refresh_seccret,
        config.jwt_refresh_expires_in as SignOptions
    );



    return {
        accessToken,
        refreshToken
    };

}




export const authService = {
    loginUser
}