import { Pool } from "pg";
import config from "../config";

export const pool = new Pool({
  connectionString: config.connecion_string,
});

//=================Created a Table===================

export const initDB = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(50),
        email VARCHAR(255) UNIQUE NOT NULL,
        password TEXT NOT NULL,
        age INT,
        is_active BOOLEAN DEFAULT true,

        created_at TIMESTAMP DEFAULT now(),
        updated_at TIMESTAMP DEFAULT now()
      )
    `);


    //========Create Users profiles and refn with Users=======
    await pool.query(`
      CREATE TABLE IF NOT EXISTS profiles (
      id SERIAL PRIMARY KEY,
      user_id INT UNIQUE REFERENCES users(id) ON DELETE CASCADE,

      bio TEXT,
      address TEXT,
      phone VARCHAR(15),
      gender VARCHAR(10),

      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW()
      )
      `);


    console.log("Database Connected Successfully");
  } catch (error) {
    console.error("DB ERROR:", error);
  }
};
