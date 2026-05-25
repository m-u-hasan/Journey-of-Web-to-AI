import config from "../config";
import type { Ruser } from "../types/type";
import jwt from "jsonwebtoken"
export const signToken=(payload: Ruser & {id: number})=>{
    //accessToken => Data access
const accessToken=jwt.sign(payload, config.jwt_secrete, {
    expiresIn: "1d"
})

    //refreshToken => AccessToken re generate
    const refreshToken=jwt.sign(payload, config.refresh_secrete, {
    expiresIn: "7d"
})
return {accessToken, refreshToken}
};

//console.log(signToken({age: 123, email: "hellow@gmail.com", name: "test", role: "admin"}));

