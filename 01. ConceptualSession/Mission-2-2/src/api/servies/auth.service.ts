import { sql } from "../../db";
import type { Ruser, User } from "../../types/type";
import bcrypt from "bcrypt"
import cookieParser from "cookie-parser"

class AuthService {
    async createUser(user: Ruser & { password: string }) {
        const { name, email, age, role, password } = user

        const hash = await bcrypt.hash(password, 10)

        const result = await sql`
        INSERT INTO users(name, email, password_hash, age, role)
        VALUES (${name}, ${email}, ${hash}, ${age}, COALESCE(${role},'user' ))
        RETURNING id, name, age, role
        `
        return result[0]
    }

    async validateUser(email: string, password: string) {
        const res = await sql`
        SELECT id, name, email, password_hash, age, role FROM users WHERE email=${email}
        `
        if (!res.length) {
            return null;
        }
        const { password_hash, ...user } = res[0] as User;
        const isValid = await bcrypt.compare(password, password_hash);
        return isValid ? user : null
    }

    async getUserByID(id: string) {
        const res = await sql`
        SELECT id, name, email, age, role FROM users WHERE id = ${id}
        `
        return res[0];

    }

}
export default new AuthService()