import { sql } from "../../db";
import type { Ruser } from "../../types/type";
import bcrypt from "bcrypt"


class AuthService{
    async createUser(user: Ruser & {password: string}){
        const {name, email, age, role, password} =user

        const hash =await bcrypt.hash(password,10)

        const res= await sql`
        INSERT INTO users(name, email, passwordHash, age, role)
        VALUES (${name}, ${email}, ${hash}, ${age}, COALESCE(${role},'user' ))
        RETURNING id, name, age, role
        `
        return res[0]
    }
}
export default new AuthService()