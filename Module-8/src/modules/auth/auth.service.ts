import bcrypt from "bcryptjs";
import { pool } from "../../db";
import jwt from "jsonwebtoken"
import config from "../../config";


const loginUserIntoDB = async (payload: { email: string, password: string }) => {
    const { email, password } = payload;
    //Process: 1. Check if the user exists
    //2. compare the password
    //3. Generate Token
    const userData = await pool.query(`
        SELECT * FROM users WHERE email=$1
        `, [email]);

//Check if the user exists/user not exist
if(userData.rows.length===0)
{
    throw new Error ("Invalid Crdential)")
}
    const user = userData.rows[0];
    //console.log(user);

//2. compare the password in login time
    const matchPassword= await bcrypt.compareSync(password,user.password);
    //console.log(matchPassword);
    if(!matchPassword){
        throw new Error("Invalid Password");
    }




}
export const authService = {
    loginUserIntoDB

}