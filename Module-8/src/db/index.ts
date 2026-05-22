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

    console.log("Database Connected Successfully");
  } catch (error) {
    console.error("DB ERROR:", error);
  }
};
