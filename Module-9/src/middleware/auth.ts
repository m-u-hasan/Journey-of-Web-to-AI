import type { NextFunction, Request, Response } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";
import config from "../config";
import { pool } from "../db";

const auth = () => {
    return async (req: Request, res: Response, next: NextFunction) => {

        //Check 1: if the token exists
        //check 2: verify the token
        //check 3: find the user into db
        //Check 4: if the user active or not
        try {
            // Extract JWT token from Authorization header
            const token = req.headers.authorization;
            //console.log(token);

            // Reject request if token is missing
            if (!token) {
                return res.status(401).json({
                    success: false,
                    message: "Unauthorized Access!!!",
                });
            }

            // Verify and decode JWT token
            const decode = jwt.verify(
                token as string,
                config.secret as string
            ) as JwtPayload;

            // Fetch user from database using decoded email
            const userData = await pool.query(
                `SELECT * FROM users WHERE email=$1`,
                [decode.email]
            );

            //console.log(userData);

            const user = userData.rows[0];

            // Reject if user does not exist in system
            if (userData.rows.length == 0) {
                return res.status(404).json({
                    success: false,
                    message: "User not found",
                });
            }

            // Block inactive users
            if (!user.is_active) {
                return res.status(403).json({
                    success: false,
                    message: "User Forbidden",
                });
            }
            //
            //req.user = decode
            next();
        } catch (error) {
            next(error);
        }

    };
};

export default auth;