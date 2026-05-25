import { neon } from "@neondatabase/serverless";
import config from "../config";

export const sql = neon(config.database_url)

export const initDB = async () => {
    await sql`
    --Design of users DB schema
        CREATE TABLE IF NOT EXISTS users(
            id SERIAL PRIMARY KEY,
            name VARCHAR(50) NOT NULL,
            email VARCHAR (255) UNIQUE NOT NULL,
            passwordHash TEXT NOT NULL,
            age INT NOT NULL,
            role VARCHAR(20) NOT NULL default 'user',
            created_at TIMESTAMP NOT NULL DEFAULT NOW(),
            updated_at TIMESTAMP NOT NULL DEFAULT NOW()
        )
        `

    await sql`
        --Orders DB schema
             CREATE TABLE IF NOT EXISTS orders(
            id SERIAL PRIMARY KEY,
            customerID INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
            quantity INT NOT NULL CHECK (quantity>0),
            food text NOT NULL,
            price NUMERIC(10,2) NOT NULL,
            role VARCHAR(20) NOT NULL default 'user',
            created_at TIMESTAMP NOT NULL DEFAULT NOW(),
            updated_at TIMESTAMP NOT NULL DEFAULT NOW()
        )
        `

    console.log("Database Connected");
}


