import type { NextFunction, Request, Response } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";
import config from "../config";
import { pool } from "../db";
const auth = () => {
    return async (req: Request, res: Response, next: NextFunction) => {
        //console.log("This is protected Route");
        //for chack auth token: console.log(req.headers.authorization);
        const token = req.headers.authorization;
        console.log(token);
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized Access!!!"
            });
        }


        //==========Token Decoding=========
        const decode = jwt.verify(token as string, config.secret as string) as JwtPayload;
        //console.log(decode);

        //=======Check user by user email from DB=======
        const userData = await pool.query(`
    SELECT * FROM users WHERE email=$1
    `, [decode.email]);

        console.log(userData);

        const user = userData.rows[0];
        //console.log(user);

        //=========if user not existed=======
        if (userData.rows.length == 0) {
            res.status(404).json({
                success: false,
                message: "User not found"
            })
        }

        //=======if user was diactivated======
        if (!user.is_active) {
            res.status(403).json({
                success: false,
                message: "User Forbidden"
            })
        }

        next();
    };
};

export default auth